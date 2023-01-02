


var Controller = new function () {

    const studentDateFilter = { "field": "Name", "value": '', Operation: 0 }, ModuleList = {};
    const periodFilter = { "field": "PriodId", "value": '', Operation: 0 }, CourseList = {};
    var _options;


    const dateForSQLServer = (enDate = '01/01/1970') => {
        const dateParts = enDate.split('/');
        console.log("dateparts=>", dateParts);
        //return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    }
    function moduleStudentPayment(page, grid) {

        console.log("fee=>", page);
        Global.Add({
            name: 'MODULE_STUDENT_PAYMENT',
            model: undefined,
            title: 'Module Payment',
            columns: [
                { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 3, add: false, },
                { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 4, add: false },
                { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 5, add: false },
                { field: 'ModuleFee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 6, },
                { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 7, add: false },
                { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 8, add: false },
                { field: 'IsActive', title: 'IsActive', filter: true, add: { sibling: 2, }, position: 8, add: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 9, },
            ],
            dropdownList: [],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.StudentId = page.StudentId;
                formModel.PeriodId = _options.PeriodId;
                formModel.ModuleId = page.ModuleId;
                formModel.IsActive = true;
                formModel.ModuleFee = page.Charge;
                formModel.TotalFee = model.ModuleFee;
                formModel.Fee = model.ModuleFee
                formModel.PaidFee = (parseFloat(page.Charge) - parseFloat(formModel.Fee));
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                // formModel.ModuleFee = page.Paid;
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/Fees/PayFees`,
        });
    }

    function courseStudentPayment(page, grid) {

        console.log("fee=>", page);
        Global.Add({
            name: 'COURSE_STUDENT_PAYMENT',
            model: undefined,
            title: 'Course Payment',
            columns: [
                { field: 'Paid', title: 'Fee', filter: true, add: { sibling: 2, }, position: 7, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 10, },
            ],
            dropdownList: [],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.StudentId = page.StudentId;
                formModel.PeriodId = _options.PeriodId;
                formModel.IsActive = true;
                formModel.Charge = page.Charge;
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                // formModel.ModuleFee = page.Paid;
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/CoursePayment/PayCourseFees`,
        });
    }


    function moduleExtendPaymentDate(page, grid) {

        console.log("fee=>", page);
        Global.Add({
            name: 'MODULE_EXTEND_PAYMENT_DATE',
            model: undefined,
            title: 'Module Extend Payment Date',
            columns: [
                { field: 'ExtendPaymentdate', title: 'ExtendPaymentDate', add: { sibling: 2 }, position: 1, dateFormat: 'dd/MM/yyyy', required: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 10, },
            ],
            dropdownList: [],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.StudentId = page.StudentId;
                formModel.PeriodId = _options.PeriodId;
                formModel.ExtendPaymentdate = dateForSQLServer(model.ExtendPaymentdate);
                formModel.IsActive = true;
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                // formModel.ModuleFee = page.Paid;
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/ExtendPaymentDate/ExtendPaymentDate`,
        });
    }


    function courseExtendPaymentDate(page, grid) {

        console.log("fee=>", page);
        Global.Add({
            name: 'COURSE_EXTEND_PAYMENT_DATE',
            model: undefined,
            title: 'Course Extend Payment Date',
            columns: [
                { field: 'ExtendPaymentdate', title: 'ExtendPaymentDate', add: { sibling: 2 }, position: 1, dateFormat: 'dd/MM/yyyy', required: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 10, },
            ],
            dropdownList: [],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.StudentId = page.StudentId;
                formModel.PeriodId = _options.PeriodId;
                formModel.ExtendPaymentdate = dateForSQLServer(model.ExtendPaymentdate);
                formModel.IsActive = true;
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                // formModel.ModuleFee = page.Paid;
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/ExtendPaymentDate/ExtendPaymentDate`,
        });
    }

    const viewDetails = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            Id: row.Id,
            name: 'Fees Information' + row.Id,
            url: '/js/period-area/Period-Student-Payment-Details-modal.js',
            updatePayment: model.Reload,
            PeriodId: _options.Id,
            ModuleCharge: row.Charge,
            Paid: row.Paid,
            StudentId: row.StudentId
        });
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

    function courseBound(row) {
        var currentDate = new Date();
        if (_options.RegularPaymentDate <= currentDate.toISOString()) {
            row.css({ background: "#ffa50054" });
        }

        if (this.ExtendPaymentdate <= currentDate.toISOString() && _options.RegularPaymentDate <= this.ExtendPaymentdate) {
            row.css({ background: "#d97f74" });
        }


        if (this.Paid >= this.Charge) {
            row.css({ background: "#00800040" });
        }
    }

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


    function allStudentMessage(page, grid) {
        console.log("fee=>", page);
        Global.Add({
            name: 'ALL_DUE_STUDENT_MESSAGE',
            model: undefined,
            title: 'Message',
            columns: [
                { field: 'Name', title: 'PhoneNumber', filter: true, position: 1, add: { sibling: 2 }, add: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 2, },
            ],
            dropdownList: [{
                title: 'PhoneNumber',
                Id: 'Name',
                dataSource: [
                    { text: 'Student PhoneNumber', value: 'StudentNumber' },
                    { text: 'Guardians PhoneNumber', value: 'GuardiansPhoneNumber' },
                ],
                add: { sibling: 2 },
                position: 1,

            }],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.PeriodId = _options.PeriodId;
                formModel.Name = model.Name;
            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                console.log("model=>", model);
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/Message/PayStudentMessage`,
        });
    }

    function SinglestudentMessage(page, grid) {
        console.log("fee=>", page);
        Global.Add({
            name: 'PAYMENT_MESSAGE',
            model: undefined,
            title: 'Message',
            columns: [
                { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 1, add: false },
                { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 1, add: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 2, },
                { field: 'Content', title: 'Content', filter: true, add: { sibling: 1, type: "textarea" }, position: 2, },
            ],
            dropdownList: [{
                title: 'PhoneNumber',
                Id: 'PhoneNumber',
                dataSource: [
                    { text: 'Student PhoneNumber', value: page.PhoneNumber },
                    { text: 'GuardiansPhoneNumber', value: page.GuardiansPhoneNumber },
                ],
                add: { sibling: 2 },
                position: 1,

            }],
            additionalField: [],

            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
                formModel.StudentId = page.StudentId;
                formModel.Content = model.Content;
                formModel.PhoneNumber = model.PhoneNumber;
                formModel.GuardiansPhoneNumber = model.GuardiansPhoneNumber;
                formModel.PeriodId = _options.PeriodId;
                formModel.Name = page.Name;

            },
            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                console.log("model=>", model);
                /*formModel.PhoneNumber = page.PhoneNumber;
                formModel.GuardiansPhoneNumber = page.GuardiansPhoneNumber;*/
                formModel.Content = "Student" + " " + page.StudentName + " " + "  Your fee status is: Total fees amount -  " + page.Charge + ", Total received amount - " + page.Paid + " Total pending amount - " + page.Due + "\n" +
                    "Regards,Dreamer's ";
            },
            onSaveSuccess: function () {
                _options.updatePayment();
                grid?.Reload();
            },
            save: `/Message/SingleStudentMessage`,
        });
    }


      
    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);
        studentDateFilter.value = _options.PeriodMonth;
        periodFilter.value = _options.Id;


        Global.Add({
            title: 'All Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Module',
                    Grid: [
                        function (windowModel, container, position, model, func) {
                            ModuleList.Bind({
                                container: container,
                                model: model,
                                filter: [],
                                func: function () {
                                    this.model.Reload();
                                }
                            });
                          }
                    ]
                }, {
                    title: 'Course',
                    Grid: [
                        function (windowModel, container, position, model, func) {
                            CourseList.Bind({
                                container: container,
                                model: model,
                                filter: [],
                                func: function () {
                                    this.model.Reload();
                                }
                            });

                        }
                     ],
                }],

            name: 'Period Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });



    };
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


        function getDaily(id, name, container, filter) {
            return {
                Name: name,
                title: name,
                Url: '',
                Id: id,
                page: { 'PageNumber': 1, 'PageSize': 50, showingInfo: ' {0}-{1} of {2} Items ', filter: filter? [filter]:[] },
                columns: [
                    { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1 },
                    { field: 'StudentName', title: 'Student Name', filter: true, position: 2, Click: studentInfo },
                    { field: 'Charge', title: 'Fees', filter: true, position: 3 },
                    { field: 'Paid', title: 'Paid', filter: true, position: 4 },
                    { field: 'Due', title: 'Due', filter: true, position: 5, },
                    { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
                ],onrequest: (page) => {
                    page.Id = _options.Id;
                    //page.filter = page.filter.filter((itm) => {
                    //    //itm.field !== filter.field;

                    //});
                },
                actions: [{
                    click: moduleStudentPayment,
                    html: '<a class="action-button info t-white" > <i class="glyphicon  glyphicon-usd" title="Make Payment"></i></a >'
                },{
                    click: viewDetails,
                    html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-eye-open" title="View Payment Details"></i></a >'
                }, {
                    click: SinglestudentMessage,
                    html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-envelope" title="Send Message"></i></a >'
                }, {
                    click: moduleExtendPaymentDate,
                    html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-calendar" title="Extend Payment Date"></i></a >'
                    }],
                buttons: [{
                      click: allStudentMessage,
                      html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-envelope" title="Add Exam"></span> Message All student </a>'
                        }],
                bound: moduleBound,
                binding: (response) => {
                    //response.Data.Total.Balance = response.Data.Total.CashId - response.Data.Total.CashOut;
                },
               // Printable: { container: container.find('.button_container') },
            }
        };
        function getItems(options, container) {
            var currentDate = new Date();
            var items = [
                getDaily('5567850E-28E5-4A51-B5F9-C15CB876C8A1', 'All'),
                getDaily('537D006E-5880-4490-A679-D1EF33932DA9', 'Paid', container, { "field": "Paid", "value": '0', Operation: 1 }),
                getDaily('4D22A640-28E5-4483-8CD4-D755D331DB6C', 'Due', container, { "field": "Due", "value": '0', Operation: 1 }),
                getDaily('7013606C-A130-465E-8390-34F4B3BC323D', 'ExtenddateStudent', container, { "field": "ExtendPaymentdate", "value": '1900-01-01T00:00:00', Operation: 0 })
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
                items: getItems(options, container),
                //periodic: {
                //    format: 'yyyy-MM-dd HH:mm',
                //    container: '.filter_container',
                //    formModel: formModel,
                //    type: 'ThisMonth'
                //},
                Summary: {
                    Container: '.summary_container',
                    Items: []
                }
            };
            Global.Tabs(model);
            model.items[0].set(model.items[0]);
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
                model.items[0].set && model.items[0].set(model.items[0]);
            };
            bind(options.container, options);
        }


    }).call(ModuleList);
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

        function courseBound(row) {
            var currentDate = new Date();
            if (_options.RegularPaymentDate <= currentDate.toISOString()) {
                row.css({ background: "#ffa50054" });
            }

            if (this.ExtendPaymentdate <= currentDate.toISOString() && _options.RegularPaymentDate <= this.ExtendPaymentdate) {
                row.css({ background: "#d97f74" });
            }


            if (this.Paid >= this.Charge) {
                row.css({ background: "#00800040" });
            }
        }


        function getDaily(id, name, container, filter) {
            return {
                Name: name,
                title: name,
                Url: '',
                Id: id,
                page: { 'PageNumber': 1, 'PageSize': 50, showingInfo: ' {0}-{1} of {2} Items ', filter: filter ? [filter] : [] },
                columns: [
                    { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2 },
                    { field: 'StudentName', title: 'Student Name', filter: true, position: 3, Click: studentInfo },
                    { field: 'Charge', title: 'Fee', filter: true, position: 4 },
                    { field: 'Paid', title: 'Paid', filter: true, position: 5 },
                    { field: 'Due', title: 'Due', filter: true, position: 5, bound: dueBound },
                    { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
                ], onrequest: (page) => {
                    page.Id = _options.Id;
                    //page.filter = page.filter.filter((itm) => {
                    //    //itm.field !== filter.field;

                    //});
                },
                actions: [{
                    click: courseStudentPayment,
                    html: '<a class="action-button info t-white" > <i class="glyphicon  glyphicon-usd" title="Make Payment"></i></a >'
                }, {
                    click: viewDetails,
                    html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-eye-open" title="View Payment Details"></i></a >'
                }, {
                    click: courseExtendPaymentDate,
                    html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-calendar" title="Extend Payment Date"></i></a >'
                }],
                bound: courseBound,
                binding: (response) => {
                    //response.Data.Total.Balance = response.Data.Total.CashId - response.Data.Total.CashOut;
                },
                // Printable: { container: container.find('.button_container') },
            }
        };
        function getItems(options, container) {
            var items = [
                getDaily('77C56818-DF6C-4300-9026-523C1165EE5B', 'All'),
                getDaily('9D61F00B-5E5A-4425-8701-9E05E33553F2', 'Paid', container, { "field": "Paid", "value": '0', Operation: 1 }),
                getDaily('B8D25BDF-B445-42A2-91CE-D0CA40CEA5CA', 'Due', container, { "field": "Due", "value": '0', Operation: 1 })
            ]
            return items;
        };
        function bind(container, options) {
            model = {
                gridContainer: '.grid_container',
                container: container,
                Base: {
                    Url: '/Period/ForCoursePayment/',
                },
                filter: options.filter.slice(),
                items: getItems(options, container),
                Summary: {
                    Container: '.summary_container',
                    Items: []
                }
            };
            Global.Tabs(model);
            model.items[0].set(model.items[0]);
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
        CourseList.Bind = function (options) {
            options = setDefaultOpt(options);
            options.model.Reload = function () {
                model.items[0].set && model.items[0].set(model.items[0]);
            };
            bind(options.container, options);
        }


    }).call(CourseList);
};
