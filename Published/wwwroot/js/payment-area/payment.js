import { editBtn, imageBtn, menuBtn, fileBtn, eyeBtn, flashBtn, cashBtn, printBtn } from "../buttons.js";
import { orderStatus } from "../dictionaries.js";
import { filter, liveRecord, operationType, trashRecord } from "../filters.js";
import { url } from '../utils.js';

(function () {
    const controller = 'Payment';

    const columns = () => [
        { field: 'CustomerName', title: 'Customer Name', filter: true, add: false },
        { field: 'OrderCode', title: 'Order Code', filter: true, add: false },
        { field: 'Status', title: 'Status', filter: true, add: false },
        { field: 'Amount', title: 'Amount', filter: true, add: false },
        { field: 'Currency', title: 'Currency', filter: true, add: false },
        { field: 'StoreAmount', title: 'Store Amount', filter: true, add: false },
        { field: 'ValidationId', title: 'Validation Id', filter: true, add: false },
        { field: 'CardIssuer', title: 'Card Issuer', filter: true, add: false },
        { field: 'CardType', title: 'Card Type', filter: true, add: false },
        { field: 'CardNo', title: 'Card No', filter: true, add: false },
        { field: 'BrankTransitionId', title: 'Brank Transition Id', filter: true, add: false },
        { field: 'TransitionDate', title: 'Transition Date', filter: true, add: false },
        { field: 'CardIssuerCountryCode', title: 'Card Country', filter: true, add: false },
        { field: 'VerifySign', title: 'Verify Sign', filter: true, add: false },
        { field: 'SessionKey', title: 'Session Key', filter: true, add: false },
    ];

    const initiatedTab = {
        Id: '89338A95-1C22-4C54-82A1-A71194122BD2',
        Name: 'initiated-payment',
        Title: 'INITIATED',
        filter: [filter('Status', 'INITIATED', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'CustomerName', title: 'Customer Name', filter: true, add: false },
            { field: 'OrderCode', title: 'Order Code', filter: true, add: false },
            { field: 'Status', title: 'Status', filter: true, add: false },
            { field: 'Amount', title: 'Amount', filter: true, add: false },
            { field: 'SessionKey', title: 'Session Key', filter: true, add: false },
        ],
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const validTab = {
        Id: '33D93D97-DFB6-4158-A519-60F73BCA2645',
        Name: 'valid-payment',
        Title: 'VALID',
        filter: [filter('Status', 'VALID', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const failedTab = {
        Id: '57E8B614-E352-4A6E-A10A-54B401E4B936',
        Name: 'failed-payment',
        Title: 'FAILED',
        filter: [filter('Status', 'FAILED', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const cancelledTab = {
        Id: '6E12781B-41E8-4A06-A104-A8DB78BB7E6D',
        Name: 'cancelled-payment',
        Title: 'CANCELLED',
        filter: [filter('Status', 'CANCELLED', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const unattemptedTab = {
        Id: 'FAC6F9E1-D698-498E-8E79-E682AD5EDA1E',
        Name: 'unattempted-payment',
        Title: 'UNATTEMPTED',
        filter: [filter('Status', 'UNATTEMPTED', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const expiredTab = {
        Id: 'B87EF665-CF2A-4344-AE63-7C168E07F759',
        Name: 'expired-payment',
        Title: 'EXPIRED',
        filter: [filter('Status', 'EXPIRED', operationType.equal)],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [initiatedTab, validTab, failedTab, cancelledTab, unattemptedTab, expiredTab],
        periodic: {
            container: '.filter_container',
            type: 'Today',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();