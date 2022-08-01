import { editBtn } from "../buttons.js";
import { REVIEW_STATUS } from "../dictionaries.js";
import { filter, liveRecord, trashRecord } from "../filters.js";

(function () {
    const controller = 'Review';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Content', title: 'Review', filter: true, add: { sibling: 2 } },
        { field: 'ProductName', title: 'Product', filter: true, add: { sibling: 2 } },
        { field: 'Status', title: 'Status', filter: true, add: { sibling: 2 } },
        { field: 'CustomerName', title: 'Customer', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date',  add: false },
        { field: 'UpdatorName', title: 'Updator',  add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated',  add: false },
    ];


    function changeStatus(model) {
        Global.Add({
            name: 'edit-review-record',
            model: model,
            title: 'Change Status',
            columns: [],
            dropdownList: [
                {
                    title: 'Change Status',
                    Id: 'Status',
                    dataSource: [
                        { text: REVIEW_STATUS.APPROVED, value:  REVIEW_STATUS.APPROVED},
                        { text: REVIEW_STATUS.DENIED, value:  REVIEW_STATUS.DENIED},
                        { text: REVIEW_STATUS.ON_HOLD, value:  REVIEW_STATUS.ON_HOLD},
                    ],
                    Add: { sibling: 1 },
                    position: 1
                }
            ],
            additionalField: [
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, position: 1 }
            ],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    // pending tab config
    const pendingTab = {
        Id: '014D50FD-18CA-4CE8-951B-35ECAB91CB79',
        Name: 'PENDING_TAB',
        Title: 'PENDING',
        filter: [liveRecord, filter('Status', REVIEW_STATUS.PENDING)],
        remove: false,
        actions: [{
            click: changeStatus,
            html: editBtn("Take action on review")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Url: 'Get',
        Printable: { container: $('void') },
    }

    // approved tab config
    const approvedTab = {
        Id: '014D50FD-18CA-4CE8-951B-35ECAB91CB76',
        Name: 'APPROVED_TAB',
        Title: 'APPROVED',
        filter: [liveRecord, filter('Status', REVIEW_STATUS.APPROVED)],
        remove: false,
        actions: [{
            click: changeStatus,
            html: editBtn("Take action on review")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Url: 'Get',
        Printable: { container: $('void') },
    }

    // denied tab config
    const deniedTab = {
        Id: '014D50FD-18CA-4CE8-951B-35ECAB91CB78',
        Name: 'DENIED_TAB',
        Title: 'DENIED',
        filter: [liveRecord, filter('Status', REVIEW_STATUS.DENIED)],
        remove: false,
        actions: [{
            click: changeStatus,
            html: editBtn("Take action on review")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Url: 'Get',
        Printable: { container: $('void') },
    }

    // on hold tab config
    const onHoldTab = {
        Id: 'AAC23A52-54BE-4357-8E89-7420D3E4D043',
        Name: 'ON_HOLD_TAB',
        Title: 'ON HOLD',
        filter: [liveRecord, filter('Status', REVIEW_STATUS.ON_HOLD)],
        remove: false,
        actions: [{
            click: changeStatus,
            html: editBtn("Take action on review")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Url: 'Get',
        Printable: { container: $('void') },
    }

    // denied tab config
    const deletedTab = {
        Id: '08472F28-21DB-40FF-BDCD-5A928106F6A6',
        Name: 'DELETED_TAB',
        Title: 'DELETED',
        filter: [trashRecord],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Url: 'Get',
        Printable: { container: $('void') },
    }
   

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [pendingTab, approvedTab, deniedTab, onHoldTab, deletedTab],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();