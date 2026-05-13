import type {
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executeClientTokenOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<INodeExecutionData> {
	if (operation === 'create') {
		const serverEnvironment = this.getNodeParameter(
			'serverEnvironment',
			itemIndex,
		) as string;

		const creds = (await this.getCredentials('PEAKApi')) as {
			connectId: string;
			connectKey: string;
		};

		const body = {
			PeakClientToken: {
				connectId: creds.connectId,
				password: creds.connectKey,
			},
		};

		const response = await peakApiRequest.call(this, {
			itemIndex,
			method: 'POST',
			path: '/api/v1/clienttoken',
			body,
			serverEnvironment,
			// clientToken is not required for this endpoint
			clientTokenOverride: 'none',
		});

		return {
			json: response,
			pairedItem: { item: itemIndex },
		};
	}

	throw new NodeOperationError(
		this.getNode(),
		`Unsupported clientToken operation: ${operation}`,
		{ itemIndex },
	);
}
