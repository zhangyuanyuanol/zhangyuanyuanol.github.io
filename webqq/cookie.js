//版权 北京智能社©, 保留所有权利
function addCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = name + "=" + value + ";path=/;expires=" + oDate.toUTCString();//toUTCString世界标准时间
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



