import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { formatTimestamp } from '../helpers/time';
import { hmacSha1Hex } from '../helpers/crypto';

type PeakCredentials = {
	userToken: string;
	clientToken: string;
	connectId: string;
};

export type PeakApiRequestOptions = {
	itemIndex: number;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	path: string;
	serverEnvironment: 'uat' | 'production' | string;
	query?: Record<string, string | number | boolean | undefined | null>;
	body?: IDataObject | IDataObject[] | string | Buffer;
	clientTokenOverride?: string;
	headers?: IDataObject;
};

/**
 * Resolves the PEAK API base URL from the selected environment.
 */
function getPeakBaseUrl(serverEnvironment: string): string {
	if (serverEnvironment === 'production') {
		return 'https://api.peakaccount.com';
	}

	return 'https://peakengineapidev.azurewebsites.net';
}

/**
 * Builds a full request URL including query parameters.
 */
function buildUrl(
	baseUrl: string,
	path: string,
	query?: Record<string, string | number | boolean | undefined | null>,
): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const url = new URL(`${baseUrl}${normalizedPath}`);

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value === undefined || value === null || value === '') {
				continue;
			}

			url.searchParams.append(key, String(value));
		}
	}

	return url.toString();
}

/**
 * Sends an authenticated request to the PEAK API.
 */
export async function peakApiRequest(
	this: IExecuteFunctions,
	options: PeakApiRequestOptions,
): Promise<any> {
	const creds = (await this.getCredentials('PEAKApi')) as PeakCredentials;

	const userToken = creds.userToken;
	const connectId = creds.connectId;
	// 'none' is a sentinel value used by the clientToken operation which generates
	// the token and therefore cannot provide one itself.
	const skipClientToken = options.clientTokenOverride === 'none';
	const clientToken = skipClientToken
		? ''
		: (options.clientTokenOverride || creds.clientToken);

	if (!userToken) {
		throw new NodeOperationError(this.getNode(), 'Missing User Token in PEAKApi credentials.', {
			itemIndex: options.itemIndex,
		});
	}

	if (!connectId) {
		throw new NodeOperationError(this.getNode(), 'Missing Connect ID in PEAKApi credentials.', {
			itemIndex: options.itemIndex,
		});
	}

	if (!skipClientToken && !clientToken) {
		throw new NodeOperationError(
			this.getNode(),
			'Client Token is required (from credentials or Client Token Override).',
			{ itemIndex: options.itemIndex },
		);
	}

	const baseUrl = getPeakBaseUrl(options.serverEnvironment);
	const url = buildUrl(baseUrl, options.path, options.query);

	const timeStamp = formatTimestamp(new Date(), false);
	const timeSignature = hmacSha1Hex(connectId, timeStamp);

	const headers: IDataObject = {
		'User-Token': userToken,
		...(skipClientToken ? {} : { 'Client-Token': clientToken }),
		'Time-Stamp': timeStamp,
		'Time-Signature': timeSignature,
		'Content-Type': 'application/json',
		...(options.headers ?? {}),
	};

	const requestOptions: IHttpRequestOptions = {
		method: options.method,
		url,
		headers,
		json: true,
	};

	if (options.body !== undefined) {
		requestOptions.body = options.body;
	}

	try {
		return await this.helpers.httpRequest(requestOptions);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error occurred while calling PEAK API.';

		throw new NodeOperationError(this.getNode(), `PEAK API request failed: ${message}`, {
			itemIndex: options.itemIndex,
		});
	}
}