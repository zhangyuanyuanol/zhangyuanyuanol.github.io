// JavaScript Document
function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l,top:t};
}

function addMouseWheel(obj,fn){
	var down = false;
	if(window.navigator.userAgent.indexOf("firefox") != -1){
		obj.addEventListener("DOMMouseScroll",function(ev){
			var oEvt = ev || event;
			if(oEvt.detail>0){
				down = true;
			}else if(oEvt.detail<0){
				down = false;
			}
			oEvt.preventDefault && oEvt.preventDefault();
			fn(down);
			return false;
		},false)
	}else{
		obj.onmousewheel = function(ev){
			var oEvt = ev || event;
			if(oEvt.wheelDelta>0){
				down = false;
			}else if(oEvt.wheelDelta<0){
				down = true;
			}
			fn(down);
			return false;
		}
	}
}

function getClass(oParent,className){
	var arr = oParent.getElementsByTagName("*");
	var result = [];
	for(var i=0;i<arr.length;i++){
		arr1 = arr[i].className.split(" ");
		for(var j=0;j<arr1.length;j++){
			if(arr1[j] == className){
				result.push(arr[i]);
			}
		}
	}
	return result;
}

function getByClass(obj,sClass){

	var res = [];
	var re = new RegExp("\\b" + sClass + "\\b");
	var arr = obj.getElementsByTagName("*");
	for(var i=0;i<arr.length;i++){
		if(re.test(arr[i].className)){
			res.push(arr[i]);
		}
	}
	return res;
}

function addClass(obj,sClass){
	var re = new RegExp("\\b" + sClass + "\\b","g");
	if(!re.test(obj.className)){
		if(obj.className){
			obj.className += " "+sClass;
		}else{
			obj.className = sClass;
		}	
	}
}

function removeClass(obj,sClass){	
	var re = new RegExp("\\b" + sClass + "\\b","g");
	obj.className = obj.className.replace(re,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");

	if(!obj.className){
		obj.removeAttribute("class");
	}
}

function hasClass(obj,sClass){
	var re = new RegExp("\\b" + sClass + "\\b","g");
	return re.test(obj.className); 
}

function toggleClass(obj,sClass){
	if(hasClass(obj,sClass)){
		alert(1);
		removeClass(obj,sClass);
	}else{
		alert(2);
		addClass(obj,sClass);
	}

}

function findIndex(obj,arr){
	for(var i=0;i<arr.length;i++){
		if(obj == arr[i]){
			return i;
		}
	}
}

function getStyle(obj,sClass){
	return getComputedStyle(obj,false)[sClass] || obj.currentStyle[sClass];
}

//角度转弧度

function argToRad(arg){
	return Math.PI * arg/180;
}


//'完美'运动
function move(obj,json,options){
	options=options||{};
	options.time=options.time||300;
	options.fn=options.fn||null;
	options.type=options.type||'ease-out';
	
	var start={};//准备一个空start用来存储一堆初始值
	var dis={};//准备一个空dis用来存储一堆运动距离
	
	for(var key in json){//挑出用户传入的json
		start[key]=parseFloat(getStyle(obj,key));//每一个属性的起始位置
		dis[key]=json[key]-start[key];	//每一个属性的运动距离
	}
	
	var count=Math.round(options.time/30);	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){
			switch(options.type){
				case 'linear':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*a;//匀速
					break;	
				case 'ease-in':
					var a=n/count;//0---1的数
					var cur=start[key]+dis[key]*(a*a*a);//加速
					break;	
				case 'ease-out':
					var a=1-n/count;//0---1的数
					var cur=start[key]+dis[key]*(1-a*a*a);//减速
					break;
				case 'ease-in-out'://过渡一下
					if(n/count<=0.5){	
						//加速
						var a=n/count*1.5;//0---1的数
						var cur=start[key]+dis[key]*(a*a*a);//加速
					}else{
						//减速
						move(obj,json,{time:options.time/2,fn:options.fn});	
					}
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+(cur*100)+')';	
			}else{
				obj.style[key]=cur+'px';	
			}
		}
		
		if(n==count){//停止条件
			clearInterval(obj.timer);
			console.timeEnd('go');
			options.fn && options.fn();	//回调函数存在(用户传了函数)，再去调用
		}
	},30);		
}

//cookie
function addCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = name + "=" + value + ";path=/;expires=" + oDate.toUTCString();
	} else {
		document.cookie = name + "=" + value + ";path=/";
	}
}

function getCookie(name){
	var arr = document.cookie.split("; ");
	for(var i = 0; i < arr.length; i++){
		var arr2 = arr[i].split("=");
		if(name == arr2[0]){
			return arr2[1];	
		}
	}
	return "";
}


function removeCookie(name){
	addCookie(name,"",-1);
}
