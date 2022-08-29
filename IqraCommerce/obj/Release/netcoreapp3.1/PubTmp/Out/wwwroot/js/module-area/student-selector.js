
var Controller = new function () {
    var service = {}, windowModel, dataSource = [], formModel = {}, _options, grid, added = {};

    function save() {
        var list = [];
        dataSource.each(function () {
            this.Selected && !added[this.Id] && list.push(this);
            this.Selected = false;
        });
        _options.onSaveSuccess(list);
        grid.views.tBody.find('.i-state-selected').removeClass('i-state-selected');
        close();
    };

    function close() {
        windowModel && windowModel.Hide();
    };

    function show(options) {
        windowModel.Show();
        grid && grid.Reload();
    };

    this.Show = function (model) {
        selected = {};
        _options = model;
        if (windowModel) {
            show(_options);
        } else {
            Global.LoadTemplate('/Templates/Selector.html', function (response) {
                windowModel = Global.Window.Bind(response, { width: '98%' });
                Global.Form.Bind(formModel, windowModel.View);
                windowModel.View.find('.btn_cancel').click(close);
                show(_options);
                service.Grid.Bind();
            }, noop);
        }
    };
    (function () {
        function rowBound(elm) {
            if (added[this.Id]) {
                elm.addClass('already_added');
            } else {
                var model = this;
                elm.dblclick(function () {
                    Global.CallServer('Url to add student in a batch', function (response) {
                        windowModel.Free();
                        if (response.IsError) {
                            alert('Errors.');
                        } else {
                            grid.Reload();
                        }
                    }, function (response) {
                        windowModel.Free();
                        response.Id = -8;
                        alert('Network Errors.');
                    }, {
                        ProductId: model.Id,
                        CategoryId: _options.CategoryId,
                        Rank: formModel.Rank || 0
                    }, 'post');
                });
            }
        };
        function onDataBinding(response) {
            response.Data.Data.each(function () {
                this.ReturnedQuantity = 0;
            });
            dataSource = response.Data.Data;
        };
        this.Bind = function () {
            Global.Grid.Bind({
                elm: windowModel.View.find('#item_selector_grid'),
                columns: [
                    { field: 'Name', filter: true },
                ],
                url: '/Student/Get',
                dataBinding: onDataBinding,
                rowBound: rowBound,
                page: { 'PageNumber': 1, 'PageSize': 10 },
                pagger: { showingInfo: '{0}-{1} of {2} Items' },
                oncomplete: function (model) {
                    grid = model;
                },
                Printable: false
            });
        };
    }).call(service.Grid = {});
};