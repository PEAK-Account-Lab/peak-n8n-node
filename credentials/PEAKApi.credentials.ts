import crypto from 'crypto';
import {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

function formatTimestampUtc(date: Date): string {
	const pad = (n: number) => String(n).padStart(2, '0');
	return (
		`${date.getUTCFullYear()}` +
		`${pad(date.getUTCMonth() + 1)}` +
		`${pad(date.getUTCDate())}` +
		`${pad(date.getUTCHours())}` +
		`${pad(date.getUTCMinutes())}` +
		`${pad(date.getUTCSeconds())}`
	);
}

function hmacSha1Hex(key: string, message: string): string {
	return crypto.createHmac('sha1', key).update(message, 'utf8').digest('hex');
}

export class PEAKApi implements ICredentialType {
	name = 'PEAKApi';
	displayName = 'PEAK API';
	icon = 'file:PEAK.svg' as const;
	documentationUrl = 'https://peak-api-core.readme.io/reference/peak-open-api';

	properties: INodeProperties[] = [
		{
			displayName: 'User Token',
			name: 'userToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Connect ID',
			name: 'connectId',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: '',
		},
		{
			displayName: 'Connect Key',
			name: 'connectKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: '',
		},
	];

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const userToken = credentials.userToken as string;
		const connectId = credentials.connectId as string;

		const timeStamp = formatTimestampUtc(new Date());
		const timeSignature = hmacSha1Hex(connectId, timeStamp);

		requestOptions.headers = {
			...(requestOptions.headers ?? {}),
			'User-Token': userToken,
			'Time-Stamp': timeStamp,
			'Time-Signature': timeSignature,
		};

		return requestOptions;
	}

	/**
	 * Lightweight smoke test required by n8n automated review.
	 * Full HMAC signing happens in `authenticate` at request time.
	 */
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url:
				'https://peakengineapidev.azurewebsites.net/api/v1/clienttoken',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				ping: true,
			},
			json: true,
		},
	};
}
