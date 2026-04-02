import type { INodeProperties } from 'n8n-workflow';

export const receiptOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a receipt',
			},
		],
		default: 'create',
	},
];

export const receiptFields: INodeProperties[] = [
	{
		displayName: 'Server Environment',
		name: 'serverEnvironment',
		type: 'options',
		typeOptions: { rows: 1 },
		default: 'production',
		required: true,
		description: 'Select PEAK server environment to use',
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'UAT',
				value: 'uat',
			},
			{
				name: 'Production',
				value: 'production',
			},
		],
	},
	{
		displayName: 'JSON Body',
		name: 'jsonBody',
		type: 'string',
		typeOptions: { rows: 10 },
		default: '',
		required: true,
		description: 'Raw JSON payload (you can map from previous node with {{$json}})',
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Client Token',
		name: 'clientTokenOverride',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: false,
		description: 'Optional client token. Map this from a previous Create Client Token operation if needed.',
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
	},
];
