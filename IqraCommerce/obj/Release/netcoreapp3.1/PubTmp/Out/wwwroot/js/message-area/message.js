import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'Message';

   

    const columns = () => [
        { field: 'StudentName', title: 'Student', filter: true, position: 1, add: { sibling: 1 } },
        { field: 'ModuleName', title: 'Module', filter: true, position: 2, add: { sibling: 1 } },
        { field: 'BatchName', title: 'Batch', filter: true, position: 3, add: { sibling: 1 } },
        { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 5, add: {sibling: 1} },
        { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 6, add: {sibling: 1} },
        { field: 'Content', title: 'Content', filter: true, position: 7, add: { sibling: 1, type: "textarea" }  },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 8, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];


    const messageTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'MESSAGE',
        Title: 'Message',
        filter: [liveRecord],
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
        items: [messageTab],
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();