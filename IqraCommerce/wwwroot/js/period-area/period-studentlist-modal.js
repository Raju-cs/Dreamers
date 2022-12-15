
var Controller = new function () {

    const studentDateFilter = { "field": "Name", "value": '', Operation: 0 };
    const periodFilter = { "field": "PeriodId", "value": '', Operation: 0 };
    var _options;
      
    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);
        studentDateFilter.value = _options.PeriodMonth;
        periodFilter.value = _options.PeriodId;

        const dateForSQLServer = (enDate = '01/01/1970') => {
            const dateParts = enDate.split('/');
            console.log("dateparts=>", dateParts);
           return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
           //return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
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
                    { field: 'ModuleFee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 6,},
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
                    formModel.ModuleFee = page.Charge;
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
                    { field: 'ExtendPaymentdate', title: 'ExtendPaymentDate', add: { sibling: 1 }, position: 1, dateFormat: 'dd/MM/yyyy', required: false },
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
            

            if (this.Paid >= this.Charge ) {
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
            console.log("page=>", page);
            const payload = {
                PeriodId: _options.PeriodId,
            };
            var url = '/Message/PayStudentMessage/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }

                throw Error(res.statusText);
            }).then(data => {
                if (data.IsError)
                    throw Error(data.Msg);

                //alert(data.Msg);
                grid?.Reload();
            }).catch(err => alert(err));
        }



        function SinglestudentMessage(page, grid) {
            console.log("fee=>", page);
            Global.Add({
                name: 'MESSAGE',
                model: undefined,
                title: 'Message',
                columns: [
                    { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 1, add: { sibling: 2 } },
                    { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 1, add: { sibling: 2 } },
                    { field: 'Content', title: 'Content', filter: true, add: { sibling: 1, type: "textarea" }, position: 2, },
                ],
                dropdownList: [],
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
                    formModel.PhoneNumber = page.PhoneNumber;
                    formModel.GuardiansPhoneNumber = page.GuardiansPhoneNumber;
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

        Global.Add({
            title: 'All Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Module',
                    Grid: [{
                        Header: 'Module Charge',
                        columns: [
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1 },
                            { field: 'StudentName', title: 'Student Name', filter: true, position: 2, Click: studentInfo  },
                            { field: 'Charge', title: 'Fees', filter: true, position: 3 },
                            { field: 'Paid', title: 'Paid', filter: true, position: 4},
                            { field: 'Due', title: 'Due', filter: true, position: 5, },
                            { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
                        ],

                        Url: '/Period/ForModulePayment/',
                        filter: [
                            { "field": 'smIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'PriodId', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        onrequest: (page) => {
                            page.Id = _options.Id;
                        },
                        rowBound: moduleBound,
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
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-envelope" title="Add Exam"></span> Send All student </a>'
                        }/*,{
                            click: ExtendPaymentDate,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-calendar" title="Student Extend payment Date"></span>Click For Extend PaymentDate </a>'
                        }*/],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }, {
                    title: 'Course',
                    Grid: [{
                        Header: 'Course',
                        columns: [
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2 },
                            { field: 'StudentName', title: 'Student Name', filter: true, position: 3, Click: studentInfo },
                            { field: 'Charge', title: 'Fee', filter: true, position: 4 },
                            { field: 'Paid', title: 'Paid', filter: true, position: 5 },
                            { field: 'Due', title: 'Due', filter: true, position: 5, bound: dueBound },
                            { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
                        ],

                        Url: '/Period/ForCoursePayment/',
                        filter: [
                            { "field": 'scIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'PriodId', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        onrequest: (page) => {
                            page.Id = _options.Id;
                        },
                        rowBound: courseBound,
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