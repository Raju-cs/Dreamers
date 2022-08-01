var AppBase = { Component: {}, Header: AppHeader },
    AppHeader = { Component: {} };
function prevent(e) {
    e.preventDefault();
    e.stopPropagation();
};
(function () {

    this.IsValid
    this.Click = function (elm, func, option, data, model) {
        elm.click(function (e) {
            func.call(elm, e, option, data, model);
            e.preventDefault();
            e.stopPropagation();
        });
        return elm;
    };
    this.GetImagePath = function (data, type, dflt) {
        type = type || 'Small';

        var src = '/Content/ImageData/Products/' + type + '/'
        if (data.ImagePath && data.ImagePath.length > 30) {
            if (data.ImageType == 1) {
                src += data.ImagePath;
            } else {
                src = '/Content/ImageData/ProductCategory/' + type + '/' + data.ImagePath;
            }
        } else {
            src = dflt || '';
        }
        return src;
    };
    this.GetData = function (i) {
        if (window.appData && window.appData.Data.Data[i]) {
            var item = {}, data, list = [];
            window.appData.Data.Data[i].each(function () {
                data = this;
                list.push(item);
                window.appData.Data.Columns[i].each(function (i) {
                    item[this] = data[i];
                });
                item = {};
            });
            return list;
        }
    };
}).call(AppBase, AppBase.Component);
(function () {
    var browserData = localStorage.getItem("Device");
    function checkActivity() {
        console.log(['checkActivity', browserData]);
        if (browserData) {
            var device = JSON.parse(browserData);
            if (device.Id) {
                getActivity(device);
            } else {
                setDevice();
            }
        } else {
            setDevice();
        }
    };
    function getActivity(device) {
        console.log(['checkActivity', device]);
        Global.CallServer('/SecurityArea/DeviceActivity/Set?deviceId=' + device.Id, function (response) {
            if (!response.IsError) {
                window.ActivityId = response.ActivityId;
            } else {

            }
        }, function (response) {

        }, {}, 'GET');
    };
    function setDevice() {
        var model = {
            AppName: navigator.appName,
            Language: navigator.language,
            Platform: navigator.platform,
            UserAgent: navigator.userAgent
        };
        Global.CallServer('SecurityArea/Device/Set', function (response) {
            if (!response.IsError) {
                var device = { Id: response.Id, HasAccess: response.HasAccess };
                localStorage.setItem("Device", JSON.stringify(device));
                getActivity(device);
            } else {

            }
        }, function (response) {

        }, model, 'POST');
    };
    this.Set = checkActivity;
}).call(AppBase.Activity = {}, AppBase.Component);
(function (cmpnt) {
    var allState = {}, IsActive = true, currentState;
    function onChange(stateObj) {
        AppBase.Activity.Set();
        AppBase.Container.animate({ scrollTop: 0 }, 300).click();
        currentState = stateObj;
        BodyParent.NavbarContainer && BodyParent.NavbarContainer.removeClass('in');
    };
    window.onpopstate = function (stateObj) {
        //stateObj = history.state
        if (stateObj && stateObj.state && stateObj.state.Id && allState[stateObj.state.Id]) {
            var model = allState[stateObj.state.Id];
            //console.log(['onpopstate', model, document.location, stateObj, history.state, history]);
            IsActive = false;
            model.Component.Render.apply(model.Component, model.Param);
            onChange(stateObj);
        }
        //history.back();
        //console.log(['', stateObj, allState]);
    };
    this.Set = function (stateObj, name, pageUrl) {
        currentState && currentState.OnClose && currentState.OnClose(stateObj, name, pageUrl);
        if (!IsActive) {
            IsActive = true;
            return;
        }
        stateObj.StateId = Global.Guid();
        allState[stateObj.StateId] = stateObj;
        history.pushState({ Id: stateObj.StateId }, name, pageUrl);
        onChange(stateObj);
    };
}).call(AppBase.State = {}, AppBase.Component);
(function (cmpnt) {
    var lengthArr = ['', '0', '00', '000', '0000', '00000', '000000'];
    var maxLengthArr = [0, 9, 99, 999, 9999, 99999, 999999, 9999999];
    function setText(text, digit) {
        text = text + '';
        var length = (text.length + '').length;
        if (length > digit) {
            text = text.substring(0, maxLengthArr[digit]);
            return (text.length) + text;
        }
        return lengthArr[digit - length] + (text.length) + text;
    };
    function setNumber(num, digit) {
        num = num + '';
        var length = (num.length + '').length;
        if (length > digit) {
            num = num.substring(0, maxLengthArr[digit]);
            return (num.length) + num;
        }
        return lengthArr[digit - length] + (num.length) + num;
    };
    function getText(model, text, digit) {
        var length = parseInt(text.substring(model.index, model.index + digit), 10);
        model.index += digit;
        var text = text.substring(model.index, model.index + length);
        model.index += length;
        //console.log(text);
        return text;
    };
    function getNumber(model, text, digit) {
        var length = parseInt(text.substring(model.index, model.index + digit), 10);
        model.index += digit;
        var num = parseFloat(text.substring(model.index, model.index + length));
        model.index += length;
        //console.log(num);
        return num;
    };
    function getObject(model, text, list) {
        list = list || [];
        if (model.index < model.max) {
            list.push({
                Id: getText(model, text, 2),
                UnitSalePrice: getNumber(model, text, 1),
                Quantity: getNumber(model, text, 1),
                Discount: getNumber(model, text, 1),
                UnitConversion: getNumber(model, text, 1),
                Suplier: getText(model, text, 2),
                GenericName: getText(model, text, 2),
                Strength: getText(model, text, 2),
                Category: getText(model, text, 2),
                SalesUnitType: getText(model, text, 2),
                Code: getText(model, text, 2),
                Name: getText(model, text, 2)
            });
            getObject(model, text, list);
        }
        return list;
    };
    this.GetObject = function (name) {
        var text = localStorage.getItem(name);
        if (text && text.length && text.length > 60) {
            var model = {
                index: 0,
                text: text,
                max: text.length - 35,
                items: []
            };
            return getObject(model, text);
        }
        return [];
    };
    this.SetText = function (item) {
        var text = '';
        item.Text = text = setText(item.Id, 2);
        //console.log(text);
        item.Text += text = setNumber(item.UnitSalePrice, 1);
        //console.log(text);
        item.Text += text = setNumber(item.Quantity || 1, 1);
        //console.log(text);
        item.Text += text = setNumber(item.Discount || 0, 1);
        //console.log(text);
        item.Text += text = setNumber(item.UnitConversion || 1, 1);
        //console.log(text);
        item.Text += text = setText(item.Suplier || ' ', 2);
        //console.log(text);
        item.Text += text = setText(item.GenericName || ' ', 2);
        //console.log(text);
        item.Text += text = setText(item.Strength || ' ', 2);
        //console.log(text);
        item.Text += text = setText(item.Category, 2);
        //console.log(text);
        item.Text += text = setText(item.SalesUnitType, 2);
        //console.log(text);
        item.Text += text = setText(item.Code, 2);
        //console.log(text);
        item.Text += text = setText(item.Name, 2);

        return item.Text;
    };
    this.Save = function (text, name) {
        localStorage.setItem(name, text);
    };
}).call(AppBase.Saver = {}, AppBase.Component);
(function (cmpnt) {
    var formModel = {}, view = { FormModel: formModel };
    function showDetails(container) {
        container.removeClass('cart_info').addClass('cart_info_details');
    };
    function hideDetails(container) {
        container.removeClass('cart_info_details').addClass('cart_info');
    };
    function createInfo(container) {
        var elm;
        container.append(container = Global.Click($('<div class="cart-box" style="">'), showDetails, container));
        container.append(elm = $('<div class="cart-items text-center">'));
        elm.append(Global.AutoBind(formModel, $('<span class="cart-count">'), 'TotalItem', 2));
        elm.append('<span>&nbsp;Items</span>');
        container.append('<div class="cart-bag text-center"><img src="' + AppService.Img.CartBox.Logo + '" style="height: 43px;width: 50px;" /></div>');
        container.append(elm = $('<div class="cart-amount">'));
        elm.append('<span>৳ </span>');
        elm.append(Global.AutoBind(formModel, $('<span class="cart-amount-span">'), 'TotalAmount', 2));
        formModel.TotalItem = 0;
        formModel.TotalAmount = 0;
    };
    (function (parent) {
        var view = { Parent: parent, FormModel: formModel }, list = [], formModel = {}, totalAmount = 0, netAmount = 0;
        function setCartHeader(container) {
            var elm;
            container.append(container = $('<div class="cart-header row no_margin">'));
            container.append(elm = $('<div class="col-xs-8">'));
            elm.append('<img class="header-bag" src="' + AppService.Img.CartBox.AddToCart + '">');
            elm.append(elm = $('<strong class="car-box-title SearchFont">'));
            elm.append(Global.AutoBind(formModel, $('<span>'), 'TotalItem', 2));
            elm.append('<span> Item</span>');
            container.append(elm = $('<div class="col-xs-4">'));
            elm.append(Global.Click($('<img class="pull-right cart-cross-btn" src="' + AppService.Img.CartBox.CartHideBTN + '">'), hideDetails, view.Container));
        };
        function setCartFooter(container) {
            var elm;
            container.append(container = $('<div class="cart-footer">'));

            //console.log(["Refresh", list, list.length]);
            //if (list.length>0) {
            container.append(Global.Click($('<button id="checkout-button" style="border-radius: 6px 0 0 6px;" class="btn btn-success pull-left">Order Now</button>'), function () {

                //console.log(['hideContainer', view, view.Container]);
                if (list.length > 0) {
                    hideDetails(view.Container);
                    Checkout.Render();
                } else {
                    alert('Please Select at least one product');
                }
            }, view.Container));

            //} else {
            //    container.append('<button id="checkout-button" style="border-radius: 6px 0 0 6px;" class="btn btn-success pull-left" disabled>Order Now</button>');
            //}
            container.append(elm = $('<span style="border-radius: 0 6px 6px 0;" class="btn btn-info cart-amount-span">৳ </span>'));
            elm.append(Global.AutoBind(formModel, $('<span>'), 'NetAmount', 2));
            container.append(elm = $('<a style="color: #ddd; vertical-align:middle">&nbsp;&nbsp;&nbsp; </a>'));
            elm.append(Global.AutoBind(formModel, $('<span>'), 'TotalDiscount', 2));

            elm.append('<a id="empty_cart_button" href="#">' +
                '<i style="color: #FFFFFF; margin-right: 15px;" class="fa fa-shopping-cart fa-2x pull-right"></i>' +
                '</a><div class="clearfix"></div>');
        };
        function saveCartBox(noSave) {
            if (!noSave) {
                var txt = '', lst = [];
                list.each(function () {
                    txt += this.Text;
                    lst.push([this, this.Text]);
                });
                AppBase.Saver.Save(txt, 'mycart');
                $(document.body).click(function () {
                    //console.log(['lst', lst]);
                });
            }
        };
        function updateSummary() {
            totalAmount = 0;
            netAmount = 0;
            list.each(function () {
                totalAmount += this.TotalAmount;
                netAmount += this.NetAmount;
            });
            formModel.TotalAmount = totalAmount;
            formModel.NetAmount = netAmount;

            view.Parent.FormModel.TotalItem = formModel.TotalItem = list.length;
            view.Parent.FormModel.TotalAmount = netAmount;
        };
        function onChange(data, noSave) {
            data.TotalAmount = data.UnitSalePrice.mlt(data.Quantity);
            data.NetAmount = (data.TotalAmount - data.Discount.mlt(data.TotalAmount).div(100));
            updateSummary();
            AppBase.Saver.SetText(data);
            saveCartBox(noSave);
            //console.log(['data', data]);
        };
        function onDelete(data, li) {
            //console.log(['', data, li]);
            li.remove();
            var dataList = [], txt = '';
            totalAmount = 0;
            netAmount = 0;
            list.each(function () {
                if (this.Id != data.Id) {
                    dataList.push(this);
                    totalAmount += this.TotalAmount;
                    netAmount += this.NetAmount;
                    txt += this.Text;
                }
            });
            AppBase.Saver.Save(txt, 'mycart');
            list = dataList;

            formModel.TotalAmount = totalAmount;
            formModel.NetAmount = netAmount;

            view.Parent.FormModel.TotalItem = formModel.TotalItem = list.length;
            view.Parent.FormModel.TotalAmount = netAmount;
        };
        (function (parent) {
            var view = { Parent: parent }, formModel = {}, index = 0;
            function setKeyUp(elm, data) {
                elm.keyup(function () {
                    onChange(data);
                }).blur(function () {
                    onChange(data);
                });
                return elm;
            };
            function increaseQnt(data) {
                data.Quantity++;
                onChange(data);
            };
            function decreaseQnt(data) {
                if (data.Quantity > 1) {
                    data.Quantity--;
                }
                onChange(data);
            };
            function createName(container, data) {
                //console.log(['container, data', container, data]);
                container.append(container = $('<td>'));
                container.append(Global.Click($('<a href="' + AppService.Link.Header.ProductDetail + data.Id + '"><span class="SearchProductName SearchFont">' + data.Name + '</span></a>'), function (data) {
                    //console.log(['view.Container', view.Container]);
                    hideDetails(view.Parent.Container);
                    ProductDetails.Render(data);
                }, data)).append('<br>');
                if (data.Discount > 0) {
                    container.append('<del class="SearchDelPrice" style="font-size: 14px; margin-right: 5px;">৳ ' + data.UnitSalePrice.toMoney() + '</del>');
                }
                container.append('<strong class="SearchPrice" style="font-size: 15px;">৳ ' + (data.UnitSalePrice - data.Discount.mlt(data.UnitSalePrice).div(100)).toMoney() + '</strong>');
            };
            function createQnt(container, data) {
                container.append(container = $('<td style="font-size: 13px; vertical-align: middle; padding: 8px 0;">'));
                container.append(container = $('<div class="attributes input-group bootstrap-touchspin">'));
                container.append(container = $('<div class="qty-holder" style="width: 90px;">'));
                container.append(Global.Click($('<a href="#" class="qty-dec-btn" title="Dec" style="width: 22px;">-</a>'), decreaseQnt, data));
                container.append(setKeyUp(Global.AutoBindF(data, $('<input style="width: 22px !important;" type="text" name="product_qty" id="product_qty" class="qty-input" value="' + data.Quantity + '">'), 'Quantity', 2, true), data));
                container.append(Global.Click($('<a href="#" class="qty-inc-btn" title="Inc" style="width: 22px;">+</a>'), increaseQnt, data));
            };
            function createTotal(container, data) {
                container.append(container = $('<td style="white-space: nowrap;">'));
                if (data.Discount > 0) {
                    container.append('<span class="SearchFont SearchDelPrice"><del>৳ </del></span>');
                    container.append(Global.AutoBind(data, $('<del>'), 'TotalAmount', 2)).append('<br>');
                } else {
                    data.Discount = 0;
                }
                container.append(Global.AutoBind(data, $('<span class="SearchFont SearchPrice">'), 'NetAmount', 2));
                data.TotalAmount = data.UnitSalePrice.mlt(data.Quantity);
                data.NetAmount = (data.TotalAmount - data.Discount.mlt(data.TotalAmount).div(100));
            };
            function createDltBtn(container, data) {
                container.append($('<td>').append(Global.Click($('<a href="#"><i class="fa fa-times text-danger"></i></a>'), onDelete, data, false, container)));
            };
            function create(data, noSave) {
                var container = view.DataContainer;
                container.append(container = $('<tr>'));
                container.append('<td><img src="/Content/assets/images/med.jpg"></td>');
                createName(container, data);
                createQnt(container, data);
                createTotal(container, data);
                createDltBtn(container, data);
                list.push(data);
                AppBase.Saver.SetText(data);
                saveCartBox(noSave);
            };
            this.Render = function (container) {
                view.Container = container;
                list = [];
                container.append(container = $('<div class="cart-body text-center">'));
                container.append(container = $('<div class="cart-table-wrap">'));
                container.append('<span>Happy Shopping!! </span>');
                container.append(container = $('<table style="width: 100%; font-size: 11px;" class="cart-table">'));
                container.append(view.DataContainer = $('<tbody>'));
                //localStorage.setItem('mycart', null);
                var data = AppBase.Saver.GetObject('mycart');

                //console.log(['list11 => ', data]);
                if (data.length > 0) {
                    data.each(function () {
                        create(this, true);
                        //console.log(['list => ', Global.Copy({}, this, true)]);
                    });
                }
            };
            this.Add = function (data, func) {
                var model = list.where("itm=>itm.Id=='" + data.Id + "'")[0];
                if (!model) {
                    view.DataContainer.append(li = $('<tr>'));
                    li.append('<td conspan="5"><img src="/Content/IqraService/Img/loading_line.gif" /></td>');
                    if (window.ProductDetails && ProductDetails.Get) {
                        li.remove();
                        ProductDetails.Get(data.Id, function (response) {
                            response.Data.Quantity = data.Quantity || 1;
                            create(response.Data);
                            onChange(response.Data);
                            func && func(response);
                        }, function () {
                            li.remove();
                        });
                    } else {
                        li.remove();
                        create(data);
                        onChange(data);
                    }
                } else {
                    alert('Already Added');
                    return false;
                }
                return true;
            };
        }).call(view.Body = {}, view);
        this.Render = function (container) {
            view.Container = container;
            container.append(container = $('<div class="cart-box-view" style="">'));
            container.append(container = $('<div class="cart-box-inner-view">'));
            setCartHeader(container);
            view.Body.Render(container);
            setCartFooter(container);
            updateSummary();
        };
        this.Add = function (data, func) {
            return view.Body.Add(data, func);
        };
    }).call(view.Details = {}, view);
    (function (parent) {
        var view = { Parent: parent };
        function animateComplete(div) {
            div.css('borderSpacing', 0.6).animate(
                {
                    borderSpacing: 0
                },
                {
                    step: function (now, fx) {
                        div.css({
                            'transform': 'scale(' + now + ')'
                        });
                    },
                    duration: 200,
                    complete: function () {
                        //div.remove();
                    },
                });
        };
        function animateScaleUp(div) {
            div.css('borderSpacing', 0.2).animate(
                {
                    borderSpacing: 0.6
                },
                {
                    step: function (now, fx) {
                        div.css({
                            'transform': 'scale(' + now + ')'
                        });
                    },
                    duration: 250,
                    complete: function () {
                        animateComplete(div);
                    },
                });
        };
        function animate(elm, evnt) {
            var offset = elm.offset(),
                trgt = $(evnt.currentTarget),
                x = evnt.clientX - evnt.offsetX - elm.width() + trgt.width(),
                y = evnt.clientY - evnt.offsetY - trgt.offset().top + offset.top,
                div = $('<div class="animator" style="width:' + elm.width() + 'px; height:' + elm.height() + 'px; left: ' + x + 'px; top:' + y + 'px;">');
            div.append(elm.html() + '');
            elm.parent().append(div);
            var left = x, top = y;
            x = (window.innerWidth - 60 - x - elm.width() / 2) / 0.8,
                y = (window.innerHeight / 2 - y + 55 - elm.height() / 2) / 0.8;

            //console.log([evnt, offset, evnt.clientX, evnt.offsetX]);

            div.css('borderSpacing', 1).animate(
                {
                    borderSpacing: 0.2
                },
                {
                    step: function (now, fx) {
                        div.css({
                            'transform': 'scale(' + now + ')',
                            left: (left + x * (1 - now)) + 'px',
                            top: (top + y * (1 - now)) + 'px'
                        });
                        //console.log(['', now, 1 - now]);
                    },
                    duration: 'slow',
                    complete: function () {
                        animateScaleUp(div);
                    },
                });
        };
        this.Animate = function (elm, evnt) {
            animate(elm, evnt);
        };
    }).call(view.Animator = {}, view);
            
    this.Render = function (container) {
        container.append(container = $('<div class="cart_box_container cart_info">'));
        view.Container = container;
        createInfo(container);
        view.Details.Render(container);
        //console.log(['CartBox => container', container]);
    };
    this.Referesh = function () {
        container = view.Container.empty();
        container.append(container = $('<div class="cart_box_container cart_info">'));
        createInfo(container);
        view.Details.Render(container);
        //console.log("Refresh", container);
    };
    this.Add = function (data, elm, evnt) {
        //console.log([data, elm, evnt]);
        if (view.Details.Add(data, function () {
            //AppBase.CartBox.Referesh();
        })) {
            elm && elm.append && evnt && evnt.clientY && view.Animator.Animate(elm, evnt);
        }
    };
}).call(AppBase.CartBox = {}, AppBase.Component);
(function (cmpnt) {
    var view = { Container: AppBase.Container = $(document.body) };
    (function (parent) {
        var view = { Parent: parent };
        (function (parent) {
            var view = { Parent: parent };
            function setNavTopLink(container) {
                container.append(elm = $('<div class="col-md-6">'));
                elm.append('<p class="fa fa-phone" style="padding-right: 13px;padding-left: 13px">' + ' ' + '<span style="font-family: sans-serif;">'+ AppService.Text.Header.Phone +'</span>'+ '</p>');
                elm.append('<p class="fa fa-envelope-o" style="padding-right: 10px" >' + ' ' + '<span style="font-family: sans-serif;">' + AppService.Text.Header.EmailText + '</span>'+ '</p>');
                container.append(elm = $('<div class="col-md-6 hide_on_mobile">'));
                elm.append('<p class="fa pull-right" style="margin-right:20px; font-family: sans-serif;">' + ' ' + AppService.Text.Header.Slogan + '</p>');

            };
            //function setSupportLink(container) {
            //    container.append(container = $('<div class="support-link">'));
            //    container.append('<a href="' + AppService.Link.Header.Service + '">' + AppService.Text.Header.Service + '</a>');
            //    container.append('<a href="' + AppService.Link.Header.Support + '">' + AppService.Text.Header.Support + '</a>');
            //};
            (function (parent) {
                var view = { Parent: parent }, userModel;
                function onLogOut(container) {
                    container.html('<img src="/Content/IqraService/Img/loading_line.gif" />');
                    Global.CallServer('/Account/LogOff', function (response) {
                        if (!response.IsError) {
                            localStorage.setItem('userInf', '');
                            setLogin(container);
                        } else {
                            alert(response.Msg || 'Errors!!!');
                            container.html('<div class="danger">Errors !!!</div>');
                        }
                    }, function (response) {
                        response.Id = -8;
                        container.html('<div class="danger">Network Errors !!!</div>');
                    }, {}, 'POST');
                };
                function logout(container) {
                    //console.log(['logout', container]);
                    localStorage.setItem('userInf', '');
                    setLogin(container);
                };
                function login(container) {
                    window.AppComponents && window.AppComponents.LogIn.Render(function (response) {
                        //console.log(['response', ])
                    });
                };
                function setLogin(container) {
                    //container.empty();
                    //var model = cmpnt.UserInfo.Get(), elm;
                    //view.LogInContainer = container;
                    //container.append(elm = $('<li>'));
                    //if (model) {
                    //    elm.append(Global.Click($('<a>My Account</a>'), function () {
                    //        AccountDashboard.Render(BodyParent.Container, 1);
                    //        $(document).click();
                    //    }));
                    //    elm.append($('<li>').append(Global.Click($('<a>My Order</a>'), function () {
                    //        AccountDashboard.Render(BodyParent.Container, 3);
                    //        $(document).click();
                    //    })));
                    //    container.append(elm = $('<li>'));
                    //    elm.append($('<a href="/Account/LogOff">Logout</a>'));
                    //    //            <li><a href="#">Wishlists</a></li>
                    //} else {
                    //    elm.append(Global.Click($('<a>Login</a>'), login));
                    //}
                };
                this.Get = function () {
                    var text = localStorage.getItem('userInf');
                    if (text && text.length > 5) {
                        return JSON.parse(text);
                    }
                };
                this.Set = function (func) {
                    //Global.CallServer('/CustomerArea/Customer/GetInfo', function (response) {
                    //    if (!response.IsError) {
                    //        localStorage.setItem('userInf', JSON.stringify(response.Data));
                    //        setLogin(view.LogInContainer);
                    //        func && func(response.Data);
                    //    } else {
                    //        logout(view.LogInContainer);
                    //    }
                    //}, function (response) {
                    //    response.Id = -8;
                    //}, {}, 'GET');
                };
                this.Render = function (container) {
                    view.Container = container;
                    //container.append(container = $('<div id="user-info-top" class="user-info pull-right col-md-4" style="padding: 0px;">'));
                    //container.append(container = $('<div class="dropdown">'));
                    //container.append('<a class="current-open" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#"><span>' + AppService.Text.Header.MyAccount + '</span></a>');
                    //container.append(container = $('<ul id="login_info" class="dropdown-menu mega_dropdown" role="menu">'));
                    //setLogin(container);
                    return view.Container
                };
                this.Set();
            }).call(view.UserInfo = cmpnt.UserInfo = {}, view);
            this.Render = function (container) {
                view.Container = container;
                container.append(container = $('<div class="row top-header">'));
                container.append(container = $('<div class="top_header_content">'));
                setNavTopLink(container);
                //setSupportLink(container);
                view.UserInfo.Render(container);
                return view.Container
            };
        }).call(view.Top = {}, view);
        (function (parent) {
            var view = { Parent: parent }, self = {}, btnUpload;
            function logo(container) {
                container.append(container = $('<div class="col-xs-12 col-sm-3 logo">'));
                container.append(container = Global.Click($('<a href="#">'), function () {
                    BodyParent.View.Home.Render(BodyParent.Container);
                }));
                container.append('<img alt="Lazz Pharma Limited" src="' + AppService.Img.Header.Logo + '">');
            };
            (function (parent) {
                var view = { Parent: parent }, timeOutEvnt, lastText, resultContainer,
                    filterModel = { "field": "Name", "value": "", "Operation": 6 }, sltCategory,
                    ctgrFilter = { "field": "Name", "value": "", "Operation": 6 }, filter = [], availability;

                function showMore(container) {
                    container.append(Global.Click($('<tr><td colspan="3" class="text-center"><a> Show More</a></td></tr>'), function () {
                        //filter
                        BodyParent.View.Search.Render(BodyParent.Container, filter, filterModel.value);
                    }));
                };
                function showNoData(container) {
                    container.append('<tr><td colspan="3" class="text-center"><strong> No Data Found </strong></td></tr>');
                };
                function addToCard(evnt, item) {
                    //console.log(['addToCard', item, this]);
                    AppBase.CartBox.Add(item, this.closest('tr'), evnt);
                    //window.MainHeader && MainHeader.Cart.Set(item);
                };
                function create(container, item) {
                    var oldPrice = '', price = item.UnitSalePrice,tr='';
                    if (item.Discount > 0) {
                        price = item.UnitSalePrice - item.UnitSalePrice.mlt(item.Discount).div(100);
                        oldPrice = '<del style="color:red; font-weight: normal;white-space: nowrap;">৳ ' + item.UnitSalePrice.toMoney() + '</del>';
                    }
                    //container.append($('<tr>').append('<td class="text-center" width="20%"><img style="width: 40px; height: 40px;min-width:50px;" src=" ' + AppBase.GetImagePath(item, 'Icons', '/Content/assets/images/med.jpg') + '"></td>')
                    //    .append(Global.Click($('<td width="60%"><a href="' + AppService.Link.Header.ProductDetail + item.Id + '"><span class="SearchProductName SearchFont">' + item.Name + ' ' + (item.Strength || '') + '</span> ' + oldPrice + '<span class ="current_price"> ৳ ' + price.toMoney() + '</span><sub class="unit_text"></sub><br><span class ="gen_style">' + item.Suplier + ', Type - ' + item.Category + '</span></td>'), function () {
                    //        container.hide();
                    //        ProductDetails.Render(item);
                    //    }, item))
                    //    .append($('<td width="20%"></td>').append(AppBase.Click($('<button class="button form-control" type="button" style="padding: 0px 15px 0px 15px !important; min-width:150px; background: #04432e;"><i class="fa fa-shopping-cart icon-cart"></i> Add to Cart</button>'), addToCard, item))));

                    availability = '';
                    //if (item.TotalStock > 0) {
                    //    availability = '&nbsp;<span class= "search_in_stock"> In Stock </span>';
                    //} else {
                    //    availability = '&nbsp;<span class= "search_out_stock"> Out of Stock </span>';
                    //}
                    container.append($('<tr>').append('<td width="10%"><img class= "search_img" src=" ' + AppBase.GetImagePath(item, 'Icons', '/Content/assets/images/med.jpg') + '"></td>')
                        .append(Global.Click($('<td width="60%"><a href="' + AppService.Link.Header.ProductDetail + item.Id + '"><span class="SearchProductName SearchFont">' + item.Name + ' ' + (item.Strength || '') + '</span> ' + oldPrice + '<span class ="search_current_price"> ৳ ' + price.toMoney() + '</span> ' + availability + ' <br><span class ="search_gen_style">' + item.GenericName + ', <span style="font-weight: bold;">' + item.Category + '</span></span><br><span class ="search_gen_style">' + item.Suplier + '</span></a></td>'), function () {
                            container.hide();
                            ProductDetails.Render(item);
                        }, item))
                        .append(tr = $('<td width="20%" style="text-align:center; vertical-align:middle"></td>')));
                    //if (item.TotalStock > 0) {
                        tr.append(AppBase.Click($('<button class="search_button" type="button"><i class="fa fa-shopping-cart icon-cart" style="vertical-align: unset;"></i><span class="search_btn_text"> Add to Cart </span></button>'), addToCard, item));
                    //} else {
                    //    tr.append('<button class="search_button" type="button" style="opacity: 0.4;cursor: default;"><i class="fa fa-shopping-cart icon-cart" style="vertical-align: unset;"></i><span class="search_btn_text"> Add to Cart </span></button>');
                    //}
                };
                function setSearchResult(data) {
                    var item;
                    resultContainer.empty();
                    if (data.length == 0) {
                        showNoData(resultContainer);
                        return;
                    }
                    data.each(function (i) {
                        if (i < 6) {
                            item = {
                                "Id": this[0],
                                "Name": this[1],
                                "GenericName": this[2],
                                "Strength": this[3],
                                "UnitSalePrice": this[4],
                                "Discount": this[5],
                                "ImagePath": this[6],
                                "ImageType": this[7],
                                "Category": this[8],
                                "Suplier": this[9],
                                "TotalStock": this[10],
                            };
                            create(resultContainer, item);
                        }
                    });
                    if (data.length > 6) {
                        showMore(resultContainer);
                    }
                    resultContainer.show();
                };
                function search(filter, text) {

                    var query;
                    if (text) {
                        query = [];
                        text.split(' ').each(function () {
                            text = (this + '').trim();
                            if (text && text.length > 0) {
                                query.push(text);
                            }
                        });
                        if (query.length == 0) {
                            query = none;
                        }
                    }

                    btnUpload.addClass('loading');
                    Global.CallServer('/ProductArea/Product/Search', function (response) {
                        btnUpload.removeClass('loading');
                        if (!response.IsError) {
                            setSearchResult(response.Data);
                        } else {

                        }
                    }, function (response) {
                        response.Id = -8;
                    }, { 'PageNumber': 1, 'PageSize': 7, Query: query }, 'POST');
                };
                function setFilter() {
                    if (filter.length < 1) {
                        return
                    }
                    var list = [];
                    filter.each(function () {
                        if (this.field != 'Name') {
                            list.push(this);
                        }
                    });
                    Global.Copy(filter, list, true);
                    filter.length = list.length;

                };
                function onSearch(text, input) {
                    if (text == lastText) {
                        return;
                    }

                    setFilter();
                    if (text) {
                        filterModel.value = text;
                        filter.push(filterModel);
                    }
                    //if (sltCategory.val() && sltCategory.val() != 'All Categories') {
                    //    ctgrFilter.value = sltCategory.val();
                    //    filter.push(ctgrFilter);
                    //}
                    //console.log(['lastText = text', filter, lastText == text, lastText, text]);
                    lastText = text;
                    (AppHeader.Component.SearchProduct || search)(filter, text);
                };
                function setEvent(resultContainer, input) {
                    var isPrevent = false;
                    $(document).click(function (e) {
                        resultContainer.hide();
                    });
                    resultContainer.mousedown(prevent).click(prevent);
                    //console.log(['container', resultContainer]);
                    input.focus(function () {
                        if (!AppHeader.Component.IsSearchPage) {
                            resultContainer.show();
                        }
                    }).blur(function () {
                        if (isPrevent) {
                            isPrevent = false;
                        } else {
                            resultContainer.hide();
                        }
                    }).click(prevent).keyup(function (e) {
                        if (e.keyCode == 13 || e.which == 13 || (e.keyCode > 36 && e.keyCode < 41) || (e.which > 36 && e.which < 41)) {
                            return;
                        }
                        if (timeOutEvnt) {
                            clearTimeout(timeOutEvnt);
                        }
                        timeOutEvnt = setTimeout(function () { onSearch(input.val().trim(), input); }, 150);
                    });
                };

                function setEnterEvent(resultContainer, input) {
                    $('.input-serach input').on('keypress', function (e) {
                        return e.which !== 13;
                    });

                    //$('input').bind("enterKey", function (e) {
                    //    BodyParent.View.Search.Render(BodyParent.Container, filter, filterModel.value);
                    //});
                    //$('input').keyup(function (e) {
                    //    if (e.keyCode == 13) {
                    //        $(this).trigger("enterKey");
                    //    }
                    //});
                }


                //function setCategory(container) {
                //    container.append(container = $('<div class="form-group form-category">'));
                //    container.append(container = sltCategory = $('<select id="slt_select_category" class="select-category">'));


                //did it previously 
                //container.append($('<option value="All Categories">All Categories</option>'));
                //container.select2({
                //    ajax: {
                //        url: '/ProductArea/ProductCategory/GetSearchFilter',
                //        data: function (params) {
                //            var query = {
                //                search: params.term
                //            }
                //            // Query parameters will be ?search=[term]&type=public
                //            return query;
                //        },
                //        delay: 150, // wait 250 milliseconds before triggering the request
                //        processResults: function (data) {
                //            return {
                //                results: [{ "id": 'All Categories', "text": "All Categories" }].concat(data.Data)
                //            };
                //        },
                //    }
                //});
                //};
                function setSearch(container) {
                    container.append(container = $('<div class="form-group input-serach">'));
                    container.append(container = $('<input id="txt_product_search" autocomplete="off" type="text" placeholder="Search by Trade or Generic Name..." style="font-size: 16px">'));
                    return container;
                };
                this.Render = function (container) {
                    container.append(container = $('<div class="col-xs-7 col-sm-7 header-search-box">'));
                    container.append(container = $('<form class="form-inline">'));
                    //setCategory(container);
                    var input = setSearch(container);

                   

                    container.append(btnUpload = Global.Click($('<button type="button" class="pull-right btn-search"></button>'), function () { }));
                    container.append(container = $('<table cellspacing="0" class="table table-bordered table-striped SearchTable">'));
                    container.append(resultContainer = $('<tbody style="font-size:0.7em;">'));
                    setEvent(resultContainer, input);
                    setEnterEvent(resultContainer, input)
                };
            }).call(view.Search = {}, view);
            this.Render = function (container) {
                view.Container = container;
                container.append(container = $('<div class="container main-header">'));
                container.append(container = $('<div class="row">'));
                logo(container);
                view.Search.Render(container);
                return view.Container
            };
        }).call(view.Main = {}, view);
        return this.Render = function (container) {
            view.Container = container;
            container.append(container = $('<div id="header" class="header">'));
            view.Top.Render(container);
            view.Main.Render(container);
            view.Container.append(AppBase.BodyContent = $('<div id="body_parent">'));
            return view.Container
        };
    }).call(view.Header = {}, view)(view.Container);
}).call(AppHeader, AppHeader.Component);



