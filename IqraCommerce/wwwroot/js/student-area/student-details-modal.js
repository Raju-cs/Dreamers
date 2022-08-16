

var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    
   
    var _options;

    this.Show = function (options) {
        _options = options;
        courseFilter.value = _options.Id;

        Global.Add({
            title: 'Student Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Information',
                   
                            columns : [
                              
                                { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 4 }, },
                                { field: 'NickName', title: 'Nick Name', filter: true, position: 3, add: { sibling: 4 }, required: false },
                                { field: 'Name', title: 'Full Name(English)', filter: true, position: 4, add: { sibling: 4 }, },
                                { field: 'StudentNameBangla', title: 'Full Name(Bangla)', filter: true, position: 5, add: { sibling: 4 }, },
                                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 6, add: { sibling: 4 }, },
                                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 7, add: { sibling: 4 }, dateFormat: 'dd/MM/yyyy hh:mm' },
                                { field: 'Nationality', title: 'Nationality', filter: true, position: 11, add: { sibling: 4 }, required: false },
                                { field: 'StudentSchoolName', title: 'School Name', filter: true, position: 12, add: { sibling: 4 }, required: false },
                                { field: 'StudentCollegeName', title: 'College Name', filter: true, position: 13, add: { sibling: 4 }, required: false },
                                { field: 'Class', title: 'Class', filter: true, position: 14, add: { sibling: 4 }, required: false },
                                { field: 'Shift', title: 'Shift', filter: true, position: 15, add: { sibling: 4 }, required: false },
                                { field: 'Version', title: 'Version', filter: true, position: 16, add: { sibling: 4 }, required: false },
                                { field: 'Group', title: 'Group', filter: true, position: 17, add: { sibling: 4 }, required: false },
                                { field: 'BloodGroup', title: 'BloodGroup', filter: true, position: 18, add: { sibling: 4 }, required: false },
                                { field: 'Gender', title: 'Gender', filter: true, position: 19, add: { sibling: 4 }, required: false },
                                { field: 'Religion', title: 'Religion', filter: true, position: 20, add: { sibling: 4 }, required: false },
                                { field: 'HomeDistrict', title: 'Home District', filter: true, position: 21, add: { sibling: 4 }, required: false },
                                { field: 'Section', title: 'Section', filter: true, position: 22, add: { sibling: 4 }, required: false },
                                { field: 'FathersName', title: 'Fathers Name', filter: true, position: 23, add: { sibling: 4 }, required: false },
                                { field: 'FathersOccupation', title: 'Fathers Occupation', filter: true, position: 24, add: { sibling: 4 }, required: false },
                                { field: 'FathersPhoneNumber', title: 'Fathers Phone Number', filter: true, position: 25, add: { sibling: 4 }, required: false },
                                { field: 'FathersEmail', title: 'Fathers Email Address', filter: true, position: 26, add: { sibling: 4 }, required: false },
                                { field: 'MothersName', title: 'Mothers Name', filter: true, position: 27, add: { sibling: 4 }, required: false },
                                { field: 'MothersOccupation', title: 'Mothers Occupation', filter: true, position: 28, add: { sibling: 4 }, required: false },
                                { field: 'MothersPhoneNumber', title: 'Mothers Phone Number', filter: true, position: 29, add: { sibling: 4 }, required: false },
                                { field: 'MothersEmail', title: 'Mothers Email Address', filter: true, position: 30, add: { sibling: 4 }, required: false },
                                { field: 'GuardiansName', title: 'Guardians Name', filter: true, position: 31, add: { sibling: 4 }, },
                                { field: 'GuardiansOccupation', title: 'Guardians Occupation', filter: true, position: 32, add: { sibling: 4 }, },
                                { field: 'GuardiansPhoneNumber', title: 'Guardians Phone Number', filter: true, position: 33, add: { sibling: 4 }, },
                                { field: 'GuardiansEmail', title: 'Guardians Email Address', filter: true, position: 34, add: { sibling: 4 }, },
                                { field: 'PresentAddress', title: 'Present Address', filter: true, position: 35, add: { sibling: 4 }, },
                                { field: 'PermanantAddress', title: 'Permanant Address', filter: true, position: 36, add: { sibling: 4 }, },
                                { field: 'HomeDistrict', title: 'Home District', filter: true, position: 37, add: { sibling: 4 }, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, type: 'textarea' }, required: false },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Student/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: 'Batch',
                    Grid: [{

                        Header: 'Batch',
                        columns: [
                            { field: 'Name', title: 'Name', filter: true, position: 1, },
                            { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 2, add: false },
                            { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 4, add: { sibling: 2 } },
                       ],

                        Url: '/Batch/Get/',
                        filter: [liveFilter],
                        onDataBinding: function (response) { },
                        actions: [],
                        buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },


            ],

            name: 'Course Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};