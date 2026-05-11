import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

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
 *
 * User-Token, Time-Stamp, and Time-Signature headers are added by the
 * PEAKApi credential's `authenticate` function. This function only handles
 * the per-call Client-Token header (which is not part of the credential
 * because it is short-lived and minted via the clientToken operation).
 */
export async function peakApiRequest(
	this: IExecuteFunctions,
	options: PeakApiRequestOptions,
): Promise<any> {
	// 'none' sentinel: skip Client-Token entirely. Used by the clientToken
	// creation operation, which calls the endpoint that *issues* the token.
	const skipClientToken = options.clientTokenOverride === 'none';
	const clientToken = skipClientToken ? '' : (options.clientTokenOverride ?? '');

	if (!skipClientToken && !clientToken) {
		throw new NodeOperationError(
			this.getNode(),
			'Client Token is required. Run a Create Client Token operation and map its output into the Client Token field.',
			{ itemIndex: options.itemIndex },
		);
	}

	const baseUrl = getPeakBaseUrl(options.serverEnvironment);
	const url = buildUrl(baseUrl, options.path, options.query);

	const headers: IDataObject = {
		...(skipClientToken ? {} : { 'Client-Token': clientToken }),
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
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'PEAKApi',
			requestOptions,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			itemIndex: options.itemIndex,
		});
	}
}
