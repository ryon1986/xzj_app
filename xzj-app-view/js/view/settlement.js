var repeat = true;
var Settlement = {
	load:function(receiver_id){
		$("#receiver-container").tmpl("receiver",const_server_url+"1/address/default.json?receiver_id="+receiver_id,function(){
			var receiverId = $("#receiver_id").val();
			ShoppingCart.settlemet(receiverId);
		});
	},
	placeOrder:function(){
		var user_id = $("#user_id").val();
		var receiver_id = $("#receiver_id").val();
		if(receiver_id==-99){
			mui.toast("请选择地址");
			return false;
		}
		if(!repeat){
			mui.toast("重复下单");
			return false;
		}
		if(!$(".cart-tips").is(":hidden")){
			mui.toast("金额超标");
			return false;
		}
		var order_memo = $("#order_memo").val();
		if(order_memo.length > MEMO_LENGTH){
			mui.toast("订单备注不超过128个字");
			return false;
		}
		repeat = false;
		$.post(const_server_url+"1/order/placeOrder.json",
			{
				"receiver_id":receiver_id,
				"user_id":user_id,
				"order_memo":order_memo
			},function(data){
				if(data.code=="200"){
					var orderSuccess = plus.webview.getWebviewById('orderSuccess');
					mui.fire(orderSuccess,'orderSuccess-refresh',{order_no:data.order_no,isdo:"true"});
					var index = plus.webview.getWebviewById('index');
					mui.fire(index,'set',{num:0,isdo:"true"});
					var shoppingCart = plus.webview.getWebviewById('shoppingCartList');
					mui.fire(shoppingCart,'shoppingCartList-refresh',{isdo:"true"});
					mui.back();
					mui.openWindow({
					    id: 'orderSuccess'
					});
				}else if(data.code=="300"){
					mui.toast("下单失败");
				}
			},"json");
	}
}

