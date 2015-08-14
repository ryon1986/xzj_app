(function($){
	
	//渲染一个模板（适用于不分页的情况）
	$.fn.tmpl = function(templateId, url,callback) {
		var mydom = this;
		mydom.html("");
		$.getJSON(url,function(data){
		var template = $("#"+templateId).html();
        mydom.html(doT.template(template).apply(null,[data]));
        moneyInit();
        if(callback)
        {
        	callback();
        }
 	    });
	};
	
	//渲染到分页模板上
	$.fn.pagetmpl = function(templateId, url,callback) {
		var mydom = this;
		$.getJSON(url,function(data){
			var template = $("#"+templateId).html();
	        mydom.append(doT.template(template).apply(null,[data]));
	        moneyInit();
	        if(callback)
	        {
	        	callback();
	        }
     	});
	};
	var moneyInit = function(){
		$(".money-init").each(function(){
			var money = $(this).text();
			if(money.indexOf("￥")>=0){
				money = money.substring(1,money.length);
				money = parseFloat(money).toFixed(2);
				$(this).text("￥"+money);
			}else{
				money = parseFloat(money).toFixed(2);
				$(this).text(money);
			}
		})
	}
})(jQuery)