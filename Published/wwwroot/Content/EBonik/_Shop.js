

(function () {
    var container, service = {};
    function createView(list) {
        container = $('#_shop_sub_category_list').empty();
        list.each(function () {
            container.append('<li><a href="#">'+this.Name+'</a></li>');
        });
    };
    function setData(list) {
        console.log(['GetMenu', list]);
        createView(list[1]);
        service.Tab.Bind(list[1][0]);
        $('#selected_category a').html(list[0][0].Name);
    };
    (function () {

    })();
    (function () {
        var container, self = {};
        function getTabs() {
            return {
                Items: [
                    {
                        Name: 'BestSalers', IsActive: true, title: 'Best salers', Url: '/ProductArea/Product/BestSale', filter: function () {
                            return [];
                        }
                    },
                    {
                        Name: 'Specials', title: 'Specials', Url: '/ProductArea/Product/Specials', filter: function () {
                            return [];
                        }
                    },
                    {
                        Name: 'NewArrival', title: 'NewArrival', Url: '/ProductArea/Product/NewArrival', filter: function () {
                            return [];
                        }
                    },
                    {
                        Name: 'OnSales', title: 'On Sales', Url: '/ProductArea/Product/OnSale', filter: function () {
                            return [];
                        }
                    }
                ]
            };
        };
        function setTabContent(tab) {
            tab.Content = $('<div class="tab-panel ' + (tab.IsActive ? 'active' : '') + '"><img src="/Content/IqraService/Img/loading_img.gif" /></div>');
            container.append(tab.Content);
            Global.CallServer(tab.Url, function (response) {
                if (!response.IsError) {
                    self.Content.Set(tab,response.Data);
                } else {

                }
            }, function (response) {
                response.Id = -8;
            }, {}, 'POST');
        };
        function setActive(tab, tabModel) {
            console.log(['setActive', tab, tabModel]);
            if (tab.IsActive) {
                return;
            }
            tab.IsActive = true;
            if (tabModel.Active) {
                tabModel.Active.IsActive = false;
                tabModel.Active.Button.removeClass('active');
                tabModel.Active.Content && tabModel.Active.Content.removeClass('active');
            }
            tabModel.Active = tab
            tab.Button.addClass('active');
            if (tab.Content) {
                tab.Content.addClass('active');
            } else {
                setTabContent(tab);
            }
        };
        this.Bind = function (model) {
            var tabButtonContainer = $('#sale_tab_button').empty(), tabModel = getTabs();
            container = $('#sale_tab_container').empty();
            tabModel.Items.each(function () {
                this.Button=$('<li class="'+(this.IsActive?'active':'')+'"><a>'+(this.title||this.Name)+'</a></li>');
                tabButtonContainer.append(this.Button);
                if (this.IsActive) {
                    this.IsActive = false;
                    setActive(this, tabModel);
                }
                Global.Click(this.Button, setActive, this, false, tabModel);
            });
        };
        (function () {
            function addToCart(container, data) {
                console.log(['addToCart', container, data]);
                window.MainHeader && MainHeader.Cart.Set(data, container);
                
            };
            function setMyWishlist(container, data) {
                console.log(['setMyWishlist', container, data]);
            };
            function addToCompare(container, data) {
                console.log(['addToCompare', container, data]);
            };
            function quickview(container, data) {
                console.log(['quickview', container, data]);
            };
            function setAddToCart(container, data) {
                
                container.append(Global.Click($(`<div class="add-to-cart">
                                                <a title="Add to Cart" href="#">Add to Cart</a>
                                            </div>`), addToCart, container, false, data));
            };
            function setQuickView(container,data) {
                container.append(Global.Click($('<a title="Add to my wishlist" class="heart" href="#"></a>'), setMyWishlist, container, false, data));
                container.append(Global.Click($('<a title="Add to compare" class="compare" href="#"></a>'), addToCompare, container, false, data));
                container.append(Global.Click($('<a title="Quick view" class="search" href="#"></a>'), quickview, container, false, data));
            };
            function setRightBlock(li,data) {
                li.append(li = $(`<div class="right-block">`)
                    .append($(`<h5 class ="product-name" title= "` + data.Name + `" >`)
                    .append(Global.Click($(`<a href= "/ProductArea/Product/Details?Id=` + data.Id + `" > ` + data.Name + ` </a>`), ProductDetails.Render, data)))
                                            );
                li.append(`<div class="content_price">
                                                <span class ="price product-price">$`+ data.UnitSalePrice.toMoney() + ` </span>
                                            </div>`);
                
            };
            function setLeftBlock(li, data) {
                var quickView, leftBlock;
                li.append(leftBlock = $('<div class="left-block">'));
                //ProductDetails.Render(data);
                leftBlock.append(Global.Click($(`<a href="/ProductArea/Product/Details?Id=` + data.Id + `">
                                                <img class="img-responsive" alt="product" src="/Content/assets/data/p61.jpg" />
                                            </a>`),ProductDetails.Render,data));
                leftBlock.append(quickView = $('<div class="quick-view">'));
                setQuickView(quickView, data);
                setAddToCart(leftBlock, data);
            };
            function setContent(ul,data) {
                var li;
                ul.append(li = $('<li class="col-sm-4">'));
                setRightBlock(li, data);
                setLeftBlock(li, data);
            };
            function setLeftPanel(container,data) {
                container.append(`<div class="box-left">
                                <div class="banner-img">
                                    <a href="#"><img src="/Content/assets/data/banner-product2.jpg" alt="Banner Product"></a>
                                </div>
                            </div>`);
            };
            function setRightPanel(container, data) {
                var ul;
                container.append($('<div class="box-right">').append(ul = $('<ul class="product-list row">')));
                data.each(function () {
                    setContent(ul, this);
                });
            };
            this.Set = function (tab, data) {
                tab.Content.empty();
                setLeftPanel(tab.Content, data);
                setRightPanel(tab.Content, data);
            };
        }).call(self.Content = {});
    }).call(service.Tab = {});
})();