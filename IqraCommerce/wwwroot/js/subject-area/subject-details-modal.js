

var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;

        Global.Add({
            title: 'Subject Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Subject Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'Class', title: 'Class', filter: true, position: 2, },
                                { field: 'IsActive', title: 'Active', filter: true, add: false, position: 4, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Subject/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }
               
            ],
            name: 'Subject Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};