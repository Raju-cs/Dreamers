// TODO: Search Content [X]
// TODO: Dropdown not loading
// TODO: Add textarea for excerpt
// TODO: Category select
// TODO: Remove vat [X]

import { editBtn, imageBtn, menuBtn, plusBtn, starBtn } from "../buttons.js";
import { filter, liveRecord, operationType, trashRecord } from "../filters.js";
import { complainType, complainStatus } from '../dictionaries.js';

(function () {
    const controller = 'Complain';

    const columns = () => [
        { field: 'ComplainType', title: 'Type', filter: true, position: 1, add: false, bound: complainTypeBound },
        { field: 'Message', title: 'Message',  Width: '512px', filter: true, position: 3, add: false },
        { field: 'ComplainStatus', title: 'Status', filter: true, position: 1, add: false, bound: complainStatusBound },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 2 }, position: 2, },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function complainTypeBound(td) {
        switch (this.ComplainType) {
            case complainType.agentBehaviors:
                td.html('Agent Behavior');
                break;

            case complainType.delivery:
                td.html('Delivery');
                break;

            case complainType.others:
                td.html('Others');
                break;

            case complainType.products:
                td.html('Products');
                break;

            case complainType.website:
                td.html('Website');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function complainStatusBound(td) {
        switch (this.ComplainStatus) {
            case complainStatus.new:
                td.html('New');
                break;

            case complainStatus.onHold:
                td.html('On Hold');
                break;

            case complainStatus.seen:
                td.html('Seen');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'change-status-record' + Math.random(),
            model: options.data,
            title: options.title,
            columns: columns(),
            dropdownList: [
                {
                    title: 'Status',
                    Id: 'ComplainStatus',
                    dataSource: [
                        { text: 'Seen', value: 1 },
                        { text: 'On Hold', value: 2 }
                    ],
                    add: { sibling: 2 },
                    position: 1,
                },
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function changeStatus(model, grid) {
        popup({ title: 'Change Status', data: model });
    };

    //Tab config
    const tab = (id, title, filters) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: filters,
            remove: false, //isDeleted ? false : { save: `/${controller}/Remove` },
            actions: [
                {
                    click: changeStatus,
                    html: menuBtn()
                }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    const newFilter = [
        liveRecord,
        filter('ComplainStatus', complainStatus.new),
    ];

    const seenFilter = [
        liveRecord,
        filter('ComplainStatus', complainStatus.seen),
    ]

    const onHoldFilter = [
        liveRecord,
        filter('ComplainStatus', complainStatus.onHold),
    ]

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'New', newFilter),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB75', 'Onhold', onHoldFilter),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Seen', seenFilter),
        ],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();