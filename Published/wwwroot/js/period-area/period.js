import { editBtn, eyeBtn, listBtn, userBtn, briefcaseBtn } from "../buttons.js";
import { filter, liveRecord, trashRecord, OPERATION_TYPE } from '../filters.js';
import { ACTIVE_STATUS, MONTH } from "../dictionaries.js";
(function () {
    const controller = 'Period';

    const months = ['January', 'February', 'March ', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    $(document).ready(() => {
        $('#add-record').click(add);
    });

    // Input: date/Month/year
    // output: month/date/year
    const dateForSQLServer = (enDate = '01/01/1970') => {
        const dateParts = enDate.split('/');
        console.log("dateparts=>", dateParts);
       // return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    }

    function periodStartDate(td) {
        td.html(new Date(this.StartDate).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }
    function periodEndDate(td) {
        td.html(new Date(this.EndDate).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }
    function paymentDate(td) {
        td.html(new Date(this.RegularPaymentDate).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }

    const columns = () => [
        { field: 'Name', title: 'Month', filter: true, required: false, position: 1, add: false },
        { field: 'StartDate', title: 'Start Date (Day/Month/Year)', filter: true, position: 2, dateFormat: 'dd/MM/yyyy', required: false, bound: periodStartDate },
        { field: 'EndDate', title: 'End Date (Day/Month/Year)', filter: true, position: 3, dateFormat: 'dd/MM/yyyy', required: false, bound: periodEndDate },
        { field: 'RegularPaymentDate', title: 'Regular Payment Date', filter: true, position: 4, dateFormat: 'dd/MM/yyyy', required: false, bound: paymentDate },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 5 },
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
            dropdownList: [{
                title: 'Name',
                Id: 'Name',
                dataSource: [
                    { text: 'January', value: MONTH.JANUARY },
                    { text: 'February', value: MONTH.FEBRUARY },
                    { text: 'March', value: MONTH.MARCH },
                    { text: 'April', value: MONTH.APRIL },
                    { text: 'May', value: MONTH.MAY },
                    { text: 'June', value: MONTH.JUNE },
                    { text: 'July', value: MONTH.JULY },
                    { text: 'August', value: MONTH.AUGUST },
                    { text: 'September', value: MONTH.SEPTEMBER },
                    { text: 'October', value: MONTH.OCTOBER },
                    { text: 'November', value: MONTH.NOVEMBER },
                    { text: 'December', value: MONTH.DECEMBER },
                ],
                position: 1,
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                console.log({ model, formModel})
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
                formModel.EndDate = dateForSQLServer(model.EndDate);
                formModel.StartDate = dateForSQLServer(model.StartDate);
                formModel.RegularPaymentDate = dateForSQLServer(model.RegularPaymentDate);
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                const monthIndex = new Date().getMonth();
                const year = new Date().getFullYear();
                formModel.StartDate = new Date(year, monthIndex, 1).format('dd/MM/yyyy');
                formModel.EndDate = new Date(year, monthIndex + 1, 0).format('dd/MM/yyyy');
                formModel.RegularPaymentDate = new Date(year, monthIndex , 10).format('dd/MM/yyyy');
                formModel.Name = months[monthIndex];
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
            columns: [
                { field: 'Name', title: 'Month', filter: true, required: false, position: 1, add: false },
                { field: 'StartDate', title: 'Start Date (Day/Month/Year)', filter: true, position: 2, dateFormat: 'dd/MM/yyyy', required: false },
                { field: 'EndDate', title: 'End Date (Day/Month/Year)', filter: true, position: 3, dateFormat: 'dd/MM/yyyy', required: false },
                { field: 'RegularPaymentDate', title: 'Regular Payment Date', filter: true, position: 4, dateFormat: 'dd/MM/yyyy', required: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },],
            dropdownList: [{
                title: 'Name',
                Id: 'Name',
                dataSource: [
                    { text: 'January', value: MONTH.JANUARY },
                    { text: 'February', value: MONTH.FEBRUARY },
                    { text: 'March', value: MONTH.MARCH },
                    { text: 'April', value: MONTH.APRIL },
                    { text: 'May', value: MONTH.MAY },
                    { text: 'June', value: MONTH.JUNE },
                    { text: 'July', value: MONTH.JULY },
                    { text: 'August', value: MONTH.AUGUST },
                    { text: 'September', value: MONTH.SEPTEMBER },
                    { text: 'October', value: MONTH.OCTOBER },
                    { text: 'November', value: MONTH.NOVEMBER },
                    { text: 'December', value: MONTH.DECEMBER },
                ],
                position: 1,
            },{
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
                formModel.EndDate = dateForSQLServer(model.EndDate);
                formModel.StartDate = dateForSQLServer(model.StartDate);
                formModel.RegularPaymentDate = dateForSQLServer(model.RegularPaymentDate);
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

    const studentFeesList = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            //attr: {
            //    type: 'module'
            //},
            Id: row.Id,
            name: 'Period Information' + row.Id,
            url: '/js/period-area/period-studentlist-modal.js',
            updatePayment: model.Reload,
            PeriodId: row.Id,
            PeriodName: row.Name,
            RegularPaymentDate: row.RegularPaymentDate

        });
    }

    const totalFeeList = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Fees Information' + row.Id,
            url: '/js/fees-area/fees-totalfee-modal.js',
            PeriodId: row.Id,

        });
    }

    const activeTab = {
        Id: '546877A6-5387-4C1F-A7C5-BA0A300EA42C',
        Name: 'ACTIVE_PERIOD',
        Title: 'Active',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord],
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
            }, {
            click: totalFeeList,
            html: briefcaseBtn("Monthly Information")
            }
        ],
      
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const inactiveTab = {
        Id: 'D3DCCE7A-41AD-433D-A8CF-9E1334DF5428',
        Name: 'INACTIVE_PERIOD',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
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
        items: [activeTab, inactiveTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();