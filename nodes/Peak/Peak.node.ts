import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { contactOperations, contactFields } from './descriptions/Contact.description';
import { clientTokenOperations, clientTokenFields } from './descriptions/ClientToken.description';
import { dailyJournalOperations, dailyJournalFields } from './descriptions/DailyJournal.description';
import { fileVaultOperations, fileVaultFields } from './descriptions/FileVault.description';
import { invoiceOperations, invoiceFields } from './descriptions/Invoice.description';
import { paymentMethodOperations, paymentMethodFields } from './descriptions/PaymentMethod.description';
import { productOperations, productFields } from './descriptions/Product.description';
import { receiptOperations, receiptFields } from './descriptions/Receipt.description';

import { executeContactOperation } from './operations/contact.operation';
import { executeClientTokenOperation } from './operations/clientToken.operation';
import { executeDailyJournalOperation } from './operations/dailyJournal.operation';
import { executeFileVaultOperation } from './operations/fileVault.operation';
import { executeInvoiceOperation } from './operations/invoice.operation';
import { executePaymentMethodOperation } from './operations/paymentMethod.operation';
import { executeProductOperation } from './operations/product.operation';
import { executeReceiptOperation } from './operations/receipt.operation';

export class Peak implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PEAK',
		name: 'peak',
		icon: 'file:PEAK.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the PEAK Accounting API',
		defaults: {
			name: 'PEAK',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'PEAKApi', required: true }],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Client Token',
						value: 'clientToken',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Daily Journal',
						value: 'dailyJournal',
					},
					{
						name: 'File Vault',
						value: 'fileVault',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Payment Method',
						value: 'paymentMethod',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Receipt',
						value: 'receipt',
					},
				],
				default: 'contact',
			},
			// Operations per resource
			...clientTokenOperations,
			...contactOperations,
			...dailyJournalOperations,
			...fileVaultOperations,
			...invoiceOperations,
			...paymentMethodOperations,
			...productOperations,
			...receiptOperations,
			// Fields per resource
			...clientTokenFields,
			...contactFields,
			...dailyJournalFields,
			...fileVaultFields,
			...invoiceFields,
			...paymentMethodFields,
			...productFields,
			...receiptFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				let result: INodeExecutionData;

				if (resource === 'clientToken') {
					result = await executeClientTokenOperation.call(this, itemIndex, operation);
				} else if (resource === 'contact') {
					result = await executeContactOperation.call(this, itemIndex, operation);
				} else if (resource === 'dailyJournal') {
					result = await executeDailyJournalOperation.call(this, itemIndex, operation);
				} else if (resource === 'fileVault') {
					result = await executeFileVaultOperation.call(this, itemIndex, operation);
				} else if (resource === 'invoice') {
					result = await executeInvoiceOperation.call(this, itemIndex, operation);
				} else if (resource === 'paymentMethod') {
					result = await executePaymentMethodOperation.call(this, itemIndex, operation);
				} else if (resource === 'product') {
					result = await executeProductOperation.call(this, itemIndex, operation);
				} else if (resource === 'receipt') {
					result = await executeReceiptOperation.call(this, itemIndex, operation);
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, {
						itemIndex,
					});
				}

				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: itemIndex },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}