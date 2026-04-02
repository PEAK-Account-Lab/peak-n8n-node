import type { INodeProperties } from 'n8n-workflow';

export const paymentMethodOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentMethod'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a payment method',
			},
		],
		default: 'get',
	},
];

export const paymentMethodFields: INodeProperties[] = [
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
				resource: ['paymentMethod'],
				operation: ['get'],
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
		displayName: 'Payment Method ID',
		name: 'paymentMethodId',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Payment Method ID to retrieve',
		displayOptions: {
			show: {
				resource: ['paymentMethod'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Payment Method Code',
		name: 'paymentMethodCode',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Payment Method code to retrieve',
		displayOptions: {
			show: {
				resource: ['paymentMethod'],
				operation: ['get'],
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
				resource: ['paymentMethod'],
				operation: ['get'],
			},
		},
	},
];
