import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['contact'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Get a contact',
            },
        ],
        default: 'get',
    },
];

export const contactFields: INodeProperties[] = [
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
                resource: ['contact'],
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
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        typeOptions: { rows: 1 },
        default: '',
        required: false,
        description: 'Contact ID to retrieve',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get'],
            },
        },
    },
    {
        displayName: 'Contact Code',
        name: 'contactCode',
        type: 'string',
        typeOptions: { rows: 1 },
        default: '',
        required: false,
        description: 'Contact code to retrieve',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get'],
            },
        },
    },
    {
        displayName: 'Client Token',
        name: 'clientTokenOverride',
        type: 'string',
        typeOptions: {
            password: true,
        },
        default: '',
        required: false,
        description: 'Optional client token. Map this from a previous Create Client Token operation if needed.',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get'],
            },
        },
    }
];