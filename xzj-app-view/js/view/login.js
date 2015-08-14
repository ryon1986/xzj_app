var Login =
{
	validate :function()
	{
		
		if(null==$("#mobile").val()||''==$("#mobile").val())
		{
			mui.alert("手机号码不能为空");
			return false ;
		}else if(!!$("#mobile").val().match(PHONE_REGION)==false)
		{
			mui.alert("手机号码格式不正确");
			return false;
		}
		return true;
	},
	register:function()
	{
		if(!Login.validate()) {return};
			mui.openWindow({
					id: 'registerCode',
					url: 'registerCode.html',
					show: {
						aniShow: 'pop-in'
					},
					waiting: {
						autoShow: false
					},
					extras:{
              			mobile:$("#mobile").val()
            	},
            	createNew:true
			}); 
	},
	changeCode:function()
	{
		if($("#code").val().length==4){
			$("#submitButton").attr('disabled',false);
			$("#submitButton").on('tap',Login.doLogin);
		}else{
			$("#submitButton").attr('disabled','disabled');
			$("#submitButton").unbind('tap');
		}
	},
	rewireGetSmsCode:function()
	{
		Login.countDown();
		m_login.getSmsCode(mobile);
		$("#rewire").attr('disabled','disabled');
		$("#rewire").unbind('tap');
	},
	countDown:function()
	{
		var i=59;
		var timer = setInterval(function(){
			if(i==0){ 
				$("#time").text("");
				$("#rewire").attr('disabled',false);
				clearInterval(timer);
				$("#rewire").on('tap',Login.rewireGetSmsCode)
			}else{
				$("#time").text("("+i+")");
			}
			i--;
		},1000)
	},
	doLogin:function()
	{
		$("#submitButton").attr('disabled','disabled');
		$("#submitButton").unbind('tap');
		m_login.login(mobile,$("#code").val(),"");
		setTimeout(function(){
			$("#submitButton").attr('disabled',false);
			$("#submitButton").on('tap',Login.doLogin);
		},2000)
	}
}
