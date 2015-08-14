
var Address =
{
	Plugin:function()
	{
		document.getElementById("mySwitch").addEventListener("toggle",function(event){
				  if(event.detail.isActive){
				    	$("#stat").val(1);
					  }else{
					     $("#stat").val(0);
					  }
				});
			   
				var cityPicker3 = new mui.PopPicker({ 
						layer: 3
					}); 
					cityPicker3.setData(cityData3);
					
			
					$('#showCityPicker3').on('tap', function() {
						cityPicker3.show(function(items) {
							var result = items[0].text+" "  + items[1].text+" " + items[2].text; 
							$("#showCityPicker3").val(result);
							var result1=items[2].value;
							$("#city").val(result1);
						});
					});
					if($("#stat").val() != 1){
						mui("#mySwitch").switch();
					}
					
	},
	
	check: function()
	{
		if(null==$("#receiver_name").val()||''==$("#receiver_name").val().trim()){
			mui.toast("收货人姓名不能为空");
			return false ;
		}
		else if($("#receiver_name").val().length>NAME_LENGTH || $("#receiver_name").val().length<2){
			mui.toast("收货人姓名长度为2到"+NAME_LENGTH+"位");
			return false ;
		}
		else if(!!$("#receiver_name").val().match(SPECIAL_CHAR)==false){
			mui.toast("收货人姓名含有特殊字符");
			return false ;
		}
		else if(null==$("#receiver_mobile").val()||''==$("#receiver_mobile").val().trim())
		{
			mui.toast("手机号码不能为空");
			return false ;
		}else if(!!$("#receiver_mobile").val().match(PHONE_REGION)==false)
		{
			mui.toast("手机号码格式不正确");
			return false;
		}else if(null==$("#showCityPicker3").val()||''==$("#showCityPicker3").val())
		{
			mui.toast("所在地区不能为空");
			return false ;
		}else if(null==$("#receiver_address").val()||''==$("#receiver_address").val().trim()){
			mui.toast("详细地址不能为空");
			return false;
		}
		else if($("#receiver_address").val().length>ADDRESS_LENGTH || $("#receiver_address").val().length<5){
			mui.toast("详细地址长度为5到"+ADDRESS_LENGTH+"位");
			return false;
		}
		else if(!!$("#receiver_address").val().match(SPECIAL_CHAR)==false){
			mui.toast("详细地址含有特殊字符");
			return false ;
		}
		else if(null==$("#receiver_idcard").val()||''==$("#receiver_idcard").val().trim()){
			mui.toast("身份证号不能为空");
			return false;
		}
		else if(!getIdCardInfo($("#receiver_idcard").val())){
			mui.toast("身份证号格式不正确");
			return false;
		}
		return true;
	}
}

 	function getIdCardInfo(o) {
		var e = {
			isTrue : false,
			year : null,
			month : null,
			day : null,
			isMale : false,
			isFemale : false
		};
		if (!o && 15 != o.length && 18 != o.length) {
			e.isTrue = false;
			return e.isTrue
		}
		if (15 == o.length) {
			var k = o.substring(6, 8);
			var j = o.substring(8, 10);
			var l = o.substring(10, 12);
			var b = o.substring(14, 15);
			var n = new Date(k, parseFloat(j) - 1, parseFloat(l));
			if (n.getYear() != parseFloat(k) || n.getMonth() != parseFloat(j) - 1
					|| n.getDate() != parseFloat(l)) {
				e.isTrue = false
			} else {
				e.isTrue = true;
				e.year = n.getFullYear();
				e.month = n.getMonth() + 1;
				e.day = n.getDate();
				if (b % 2 == 0) {
					e.isFemale = true;
					e.isMale = false
				} else {
					e.isFemale = false;
					e.isMale = true
				}
			}
			return e.isTrue
		}
		if (18 == o.length) {
			var k = o.substring(6, 10);
			var j = o.substring(10, 12);
			var l = o.substring(12, 14);
			var b = o.substring(14, 17);
			var n = new Date(k, parseFloat(j) - 1, parseFloat(l));
			if (n.getFullYear() != parseFloat(k)
					|| n.getMonth() != parseFloat(j) - 1
					|| n.getDate() != parseFloat(l)) {
				e.isTrue = false;
				return e.isTrue
			}
			var c = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
			var a = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
			var h = 0;
			var g = o.split("");
			if (g[17].toLowerCase() == "x") {
					g[17] = 10
				}
				for (var f = 0; f < 17; f++) {
					h += c[f] * g[f]
				}
				var f = h % 11;
				if (g[17] != a[f]) {
					return e.isTrue = false
				}
				e.isTrue = true;
				e.year = n.getFullYear();
				e.month = n.getMonth() + 1;
				e.day = n.getDate();
				if (b % 2 == 0) {
					e.isFemale = true;
					e.isMale = false
				} else {
					e.isFemale = false;
					e.isMale = true
				}
				return e.isTrue
			}
			return e.isTrue
		}




