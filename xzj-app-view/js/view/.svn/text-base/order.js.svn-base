var residue = true;
var Order = {
	listLoad:function(order_status,search){
		showWaiting();
		if(typeof(search)=="undefined"){
			search='';
		}
		$("#target-container").tmpl("orderList",const_server_url+"1/order/list.json?order_status="+order_status+"&search="+search,function(){
			closeWaiting();
			if($(".orderStatus-list").size()==0){
				$(".orderList-noOrder").show();
				$("#pullrefresh").hide();
			}else{
				$(".orderList-noOrder").hide();
				$("#pullrefresh").show();
				if($(".orderStatus-list").size()<10){
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}else{
					mui('#pullrefresh').pullRefresh().refresh(true);
				}
			}
		});
	},
	page:function(){
		var order_status = $("#order_status").val();
		var search = $("#search").val();
		var order_id = $(".orderStatus-list:last").attr("order-id");
		$("#target-container").pagetmpl("orderList",const_server_url+"1/order/list.json?order_status="+order_status+
			"&order_id="+order_id+"&search="+search,function(){
			var count = $(".orderSize:last").val();
			if(count<10){
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
			}else{
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
			}
		});
	},
	detailLoad:function(order_no,callback){
		showWaiting();
		$("#orderDetail-container").tmpl("orderDetail",const_server_url+"1/order/detail.json?order_no="+order_no,function(){
			closeWaiting();
			if(callback){
				callback();
			}
		});
	},
	logisticsLoad:function(order_no){
		showWaiting();
		$("#logistics-container").tmpl("logistics-tmpl",const_server_url+"1/order/express.json?order_no="+order_no,function(){
			closeWaiting();
		});
	},
	repeatBuy:function(orderNo){
		showWaiting();
		$.post(const_server_url+"1/order/repeatBuy.json",{"order_no":orderNo},
			function(data){
				if(data.code=="200"){
					var index = plus.webview.getWebviewById('index');
					mui.fire(index,'topPage',{isRefresh:"true",isdo:"true"});
					mui.toast("操作成功");
					mui.openWindow({
					    id:'index'
				    });
				}else{
					mui.toast(data.message);
					closeWaiting();
				}
			},"json");
	},
	cancel:function(orderNo,callback){
		$.post(const_server_url+"1/order/cancel.json",{"order_no":orderNo},
			function(data){
				if(data.code=="200"){
					callback();
					mui.toast("操作成功");
				}
			},"json");
	},
	skipAgency:function(product_no,agency_no,callback){
		showWaiting();
		$.get(const_server_url+"1/shopping/find.json",function(data){
			closeWaiting();
			if(data.code == '200'){
				var content = '';
				if(data.num > 0){
					content = '是否切换门店,将清空购物车';
				}else{
					content = '是否切换门店';
				}
				var btnArray = ['确定','取消'];
				mui.confirm(content,'温馨提示',btnArray,function(e){
					if( e.index == 0){
						$.post(const_server_url+"1/product/skipAgency.json?product_no="+product_no+"&agency_no="+agency_no,function(data){
							if(data.code == "200"){
								if(product_no!=''){
									var detailPage =plus.webview.getWebviewById("productDetail_main");
									//触发详情页面的productNo事件
									mui.fire(detailPage,'productNo',{
										product_no:product_no,
										flag:1,
										isdo:"true"
									});
									//打开商品详情页面
									mui.openWindow({
									    id:'productDetail' 
									});
								}else{
									var mainView = plus.webview.getWebviewById('main');
									mui.fire(mainView,'main-refresh',{isdo:"true"});
									var categoryListView = plus.webview.getWebviewById('categoryList');
									mui.fire(categoryListView,'categoryList-refresh',{isdo:"true"});
								}
								if(callback){callback();}
								var status = $("#order_status").val();
								var orderList =plus.webview.getWebviewById("orderList");
								mui.fire(orderList,'order-refresh',{status:status,isdo:"true"});
							}else{
								mui.toast(data.message);
							}
						},'json');
					}else{
						return;
					}
				});
			}else{
				mui.toast('系统异常');
			}
		},'json');
	}
}
//订单详情
$("body").on("tap",".order-detail",function(){
	var orderNo = $(this).find("input").val();
	var orderDetail = plus.webview.getWebviewById('orderDetail');
	mui.fire(orderDetail,'detail-refresh',{order_no:orderNo,isdo:"true"});
    mui.openWindow({
	    id:'orderDetail'
    });
});
//查看物流
$("body").on("tap",".Logistics",function(){
	var orderNo = $(this).val();
	var logistics = plus.webview.getWebviewById('logistics');
	mui.fire(logistics,'logistics-refresh',{order_no:orderNo,isdo:"true"});
    mui.openWindow({
	    id:'logistics'
    });
});
//再次购买
$("body").on("tap",".repeat-buy",function(){
	var order_no = $(this).val();
	var agency_no = $(this).attr("agency_no");
	if(agency_no == "-99"){
		Order.repeatBuy(order_no);
	}else{
		Order.skipAgency('',agency_no,function(){
			Order.repeatBuy(order_no);
		});
	}
});
//付款
$("body").on("tap",".pay-order",function(){
	var orderNo = $(this).val();
	var orderSuccess = plus.webview.getWebviewById('orderSuccess');
	mui.fire(orderSuccess,'orderSuccess-refresh',{order_no:orderNo,isdo:"true"});
    mui.openWindow({
	    id:'orderSuccess'
    });
});
