import { filter, operationType } from "../filters.js";

(function () {
    const controller = 'SSLCommerzResponse';

    const columns = () => [
        { field: 'TranId', filter: true, add: false },
        { field: 'ValId', filter: true, add: false },
        { field: 'TranId', filter: true, add: false },
        { field: 'Amount', filter: true, add: false },
        { field: 'CardType', filter: true, add: false },
        { field: 'StoreAmount', filter: true, add: false },
        { field: 'BankTranId', filter: true, add: false },
        { field: 'TranDate', filter: true, add: false },
        { field: 'Currency', filter: true, add: false },
        { field: 'CardIssuer', filter: true, add: false },
        { field: 'CardBrand', filter: true, add: false },
        { field: 'CardIssuerCountry', filter: true, add: false },
        { field: 'CardIssuerCountryCode', filter: true, add: false },
        { field: 'VerifySign', filter: true, add: false },
        { field: 'VerifyKey', filter: true, add: false },
        { field: 'CurrencyType', filter: true, add: false },
        { field: 'CurrencyAmount', filter: true, add: false },
        { field: 'CurrencyRate', filter: true, add: false },
        { field: 'BaseFair', filter: true, add: false },
        { field: 'ValueA', filter: true, add: false },
        { field: 'ValueB', filter: true, add: false },
        { field: 'ValueC', filter: true, add: false },
        { field: 'ValueD', filter: true, add: false },
        { field: 'RiskLevel', filter: true, add: false },
        { field: 'RiskTitle', filter: true, add: false }
    ];

    const refreshTab = {
        Id: '89338A95-1C22-4C54-82A1-A71194122BD2',
        Name: 'initiated-payment',
        Title: 'Refresh',
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
        items: [refreshTab],
        periodic: {
            container: '.filter_container',
            type: 'Today',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();