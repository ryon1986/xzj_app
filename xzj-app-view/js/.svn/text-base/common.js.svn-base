function setTab(config){
	var root = config.root;
	var currentClass = config.currentClass;
	var trigger = config.trigger || "click";
	var handler = config.handler;
	var autoPlay = config.autoPlay;
	var playTime = config.playTime || 3000;
	var tabMenus = $("#"+root+" .J_tab-menu");
	var tabContents = $("#"+root+" .J_tab-content");
	var currentIndex = 0;
	function showItem(n){
		tabContents.each(function(){
			$(this).css("display","none")
		})
		$(tabContents[n]).css("display","block")
		if(currentClass){
			var currentMenu = $("#"+root+" ."+currentClass)[0];
			if(currentMenu){
				$(currentMenu).removeClass(currentClass);	
			}
			$(tabMenus[n]).addClass(currentClass);
		}
		if(handler){
			handler(n);
		}
	}
	function autoHandler(){
		currentIndex++;
		if(currentIndex >= tabMenus.length){
			currentIndex = 0;	
		}
		showItem(currentIndex);
	}
	if(autoPlay){
		setInterval(autoHandler,playTime);
	}
	tabMenus.each(function(i){
		this._index = i;
		$(this).bind(trigger,function(){
			showItem(this._index);	
			currentIndex = this._index;
		})	
	})
	
}