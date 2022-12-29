var Controller = new function (none) {
    this.Wait = true, models = {};
    function bind() {
        var that = this, view, options, formModel = {}, oldTitle = document.title, IsNew = true, windowModel, formInputs;
        var error = new function () {
            this.Save = function (response, path) {
                windowModel.Free();
                if (options.onerror) {
                    options.onerror(response);
                } else {
                    Global.Error.Show(response, { path: path, section: 'AddController.Add', user: options.name });
                }
            };
            this.Load = function (response, path) {
                windowModel.Free();
                Global.Error.Show(response, { path: path, section: 'AddController load]', user: options.name });
                cancel();
            };
        };
        function getModel() {
            var model = Global.Copy({}, formModel, true);
            for (var key in formInputs) {
                if (formInputs[key].dataset.dateformat && formInputs[key].value) {
                    model[key] = Global.DateTime.GetObject(formInputs[key].value, formInputs[key].dataset.dateformat || Global.DatePicker.ClientFormat).format(Global.DatePicker.ServerFormat);
                }
            }
            //options.onSubmit && options.onSubmit(model);
            options.model && options.fields && options.fields.each(function () {
                var key = this + '';
                model[key] = options.model[key];
            });
            options.postdata && Global.Copy(model, options.postdata, true);
            model.IsValid = options.onsubmit ? options.onsubmit(model, options.model, formModel) != false : true;
            return model;
        };
        function save() {
            if (formModel.IsValid) {
                windowModel.Wait();
                var saveUrl = options.save || ('/' + options.name + 's/Create');
                if (!IsNew) {
                    saveUrl = options.savechange || ('/' + options.name + 's/SaveChange');
                }
                var model = getModel();
                if (model.IsValid) {
                    Global.Uploader.upload({
                        url: saveUrl,
                        data: model,
                        onComplete: function (response) {
                            if (!response.IsError) {
                                windowModel.Free();
                                if (options.model) for (var key in options.model) {
                                    if (typeof formModel[key] != 'undefined')
                                        options.model[key] = formModel[key];
                                }
                                options.onsavesuccess && options.onsavesuccess(response, formModel, formInputs);
                                cancel();
                            } else {
                                error.Save(response, saveUrl);
                            }
                        },
                        onError: function (response) {
                            response.Id = -8;
                            error.Save(response, saveUrl);
                        }
                    });
                } else {
                    alert('Validation Errors.');
                    windowModel.Free();
                }
            }

            return false;
        };
        function cancel() {
            activeSave = false;
            windowModel.Hide(function () {
            });
            document.title = oldTitle;
        };
        function getName(isClear) {
            var name = options.name + ((options.name[options.name.length - 1] == 's' || isClear) ? '' : 's');
            return name.replace(/[A-Z]/g, function (match) {
                return ' ' + match;
            });
        };
        function populate(model) {
            model = model || {};
            var newModel = {};
            Global.Copy(newModel, model, true);
            dropDownList.Model = model;
            for (var key in formInputs) {
                if (formInputs[key].dataset.dateformat && /^\/Date\(\d+\)\/$/.test(model[key])) {
                    model[key] = model[key].getDate().format(Global.DatePicker.ClientFormat);
                }
            }
            for (var key in formModel) {
                formModel[key] = model[key] || '';
            }
            if (model.Id) { formModel.Id = model.Id; } else { formModel.Id = none; }
            dropDownList.Options.each(function () {
                console.log(['dropDownList.Options.each => this', this, this.val, this.data, model, model[this.Id]]);
                if (this.data && this.val) {
                    this.selectedValue = model[this.Id];
                    this.val(model[this.Id]);
                } else {
                    this.selectedValue = model[this.Id];
                }
            });
            dropDownList.BaseChanged[options.name] && dropDownList.BaseChanged[options.name].each(function () {
                $(formInputs[this]).change();
            });
        };
        function loadDetails(model) {
            populate(model);
            if (options.details) {
                windowModel.Wait('Please wait while loading Doctor details.......');
                Global.CallServer(options.details(model), function (response) {
                    if (!response.IsError) {
                        if (!response.Data) {
                            response.Id = -1;
                            error.Load(response);
                            return;
                        }
                        windowModel.Free();
                        for (var key in response.Data) {
                            model[key] = response.Data[key] || '';
                        }
                        populate(model);
                    } else {
                        error.Load(response, options.details(model));
                    }
                }, function (response) {
                    response.Id = -8;
                    error.Load(response, options.details(model));
                }, {}, 'POST')
            }
        };
        (function (that) {
            that.SetAddNew = function (model) {
                for (var key in model.add) { model[key.toLowerCase()] = model[key]; }
                model.add.name = model.add.name || model.title || model.Id.replace(/id\s*$/i, '')
                windowModel.View.find('#btn_add_new_' + model.title.toLowerCase()).click(function () {
                    setTimeout(function () {
                        model.add.onSaveSuccess = model.add.onsavesuccess || function (response, formModel) {
                            $(formInputs[model.field]).prepend('<option value="' + response.Data + '">' + formModel.Name + '</option>').val(response.Data).change();
                        }
                        Global.Add(model.add);
                    }, 0)
                });
            }
        })(this)
        var dropDownList = new function () {
            var drp = this;
            this.BaseChanged = {};
            this.Model = {};
            this.Options = [];
            function bindDropDownList(options) {
                options.elm = $(formInputs[options.Id]).empty();
                options.type == 'AutoComplete' ? Global.AutoComplete.Bind(options) : Global.DropDown.Bind(options);
                return options.elm;
            };
            function setChangedModel(model, changedModel) {
                var urlFunc = changedModel.url;
                changedModel.url = '';
                changedModel.datasource = changedModel.datasource || [];
                model.change = function (data) {
                    changedModel.datasource = changedModel.datasource && changedModel.datasource.length ? changedModel.datasource : none;
                    model.onchange && model.onchange(data);
                    changedModel.url = typeof urlFunc == 'function' ? urlFunc(data, model) : urlFunc;
                    changedModel.Reload();
                }
                setModel.call(this, changedModel);
            };
            function setModel(model) {
                var dataUrl = typeof model.url == 'function' ? model.url.call(this) : model.url;
                var dropdrownModel = Global.Copy(model, {
                    Id: model.Id,
                    //url: dataUrl,
                    datasource: model.datasource,
                    valuefield: model.valuefield,
                    textfield: model.textfield,
                    ondatabinding: model.ondatabinding
                }, true);
                model.change && setChangedModel(dropdrownModel, model.change);
                dropdrownModel.change = model.change || model.onchange;
                for (var key in dropdrownModel) { options[key] = options[key.toLowerCase()] || options[key]; }
                bindDropDownList(dropdrownModel);
                model.add && that.SetAddNew(model);
            };
            this.Bind = function (model) {
                drp.BaseChanged[options.name] = [];
                model.each(function () {
                    setModel(this);
                });
                drp.Options = model;
            };
        };
        function show(model) {
            windowModel.Show();
            oldTitle = document.title;
            if (model) {
                IsNew = false;
                loadDetails(model);
                document.title = formModel.Title = (options.edittitle || options.title || 'Edit ' + getName(true));
            } else {
                IsNew = true;
                model = {};
                for (var key in formModel) { model[key] = '' };
                populate(model);
                document.title = formModel.Title = (options.addtitle || options.title || 'Add New ' + getName(true));
            }
            options.onshow && options.onshow(model, formInputs, dropDownList, IsNew, windowModel, formModel);
        }
        function createWindow(template) {
            Global.Free();
            windowModel = Global.Window.Bind(template, options.width);
            view = windowModel.View.find('.form');
            that.Events.Bind(options.model);
            options.dropdownList && options.dropdownList.each && dropDownList.Bind(options.dropdownList);
            options.onviewcreated && options.onviewcreated(windowModel, formInputs, dropDownList, IsNew, formModel);
            show(options.model);
        };
        this.Show = function (opts) {
            options = opts;
            if (windowModel) {
                formModel = {};
                formInputs = Global.Form.Bind(formModel, view);
                show(options.model);
            } else {
                if (options.template || !options.columns) {
                    var templateUrl = options.template || '/Areas/' + options.name + '/Templates/Add.html';
                    Global.LoadTemplate(templateUrl, function (response) {
                        createWindow(response);
                    }, function (response) {
                    });
                } else {
                    Global.Add({
                        model: options,
                        url: IqraConfig.Url.Js.AddFormController,
                        onSuccess: function (template) {
                            createWindow(template);
                        }
                    });
                }
            }
        }
        this.Events = new function () {
            var evt = this, isBind = false;
            this.Bind = function (model) {
                if (!isBind) {
                    model = model || {};
                    isBind = true;
                    formInputs = Global.Form.Bind(formModel, view);
                    view.find('.btn_cancel').click(cancel);
                    Global.Click(windowModel.View.find('.btn_save'), save);
                }
            };
        };
    };
    this.Show = function (opts) {
        for (var key in opts) { opts[key.toLowerCase()] = opts[key]; }
        opts.dropdownlist && opts.dropdownlist.each(function () { for (var key in this) { this[key.toLowerCase()] = this[key]; } });
        opts.name = opts.name || Global.Guid();
        if (!models[opts.name]) {
            models[opts.name] = new bind();
        };
        models[opts.name].Show(opts);
    }
};

