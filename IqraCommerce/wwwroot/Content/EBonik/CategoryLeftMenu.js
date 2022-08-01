

//(function () {
//    var container;
//    function setSection(list, from, increment, container) {
//        var ul;
//        container.append($('<div class="mega-group col-sm-4">').append(ul = $('<ul class="group-link-default">')));
//        increment += from;
//        for (var i = from; i < list.length && i < increment; i++) {
//            ul.append('<li><a href="#">' + list[i].Name + '</a></li>');
//        }
//    };
//    function setSubCategory(list, li) {
//        var container;
//        li.append($('<div class="vertical-dropdown-menu">').append(container = $('<div class="vertical-groups col-sm-12">')));
//        var increment = 4;
//        if (list.length > 12) {
//            increment = Math.ceil(list.length / 3);
//        }
//        for (var i = 0; i < list.length; i += increment) {
//            setSection(list, i, increment, container);
//        }
//    };
//    function setCategory(model) {
//        var cls = model.SubCategory ? 'parent' : '', li = $('<li><a class="' + cls + '" href="#"><img class="icon-menu" alt="Funky roots" src="/Content/assets/data/13.png">' + model.Name + '</a></li>')
//        container.append(li);
//        model.SubCategory && setSubCategory(model.SubCategory, li)
//    };
//    function createView(list) {
//        container = $('#category_left_menu').empty();
//        list.each(function () {
//            setCategory(this);
//        });
//    };
//    function setData(list) {
//        console.log(['GetMenu', list]);
//        var dic = {};
//        list[1].each(function () {
//            if (!dic[this.ProductCategoryId]) {
//                dic[this.ProductCategoryId] = [];
//            }
//            dic[this.ProductCategoryId].push(this);
//        });
//        list[0].each(function () {
//            this.SubCategory = dic[this.Id];
//        });
//        createView(list[0]);
//    };
//    (function () {
//        Global.CallServer('/ProductArea/ProductCategory/GetMenu', function (response) {
//            if (!response.IsError) {
//                setData(response.Data);
//            } else {
               
//            }
//        }, function (response) {
//            response.Id = -8;
//        }, {}, 'GET');
//    })();
//})();