

(function () {
    var that = this;
    function onDetails(func, defaultId) {
        return function (opt) {
            opt = opt || { Id: defaultId || 'Id' };
            if (typeof (opt) == 'string') {
                opt = { Id: opt };
            }
            return function (...param) {
                param = param || [];
                func.apply(this, [opt].concat(param));
            };
        };
    };
    function autoComplete(func) {
        return function (opt) {
            Global.AutoComplete.Bind(func(opt));
        };
    };
    function onAddressDetails(opt, data, grid) {
        Global.Add({
            ServiceId: data[opt.Id],
            name: 'ServiceDetails',
            url: '/Content/IqraHMS/ServiceArea/Js/HospitalService/ServiceDetails.js',
        });
    };

    function onAddressDetails(opt, data, grid) {
        Global.Add({
            name: 'CustomerDetails',
            url: '/Content/EBonik/CustomerArea/Content/Customer/OnDetails.js',
            CustomerId: data[opt.Id]
        });
    };
    function onUserDetails(opt, data, grid) {
        Global.Add({
            UserId: data[opt.Id],
            name: 'UserDetails',
            url: '/Areas/EmployeeArea/Content/User/UserDetails.js',
        });
    };
    this.Address = {
        Details: onDetails(onAddressDetails),
        Columns: function () {
            return [
                { field: 'Name', add: {}, position: 1, },
                { field: 'Mobile', add: {}, position: 3 },
                { field: 'Email', add: { type: 'email' }, position: 4 },
                { field: 'Type', add: false },
                { field: 'IsDefault', add: false },
                { field: 'Customer', add: false, filter: { url: '/CustomerArea/Customer/AutoComplete', type: 2, field: 'CustomerId' }, },
                { field: 'Province', add: false },
                { field: 'District', add: false },
                { field: 'Upazila', add: false },
                { field: 'Union', add: false },
                { field: 'Remarks', required: false, add: { type: 'textarea', sibling: 1 } },
                { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', add: false },
                { field: 'Creator', required: false, filter: true, add: false, Click: onDetails(onUserDetails,'CreatedBy') },
                { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', add: false },
                { field: 'Updator', filter: true, add: false, Click: onDetails(onUserDetails, 'UpdatedBy') }

            ];
        },
        Add: function (opt) {
            var formModel = {};
            function onDataBinding(data) {
                var list = [], obj, item;
                data.Data.Data.each(function (i) {
                    this.each(function () {
                        list.push(obj = {});
                        item = this;
                        data.Data.Columns[i].each(function (i) {
                            obj[this + ''] = item[i];
                        });
                        obj.Id = obj.AreaId || obj.Id;
                    });
                });
                data.Data = list;
            };
            function getDRP() {
                function onPost(id) {
                    return function (page) {
                        page.filter = page.filter || [];
                        var list = page.filter.filter((item) => { return item.field != id });
                        Global.Copy(page.filter, list, true);
                        page.filter.length = list.length;
                        page.filter.push({ "field": id, "value": formModel[id] || 0, Operation: 0 });
                    };
                };
                var proviance = {
                    Id: 'ProvinceId',
                    url: '/AddressArea/Province/AutoComplete',
                    Type: 'AutoComplete',
                    position: 11,
                    add: { sibling: 4 },
                    onDataBinding: onDataBinding,
                    onChange: function (data) {
                        console.log(['onChange: function (data)', data, district]);
                        formModel.ProvinceId = data.AreaId;
                        district.Reload();
                    }
                },
                    district = {
                        Id: 'DistrictId',
                        url: '/AddressArea/District/AutoComplete',
                        Type: 'AutoComplete',
                        position: 12,
                        add: { sibling: 4 },
                        onDataBinding: onDataBinding,
                        onpost: onPost('ProvinceId'),
                        onChange: function (data) {
                            formModel.DistrictId = data.AreaId;
                            upozilla.Reload();
                        }
                    },
                    upozilla = {
                        Id: 'UpazilaId',
                        url: '/AddressArea/Upazila/AutoComplete',
                        Type: 'AutoComplete',
                        position: 13,
                        add: { sibling: 4 },
                        onDataBinding: onDataBinding,
                        onpost: onPost('DistrictId'),
                        onChange: function (data) {
                            formModel.UpazilaId = data.AreaId;
                            union.Reload();
                        }
                    },
                    union = {
                        Id: 'UnionId',
                        url: '/AddressArea/Union/AutoComplete',
                        Type: 'AutoComplete',
                        position: 14,
                        add: { sibling: 4 },
                        onDataBinding: onDataBinding,
                        onpost: function (page) {
                            page.filter = page.filter || [];
                            var list = page.filter.filter((item) => { return item.field != 'UpazilaId' && item.field != 'DistrictId' });
                            Global.Copy(page.filter, list, true);
                            page.filter.length = list.length;
                            page.filter.push({ "field": 'DistrictId', "value": formModel.DistrictId || 0, Operation: 0 });
                            page.filter.push({ "field": 'UpazilaId', "value": formModel.UpazilaId || 0, Operation: 0 });
                        },
                    },
                    type = {
                        Id: 'Type',
                        field: 'Type',
                        dataSource: [
                            { text: 'Home', value: 'Home' },
                            { text: 'Office', value: 'Office' },
                            { text: 'Home Town', value: 'Home Town' },
                            { text: 'N/A', value: 'N/A' }
                        ],
                        position: 2
                    };
                return [type, proviance, district, upozilla, union];
            };
            return Global.Copy(opt, {
                name: 'AddressCreate',
                columns: AppComponent.Address.Columns(),
                save: '/AddressArea/Address/Create',
                saveChange: '/AddressArea/Address/Edit',
                dropdownList: getDRP(),
            }, true)
        },
        AddDone: function (opt) {
            Global.Add(AppComponent.Address.Add(opt));
        },
        AutoComplete: function (opt) {
            var fltr = opt.page && opt.page.filter;
            return Global.Copy(opt, {
                Id: opt.Id || 'AddressId',
                Type: 'AutoComplete',
                url: opt.url || '/AddressArea/Address/AutoComplete',
                create: AppComponent.Address.AddDone,
                Grid: {
                    filter: fltr,
                    url: '/AddressArea/Address/Get',
                    Columns: AppComponent.Address.Columns(),
                    onrequest: opt.onGridRequest,
                    Actions: [
                        {
                            click: (data) => {
                                AppComponent.Address.AddDone({
                                    onShow: (a,b,c,d) => {
                                        console.log(['a,b,c,d,data', a, b, c, d, data]);
                                    },
                                    onSaveSuccess: function (response, model, formModel, formInputs) {
                                        opt.val && opt.val(response.Id);
                                    }
                                });
                            },
                            html: '<span class="icon_container" style="margin-right: 5px;"><span class="fa fa-clone"></span></span>'
                        }
                    ]
                }
            }, true);
        }
    };
    this.Address.AutoCompleteDone = autoComplete(this.Address.AutoComplete);

    this.Customer = {
        Details: onDetails(onAddressDetails),
    };

}).call(window.AppComponent = {});
// AppComponent.Address.AddDone('');