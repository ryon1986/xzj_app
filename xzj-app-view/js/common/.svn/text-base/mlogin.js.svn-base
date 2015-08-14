// 用户信息
var m_login = {
	//获取短信验证码
	getSmsCode: function(mobile) {
		m_login.clear();
		$.ajax({
			url: const_server_url + "/1/login/getCode",
			data: {
				mobile: mobile,
				device_id: this.getDeviceId()
			},
			type: "get",
			cache: false,
			success: function(data) {},
			beforeSend: function(xhr) {}
		})
	},
	// 登录 mobile手机号 code短信验证码 device_id设备号 login_type(auto自动登录获取 默认不填写)
	login: function(mobile, code, login_type) {
		var token_time = new Date().getTime();
		$.ajax({

			url: const_server_url + "/1/login/doLogin",

			data: {
				mobile: mobile,
				code: code,
				device_id: this.getDeviceId(),
				login_type: login_type
			},
			type: "post",
			async: false,
			cache: false,
			success: function(data) {
				//自动登录失败跳转到登录页面重新获取验证码
				if (data.code == "10003" && login_type == "auto") {
					m_login.toLogin();
					return;
				}
				if (data.code == "200") {
					m_login.clear();
					//存储手机号 二维码 token
					m_login.setMobile(mobile);
					m_login.setCode(code);
					m_login.setToken(data.token);
					m_login.setTokenTime(token_time + "");
					if (data.page == "location") {
						m_login.toLocation();
					} else {
						m_login.toIndex();
					}
				} else {
					mui.alert(data.message);
				}

			},
			beforeSend: function(xhr) {}
		})
	},
	autoLogin: function() {
		if (this.hasLogin()) {
			m_login.login(this.getMobile(), this.getCode(), "auto");
		} else {
			m_login.toLogin();
		}
	},
	toLogin: function() {
		m_login.clear();
		mui.openWindow({
			url: '/view/user/registerPhone.html',
			id: 'registerPhone'
		})
	},
	toIndex: function() {
		mui.openWindow({
			url: '/index.html',
			id: 'index'
		})
		var index = plus.webview.getWebviewById('index');
		mui.fire(index, 'topPageMain', {isRefresh: "true"});
		var location1 = plus.webview.getWebviewById('location');
		if(location1){
			location1.close();
		}
	},
	toLocation: function() {
		mui.openWindow({
			url: '/view/user/location.html',
			id: 'location'
		})
	},
	//清除登录信息
	clear: function() {
		window.localStorage.removeItem('mobile');
		window.localStorage.removeItem('code');
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('lastTokenTime');
	},
	//检查是否已登录
	hasLogin: function() {
		var mobile = this.getMobile();
		var code = this.getCode();
		var token = this.getToken();
		if (!mobile && !code && !token) {
			return false;
		}
		return true;
	},
	//检测token 是否过期
	checkTokenExpired: function() {
		//当前时间减去上次获取token时间 是否大于过期时间
		if (this.getTokenTime() == null || ((new Date().getTime()) - this.getTokenTime()) >= const_token_expire) {
			this.autoLogin();
			return true;
		} else {
			return false;
		}
	},
	//检测是否绑定店铺
	checkHasAgency: function() {
		var flag = 0;
		$.ajax({
			url: const_server_url + "/1/login/checkHasAgency.json",
			type: "get",
			async: false,
			cache: false,
			success: function(data) {
				if (data.code == '200') {
					flag = 1;
				} else if (data.code == '10004') {
					flag = 0
				} else {
					flag = 2;
				}
			}
		})
		return flag;
	},
	//判断跳转
	checkRedirect: function(){
		if(m_login.hasLogin())
		   {
		   		var flag=m_login.checkHasAgency();
		   		if(flag=='1'){
		   			m_login.toIndex();
		   		}else if(flag=='0'){
		   			m_login.toLocation();
		   		} 
	       }else{
	       		m_login.setDeviceId(plus.device.uuid);
	       		m_login.toLogin();
	       }
	},
	getDeviceId: function() {
		return window.localStorage.getItem('deviceId');
	},
	setDeviceId: function() {
		window.localStorage.setItem('deviceId', arguments[0]);

	},
	getMobile: function() {
		return window.localStorage.getItem('mobile');
	},
	setMobile: function() {
		window.localStorage.setItem('mobile', arguments[0]);
	},
	getCode: function() {
		return window.localStorage.getItem('code');
	},
	setCode: function() {
		window.localStorage.setItem('code', arguments[0]);
	},
	getToken: function() {
		return window.localStorage.getItem('token');
	},
	setToken: function() {
		window.localStorage.setItem('token', arguments[0]);
	},
	//获取token时间戳 保存下来 用来判断token 是否过期 减少请求次数
	setTokenTime: function() {
		window.localStorage.setItem('lastTokenTime', arguments[0]);
	},
	getTokenTime: function() {
		return window.localStorage.getItem('lastTokenTime');
	}
};