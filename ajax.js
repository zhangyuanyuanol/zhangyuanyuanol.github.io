//版权 北京智能社©, 保留所有权利

function json2url(json){
	var arr = [];
	json.t = Math.random();
	for(var name in json){
		arr.push(name + "=" + json[name]);
	}
	return arr.join("&");
}

//options url,data,type,success,error,timeout
function ajax(options){
	
	options = options || {};
	options.data = options.data || {};
	options.type = options.type || "get";
	options.timeout = options.timeout || 0;
		
	if(!options.url){
		return ;
	}
	
	var str = json2url(options.data);
	
	//1 创建对象
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	
	if(options.type == "get"){
		xhr.open("get",options.url + "?" + str,true);
		xhr.send();
	} else {
		xhr.open("post",options.url,true);
		
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		 
		xhr.send(str);	
	}
	
	//4 接收
	xhr.onreadystatechange = function(){
		
		if(xhr.readyState == 4){//完成  并不代表成功
			
			//http状态  2xx  304
			clearTimeout(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){ 
				//xhr.responseText
				options.success && options.success(xhr.responseText); 
			} else {
				options.error && options.error();
			}
		}	
	}; 
	
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();
		},options.timeout);
	}
}