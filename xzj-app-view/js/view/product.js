var Product = {
	productInit:function(product_no,flag)
	{
		//商品详情
		showWaiting();
		$("#product-container").tmpl('product-tmpl',const_server_url+"1/product/detail.json?product_no="+product_no,function()
		{
			closeWaiting();
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:0
			});
			var detailPage =plus.webview.getWebviewById("productDetail");
			mui.fire(detailPage,'product_detail',{
				product_no:product_no,
				product_status:$('#product_status').val(),
				available_qty:$('#available_qty').val(),
				flag:flag,
				isdo:"true"
			});
		});
	},
	ProductDetaiInit:function(product_no,product_status,available_qty)
	{
		showWaiting();
		$("#cart-container").tmpl('cart-tmpl',const_server_url+"1/shopping/find.json",function(){
		  	closeWaiting();
		  	if(product_status == "0"){
		 		$('#addCartCount').attr("disabled","disabled");
		 		$('#addCartCount').text("商品已下架");
		 		$('#addCartCount').attr("data-result","1");
		 	}
		  	if(available_qty <= 0){
		  		$('#addCartCount').attr("disabled","disabled");
		  		$('#addCartCount').text("商品已售罄");
		  		$('#addCartCount').attr("data-result","2");
		  	}
		  	$('#addCart').val(product_no);
		});
	},
	categoryInit:function()
	{
		//分类
		showWaiting();
		$("#category-container").tmpl('category-tmpl',const_server_url+"1/product/categoryList.json",function(){
			closeWaiting();
		});
	},
	groupInit:function(param,index)
	{
		//搜索结果 or 分组商品页
		showWaiting();
		$('#cateTitle').show();
		$('#pullrefresh').show();
		$('.searh-none').hide();
		if(index == 1){
			$('#cateTitle').text(param);
		}else{
			$("#cateTitle").tmpl('param-tmpl',const_server_url+"1/product/getItemName.json?param="+param);
		}
		$("#cart-container").tmpl('cart-tmpl',const_server_url+"1/shopping/find.json");
		$("#product-container").tmpl('product-item',const_server_url+"1/product/groupMore.json?param="+param+"&index="+index,function(data){
			closeWaiting();
			if($(".product-li").size()<10){
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			}else{
				mui('#pullrefresh').pullRefresh().refresh(true);
			}
			if($('#list_size').val() <= 0){
				var html = "<div class='searh-none'>";
				html += "<span class='iconfont icon-zanwushangpin'></span>";
				html += "<p style='color:#6e6c6d;margin-top:25px'>无此搜索结果</p>";
				html += "<p style='font-size: 12px;'>没有找到相关的商品</p>";
				html += "</div>";
				$('.cateList-title').hide();
				$('#pullrefresh').hide();
				$('.mui-content').show();
				$('.mui-content').append(html);
			}
		});
	},
	pageMore:function(param,index){
		var product_id;
		if(index=='1'){
			product_id = $(".product-li:last").attr("product_id");
		}else{
			product_id = $(".product-li:last").attr("product_sort");
		}
		$("#product-container").pagetmpl("product-item",const_server_url+"1/product/groupMore.json?param="+param+"&index="+index+"&product_id="+product_id,function(){
			var size = $(".list-size:last").val();
			if(size < 10){
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			}else{
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			}
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
									$('#cart-container').html("<span class='mui-badge'>"+num+"</span>");
									var index = plus.webview.getWebviewById('index');
								    mui.fire(index,'set',{num:num});
								    mui.toast("已加入购物车");
								}else{
									mui.toast("操作失败");
								}
							},'json');
						}else{
							mui.toast('系统错误');
						}
					},'json'); 
				}
			}
		},'json');
	},
	addCartCount:function(product_no,qty)
	{
		$.post(const_server_url+"1/shopping/add.json?product_no="+product_no+"&qty="+qty,function(data){
			if(data.code == '200'){
				$.get(const_server_url+"1/shopping/find.json",function(data){
					if(data.code == '200'){
						var num = data.num;
						var index = plus.webview.getWebviewById('index');
					    mui.fire(index,'set',{num:num});
					    var productDetail = plus.webview.getWebviewById('productDetail');
					    mui.fire(productDetail,'set',{num:num});
					    var productCategoryMain = plus.webview.getWebviewById('productCategoryMain');
					    mui.fire(productCategoryMain,'set',{num:num});
					    mui.toast("已加入购物车");
					}else{
						mui.toast("操作失败");
					}
				},'json');
			}else{
				mui.toast(data.message);
			}
		},'json'); 
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
	toCartPage:function()
	{
		var index =plus.webview.getWebviewById("index");
		mui.fire(index,'topPage',{isRefresh:"true"});
		mui.openWindow({
		    id:'index' 
		});
	}
}
