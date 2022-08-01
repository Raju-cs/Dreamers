
//

var Controller = new function () {
    var service = {}, windowModel, dataSource = [], selected = {}, callerOptions, gridModel, added = {};
    function save(userId,counterId,func) {
        windowModel.Wait();
        //SetCounterAccess(Guid UserId, Guid CounterId)
        Global.CallServer('/EmployeeArea/Employee/SetCounterAccess?UserId=' + userId + "&CounterId=" + counterId, function (response) {
            windowModel.Free();
            if (!response.IsError) {
                callerOptions.model.CounterAccess = response.Data;
                func && func();
            } else {
                Global.Error.Show(response, '/EmployeeArea/Employee/SetCounterAccess');
            }
        }, function (response) {
            windowModel.Free();
            response.Id = -8;
            alert('Errors.');
        }, {}, 'POST');
    };
    function onRemove(model, elm) {
        windowModel.Wait();
        //callerOptions.model.Id, model.Id
        Global.CallServer('/EmployeeArea/Employee/RemoveCounterAccess?UserId=' + callerOptions.model.Id + "&CounterId=" + model.Id, function (response) {
            windowModel.Free();
            if (!response.IsError) {
                callerOptions.model.CounterAccess = response.Data;
                added[model.Id] = none;
                elm.removeClass('already_added').find('.action').html('');
                console.log(['added', added]);
            } else {
                Global.Error.Show(response, '/EmployeeArea/Employee/RemoveCounterAccess');
            }
        }, function (response) {
            windowModel.Free();
            response.Id = -8;
            alert('Errors.');
        }, {}, 'POST');
    };
    function close() {
        //dataSource = [];
        windowModel && windowModel.Hide();
    };
    function show(options) {
        var model;
        added = {};
        windowModel.Show();
        (callerOptions.model.CounterAccess || '').replace(/\'/gi, "").split(",").each(function () {
            var id = "" + this;
            console.log(['callerOptions', id, added, id.length])
            if (id.length > 35) {
                added[id] = id;
            }
        });
        gridModel && gridModel.views.tBody.find('tr').each(function () {
            model = $(this).data('model');
            if (added[model.Id]) {
                model.Selected = true;
                $(this).addClass('already_added');
            } else {
                model.Selected = false;
                $(this).removeClass('already_added');
            }
        });
    };
    this.Show = function (model) {
        selected = {};
        //dataSource = [];
        callerOptions = model;
        if (windowModel) {
            show(callerOptions);
        } else {
            Global.LoadTemplate('/Content/IqraPharmacy/EmployeeArea/Templates/AddCounterAccess.html', function (response) {
                windowModel = Global.Window.Bind(response, { width: '90%' });
                windowModel.View.find('.btn_cancel').click(close);
                Global.Click(windowModel.View.find('.btn_save'), save);
                show(callerOptions);
                service.Grid.Bind();
            }, noop);
        }
    };
    (function () {
        function onSelect(model) {
            if (!added[model.Id] && (!callerOptions.IsValid || callerOptions.IsValid(model))) {
                if (model.Selected) {
                    model.Selected = false;
                    $(this).removeClass('i-state-selected');
                } else {
                    model.Selected = true;
                    $(this).addClass('i-state-selected');
                }
            }
        };
        function rowBound(elm) {
            if (added[this.Id]) {
                elm.addClass('already_added');
                elm.find('.action').html(Global.Click($('<span class="hide_on_mobile icon_container" style="margin-right: 5px;"><span class="glyphicon glyphicon-trash"></span></span>'), onRemove, this,false,elm));
            }
            var model = this;
            elm.dblclick(function () {
                if(!added[model.Id]){
                    save(callerOptions.model.Id, model.Id, function () {
                        added[model.Id] = model.Id;
                        elm.addClass('already_added').find('.action').html(Global.Click($('<span class="hide_on_mobile icon_container" style="margin-right: 5px;"><span class="glyphicon glyphicon-trash"></span></span>'), onRemove, model, false, elm));
                        if (callerOptions.model.CounterAccess) {
                            callerOptions.model.CounterAccess += "'" + model.Id + "'";
                        } else {
                            callerOptions.model.CounterAccess = "'" + model.Id + "'";
                        }
                    });
                } else {
                    onRemove(model, elm);
                }
            });
        };
        function onDataBinding(response) {

        };
        function onDetails(model) {
            Global.Add({
                ItemId: model.Id,
                name: 'ProductDetails',
                url: '/Content/IqraPharmacy/ProductArea/Content/ProductDetails.js',
            });
        };
        function onSuplierDetails(model) {
            Global.Add({
                SuplierId: model.SuplierId,
                name: 'SuplierDetails',
                url: '/Content/IqraPharmacy/SuplierArea/Content/Suplier/SuplierDetails.js',
            });
        };
        this.Bind = function () {
            Global.Grid.Bind({
                elm: windowModel.View.find('#item_selector_grid'),
                columns: [
                    { field: 'Name', filter: true, position: 1, Click: onDetails },
                    { field: 'TypeText', Add: false, sortField: 'Type' },
                    { field: 'Description', filter: true, position: 2, Add: { sibling: 1, type: 'textarea' } },
                    { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', Add: false },
                    { field: 'Creator', required: false, filter: true, Add: false },
                    { field: 'Updator', required: false, filter: true, Add: false },
                    { field: 'Action', sorting: false, className:'action' }
                ],
                url: '/ProductArea/Counter/Get',
                dataBinding: onDataBinding,
                rowBound: rowBound,
                page: { 'PageNumber': 1, 'PageSize': 10 },
                pagger: { showingInfo: '{0}-{1} of {2} Items' },
                oncomplete: function (model) {
                    gridModel = model;
                },
                Printable: false
            });
        };
    }).call(service.Grid = {});
};