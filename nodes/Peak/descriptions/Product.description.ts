import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Get Product',
				value: 'getProduct',
				action: 'Get a product',
			},
			{
				name: 'Get Service',
				value: 'getService',
				action: 'Get a service',
			},
		],
		default: 'getProduct',
	},
];

export const productFields: INodeProperties[] = [
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
				resource: ['product'],
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
	// Product fields
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Product ID to retrieve',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getProduct'],
			},
		},
	},
	{
		displayName: 'Product Code',
		name: 'productCode',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Product code to retrieve',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getProduct'],
			},
		},
	},
	// Service fields
	{
		displayName: 'Service ID',
		name: 'serviceId',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Service ID to retrieve',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getService'],
			},
		},
	},
	{
		displayName: 'Service Code',
		name: 'serviceCode',
		type: 'string',
		typeOptions: { rows: 1 },
		default: '',
		required: false,
		description: 'Service code to retrieve',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getService'],
			},
		},
	},
	// Shared
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
				resource: ['product'],
			},
		},
	},
];
