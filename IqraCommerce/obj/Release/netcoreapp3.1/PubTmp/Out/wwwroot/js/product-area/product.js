import { editBtn, imageBtn, menuBtn, fileBtn, plusBtn } from "../buttons.js";
import { url } from '../utils.js';
import params from "../utils/params.js";

(function () {
    const controller = 'Product';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, add: false, bound: imageBound },
        { field: 'DisplayName', title: 'Name', filter: true, position: 1 },
        { field: 'CurrentPrice', title: 'Current Tk', filter: true, position: 3, add: { datatype: 'float', sibling: 5 } },
        { field: 'StockUnit', title: 'Stock', filter: true, position: 10, add: { sibling: 3 }, required: false },
        { field: 'PackSize', title: 'Pack Size', filter: true, position: 9, add: { sibling: 3 }, required: false },
        { field: 'BrandName', title: 'Brand', filter: true, add: false },
        { field: 'UnitName', title: 'Unit', filter: true, add: false },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 1 }, position: 16, required: false },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'edit-product-record',
            title: 'Add Product',
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
                    add: { sibling: 1 },
                    position: 12,
                },
                {
                    Id: 'UnitId',
                    url: `/Unit/AutoComplete`,
                    type: 'AutoComplete',
                    title: 'Sales Unit',
                    position: 8,
                    required: false,
                    add: { sibling: 3 }
                },
                {
                    Id: 'BrandId',
                    url: `/Brand/AutoComplete`,
                    type: 'AutoComplete',
                    title: 'Brand Name',
                    position: 11,
                }
            ],
            additionalField: [
                { field: 'Name', title: 'Code', position: 2 },
                { field: 'OriginalPrice', title: 'Original Tk', position: 3, add: { sibling: 5, datatype: 'float' } },
                { field: 'DiscountedPrice', title: 'Dicounted Tk', position: 4, add: { sibling: 5, datatype: 'float' } },
                { field: 'DiscountedPercentage', title: 'Discounted %', position: 5, add: { sibling: 5, datatype: 'float' } },
                { field: 'TradePrice', title: 'Trade Price', position: 6, add: { sibling: 5, datatype: 'float|null' }, required: false },
                { field: 'Rank', title: 'Rank', position: 11, required: false},
                { field: 'Excerpt', title: 'Excerpt', Type: 'textarea', position: 13, add: { sibling: 1 }, required: false },
                { field: 'SearchQuery', title: 'Search Query', position: 14, add: { sibling: 1 }, required: false },

            ],
            onviewcreated: (windowModel, formInputs, dropDownList, IsNew, formModel) => {
                formInputs['CurrentPrice'].addEventListener('input', currentPriceInputHandler.bind(null, formModel));
                formInputs['OriginalPrice'].addEventListener('input', originalPriceInputHandler.bind(null, formModel));
                formInputs['DiscountedPrice'].addEventListener('input', discountedPriceInputHandler.bind(null, formModel));
                formInputs['DiscountedPercentage'].addEventListener('input', discountedPercentageInputHandler.bind(null, formModel));
            },
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.TradePrice = formModel.TradePrice||0;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function add() {
        popup({ title: 'Create New Product', action: 'add' });
    };

    function edit(model, grid) {
        popup({ data: model, title: 'Edit Product', action: 'edit' }, grid);
    };

    const addToCategory = (row) => {
        Global.Add({
            productId: row.Id,
            name: 'add-product-to-categories',
            url: '/js/product-area/add-product-category.js',
        });
    }

    const viewCategories = (row) => {
        Global.Add({
            productId: row.Id,
            name: 'view-product-categories',
            url: '/js/product-area/view-categories.js',
        });
    }

    const gotoImages = (row, { page }) => {
        window.open(`/Product/Images?name=${row.DisplayName}&id=${row.Id}&page=${page.PageNumber}&items=${page.PageSize}`, "_self");
    }

    function imageBound(td) {
        td.html(`<img src="${url(this.ImageURL)}" style="max-height: 80px; max-width: 100%;" />`);
    }

    const gotoProductEditor = (row, { page }) => {
        window.open(`/Product/Description?name=${row.DisplayName}&id=${row.Id}&page=${page.PageNumber}&items=${page.PageSize}`, "_self");
    }

    const currentPriceInputHandler = (values) => {
        values.DiscountedPrice = values.OriginalPrice - values.CurrentPrice;
        values.DiscountedPercentage = ((1 - values.CurrentPrice / values.OriginalPrice) * 100).toFixed(4);
    }

    const originalPriceInputHandler = (values) => {
        values.DiscountedPrice = values.OriginalPrice - values.CurrentPrice;
        values.DiscountedPercentage = ((1 - values.CurrentPrice / values.OriginalPrice) * 100).toFixed(4);
    }

    const discountedPriceInputHandler = (values) => {
        values.CurrentPrice = values.OriginalPrice - values.DiscountedPrice;
        values.DiscountedPercentage = ((1 - values.CurrentPrice / values.OriginalPrice) * 100).toFixed(4);
    }

    const discountedPercentageInputHandler = (values) => {
        values.DiscountedPrice = (values.OriginalPrice * values.DiscountedPercentage / 100).toFixed(4);
        values.CurrentPrice = values.OriginalPrice - values.DiscountedPrice;
    }

    //Tab config
    const tab = (id, title, status, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            page: isDeleted ?
                {
                    'PageNumber': parseInt(params.page ?? 1, 10),
                    'PageSize': parseInt(params.items ?? 5, 10),
                    filter: [{ "field": "IsDeleted", "value": isDeleted, Operation: 0 }]
                }
                :
                {
                    'PageNumber': parseInt(params.page ?? 1, 10),
                    'PageSize': parseInt(params.items ?? 5, 10),
                    filter:
                        [
                            { "field": "IsVisible", "value": status, Operation: 0 },
                            { "field": "IsDeleted", "value": isDeleted, Operation: 0 }
                        ]
                },
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: viewCategories,
                    html: menuBtn("View Categories")
                },
                {
                    click: addToCategory,
                    html: plusBtn("Add To Category")
                }, {
                    click: edit,
                    html: editBtn()
                }, {
                    click: gotoImages,
                    html: imageBtn()
                }, {
                    click: gotoProductEditor,
                    html: fileBtn("Edit Product Description")
                }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Url: 'Get',
        }
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Visibile', true),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Invisibile', false),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Deleted', '', 1)
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