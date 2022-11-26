import { editBtn, eyeBtn, listBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'CoachingAccount';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
        { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: { sibling: 2, } },
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 3, add: { sibling: 2, } },
        { field: 'CourseName', title: 'Course Name', filter: true, position: 3, add: { sibling: 2, } },
        { field: 'Amount', title: 'Amount', filter: true,  position: 4, },
        { field: 'Percentage', title: 'Percentage', filter: true, position: 5, add: { sibling: 2, } },
        { field: 'Total', title: 'Paid', filter: true, position: 6, add: { sibling: 2, } },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 8, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_ACCOUNT',
            model: undefined,
            title: 'Add Account',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
            },

            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    const periodTab = {
        Id: '550AC948-C353-453E-8528-CBB8D9C38245',
        Name: 'PERIOD',
        Title: 'Period',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'Name', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
            { field: 'Amount', title: 'Amount', filter: true, position: 3, },
            
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'ToatalAmount/',
    }

    const modulePaymentHistoryTab = {
        Id: '000D6C5B-247E-4BB8-B458-A111F73670CC',
        Name: 'MODULE_PAYMENT_HISTORY',
        Title: 'Module Payment History',
        filter: [{ "field": "Name", "value": "Module", Operation: 0 }, liveRecord],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
            { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: { sibling: 2, } },
            { field: 'ModuleName', title: 'Module Name', filter: true, position: 3, add: { sibling: 2, } },
            { field: 'Amount', title: 'Amount', filter: true, position: 4, },
            { field: 'Percentage', title: 'Percentage', filter: true, position: 5, add: { sibling: 2, } },
            { field: 'Total', title: 'Paid', filter: true, position: 6, add: { sibling: 2, } },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 8, },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const coursePaymentHistoryTab = {
        Id: '29664C62-0988-4EDB-8DA1-0BA96D716E27',
        Name: 'COURSE_PAYMENT_HISTORY',
        Title: 'Course Payment History',
        filter: [{ "field": "Name", "value": "Course", Operation: 0 }, liveRecord],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
            { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: { sibling: 2, } },
            { field: 'CourseName', title: 'Course Name', filter: true, position: 3, add: { sibling: 2, } },
            { field: 'Amount', title: 'Amount', filter: true, position: 4, },
            { field: 'Percentage', title: 'Percentage', filter: true, position: 5, add: { sibling: 2, } },
            { field: 'Total', title: 'Paid', filter: true, position: 6, add: { sibling: 2, } },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 8, },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [periodTab, modulePaymentHistoryTab, coursePaymentHistoryTab ],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();