
function hotword(id){
	var oHotWord = document.getElementById(id);
	var oSpan = oHotWord.children;
	oHotWord.onmousedown = function(ev){
		var oEvt = ev || event;
		var srcEle = oEvt.srcElement || oEvt.target;
		var oldX = oEvt.clientX;
		var oldY = oEvt.clientY;
		var firstLeft = oSpan[0].offsetLeft;
		var firstTop= oSpan[0].offsetTop;
		var firstTransform = getStyle(oSpan[0],"WebkitTransform");
		document.onmousemove = function(ev){
			var oEvt = ev || event;
			var newX = oEvt.clientX;
			var newY = oEvt.clientY;
			var disX = newX - oldX;
		}
		document.onmouseup = function(ev){
			var oEvt = ev || event;
			var newX = oEvt.clientX;
			var newY = oEvt.clientY;
			var disX = newX - oldX;
			if(disX > 10 || disX < -10){

				for(var i=0;i<oSpan.length;i++){
					if(i == oSpan.length-1){
						oSpan[i].style.left = firstLeft +"px";
						oSpan[i].style.top = firstTop +"px";
						oSpan[i].style.WebkitTransform = firstTransform;
					}else{
						oSpan[i].style.left = oSpan[i+1].offsetLeft +"px";
						oSpan[i].style.top = oSpan[i+1].offsetTop +"px";
						oSpan[i].style.WebkitTransform = getStyle(oSpan[i+1],"WebkitTransform");
					}
				}
			}
			document.onmousemove = null;
			document.onmouseup = null;
			oHotWord.releaseCapture && oHotWord.releaseCapture();
		}
		oHotWord.setCapture && oHotWord.setCapture();
		return false;
	}
}