function jsonp(json) { //json.url,json.data,json.cbName,json.success,json.error
	json=json||{};
	if(!json.url) return;
	json.data = json.data||{};
	json.cbName = json.cbName||'cb';

	var fnName = ('json_p'+Math.random()).replace('.','');

	window[fnName] = function(data) {
		json.success&&json.success(data);
		oH.removeChild(oS);
	}
	json.data[fnName] = fnName;
	var arr = [];
	for(var name in json.data) {
		arr.push(name+'='+json.data[name]);
	}
	var oS = document.createElement('script');
	oS.src = json.url+'?'+arr.join('&');
	var oH = document.getElementsByTagName('header')[0];
	oH.appendChild(oS);
}