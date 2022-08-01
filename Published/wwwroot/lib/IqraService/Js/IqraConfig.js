var IqraConfig = {
    Text: {
        Title: 'Lazz Pharma Ltd ',
        Address: 'Rasel Squre Branch, 64/3, Lake Circus,<br/> Rasel Squre, Dhaka-1205.',
        Phone: 'Phone : 02-9110864'
    }
};


IqraConfig = {
    Version: '1.17',
    BaseUrl: '',
    Url: {
        Js: {
            Grid: '/lib/IqraService/Js/Grid.js',
            GridEditor: '/lib/IqraService/Js/GridEditor.js',
            //Grid: '/Content/Js/Grid.js',
            ListController: '/lib/IqraService/Js/ListController.js',
            AddController: '/lib/IqraService/Js/AddController.js',
            AddFormController: '/lib/IqraService/Js/AddFormController.js',
            WarningController: '/lib/IqraService/Js/WarningController.js',
            DatePicker: '/lib/IqraService/Js/DatePicker.js',
            DropDown: '/lib/IqraService/Js/DropDown.js',
            DetailsWithGrid: '/lib/IqraService/Js/OnDetailsWithGrid.js',
            OnDetailsWithTab: '/lib/IqraService/Js/OnDetailsWithTab.js',
            AutoComplete: '/lib/IqraService/Js/AutoComplete.js',
            MultiSelect: '/lib/IqraService/Js/MultiSelect.js',
            LineChart: '/lib/IqraService/Js/LineChart.js',
        },
        Css: {
            Grid: '/lib/IqraService/Css/Grid.css',
            Window: '/lib/IqraService/Css/Window.css',
            Datepicker: '/lib/IqraService/Css/DatePicker.css',
            DropDown: '/lib/IqraService/Css/DropDown.css',
        },
        Img: {
            Loading: '/lib/IqraService/Img/loading_line.gif'
        }
    },
    Grid: {
        Responsive: true,
        selector: {},
        Printable: {
            Container: '.button_container',
            //html: '<a class="btn btn-default btn-round btn_add_print pull-right"><span class="glyphicon glyphicon-print"></span> Print </a>',
            html: '<a class="btn btn-default btn-round btn_add_print pull-right"><span class="glyphicon glyphicon-print"></span> Print </a>',
            header: `<div style="text-align:center; margin-bottom:20px;">
                        <div style="border: 1px solid silver;">
                            <div style="margin: 0px; border-top: medium none; border-bottom: medium none;min-height: 50px;">
                                <div style="font-size:2em;"> `+ IqraConfig.Text.Title + ` </div>
                                <div> `+ IqraConfig.Text.Address + ` </div>
                                <div> `+ IqraConfig.Text.Phone + ` </div>
                            </div>
                        </div>
                        <div class="report_title" style="font-size:2em; margin-top:10px;"></div>
                    </div>`,
            reportTitle: function (model) {
                var text = '';
                return (model.title || model.name || document.title)+' Report';
            },
            footer: function (model) {

                var text = '';
                if (model.footer && model.footer.showingInfo && model.footer.showingInfo.html) {
                    text = model.footer.showingInfo.html();
                }
                return '<div style="text-align: right; font-size: 1.5em; font-weight: bold; padding-top: 5px;">' + text + '</div>';
            },
        },
        setting: {
            url: function (model) {
                return '/IqraGridArea/IqraGrid/GetById?Id=' + model.Id;
            },
            save: function (model) {
                return '/IqraGridArea/IqraGrid/Add';
            },
            remove: function (model) {
                return '/IqraGridArea/IqraGrid/Remove';
            },
        },
        resizable: true,
        Operation: 6,
        Pagger: {
            PageSize: [5, 10, 20, 50, 100, 200, 300, 400, 500, 1000],
            Selected: 10
        },
        FixedHeader: true,
    },
    DropDown: {
        ValuField: 'value',
        TextField: 'text'
    },
    AutoComplete: {
        ValuField: 'Id',
        TextField: 'Name',
        Operation: 6,
        Page: { "PageNumber": 1, "PageSize": 20, filter: [] }
    },
    MultiSelect: {
        ValuField: 'Id',
        TextField: 'Name',
        Operation: 6,
        Page: {
            "PageNumber": 1, "PageSize": 30
        }
    },
    Text: IqraConfig.Text
};


