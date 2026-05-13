import type { INodeProperties } from 'n8n-workflow';

export const clientTokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['clientToken'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a client token',
			},
		],
		default: 'create',
	},
];

export const clientTokenFields: INodeProperties[] = [
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
				resource: ['clientToken'],
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
];
