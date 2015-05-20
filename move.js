function getStyle(obj,name) {
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}
function move(obj,json,options) {
	options=options||{};
	options.easing = options.easing||'ease-out';
	options.duration = options.duration||700;
	var start = {};
	var dis = {};
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])) {
			switch(name) {
				case 'left':
					start[name] = obj.offsetLeft;
					break;
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'width':
					start[name] = obj.offsetWidth;
					break;
				case 'height':
					start[name] = obj.offsetHeight;
					break;
			}
		}
		dis[name] = json[name]-start[name];
	}
	clearInterval(obj.timer);
	var n = 0;
	var count = Math.round(options.duration/30);
	obj.timer = setInterval(function() {
		n++;
		for(var name in json) {
			switch(options.easing) {
				case 'linear':
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			if(name=='opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			} else {
				obj.style[name] = cur+'px';
			}
		}
		if(n==count) {
			clearInterval(obj.timer);
			options.complete&&options.complete.call(obj);
		}
	},30);
}

















