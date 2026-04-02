import type { INodeProperties } from 'n8n-workflow';

export const fileVaultOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fileVault'],
			},
		},
		options: [
			{
				name: 'Insert',
				value: 'insert',
				action: 'Insert a file into File Vault',
			},
		],
		default: 'insert',
	},
];

export const fileVaultFields: INodeProperties[] = [
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
				resource: ['fileVault'],
				operation: ['insert'],
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
				resource: ['fileVault'],
				operation: ['insert'],
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
				resource: ['fileVault'],
				operation: ['insert'],
			},
		},
	},
];
