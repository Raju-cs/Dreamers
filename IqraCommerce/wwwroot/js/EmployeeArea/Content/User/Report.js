(function () {
    var that = this, gridModel, formModel = {}, service = {};
    function onCreatorDetails(model) {
        Global.Add({
            UserId: model.Id,
            name: 'UserDetails',
            url: '/Content/IqraPharmacy/EmployeeArea/Content/User/UserDetails.js',
        });
    };
    function setSummary(model) {
        model.TradeMargin = model.SalePrice - model.TradePrice;
        formModel.Items = (model.Items || 0).toMoney();
        model.TotalCash = (model.SalePrice - model.ReturnAmount).toMoney();
    };
    function onDataBinding(data,a,b,c) {
        setSummary(data.Data.Total);
        data.Data.Data.each(function () {
            this.TotalCash = this.SalePrice - this.ReturnAmount - this.Due;
            this.TradeMargin = this.SalePrice - this.TradePrice;
            //this.SalePrice = this.SalePrice + this.Discount;
        });
    };
    (function () {
        Global.Grid.Bind({
            elm: $('#grid'),
            columns: [
                { field: 'Name', title: 'Employee', click: onCreatorDetails },
                { field: 'SalePrice', title: 'Sale', type: 2 },
                { field: 'Discount', title: 'Discount', type: 2 },
                { field: 'TradePrice', title: 'TP Price', type: 2 },
                { field: 'ReturnAmount', title: 'Return', type: 2 },
                { field: 'TotalCash', title: 'Cash', sorting: false, type: 2 },
                { field: 'TradeMargin', title: 'Trade Margin', sorting: false, type: 2 },
            ],
            url: '/EmployeeArea/Employee/GetReportData',
            page: { 'PageNumber': 1, 'PageSize': 50, showingInfo: ' {0}-{1} of {2} Employees ' },
            dataBinding: onDataBinding,
            onComplete: function (model) {
                gridModel = model;
            },
            periodic: {
                container: '#filter_container',
                formModel: formModel,
                selected: 'Today',
                onComplete: function (container) {
                    var elm = $('<div class="col-md-2 col-sm-4 col-xs-6" style="font-size:1.5em;text-align:center;">' +
                        '<div><label>Voucher No.</label></div>' +
                        '<div><span class="auto_bind" data-binding="Items"></span></div>' +
                        '</div>');
                    container.append(elm);
                    Global.Form.Bind(formModel, elm);
                },
            },
            Summary: {
                formModel: formModel,
                Container: '#sale_summary_container',
                Items: [
                    { field: 'SalePrice', title: 'Sale', type: 2 },
                    { field: 'Discount', title: 'Discount', type: 2 },
                    { field: 'TradePrice', title: 'TP Price', type: 2 },
                    { field: 'ReturnAmount', title: 'Return', type: 2 },
                    { field: 'TotalCash', title: 'Cash' },
                    { field: 'TradeMargin', title: 'Trade Margin', sorting: false, type: 2 },
                ]
            },
            Printable: {
                //reporttitle: function (model) {
                //    console.log(model);
                //}
            }
        });
    }).call(service.Grid = {});
})();

