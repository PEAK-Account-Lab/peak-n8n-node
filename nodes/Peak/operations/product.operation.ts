import type {
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executeProductOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<INodeExecutionData> {
	const serverEnvironment = this.getNodeParameter(
		'serverEnvironment',
		itemIndex,
	) as string;

	const clientTokenOverride = (this.getNodeParameter(
		'clientTokenOverride',
		itemIndex,
		'',
	) as string).trim();

	if (operation === 'getProduct') {
		const productId = (this.getNodeParameter(
			'productId',
			itemIndex,
			'',
		) as string).trim();

		const productCode = (this.getNodeParameter(
			'productCode',
			itemIndex,
			'',
		) as string).trim();

		const query: Record<string, string | number | boolean> = {};

		if (productId) {
			query.id = productId;
		}

		if (productCode) {
			query.code = productCode;
		}

		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'GET',
			path: '/api/v1/products',
			query,
			serverEnvironment,
			clientTokenOverride,
			headers: { 'x-peak-integrator': 'n8n' },
		});

		return {
			json: response,
			pairedItem: { item: itemIndex },
		};
	}

	if (operation === 'getService') {
		const serviceId = (this.getNodeParameter(
			'serviceId',
			itemIndex,
			'',
		) as string).trim();

		const serviceCode = (this.getNodeParameter(
			'serviceCode',
			itemIndex,
			'',
		) as string).trim();

		const query: Record<string, string | number | boolean> = {};

		if (serviceId) {
			query.id = serviceId;
		}

		if (serviceCode) {
			query.code = serviceCode;
		}

		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'GET',
			path: '/api/v1/services',
			query,
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
		`Unsupported product operation: ${operation}`,
		{ itemIndex },
	);
}
