var Controller = new function () {
    var that = this, view, options, formModel = {}, oldTitle = document.title, IsNew = true, windowModel, formInputs,imgModel;
    
    function cancel() {
        windowModel.Hide(function () {
        });
        document.title = oldTitle;
    };

    function save() {
        console.log(['model', imgModel]);

        var model = imgModel;
        model.request = Global.Uploader.upload({
            data: model.Data,
            url: options.save,
            onProgress: function (data) {
                
            },
            onComplete: function (response) {
                if (!response.IsError) {
                    cancel();
                    options.onAdd();
                    return;
                }
            },
            onError: function () {
                alert("Image save failed!");
            }
        });
    };

    function show(model) {
        windowModel.Show();
        oldTitle = document.title;
        document.title = formModel.Title = 'Add New Files';
        that.Image.OnOpen();

    };

    function createWindow(template) {
        windowModel = Global.Window.Bind(template);
        formInputs = Global.Form.Bind(formModel, windowModel.View);
        windowModel.View.find('.btn_cancel').click(cancel);
        windowModel.View.find('.btn_save').click(save);
        show();
        that.Image.Bind();
    };

    this.Show = function (opts) {
        options = opts;
        if (windowModel) {
            show();
        } else {
            Global.LoadTemplate('/templates/files-uploader.html', function (response) {
                createWindow(response);
            }, function (response) {
            });
        }
    };
    
    (function () {
        var container, questionId;
        function onDelete(model) {
            if (model.IsCompleted) {
                Global.Controller.Call({
                    url: IqraConfig.Url.Js.WarningController,
                    functionName: 'Show',
                    options: {
                        name: 'Delete',
                        msg: 'Do you want to delete?',
                        save: '/ProductArea/Product/RemovePicture',
                        data: { Id: options.ItemId },
                        onsavesuccess: function () {
                            model.elm.remove();
                            options.onDelete();
                        }
                    }
                });
            } else {
                model.request.Cancel();
                model.elm.remove();
            }
            model.IsCompleted = true;
        };
        function createView(src, file, files) {
            console.log([$('#btn_image')[0].files[0], $('#btn_image')[0], $('#btn_image')[0].files]);
            var img = $('<img style="max-width:100px; max-height:100px;" />'),
                elm = $('<div class="col-md-3 image_item"></div>').append(img);
            img.attr('src', src);
            var model = {
                Id: Global.Guid(),
                elm: elm,
                Data: {
                    Img: { IsFile: true, File: file },
                    Id: options.ItemId,
                    //ActivityId: ActivityId
                }
            };
            //Global.Click(btn, onDelete, model);
            container.append(elm);
            imgModel = model;
            //save(model);
        };
        function readURL(reader, input, index) {
            index = index || 0;
            var reader = reader || new FileReader();
            if (input.files && input.files.length - 1 >= index) {
                var file = input.files[index];
                reader.onload = function (e) {
                    createView(e.target.result, file, input.files);
                    index++;
                    //readURL(reader, input, index);
                }
                reader.readAsDataURL(file);
            }
        }
        function onChange() {
            var input = this, reader;
            readURL(reader, input);
        };
        function close() {
            windowModel && windowModel.Hide();
        };

        var loadImages = (function () {
            function onDelete(model) {
                model.elm.remove();
                Global.Controller.Call({
                    url: IqraConfig.Url.Js.WarningController,
                    functionName: 'Show',
                    options: {
                        name: 'OnDelete',
                        save: '/ProductPurchaseArea/ItemReceiveVoucherImage/Remove',
                        data: { Id: model.Id },
                        onsavesuccess: function () {
                            model.elm.remove();
                        }
                    }
                });
            };
            function createView(id) {
                var btn = $('<div class="btn_delete" style="position: absolute; right: -10px; top: -3px;z-index: 2;"><span class="icon_container" style="border-radius: 50%; padding: 0px 1px; border: 2px solid rgb(255, 255, 255); cursor: pointer; font-size: 0.8em;"> <span class="glyphicon glyphicon-remove"></span></span></div>');
                var elm = $('<div class="col-md-3 image_item"><img src="/Question/SmallImage?Id=' + id + '" style="max-width:100px; max-height:100px;" /></div>').append(btn);
                var model = {
                    Id: id,
                    elm: elm
                };
                Global.Click(btn, onDelete, model);
                container.append(elm);
            };
            return function (model) {
                questionId = model.Id;
                windowModel.Wait('Please wait while loading data.');
                Global.CallServer('/Question/ExaplanationWithImages?Id=' + model.Id, function (response) {
                    if (!response.IsError) {
                        windowModel.Free();
                        response.Data.Images.each(function () {
                            createView(this + '');
                        });
                    }
                }, function (response) {
                    windowModel.Free();
                }, {}, 'Get')
            };
        })();
        this.Status = function (txt) {
            if (txt == 'End') {
                windowModel.View.find('.status_container').empty();
                //windowModel.View.find('#progress_ba_container').hide();
                windowModel.View.find('#progress_ba_container #myBar').css({ width: 0 });
                close();
                callerOptions.Success();
            } else {
                windowModel.View.find('.status_container').prepend('<div class="col-md-12">' + txt + '</div>');
            }
        };
        this.Bind = function () {
            windowModel.View.find('#btn_image').change(onChange)[0];
            container = windowModel.View.find('#image_container');
        };
        this.OnOpen = function (model) {
            questionId = none;
            container && container.empty();
            model && loadImages(model);
        };
        this.IsValid = function () {

            return true;
        };
    }).call(that.Image = {});
}