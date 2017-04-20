// JavaScript Document
$(function(){
	var oUl = document.getElementById("ul1");	
	var aLi = oUl.children;
		var oBtn = document.getElementById('btn');
	var x = oBtn.offsetLeft + 160;
	var y = oBtn.offsetTop ;
	var aPos = [];
	var timer = null;
	var New = true;
	var count=0;
	var count1=0;
	var aSpan=document.getElementsByTagName('a');
	var aSpan1=document.getElementsByTagName('span');
    var arr=["轮播图","倒计时幻灯片","手风琴","倒计时","苹果菜单","Path菜单","放大镜","照片墙","chromeApps","3D交换","拖拽照片墙","瀑布流","拖拽+弹性碰撞","随机数","手机滑动效果","app","拖拽改大小","用jsonP制作webQQ"];
	oBtn.onclick=function(){

		if(New){
			New = false;
			var i=0;
			timer = setInterval(function(){
				(function(index){
					move(aLi[index],{'width':0,'height':0,'opacity':0,'left':x,'top':y},{'duration':800,'fn':function(){
					if( index == aLi.length-1){
							for(var i=0;i<aLi.length;i++){
								aLi[i].style.background = "rgba("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+",0.5)";
								aSpan1[i].innerHTML=arr[count++];
								aLi[i].index=count1++;
								if(count==18) count=0;
								if(count1==18) count1=0;
							}
							var i = 0;
							timer = setInterval (function(){
								move(aLi[i],{'width':100,'height':100,'left':aPos[i].left,"top":aPos[i].top,'opacity':1});
								i++;
								if( i == aLi.length){
									clearInterval(timer);
									New = true;
								}
							},200)
						}
					}});
				})(i)
				i++;
				if(i == aLi.length){
					clearInterval(timer);
				}
			},200)};
}
	for(var i=0;i<aLi.length;i++){
		var l = aLi[i].offsetLeft;
		var t = aLi[i].offsetTop;
		aPos.push({'left':l,'top':t});
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left = aPos[i].left + "px";
		aLi[i].style.top = aPos[i].top + "px";
		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = 0;
		aLi[i].index=count1++;
		aSpan1[i].innerHTML=arr[count++];	
	}
	
	for(var i = 0; i < aLi.length; i++){
		aLi[i].style.background = "rgba("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+",0.5)";
		lagou(aLi[i]);
	}
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[index].onclick=function(){
				if(aLi[index].index==11){
					window.open('sample12.html','_blank');
					return;
				}
				if(aLi[index].index==17){
					window.open('webqq/login.html','_blank');
					return;
				}
				parent.window.detOpen(aLi[index].index);
			}
		})(i);
	}
	function getDir(obj,oEvent){
		var x = oEvent.clientX - obj.offsetLeft - obj.offsetWidth/2;
		var y = obj.offsetTop + obj.offsetHeight/2 - oEvent.clientY;
		
		// n 0 左 1 下  2 右   3 上
		return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
	}
	
	
	function lagou(oDiv){
		oDiv.onmouseover = function(ev){
			var oEvent = ev || event;
			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oFrom)){
				return ;
			}
			
			var oSpan = this.children[0];
			var n = getDir(this,oEvent);
			
			switch(n){
				case 0:
					oSpan.style.left = "-100px";
					oSpan.style.top = "0";
					break;
				case 1:
					oSpan.style.left = "0";
					oSpan.style.top = "100px";
					break;
				case 2:
					oSpan.style.left = "100px";
					oSpan.style.top = "0";
					break;
				case 3:
					oSpan.style.left = "0";
					oSpan.style.top = "-100px";
					break;
			}
			
			move(oSpan,{left:0,top:0});
			
				
		};
		
		
		oDiv.onmouseout = function(ev){
			var oEvent = ev || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oTo)){
				return ;
			}
			var oSpan = this.children[0];
			var n = getDir(this,oEvent);
			
			switch(n){
				case 0:
					move(oSpan,{left:-100,top:0});
					break;
				case 1:
					move(oSpan,{left:0,top:100});
					break;
				case 2:
					move(oSpan,{left:100,top:0});
					break;
				case 3:
					move(oSpan,{left:0,top:-100});
					break;
			}
				
		};
	
	}
	
	
});