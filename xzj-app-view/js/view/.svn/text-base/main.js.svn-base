//扫一扫
function scaned(result)
{
	var agency_no = result.substring(result.indexOf("agency_no=")+"agency_no=".length);
	var local_agency_no = $('#agency_no').val();
	if(result.indexOf("agency_no=") >= 0){
		if(agency_no == local_agency_no){
			if(result.indexOf("product_no=") >= 0){
				var product_no = result.substring(result.indexOf("product_no=")+"product_no=".length, result.indexOf("&agency_no="));
				Home.productDetail(product_no);
			}else if(result.indexOf("user_id=") >= 0){
				var user_id = result.substring(result.indexOf("user_id=")+"user_id=".length, result.indexOf("&agency_no="));
				$.get(const_server_url+"1/product/richScanAgency.json?user_id="+user_id+"&agency_no="+agency_no,function(data2){
					if(data2.code == "200"){
						Home.init();
					}else{
						mui.toast('操作失败');
					}
				},'json');
			}else{
				return;
			}
		}else{
			if(result.indexOf("product_no=") >= 0){
				var product_no = result.substring(result.indexOf("product_no=")+"product_no=".length, result.indexOf("&agency_no="));
				$.get(const_server_url+"1/shopping/find.json",function(data){
					if(data.code == '200'){
						if(data.num > 0){
							var btnArray = ['确定','取消'];
							mui.confirm('是否清空购物车','温馨提示',btnArray,function(e){
								if( e.index == 0){
									$.get(const_server_url+"1/product/richScanProduct.json?product_no="+product_no+"&agency_no="+agency_no,function(data2){
										if(data2.code == "200"){
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
											mui.toast('切换店铺失败');
										}
									},'json');
								}else{
									return;
								}
							});
						}else{
							$.get(const_server_url+"1/product/richScanProduct.json?product_no="+product_no+"&agency_no="+agency_no,function(data2){
								if(data2.code == "200"){
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
									mui.toast('切换店铺失败');
								}
							},'json');
						}
					}else{
						alert('系统异常!');
					}
				},'json');
				
				}else if(result.indexOf("user_id=") > 0){
					var user_id = result.substring(result.indexOf("user_id=")+"user_id=".length, result.indexOf("&agency_no="));
					var agency_no = result.substring(result.indexOf("agency_no=")+"agency_no=".length);
					$.get(const_server_url+"1/shopping/find.json",function(data){
						if(data.code == '200'){
							if(data.num > 0){
								var btnArray = ['确定','取消'];
								mui.confirm('是否清空购物车','温馨提示',btnArray,function(e){
									if( e.index == 0){
										$.get(const_server_url+"1/product/richScanAgency.json?user_id="+user_id+"&agency_no="+agency_no,function(data2){
											if(data2.code == "200"){
												var categoryListView = plus.webview.getWebviewById('categoryList');
												mui.fire(categoryListView,'categoryList-refresh',{isdo:"true"});
												Home.init();
											}else{
												mui.toast('切换店铺失败');
											}
										},'json');
									}else{
										return;
									}
								});
							}else{
								$.get(const_server_url+"1/product/richScanAgency.json?user_id="+user_id+"&agency_no="+agency_no,function(data2){
									if(data2.code == "200"){
										var categoryListView = plus.webview.getWebviewById('categoryList');
										mui.fire(categoryListView,'categoryList-refresh',{isdo:"true"});
										Home.init();
									}else{
										mui.toast('切换店铺失败');
									}
								},'json');
							}
						}else{
							mui.toast('系统异常');
						}
					},'json');
				}
		}
	}
}
		
var Home = {
	init:function() 
	{
		plus.nativeUI.showWaiting();
		$("#agency-container").tmpl('agency-tmpl',const_server_url+"1/product/getAgency.json",function(){
			$(".store_fullname").hide();
		});
		$("#target-container").tmpl('j-tmpl',const_server_url+"1/product/groupList.json",function(){
			plus.nativeUI.closeWaiting();
			$.get(const_server_url+"1/shopping/find.json",function(data){
				if(data.code == '200'){
					var num = data.num;
					var index = plus.webview.getWebviewById('index');
				    mui.fire(index,'set',{num:num});
				}else{
					mui.toast("操作失败");
				}
			},'json');
		});
	},
	addCart:function(product_no)
	{ 
		$.get(const_server_url+"1/product/detail.json?product_no="+product_no,function(param){
			if(param.code == "200"){
				var available_qty = param.product.available_qty;
				if(available_qty <= 0){
					mui.toast("商品无库存");
				}else{
					$.post(const_server_url+"1/shopping/add.json?product_no="+product_no,function(data){
						if(data.code == '200'){
							$.get(const_server_url+"1/shopping/find.json",function(data){
								if(data.code == '200'){
									var num = data.num;
								    var index = plus.webview.getWebviewById('index');
								    mui.fire(index,'set',{num:num});
								    mui.toast("已加入购物车");
							}
							},'json');
						}else{
							alert('无效的数据类型');
						}
					},'json'); 
				}
			}
		},'json');
	},
	productDetail:function(product_no,flag)
	{
		var detailPage =plus.webview.getWebviewById("productDetail_main");
		//触发详情页面的productNo事件
		mui.fire(detailPage,'productNo',{
			product_no:product_no,
			flag:flag,
			isdo:"true"
		});
		//打开商品详情页面
		mui.openWindow({
		    id:'productDetail' 
		});
	},
	groupMore:function(product_group_id)
	{
		var detailPage =plus.webview.getWebviewById("productCategory");
		mui.fire(detailPage,'product_category',{
			param:product_group_id,
			index:2,
			isdo:"true"
		});
		mui.openWindow({
		    id:'productCategory' 
		});
	},
	productSearch:function(search_content){
	    if(!!search_content.match(SPECIAL_CHAR)==false){
			mui.toast("搜索内容包含特殊字符");
			return false ;
		}
		var detailPage =plus.webview.getWebviewById("productCategory");
		mui.fire(detailPage,'product_category',{
			param:search_content,
			index:1,
			isdo:"true"
		});
		mui.openWindow({
		    id:'productCategory' 
		});
	}
}
