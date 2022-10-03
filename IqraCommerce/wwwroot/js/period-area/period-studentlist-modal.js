
var Controller = new function () {

    const studentDateFilter = { "field": "Name", "value": '', Operation: 0 };
    
    var _options;
      
    this.Show = function (options) {
        _options = options;
        studentDateFilter.value = _options.PeriodMonth;
        console.log("options=>", _options);

        const viewDetails = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                Id: row.Id,
                name: 'Fees Information' + row.Id,
                url: '/js/period-area/Period-Student-Payment-Details-modal.js',
                Charge: row.Charge,
                updatePayment: model.Reload,
                PeriodId: _options.Id,
            });
        }
        
        Global.Add({
            title: 'All Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Student',
                    Grid: [{
                        Header: 'Student',
                        columns: [
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1, },
                            { field: 'Name', title: 'Student Name', filter: true, position: 2, add: { sibling: 4 }, },
                            { field: 'Charge', title: 'Module Charge', filter: true, position: 3 },
                        ],

                        Url: '/Period/ForPayment/',
                        filter: [
                            { "field": 'smIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'PriodId', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        rowBound: () => { },
                        
                            actions: [/*{
                                click: studentPayment,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-usd" title="Make Payment"></i></a>'
                            },*/ {
                                click: viewDetails,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-eye-open" title="View Payment Details"></i></a >'
                            }],
                        
                        buttons: [],
                       
                        selector: false,
                        Printable: {
                            container: $('void')
                        }

                    }],
                }],

            name: 'Period Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};