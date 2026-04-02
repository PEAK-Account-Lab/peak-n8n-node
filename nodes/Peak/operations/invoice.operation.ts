import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executeInvoiceOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<INodeExecutionData> {
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

	if (operation === 'createInvoice') {
		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'POST',
			path: '/api/v1/invoices',
			body,
			serverEnvironment,
			clientTokenOverride,
			headers: { 'x-peak-integrator': 'n8n' },
		});

		return {
			json: response,
			pairedItem: { item: itemIndex },
		};
	}

	if (operation === 'createExpense') {
		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'POST',
			path: '/api/v1/expenses',
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
		`Unsupported invoice operation: ${operation}`,
		{ itemIndex },
	);
}
