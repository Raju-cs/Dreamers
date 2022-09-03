import { editBtn, eyeBtn, listBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";
(function () {
    const controller = 'Period';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'StartDate', title: 'Start Date', filter: true, position: 1, add: false, dateFormat: 'yyyy/dd/MM', required: false },
        { field: 'EndDate', title: 'End Date', filter: true, position: 2, add: { sibling: 2, }, add: false, dateFormat: 'yyyy/dd/MM', required: false, },
 /*       { field: 'TotalCollected', title: 'Total Collected', filter: true, position: 2, required: true, add: { sibling: 2 } },
        { field: 'InCome', title: 'Income', filter: true, position: 3, add: { sibling: 2 } },
        { field: 'OutCome', title: 'Outcome', filter: true, position: 5, add: { sibling: 2 } },*/
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 6, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_PERIOD',
            model: undefined,
            title: 'Add Period',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_PERIOD',
            model: model,
            title: 'Edit Period',
            columns: [{ field: 'StartDate', title: 'Start Date', filter: true, position: 1, dateFormat: 'yyyy/dd/MM'},
                { field: 'EndDate', title: 'End Date', filter: true, position: 2, add: { sibling: 2 }, dateFormat: 'yyyy/dd/MM' },
          /*      { field: 'TotalCollected', title: 'Total Collected', filter: true, position: 2, required: false, add: { sibling: 2 } },
                { field: 'InCome', title: 'Income', filter: true, position: 3, add: { sibling: 2 } },
                { field: 'OutCome', title: 'Outcome', filter: true, position: 5, add: { sibling: 2 } },*/
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },],
            dropdownList: [{
                title: 'Period Active Status',
                Id: 'IsActive',
                dataSource: [
                    { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                    { text: 'No', value: ACTIVE_STATUS.FALSE },
                ],
                add: { sibling: 2 },
                position: 6,

            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.StartDate = `${model.StartDate}`;
                formModel.EndDate = `${model.EndDate}`;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };

    const viewDetails = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Period Information' + row.Id,
            url: '/js/period-area/period-details-modal.js',
        });
    }

    const studentFeesList = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Period Information' + row.Id,
            url: '/js/period-area/studentlist-details-modal.js',
        });
    }

    const periodTab = {
        Id: '546877A6-5387-4C1F-A7C5-BA0A300EA42C',
        Name: 'PERIOD',
        Title: 'Period',
        filter: [liveRecord],
        remove: false,
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
            html: eyeBtn("View Details")
            }, {
            click: studentFeesList,
            html: listBtn("View Student List")
            }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const deleteTab = {
        Id: '8653AD60-55D5-45A5-BD72-89A8627826A6',
        Name: 'DELETE_PERIOD',
        Title: 'Deleted',
        filter: [trashRecord],
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
        items: [periodTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();