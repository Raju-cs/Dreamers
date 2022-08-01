import { editBtn, imageBtn } from "../buttons.js";
import { url } from '../utils.js';
import { filter, liveRecord, operationType, trashRecord } from '../filters.js';
import { promotionType } from '../dictionaries.js';

(function () {
    const controller = 'Promotion';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, add: false, bound: imageBound },
        { field: 'PromotionType', title: 'Promotion Type', filter: true, add: false, bound: promotionTypeBound },
        { field: 'Rank', title: 'Rank', filter: true, position: 2 },
        { field: 'IsVisible', title: 'Published', filter: true, add: false, bound: invisibleRowBound },
        { field: 'Headline', title: 'Title', Width: '200px', add: { sibling: 1 }, position: 3, },
        { field: 'Content', title: 'Content', Width: '500px', add: { sibling: 1 }, position: 4, },
        { field: 'StartingAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Starting', position: 5 },
        { field: 'EndingAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Ending', position: 6 },
        { field: 'Remarks', title: 'Remarks', position: 8 },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'edit-offer-record' + Math.random(),
            model: options.data,
            title: options.title,
            columns: columns(),
            dropdownList: [
                {
                    title: 'Show in client',
                    Id: 'IsVisible',
                    dataSource: [
                        { text: 'Yes', value: true },
                        { text: 'No', value: false },
                    ],
                    add: { sibling: 2 },
                    position: 7,
                },
                {
                    title: 'Promotion Type',
                    Id: 'PromotionType',
                    dataSource: [
                        { text: 'Cashback', value: 0 },
                        { text: 'Delivery Discount', value: 1 },
                    ],
                    add: { sibling: 2 },
                    position: 1,
                }
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

    function add() {
        popup({ title: 'New Promotion', action: 'add' });
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Promotion', action: 'edit' });
    };

    const uploadImage = (row) => {
        Global.Add({
            name: 'add-product-image',
            url: '/js/utils/file-uploader.js',
            save: `/${controller}/UploadImage`,
            model: row,
            ItemId: row.Id,
            onAdd: function () {
                tabs.gridModel?.Reload();
            },
            onDelete: function () {

            }
        });
    }

    function imageBound(td) {
        td.html(`<img src="${url(this.ImageURL)}" style="max-height: 120px; max-width: 100%;" />`);
    }

    function promotionTypeBound(td) {
        switch (this.PromotionType) {
            case promotionType.cashback:
                td.html(`Cashback`);
                break;
            case promotionType.coupon:
                td.html(`Coupon`);
                break;
            case promotionType.delivery:
                td.html(`Delivery Discount`);
                break;
            default:
                td.html(`Unknown`);
                break;
        }
    }

    function invisibleRowBound(td) {
        td.html(this.IsVisible ? 'Yes' : 'No');
    }

    //Tab config
    const tab = (id, title, filters, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: filters,
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: edit,
                    html: editBtn()
                }, {
                    click: uploadImage,
                    html: imageBtn("Add Picture")
                }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    const ongoingFilters = [
        liveRecord,
        filter('StartingAt', `'${new Date().format('MM-dd-yyyy')}'`, operationType.lessOrEqual),
        filter('EndingAt', `'${new Date().format('MM-dd-yyyy')}'`, operationType.greaterOrEqual)
    ];

    const upcommingFilters = [
        liveRecord,
        filter('StartingAt', `'${new Date().format('MM-dd-yyyy')}'`, operationType.greaterOrEqual),
    ]

    const pastFilters = [
        liveRecord,
        filter('EndingAt', `'${new Date().format('MM-dd-yyyy')}'`, operationType.lessOrEqual),
    ]

    const deletedFilters = [
        trashRecord
    ]

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Ongoing', ongoingFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Upcomming', upcommingFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB75', 'Past', pastFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Deleted', deletedFilters, 1)
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