import type {
    IExecuteFunctions,
    INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { peakApiRequest } from '../transport/request';

export async function executeContactOperation(
    this: IExecuteFunctions,
    itemIndex: number,
    operation: string,
): Promise<INodeExecutionData> {
    if (operation === 'get') {
        const serverEnvironment = this.getNodeParameter(
            'serverEnvironment',
            itemIndex,
        ) as string;

        const contactId = (this.getNodeParameter(
            'contactId',
            itemIndex,
            '',
        ) as string).trim();

        const contactCode = (this.getNodeParameter(
            'contactCode',
            itemIndex,
            '',
        ) as string).trim();

        const clientTokenOverride = (this.getNodeParameter(
            'clientTokenOverride',
            itemIndex,
            '',
        ) as string).trim();

        if (!contactId && !contactCode) {
            throw new NodeOperationError(
                this.getNode(),
                'Either "Contact ID" or "Contact Code" must be provided.',
                { itemIndex },
            );
        }

        const query: Record<string, string | number | boolean> = {};

        if (contactId) {
            query.id = contactId;
        }

        if (contactCode) {
            query.code = contactCode;
        }

        const response = await peakApiRequest.call(this, {
            itemIndex,
            method: 'GET',
            path: '/api/v1/contacts',
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
        `Unsupported contact operation: ${operation}`,
        { itemIndex },
    );
}