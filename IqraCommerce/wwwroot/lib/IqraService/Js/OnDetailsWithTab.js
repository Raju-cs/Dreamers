var Controller=new function(n){function e(){t&&t.Hide()}function f(n){return n.replace(/[A-Z]/g,function(n){return" "+n})}function o(n,r,u){typeof r=="function"&&(r=r(i.model,t));t.Wait("Please wait while loading data....");Global.CallServer(r,function(i){t.Free();i.IsError||(n.onloaded=n.onloaded||n.onload,n.onloaded&&n.onloaded(n,i.Data,n.formmodel),u(i.Data))},function(n){n.Id=-8;t.Free()},null,"Get")}var r={},t,u={},i;this.Show=function(n){i=n;setNonCapitalisation(n);t?(t.Show(),r.Tab.Bind()):Global.LoadTemplate(n.template||"/Templates/OnDetailsWithTab.html",function(f){t=Global.Window.Bind(f,{width:i.width||(window.innerWidth<500?"99%":"90%")});Global.Form.Bind(u,t.View);n.title&&(u.title=n.title);t.View.find(".btn_cancel").click(e);t.Show();r.Tab.Bind()},noop)},function(){function c(){r.each(function(){this.button.elm.removeClass("in active");this.View.removeClass("in active")})}function s(t,i){t.AllColumns.each(function(){typeof i[this.field]!=typeof n&&(this.type==1?t.formmodel[this.field]=(i[this.field]||0).toFloat():this.type==2?t.formmodel[this.field]=(i[this.field]||0).toMoney():this.type==3||this.dateformat?i[this.field]?t.formmodel[this.field]=(i[this.field]+"").getDate().format(this.dateformat||"yyyy/MM/dd hh:mm"):"":typeof i[this.field]=="undefined"?"":t.formmodel[this.field]=i[this.field])});t.onpopulated&&t.onpopulated(t,i)}function h(n){c();n.button.elm.addClass("active");n.View.addClass("in active");n.grid&&n.grid.each(function(){this.IsCreated?this.Model.Reload():this.GridModelCreators()});n.model&&n.columns&&n.columns.length&&s(n,n.model);n.detailsurl&&o(n,n.detailsurl,function(t){s(n,t)})}function l(n,r){typeof n.button=="function"?n.button={elm:n.button(n,u,t,i)}:typeof n.button=="string"?n.button={elm:$(n.button)}:typeof n.button=="object"&&(setNonCapitalisation(n.button),n.button={elm:$("<li"+(n.button.class?' class="'+n.button.class+'"':"")+"><a>"+(n.button.title||f(n.button.name||"Tab_"+r))+"<\/a><\/li>")});typeof n.button.elm=="string"&&(n.button.elm=$(n.button.elm))}function a(n,t){n.button?l(n,t):n.button={elm:$("<li><a>"+(n.title||f(n.name||"Tab_"+t))+"<\/a><\/li>")};u.Button.append(n.button.elm);Global.Click(n.button.elm,h,n)}function v(){t.TabContainer=u={Button:t.View.find(".nav-tabs"),Content:t.View.find(".tab-content")};r=[];i.Tabs.each(function(n){this.PositionIndex=n;setNonCapitalisation(this);a(this,n);e.Content.Create(this);this.Bind=function(){h(this)};r.push(this);this.TabModel=this});r[i.selected]&&r[i.selected].Bind()}var r,u,e={};this.Bind=function(){i.selected=i.selected||0;r?(i.Tabs.each(function(n){setNonCapitalisation(this);r[n].detailsurl=this.detailsurl;r[n].model=this.model}),r[i.selected]&&r[i.selected].Bind()):v()},function(){function o(n,t,i){var r=n.class||n.classname||"",u=' class="'+(r?r+" ":"")+'col-sm-6 col col-md-6" style="width:'+i+'%" ';r=r?r+" ":"";switch(t){case 1:u=' class="'+r+'col-sm-12 col col-md-12" ';break;case 2:u=' class="'+r+'col-sm-6 col col-md-6" ';break;case 3:u=' class="'+r+'col-sm-4 col col-md-4" ';break;case 4:u=' class="'+r+'col-sm-3 col col-md-3" ';break;case 6:u=' class="'+r+'col-sm-2 col col-md-2" '}return u}function s(n,t){var u="",i=Global.Copy(Global.Copy({},n.add||{},!0),n.details||{}),r;if(i.sibling=i.sibling||2,r=parseInt(100/i.sibling),t.width-=r,t.width<0&&(t.width=100-r,u='<\/div><div class="row">'),i.template)return u+i.template;var f=n.required==!1?"":"required ",e=n.dateFormat?'data-dateformat="'+n.dateFormat+'" ':"",s=f+'data-binding="'+n.field+'" name="'+n.field,h="<span "+e+s+'" class="form-control auto_bind"><\/span>';return u+"<section "+o(n,i.sibling,r)+'><div><label for="'+n.field+'">'+n.title+'<\/label><\/div><div class="input-group">'+h+" <\/div><\/section>"}function f(t,i){t.each(function(){setNonCapitalisation(model);this.field=this.title=this.Id.replace(/id\s*$/i,"");this.isDropDown=!0;this.position=typeof this.position=="undefined"?n:this.position;i.push(this);this.change&&f([this.change],i)})}function e(t,i){setNonCapitalisation(t);t.detail!=!1&&(t.title=t.title||t.field,t.position=typeof t.position=="undefined"?n:t.position,i.push(Global.Copy({},t)))}function h(n,t){setNonCapitalisation(n);e(n,t)}function c(n){var i='<div class="columns_container"><div class="row">',r={width:100},t;n.columns=n.columns||[];n.dropdownlist=n.dropdownlist||[];n.additionalfield=n.additionalfield||[];t=n.AllColumns=[];n.columns.each(function(){e(this,t)});n.additionalfield.each(function(){h(this,t)});f(n.dropdownlist,t);t.orderBy("position");t.each(function(){this.detail!=!1&&this.details!=!1&&(i+=s(this,r))});n.ColumnView=$(i+"<\/div><\/div>");n.formmodel=n.formmodel||{};Global.Form.Bind(n.formmodel,n.ColumnView);n.View.append(n.ColumnView)}var n=1e3,r={};this.Create=function(n){n.View=$(n.View||'<div class="tab-pane fade"><\/div>');u.Content.append(n.View);c(n);r.Grid.Create(n)},function(){function u(t,r,u,f){u.View=$(u.template||'<div class="grid_section"><div class="filter_container row" style="margin:10px 0;"><\/div><div class="summary_container row" style="margin:10px 0;"><\/div><div class="empty_style button_container row"><\/div><div class="margin-top-10 grid_container"><\/div><\/div>');r.append(u.View);(u.buttons||[]).each(function(r){setNonCapitalisation(this);n=$(this.html||'<a style="margin-right: 5px;margin-left: 5px;" class="btn btn-default btn-round pull-right"><span class="glyphicon '+(this.class||"glyphicon-open")+'"><\/span> '+(this.text||this.title||this.name||"Button_"+r)+" <\/a>");u.View.find(this.selector||".button_container").append(n);Global.Click(n,this.click||void 0,{Button:this,Grid:u,Tab:t,options:i})});u.onviewcreated&&u.onviewcreated(u.View,u,f)}function f(n){this.IsDeleted&&(n.css({color:"red"}).find(".glyphicon-trash").css({opacity:.3,cursor:"default"}),n.find("a").css({color:"red"}));this.UpdatedAt&&n.find(".updator").append("<\/br><small><small>"+this.UpdatedAt.getDate().format("dd/MM/yyyy hh:mm")+"<\/small><\/small>");this.CreatedAt&&n.find(".creator").append("<\/br><small><small>"+this.CreatedAt.getDate().format("dd/MM/yyyy hh:mm")+"<\/small><\/small>")}function e(n,t,i){n.FilterModels={};(i||[]).each(function(){n.FilterModels[this.field]=!0})}function r(n,t,i){var u,r;return u=typeof t.filter=="function"?t.filter(t,r):t.filter,page=t.page||{PageNumber:1,PageSize:10,showingInfo:" {0}-{1} of {2} Items ",filter:u},r=Global.Copy(Global.Copy({},t,!0),{elm:t.View.find(t.selector||".grid_container"),columns:typeof t.columns=="function"?t.columns(t,i):t.columns,url:t.url,page:page,dataBinding:function(n){t.ondatabinding&&t.ondatabinding(n)},rowBound:t.rowbound||f,onComplete:function(n){t.Model=n;t.oncomplete&&t.oncomplete(n)},Printable:t.printable||{Container:function(){return t.View.find(".button_container")}}},!0),r.Printable.Container=r.Printable.container=r.Printable.Container||r.Printable.container||function(){return t.View.find(".button_container")},e(t,r,u),r}function o(n,t,i){t.GridModelCreators=function(){t.IsCreated=!0;s(n,t,i);h(n,t,i);t.actions||t.isList?(t=r(n,t,i),t.onDataBinding=t.dataBinding,Global.List.Bind({Name:t.name,Grid:t,onComplete:t.complete,Add:t.add?t.add:!1,remove:t.remove?t.remove:!1,Edit:t.edit?t.edit:!1})):Global.Grid.Bind(r(n,t,i))}}function s(n,t,i){var r=t.periodic;r&&(setNonCapitalisation(r),r.container=r.container||r.selector,r.container=typeof r.container=="function"?r.container(t.View,i,t,n):typeof r.container=="string"?t.View.find(r.container):r.container||t.View.find(".filter_container"))}function h(n,t,i){t.summary&&(t.summary.New&&t.summary.each&&t.summary.orderBy&&(t.summary={items:t.summary}),setNonCapitalisation(t.summary),t.summary.container=typeof t.summary.container=="function"?t.summary.container(t.View,i,t,n):typeof t.summary.container=="string"?t.View.find(t.summary.container):t.summary.container||t.View.find(".summary_container"))}var n;this.Create=function(n){n.GridModelCreators=[];n.grid&&n.grid.each(function(i){if(typeof this=="function"){var r=n.grid[i]={Model:{Reload:noop},func:this};r.GridModelCreators=function(){r.IsCreated=!0;r.func(t,n.View,i,r.Model,function(t){n.grid[i].Model=t})}}else setNonCapitalisation(this),u(n,n.View,this,i),o(n,this,i)})}}.call(r.Grid={})}.call(e.Content={})}.call(r.Tab={})}