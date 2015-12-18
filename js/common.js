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