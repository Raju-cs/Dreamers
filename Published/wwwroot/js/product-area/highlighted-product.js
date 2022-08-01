import { crossBtn, editBtn, imageBtn, menuBtn, plusBtn } from "../buttons.js";
import { filter, liveRecord, trashRecord } from "../filters.js";
import { imageBound, url } from '../utils.js';

(function () {
    const controller = 'Product';

    $(document).ready(() => {
        $('#add-record').click(addProduct);
    });

    const columns = () => [
        { field: 'HighlightedImageURL', title: 'Cover Image', filter: false, add: false, bound: imageBound },
        { field: 'ImageURL', title: 'Image', filter: false, add: false, bound: imageBound.bind('HighlightedImageURL') },
        { field: 'Name', title: 'Name', filter: true, position: 1 },
        { field: 'CurrentPrice', title: 'Current Price', filter: true, position: 3 },
        { field: 'StockUnit', title: 'Stock', filter: true, position: 7 },
        { field: 'PackSize', title: 'Pack Size', filter: true, position: 9 },
        { field: 'UnitName', title: 'Unit', filter: true, add: false },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 1 }, position: 16, },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    const uploadImage = (row) => {
        Global.Add({
            name: 'add-highlighted-image',
            url: '/js/utils/file-uploader.js',
            save: `/${controller}/UploadHighlightedImage`,
            model: row,
            ItemId: row.Id,
            onAdd: function () {
                tabs.gridModel?.Reload();
            },
            onDelete: function () {

            }
        });
    }

    
    const unmarkAsHighlighted = (row) => {
        const formData = new FormData();
        formData.append('productId', row.Id);

       fetch('/Product/UnmarkAsHighlighted', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {

           if(data.IsError)
            throw new Error(data.Msg)

            tabs.gridModel?.Reload();

            // Toaster will be perfact here
            alert("Successfully product remove from the category");

       }).catch((err) => {
            alert(err);
       });
    }


    const addProduct = (row) => {
        Global.Add({
            name: 'add-product-to-categories' + row.Id,
            url: '/js/product-area/mark-as-highlighted-product-modal.js',
            onAddProduct: () => {
                tabs.gridModel?.Reload();
            }
        });
    }

    //Tab config
    const tab = (id, title, status) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: [filter("IsVisible", status), liveRecord, filter("IsHighlighted", 1)],
            remove: false,
            actions: [{
                    click: uploadImage,
                    html: imageBtn()
                },{
                    click: unmarkAsHighlighted,
                    html: crossBtn('Unmark Highlighted Product')
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
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Invisibile', false)
        ],
        periodic: false
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();