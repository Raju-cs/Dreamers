var Controller = new function () {
    const batchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);
        batchFilter.value = _options.Id;

        function examDate(td) {
            td.html(new Date(this.Date).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }

        Global.Add({
            title: 'StudentResult Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Result',
                    Grid: [{

                        Header: 'Student Result',
                        columns: [
                            { field: 'Date', title: 'ExamDate', filter: true, position: 1, bound: examDate },
                            { field: 'StudentName', title: 'StudentName', filter: true, position: 2 },
                            { field: 'SubjectName', title: 'SubjectName', filter: true, position: 3 },
                            { field: 'BatchName', title: 'BatchName', filter: true, position: 5, },
                            { field: 'Status', title: 'Status', filter: true, position: 6, },
                            { field: 'Mark', title: 'Marks', filter: true, position: 7, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 8, },
                        ],

                        Url: '/StudentResult/Get/',
                        filter: [batchFilter, liveFilter],
                        onDataBinding: function (response) { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        },
                        periodic: {
                            container: '.filter_container',
                            type: 'ThisMonth',
                        },
                    }],
                },
            ],

            name: 'StudentResult Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};