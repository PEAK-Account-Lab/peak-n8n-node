import type {
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executePaymentMethodOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<INodeExecutionData> {
	if (operation === 'get') {
		const serverEnvironment = this.getNodeParameter(
			'serverEnvironment',
			itemIndex,
		) as string;

		const paymentMethodId = (this.getNodeParameter(
			'paymentMethodId',
			itemIndex,
			'',
		) as string).trim();

		const paymentMethodCode = (this.getNodeParameter(
			'paymentMethodCode',
			itemIndex,
			'',
		) as string).trim();

		const clientTokenOverride = (this.getNodeParameter(
			'clientTokenOverride',
			itemIndex,
			'',
		) as string).trim();

		const query: Record<string, string | number | boolean> = {};

		if (paymentMethodId) {
			query.id = paymentMethodId;
		}

		if (paymentMethodCode) {
			query.code = paymentMethodCode;
		}

		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'GET',
			path: '/api/v1/paymentMethods',
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
		`Unsupported paymentMethod operation: ${operation}`,
		{ itemIndex },
	);
}
