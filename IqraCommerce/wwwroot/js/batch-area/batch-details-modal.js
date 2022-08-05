

var Controller = new function () {
    //const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    //const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
   
    var _options;

    this.Show = function (options) {
        _options = options;
    
        Global.Add({
            title: 'Batch Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Batch Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'TeacherName', title: 'Teacher', filter: true, position: 2, },
                                { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
                                { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
                                { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 3 } },
                                { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, add: { sibling: 3 } },
                                { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 7, add: { sibling: 3 } },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Batch/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                },],

            name: 'Batch Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};