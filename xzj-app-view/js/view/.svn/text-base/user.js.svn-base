var User = {
	loaded:function(){
		showWaiting();
		$(".user-order-menu").tmpl('my_center',const_server_url+"/1/center/myCenter.json",function(){
		});
		$(".j_user_service").tmpl('myService',const_server_url+"/1/center/serviceMobile.json",function(){
			closeWaiting();
		});
	},
	doPOI:function(){
		mui.openWindow({
			url: 'location.html',
		    id:'location'
        });
	},
	//退出登录
	doLogout:function(){
		var btnArray = ['再逛逛','是的'];
		mui.confirm('你确定退出登录吗？', '提示', btnArray, function(e) {
			if (e.index == 1) {
				$.get(const_server_url+"/1/login/logout.json",function(data){
					if(data.code == "200"){
						m_login.clear();
						mui.openWindow({
						    id:"registerPhone"
				  	    });
					}else{
						mui.alert(data.message);
					}
				});
	        }
		}); 
	}
};
