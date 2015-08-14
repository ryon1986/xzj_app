var OldShop = {
	doSwitchShop: function(obj) {
		//判断购物车是否有商品
		$.get(const_server_url + "/1/shopping/find.json", function(data) {
			if (data.num != '0') {
				var btnArray = ['是', '否'];
				mui.confirm('当前操作将清空购物车？', '警告', btnArray, function(e) {
					if (e.index == 0) {
						var agency_no = $(obj).attr("lang");
						$.get(const_server_url + "/1/center/updateDefaultShop.json?agency_no=" + agency_no, function(data) {
							//切换成功，就跳转到首页
							if (data.code == "200") {
								var indexView = plus.webview.getWebviewById('index');
								var mainView = plus.webview.getWebviewById('main');
								mui.fire(indexView, 'topPageMain', {
									isRefresh: "true"
								});
								mui.openWindow({
									id: 'index'
								});
								var categoryListView = plus.webview.getWebviewById('categoryList');
								mui.fire(categoryListView, 'categoryList-refresh', {
									isdo: "true"
								});
								mui.alert(data.message);
							} else {
								mui.alert(data.message);
							}
						});
					}
				});
			} else {
				var agency_no = $(obj).attr("lang");
				$.get(const_server_url + "/1/center/updateDefaultShop.json?agency_no=" + agency_no, function(data) {
					//切换成功，就跳转到首页
					if (data.code == "200") {
						var indexView = plus.webview.getWebviewById('index');
						var mainView = plus.webview.getWebviewById('main');
						mui.fire(indexView, 'topPageMain', {
							isRefresh: "true"
						});
						mui.openWindow({
							id: 'index'
						});
						var categoryListView = plus.webview.getWebviewById('categoryList');
						mui.fire(categoryListView, 'categoryList-refresh', {
							isdo: 'true'
						});
						mui.toast(data.message);
					} else {
						mui.alert(data.message);
					}
				});
			}
		});
	},
	init: function() {
		$(".J_location-list").tmpl('shopList', const_server_url + "/1/center/visitedShopsList.json");
	}

};