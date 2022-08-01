
var Controller = new function () {
    var callarOptions, service = {},
        filter = { "field": "UserId", "value": "", Operation: 0 },
        buttons = [{
            click: onAddIncrement,
            html: '<a class="btn btn-white btn-default btn-round pull-right" style="margin: 0px 0px 0px 10px;"><span class="glyphicon glyphicon-plus"></span>Change Salary</a>'
        }];

    function loadUser(callBack) {
        Global.CallServer('/Employee/Details?Id=' + callarOptions.UserId, function (response) {
            if (!response.IsError) {
                callBack(response.Data);
            } else {
                alert('Errors.');
            }
        }, function (response) {
            response.Id = -8;
            alert('Errors.');
        }, null, 'Get');
    };
    function onDeviceDetails(model) {
        Global.Add({
            DeviceId: model.DeviceId,
            name: 'DeviceDetails',
            url: '/Areas/SecurityArea/Content/Device/OnDeviceDetails.js',
        });
    };
    function onSessionDetails(model) {
        Global.Add({
            name: 'SessionDetailsDetails',
            url: '/Areas/SecurityArea/Content/LogedInSession/SessionDetails.js',
            SessionId: model.Id
        });
    };
    function setDeviceAccessDenied(data) {
        Global.Controller.Call({
            url: IqraConfig.Url.Js.WarningController,
            functionName: 'Show',
            options: {
                name: 'OnDenyDeviceAccess',
                msg: 'Do you want to Deny this Device Access?',
                save: '/SecurityArea/LogedInSession/DeActivate',
                data: { Id: data.Id },
                onsavesuccess: function () {
                    gridModel.Reload();
                }
            }
        });
    };
    function setDeviceAccess(model) {
        Global.Controller.Call({
            url: IqraConfig.Url.Js.WarningController,
            functionName: 'Show',
            options: {
                name: 'OnAccess',
                msg: 'Do you want to set Access?',
                save: '/SecurityArea/LogedInSession/Activate',
                data: { Id: model.Id },
                onsavesuccess: function () {
                    gridModel.Reload();
                }
            }
        });
    };

    function onDesignationDetails(model) {
        Global.Add({
            model: model,
            onSaveSuccess: function (response) {

            },
            url: '/Content/IqraPharmacy/SalaryArea/Content/SalaryRepayment/OnDetails.js',
        });
    };
    function onAddPaid(model) {
        model = Global.Copy({}, model, true);
        model.TotalAmount = model.NetPayable;
        model.PayableAmount = model.NetPayable - model.PaidAmount;
        model.PaidAmount = model.PayableAmount;
        model.Remarks = '';
        Global.Add({
            name: 'Add Paid',
            model: model,
            columns: [
                { field: 'PayableAmount', add: { datatype: 'float' } },
                { field: 'PaidAmount', add: { datatype: 'float' } },
                { field: 'Remarks', add: { type: 'textarea', sibling: 1 }, required: false }
            ],
            onSubmit: function (formModel, data) {
                formModel.PayableAmount = parseFloat(formModel.PayableAmount || '0');
                formModel.PaidAmount = parseFloat(formModel.PaidAmount || '0');
                formModel.Year = data.Year;
                formModel.Year = data.Year;
                formModel.Month = data.Month;
                formModel.TotalAmount = data.TotalAmount;
                formModel.SalaryPaymentId = data.Id;
                formModel.EmployeeId = data.EmployeeId;
                formModel.Id = none;
                return formModel.PaidAmount <= formModel.PayableAmount;
            },
            saveChange: '/SalaryArea/SalaryRepayment/Create',
        });
    };
    function onAddIncrement(options) {
        Global.Add({
            loadUser: loadUser,
            UserId: callarOptions.UserId,
            url: '/Content/IqraPharmacy/SalaryArea/Content/Increment/AddIncrement.js',
            onSaveSuccess: function (model) {
                options.Grid.Model.Reload.Reload();
            }
        });
    };

    this.Show = function (model) {
        callarOptions = model;
        filter.value = model.UserId;
        Global.Add({
            title: 'Product Details',
            selected: typeof (callarOptions.selected) == typeof (none) ? 1 : callarOptions.selected,
            Tabs: [
                {
                    title: 'Basic Info',
                    Columns: [
                        { field: 'Name', filter: { Operation: 5 }, Operation: 5, position: 1 },
                        { field: 'UserName', filter: { Operation: 5 }, Operation: 5, Add: false, selected: false, },
                        { field: 'Designation', filter: true, Add: false },
                        { field: 'DesignationSalary', Add: false },
                        { field: 'OwnSalary', Add: false },
                        { field: 'Phone', filter: true, position: 3 },
                        { field: 'Email', filter: true, position: 4 },
                        { field: 'AttendanceId', add: false },
                        { field: 'IsDeleted', add: false, selected: false }
                    ],
                    DetailsUrl: function () {
                        return '/Employee/Details?Id=' + callarOptions.UserId;
                    }
                },
                {
                    title: 'Sales Info',
                    Grid: [function (windowModel, container, position, model, func) {
                        var isCalled = 0;
                        model.Reload = function () { isCalled++; };
                        Global.Add({
                            container: container,
                            model: model,
                            func: function () {
                                isCalled && model.Reload();
                            },
                            filter: [filter],
                            tabs: [0, 1, 2, 3, 5],
                            name: 'ProductDetailsSalesTab',
                            url: '/Content/IqraPharmacy/ItemSalesArea/Content/List.js?v=ProductDetails'
                        });
                    }],
                },
                {
                    title: 'Salary Info',
                    Grid: [{
                        Header: 'Salary Info',
                        filter: [filter],
                        Columns: [
                            { field: 'Designation', filter: true, click: onDesignationDetails },
                            { field: 'Basic' },
                            { field: 'LateEntry', title: 'Late Entry' },
                            { field: 'Absent' },
                            { field: 'ScheduledBonus', title: 'Bonus', className: 'bonus' },
                            { field: 'OverTime' },
                            { field: 'Deduction' },
                            { field: 'Advance' },
                            { field: 'Loan' },
                            { field: 'NetPayable', title: 'Payable', className: 'payable' },
                            { field: 'Creator', className: 'creator' },
                        ],
                        Url: '/SalaryArea/SalaryPayment/GetByUser',
                        rowbound: function (elm) {
                            if (this.IsDeleted) {
                                elm.css({ color: 'red' }).find('.glyphicon-trash').css({ opacity: 0.3, cursor: 'default' });
                                elm.find('a').css({ color: 'red' });
                            }
                            elm.find('.bonus').append('</br><small><small>' + this.Bonus.toMoney() + '</small></small>');
                            elm.find('.payable').append('</br><small><small>' + this.PaidAmount.toMoney() + '</small></small>');
                            this.Creator && elm.find('.creator').append('</br><small><small>' + this.CreatedAt.getDate().format('dd/MM/yyyy hh:mm') + '</small></small>');
                        },
                        actions: [{
                            click: onAddPaid,
                            html: '<span class="hide_on_mobile icon_container" style="margin-right: 5px;"><span class="glyphicon glyphicon-open"></span></span>'
                        }]
                    }],
                },
                {
                    title: 'Increment Info',
                    Grid: [{
                        Header: 'Increment Info',
                        filter: [filter],
                        Columns: [
                            { field: 'PreviousSalary', add: false },
                            { field: 'CurrentSalary', title: 'IncrementedSalary', Add: { dataType: 'int' } },
                            { field: 'EffectiveFrom', title: 'ActivatedFrom', dateFormat: 'dd/MM/yyyy' },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', add: false },
                            { field: 'Remarks', filter: true, add: { sibling: 1, type: 'textarea' } }
                        ],
                        Url: '/Increment/GetByUser',
                        periodic: {
                            container: '.filter_container',
                        },
                        buttons: buttons
                    }],
                },
                {
                    title: 'Attendance Info',
                    Grid: [function (windowModel, container, position, model, func) {
                        //console.log(['windowModel, container, position, model, func',windowModel, container, position, model, func])
                        model.Reload = function () {
                            Global.Add({
                                model: { Date: new Date(), EmployeeId: callarOptions.UserId },
                                modules: ['Attendance', 'EmployeeShift', 'Weekend', 'LeaveItem', 'LateEntry', 'OverTime'],
                                url: '/Content/IqraPharmacy/EmployeeArea/Content/Calendar.js',
                                Container: container
                            });
                        }
                    }],
                },
                {
                    title: 'LogedIn Info',
                    Grid: [{
                        Header: 'LogedIn Info',
                        filter: [filter],
                        Details: onSessionDetails,
                        Columns: [
                            { field: 'UserName', title: 'User Name',  },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm' },
                            { field: 'LastAccessAt', dateFormat: 'dd/MM/yyyy hh:mm' },
                            { field: 'AccessCount', title: 'Access Count' },
                            { field: 'IsActive' },
                            { field: 'Remarks', title: 'Device Note', Click: onDeviceDetails },
                            { field: 'DisplayName', title: 'Device Name', Click: onDeviceDetails },
                            { field: 'AppName', title:'App Name' },
                            { field: 'Platform', title:'Platform' }
                        ],
                        periodic: {
                            format: 'yyyy/MM/dd HH:mm'
                        },
                        Url: '/SecurityArea/LogedInSession/Get',
                        Actions: [{
                            click: setDeviceAccess,
                            html: '<a style="margin-right:8px;" class="icon_container" title="Set Access"><span class="glyphicon glyphicon-ok"></span></a>'
                        }, {
                            click: setDeviceAccessDenied,
                            html: '<a style="margin-right:8px;" class="icon_container" title="Set Access Denied"><span class="glyphicon glyphicon-remove"></span></a>'
                        }],
                    }],
                }
            ],
            name: 'OnProductDetails',
            url: '/Content/IqraService/Js/OnDetailsWithTab.js?v=ProductDetails',
        });
    };
};