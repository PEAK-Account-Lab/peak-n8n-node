import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executeFileVaultOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<INodeExecutionData> {
	if (operation === 'insert') {
		const serverEnvironment = this.getNodeParameter(
			'serverEnvironment',
			itemIndex,
		) as string;

		const jsonBodyStr = (this.getNodeParameter(
			'jsonBody',
			itemIndex,
		) as string).trim();

		const clientTokenOverride = (this.getNodeParameter(
			'clientTokenOverride',
			itemIndex,
			'',
		) as string).trim();

		let body: IDataObject;
		try {
			const parsed = JSON.parse(jsonBodyStr) as unknown;
			if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
				throw new Error('JSON Body must be an object.');
			}
			body = parsed as IDataObject;
		} catch {
			throw new NodeOperationError(
				this.getNode(),
				'Invalid JSON Body — must be a valid JSON object.',
				{ itemIndex },
			);
		}

		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'POST',
			path: '/api/v1/FileVault',
			body,
			serverEnvironment,
			clientTokenOverride,
		});

		return {
			json: response,
			pairedItem: { item: itemIndex },
		};
	}

	throw new NodeOperationError(
		this.getNode(),
		`Unsupported fileVault operation: ${operation}`,
		{ itemIndex },
	);
}
