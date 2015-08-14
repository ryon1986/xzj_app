//检测是否联网
setInterval(function (){
	if (navigator.onLine) {
	} else {
	  mui.toast('当前无网络可用');
	}
}, 1000);