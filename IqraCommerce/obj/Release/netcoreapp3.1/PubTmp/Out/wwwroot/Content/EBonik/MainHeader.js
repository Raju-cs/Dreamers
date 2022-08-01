
var MainHeader = { Cart: {}, Wishlist: {} };
(function () {
    var service = {}, sltCategory = $('#slt_select_category');
    function prevent(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    (function () {
        var lengthArr = ['', '0', '00', '000', '0000', '00000', '000000'];
        var maxLengthArr = [0, 9, 99, 999, 9999, 99999, 999999, 9999999];
        function setText(text, digit) {
            text = text + '';
            var length = (text.length + '').length;
            if (length > digit) {
                text = text.substring(0, maxLengthArr[digit]);
                return (text.length - 1) + text;
            }
            return lengthArr[digit - length] + (text.length - 1) + text;
        };10
        function setNumber(num, digit) {
            num = num + '';
            var length = (num.length + '').length;
            if (length > digit) {
                num = num.substring(0, maxLengthArr[digit]);
                return (num.length - 1) + num;
            }
            return lengthArr[digit - length] + (num.length - 1) + num;
        };
        function getText(model, text, digit) {
            var length = parseInt(text.substring(model.index, model.index + digit), 10) + 1;
            model.index += digit;
            var text = text.substring(model.index, model.index + length);
            model.index += length;
            return text;
        };
        function getNumber(model, text, digit) {
            var length = parseInt(text.substring(model.index, model.index + digit), 10) + 1;
            model.index += digit;
            var num = parseFloat(text.substring(model.index, model.index + length));
            model.index += length;
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
            item.Text = setText(item.Id, 2);
            item.Text += setNumber(item.UnitSalePrice, 1);
            item.Text += setNumber(item.Quantity || 1, 1);
            item.Text += setNumber(item.Discount || 0, 1);
            item.Text += setNumber(item.UnitConversion || 1, 1);
            item.Text += setText(item.Suplier || ' ', 2);
            item.Text += setText(item.GenericName||' ', 2);
            item.Text += setText(item.Strength || ' ', 2);
            item.Text += setText(item.Category, 2);
            item.Text += setText(item.SalesUnitType, 2);
            item.Text += setText(item.Code, 2);
            item.Text += setText(item.Name, 2);

            return item.Text;
        };
        this.Save = function (text, name) {
            localStorage.setItem(name, text);
        };
    }).call(service.Saver = {});
    (function () {
        var self = {}, timeOutEvnt, lastText,
            filterModel = { "field": "Name", "value": "", "Operation": 6 },
            ctgrFilter = { "field": "Name", "value": "", "Operation": 6 }, filter = [];

        function onSearch(text, input) {
            if (text == lastText) {
                return;
            }

            filter = [];
            if (text) {
                filterModel.value = text;
                filter = [filterModel];
            }
            if (sltCategory.val() && sltCategory.val() != 'All Categories') {
                ctgrFilter.value = sltCategory.val();
                filter.push(ctgrFilter);
            }
            console.log(['lastText = text', filter, lastText == text, lastText, text]);
            lastText = text;
            Global.CallServer('/ProductArea/Product/Search', function (response) {
                if (!response.IsError) {
                    self.View.Create(response.Data);
                } else {

                }
            }, function (response) {
                response.Id = -8;
            }, { 'PageNumber': 1, 'PageSize': 10, filter: filter }, 'POST');
        };
        (function () {
            var input = $('#txt_product_search').keyup(function (e) {
                if (e.keyCode == 13 || e.which == 13 || (e.keyCode > 36 && e.keyCode < 41) || (e.which > 36 && e.which < 41)) {
                    return;
                }
                if (timeOutEvnt) {
                    clearTimeout(timeOutEvnt);
                }
                timeOutEvnt = setTimeout(function () { onSearch(input.val().trim(), input); }, 150);
            });
        })();
        (function (view) {
            var container = $('#search_result_container').empty();
            function addToCard(item) {
                console.log(['addToCard', item, this]);
                window.MainHeader && MainHeader.Cart.Set(item);
            };
            function create(container, item) {
                container.append($(`<tr>`).append(`<td class="text-center"><img style="width: 40px; height: 40px;min-width:50px;" src="/Content/assets/images/med.jpg"></td>`)
                    .append(Global.Click($(`<td><span class="SearchProductName SearchFont">` + item.Name + `</span> <del style="color:red; font-weight: normal;">৳ ` + item.UnitSalePrice.toMoney() + `</del><span class ="current_price"> ৳ ` + item.UnitSalePrice.toMoney() + `</span><sub class="unit_text"></sub><br><span class ="gen_style">Company -Octapharma/Hyeimpex, Type -Injection</span></td>`), function () {
                        container.hide();
                        ProductDetails.Render(item);
                    }, item))
                    .append($(`<td></td>`).append(Global.Click($(`<button class="button form-control" type="button" style="padding: 0px 15px 0px 15px !important; min-width:150px; background: #04432e;"><i class="fa fa-shopping-cart icon-cart"></i> Add to Cart</button>`), addToCard, item))));
            };
            (function () {
                var isPrevent = false;
                $(document).click(function (e) {
                    container.hide();
                    console.log(['$(document).click', e]);
                });
                container.mousedown(prevent).click(prevent);
                console.log(['container', container]);
                $('#txt_product_search').focus(function () { container.show(); }).blur(function () {
                    if (isPrevent) {
                        isPrevent = false;
                    } else {
                        container.hide();
                    }
                }).click(prevent);
            })();
            view.Create = function (data) {
                container.empty();
                data.each(function () {
                    create(container, this);
                });
                container.show();
            };
        })(self.View = {});
    }).call(service.Search = {});
    (function () {
        $(document).ready(function () {
            sltCategory.select2({
                ajax: {
                    url: '/ProductArea/ProductCategory/GetSearchFilter',
                    data: function (params) {
                        var query = {
                            search: params.term
                        }
                        // Query parameters will be ?search=[term]&type=public
                        return query;
                    },
                    delay: 150, // wait 250 milliseconds before triggering the request
                    processResults: function (data) {
                        return {
                            results: [{ "id": 'All Categories', "text": "All Categories" }].concat(data.Data)
                        };
                    },
                }
            });
        });
    }).call(service.Category = {});
    (function () {
        var selfService = {}, items = [], store, totalAmount = 0, container = $('#cart-block'), count = container.find('#cart_block_list_count').empty(), totalElm = container.find('#cart_block_total').empty(), countTitle = container.find('#cart_block_list_count_title').empty();
        container = container.find('#cart_block_list_container').empty();
        function onRemove(data, li) {
            li.remove();
            var list = [], txt = '';
            totalAmount = 0;
            items.each(function () {
                if (this.Id != data.Id) {
                    list.push(this);
                    totalAmount += this.UnitSalePrice;
                    txt += this.Text;
                }
            });
            console.log([]);
            service.Saver.Save(txt, 'mycart');
            items = list;
            countTitle.html(items.length + ' Items in my cart');
            count.html(items.length);
            totalElm.html(totalAmount.toMoney());
        };
        function pLeft(li, data) {
            var pleft;
            li.append(pleft = $('<div class="p-left">'));
            pleft.append(Global.Click($('<a href="#" class="remove_link">'), onRemove, data, false, li));
            pleft.append(`<a href="#">
                                        <img class="img-responsive" src="/Content/assets/data/product-100x122.jpg" alt="p10">
                                    </a>`);
        };
        function pRight(li, data) {
            li.append(li = $(`<div class="p-right">
                                    <p class ="p-name"> `+ data.Name + ` </p>
                                    <p class ="p-rice"> `+ data.UnitSalePrice.toMoney() + ` €</p>
                                </div>`));
            //<p>Qty: 1</p>
            li.append($(`<p>Qty: </p>`).append(Global.AutoBind(data, $(`<span>`), 'Quantity', 2)));
            data.Quantity = data.Quantity || 1;
            console.log([li, data]);
        };
        function create(li, data, elm, noSave) {
            li.empty();
            pLeft(li, data);
            pRight(li, data);
            items.push(data);
            countTitle.html(items.length + ' Items in my cart');
            count.html(items.length);
            totalAmount += data.UnitSalePrice;
            totalElm.html(totalAmount.toMoney());
            service.Saver.SetText(data);
            if (!noSave) {
                var txt = '';
                items.each(function () {
                    txt += this.Text;
                });
                service.Saver.Save(txt, 'mycart');
            }
        };
        service.MyCart.Set = MainHeader.Cart.Set = function (data, elm, noSave) {
            var li, exist = items.where('itm=>itm.Id=="' + data.Id + '"')[0];
            if (exist) {
                exist.Quantity++;
                return;
            }
            container.append(li = $('<li class="product-info">'));
            li.append('<img src="/Content/IqraService/Img/loading_line.gif" />');
            if (window.ProductDetails && ProductDetails.Get) {
                ProductDetails.Get(data.Id, function (response) {
                    create(li, response.Data, elm, noSave);
                }, function () {
                    li.remove();
                });
            } else {
                create(li, data, elm, noSave);
            }
        };
        MainHeader.Cart.Get = function () {
            return service.Saver.GetObject('mycart');
        };
        (function () {
            var list = service.Saver.GetObject('mycart');
            console.log(['my cart', list]);
            $(document).ready(function () {
                Global.Click($('#btn_checkout'), Checkout.Render);
            });
            list.each(function () {
                service.MyCart.Set(this, false, true)
            });
        })();
    }).call(service.MyCart = {});
    (function () {
        var selfService = {}, items = [], store, totalAmount = 0;
        //var container = $('#cart-block'),
        //    count = container.find('#cart_block_list_count').empty(),
        //    totalElm = container.find('#cart_block_total').empty(),
        //    countTitle = container.find('#cart_block_list_count_title').empty();
        //container = container.find('#cart_block_list_container').empty();
        function onRemove(data, li) {
            li.remove();
            var list = [], txt = '';
            totalAmount = 0;
            items.each(function () {
                if (this.Id != data.Id) {
                    list.push(this);
                    totalAmount += this.UnitSalePrice;
                    txt += this.Text;
                }
            });
            service.Saver.Save(txt, 'mywishlist');
            items = list;
            countTitle.html(items.length + ' Items in my cart');
            count.html(items.length);
            totalElm.html(totalAmount.toMoney());
        };
        function pLeft(li, data) {
            var pleft;
            li.append(pleft = $('<div class="p-left">'));
            pleft.append(Global.Click($('<a href="#" class="remove_link">'), onRemove, data, false, li));
            pleft.append(`<a href="#">
                                        <img class="img-responsive" src="/Content/assets/data/product-100x122.jpg" alt="p10">
                                    </a>`);
        };
        function pRight(li, data) {
            li.append(`<div class="p-right">
                                    <p class ="p-name"> `+ data.Name + ` </p>
                                    <p class ="p-rice"> `+ data.UnitSalePrice.toMoney() + ` €</p>
                                    <p>Qty: 1</p>
                                </div>`);
        };
        service.MyWishlist.Set = MainHeader.Wishlist.Set = function (data, elm, noSave) {
            var li;
            container.append(li = $('<li class="product-info">'));
            pLeft(li, data);
            pRight(li, data);
            items.push(data);
            countTitle.html(items.length + ' Items in my cart');
            count.html(items.length);
            totalAmount += data.UnitSalePrice;
            totalElm.html(totalAmount.toMoney());
            service.Saver.SetText(data);
            if (!noSave) {
                var txt = '';
                items.each(function () {
                    txt += this.Text;
                });
                service.Saver.Save(txt, 'mywishlist');
            }
        };
        (function () {
            var list = service.Saver.GetObject('mywishlist');
            console.log(['mywishlist', list]);
            list.each(function () {
                service.MyWishlist.Set(this, false, true)
            });
        })();
    }).call(service.MyWishlist = {});
})();