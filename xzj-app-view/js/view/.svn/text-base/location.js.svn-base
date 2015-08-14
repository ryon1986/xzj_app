Location = {
	load: function() {
		$(".J_location-list").tmpl('shopList', const_server_url + "/1/login/getShopsByIp");
	},
	//切换店铺
	doSwitchShop: function(obj) {
		var agency_no = $(obj).attr("lang");
		//切换成功，就跳转到首页
		$.get(const_server_url + "/1/login/addDefaultShop.json?agency_no=" + agency_no, function(data) {
			//切换成功，就跳转到首页     
			if (data.code == "200") {
				mui.openWindow({
					url: '/index.html',
					id: 'index'
				})
			    var index = plus.webview.getWebviewById('index');
					mui.fire(index,'topPageMain',{isRefresh:"true"});
			} else {
				mui.alert(data.message);
			}
		});
	},
	handleDistance: function(distance) {
		if (Number(distance) >= 1000) {
			return (Number(distance) / 1000).toFixed(3) + "千米";
		}
		return distance + "米";
	}

}