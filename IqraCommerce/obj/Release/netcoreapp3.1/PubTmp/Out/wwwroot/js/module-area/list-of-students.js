var Controller = new function () {
    let _options;
    var service = {};
    const filter = { "field": "CategoryId", "value": "", Operation: 0 };

    // Depretiacated
    function setIcon(iconContainer, viewContainer, data) {
        var container = iconContainer;
        iconContainer.append(iconContainer = $('<div class="prescription_icon">'));
        iconContainer.append(data.IcomElm = Global.Click($('<img src="' + data.IconPath + '" />'), function () {
            viewContainer.html('<img src="' + data.FilePath + '" />');
            container.find('.selected').removeClass('selected');
            iconContainer.addClass('selected');
        }));
        return iconContainer;
    }

    // Depretiacated
    function setImgView(container, data) {
        var iconContainer, viewContainer;
        container.append(iconContainer = $('<div class="icon_container row empty_style">'));
        container.append(viewContainer = $('<div class="view_container">'));
        data.each(function () {
            setIcon(iconContainer, viewContainer, this);
        });
        if (data[0]) {
            data[0].IcomElm.addClass('selected');
            viewContainer.html('<img src="' + data[0].FilePath + '" />');
        }
    };

    (function () {
        var map, marker; // Depretiacated
        // Depretiacated
        this.Show = function (tab, data) {
            if (!map) {
                tab.ColumnView.empty().css({ height: '400px' });
                map = new google.maps.Map(tab.ColumnView[0], {
                    zoom: 17,
                    center: { lat: data.Lat, lng: data.Lng },
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    draggableCursor: 'default'
                });
                marker = new google.maps.Marker({
                    map,
                    anchorPoint: new google.maps.Point(0, -29),
                });
            } else {
                //map.setCenter({ lat: data.Lat, lng: data.Lng });
                map.setOptions({
                    zoom: 17,
                    center: { lat: data.Lat, lng: data.Lng }
                });
            }
            marker.setPosition({ lat: data.Lat, lng: data.Lng });
            marker.setVisible(true);
            console.log(['map', map]);
        };
    }).call(service.Map = {});

    // Need to be fixed
    function edit(model) {
        Global.Add({
            name: 'edit-banner-record',
            model: model,
            title: 'Edit Product Rank',
            Columns: [
                { field: 'Rank', add: { datatype: 'float', sibling: 1 }, required: true },
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                console.log({ data, model });
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.CategoryId = data.CategoryId;
                formModel.ProductId = data.ProductId;
                formModel.SubCategoryId = data.SubCategoryId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/ProductArea/CategoryProductPrivot/Create`,
            saveChange: `/ProductArea/CategoryProductPrivot/Edit`,
        });
    };

    function removeStudent(row, grid) {
        Global.Controller.Call({
            url: IqraConfig.Url.Js.WarningController,
            functionName: 'Show',
            options: {
                name: 'REMOVE_STUDENT',
                title: 'Remove Student',
                save: `URL to remove the student`,
                msg: `Do you want to remove ${row.Name} from this Batch?`,
                data: { Id: data.Id },
                onsavesuccess: function () {
                    grid.Reload();
                }
            }
        });
    }

    function admitNewStudent() {
        Global.Add({
            CategoryId: _options.moduleScheduleId,
            name: 'STUDENT_SELECTOR',
            url: '/js/module-area/student-selector.js',
        });
    }

    this.Show = function (model) {
        _options = model;
        
        Global.Add({
            title: 'Admitted Students',
            selected: 0,
            Tabs: [
                {
                    title: 'Admitted Students',
                    Grid: [{
                        Header: 'Admitted Students',
                        Columns: [
                            { field: 'Name', title: 'Student Name'},
                        ],
                        Url: '/Student/Get',
                        Printable: { container: 'void' },
                        filter: [],
                        onDataBinding: () => { },
                        actions: [
                            {
                                click: edit,
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-edit" title="${"Edit"}"></i></a>`
                            },
                            {
                                click: removeStudent,
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-trash" title="${"Edit"}"></i></a>`
                            }
                        ],
                        buttons: [
                            {
                                click: admitNewStudent,
                                html: '<a class= "icon_container btn_add_product pull-right"><span class="glyphicon glyphicon-plus" title="Add Products"></span> Add Products</a>'
                            }
                        ]
                    }],
                }
            ],
            name: 'LIST_OF_STUDENT',
            url: '/Content/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    };
};