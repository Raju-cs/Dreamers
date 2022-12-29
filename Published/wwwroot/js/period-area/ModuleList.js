
const ModuleList = {};

(function () {

    var service = {}, model = {}, formModel = {};
    function getView() {
        return $(`<div><div class="row summary_container">
                                        </div>
                                        <div class ="row filter_container" style="margin-top:10px;">
                                        </div>
                                        <div style="margin-top:10px;">
                                            <div class ="empty_style button_container row">

                                            </div>
                                            <div class="grid_container">
                                            </div>
                                        </div></div>`);
    };


    function getVoucherWiseColumns() {
        return [
            { field: 'Type', title: 'ChangedType', filter: getTypeFileter() },
            { field: 'StockChanged', title: 'Qnt Changed' },
            { field: 'StockAfterChanged', title: 'Stock After Changed' },
            { field: 'TotalTradePrice', title: 'Stock TP', type: 2 },
            { field: 'TotalSalePrice', title: 'Stock MRP', type: 2 },
            { field: 'CreatedAt', title: 'ChangedAt', dateFormat: 'dd/MM/yyyy hh:mm' },
            { field: 'Creator', filter: true, Click: onCreatorDetails }
        ];
    };
    function getDailyColumns() {
        return [
            { field: 'CreatedAt', title: 'Date' },
            { field: 'StockChanged', title: 'Qnt Changed' },
            { field: 'TotalTradePrice', title: 'Stock TP', type: 2 },
            { field: 'TotalSalePrice', title: 'Stock MRP', type: 2 },
            { field: 'TotalTPDiscount', title: 'TP Discount', type: 2 },
            { field: 'TotalTransaction', title: 'Total Transaction', type: 2 },
        ]
    };
    function getTypeColumns(name, title) {
        return [{ field: 'Type', title: 'Changed-Type', filter: getTypeFileter() }].concat(getDailyColumns().slice(1));
    };
    function getCounterColumns(name, title) {
        return [{ field: 'Counter', title: 'Counter', filter: getTypeFileter() }].concat(getDailyColumns().slice(1));
    };
    function onDataBinding(response) {
        response.Data.Data.each(function () {
            this.Type = txtType[this.Type] || this.Type || '';
        });
    };



    function studentInfo(row) {
        console.log("row=>", row);
        Global.Add({
            Id: row.StudentId,
            url: '/js/student-area/student-details-modal.js',
        });
    }

    function dueBound(td) {
        td.html(this.Charge - this.Paid);
    }

    function extendpaymentDate(td) {
        if (this.ExtendPaymentdate === "1900-01-01T00:00:00") td.html('N/A');
        else {
            td.html(new Date(this.ExtendPaymentdate).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }

    }

    function moduleBound(row) {
        var currentDate = new Date();
        if (_options.RegularPaymentDate <= currentDate.toISOString() && _options.RegularPaymentDate >= this.ExtendPaymentdate) {
            row.css({ background: "#ffa50054" });
        }

        if (this.ExtendPaymentdate <= currentDate.toISOString() && _options.RegularPaymentDate <= this.ExtendPaymentdate) {
            row.css({ background: "#d97f74" });
        }


        if (this.Paid >= this.Charge) {
            row.css({ background: "#00800040" });
        }
    }


    function getDaily(id, name, filter) {
        return {
            Name: name,
            title: name,
            Url: '',
            Id: id,
            columns: [
                { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1 },
                { field: 'StudentName', title: 'Student Name', filter: true, position: 2, Click: studentInfo },
                { field: 'Charge', title: 'Fees', filter: true, position: 3 },
                { field: 'Paid', title: 'Paid', filter: true, position: 4 },
                { field: 'Due', title: 'Due', filter: true, position: 5, },
                { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
            ],
            //page: { 'PageNumber': 1, 'PageSize': 10, showingInfo: ' {0}-{1} of {2} Transactions' },
            bound: moduleBound,
            binding: (response) => {
                //response.Data.Total.Balance = response.Data.Total.CashId - response.Data.Total.CashOut;
            },
            Printable: { container: $('.button_container') },
        }
    };
    function getItems(options) {
        var items = [
            getDaily('537D006E-5880-4490-A679-D1EF33932DA9', 'Paid', { "field": "Paid", "value": '0', Operation: 1 }),
            getDaily('4D22A640-28E5-4483-8CD4-D755D331DB6C', 'Due', { "field": "Due", "value": '0', Operation: 1 })
        ]
        return items;
    };
    function bind(container, options) {
        model = {
            gridContainer: '.grid_container',
            container: container,
            Base: {
                Url: '/Period/ForModulePayment/',
            },
            filter: options.filter.slice(),
            items: getItems(options),
            periodic: {
                format: 'yyyy-MM-dd HH:mm',
                container: '.filter_container',
                formModel: formModel,
                type: 'ThisMonth'
            },
            Summary: {
                Container: '.summary_container',
                Items:[]
            }
        };
        Global.Tabs(model);
        model.items[1].set(model.items[1]);
    };
    function setDefaultOpt(opt) {
        opt = opt || {};
        setNonCapitalisation(opt);
        callarOptions = opt;
        opt.model = opt.model || {};
        opt.filter = opt.filter || [];

        if (opt.container) {
            opt.container.append(getView());
        } else {
            opt.container = $('#page_container');
        }
        return opt;
    };
    ModuleList.Bind = function (options) {
        options = setDefaultOpt(options);
        options.model.Reload = function () {
            model.items[1].set && model.items[1].set(model.items[1]);
        };
        bind(options.container, options);
    }

    
}).call(ModuleList);

export { ModuleList };