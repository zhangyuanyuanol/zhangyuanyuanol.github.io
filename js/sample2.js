// JavaScript Document
$(function(){
	var oDiv=document.getElementById('div1');
	var oUl=oDiv.children[0];
	var aLi=oUl.children;
	var aSpan=oDiv.getElementsByTagName('span');
	var now=0;
	var pause=false;
	var fx=Tween.Linear;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	
	wuxian()
	
	function wuxian(){
		move1(aSpan[now],{width:80},{easing:fx,duration:1000,complete:function(){//进度
			now++;
			if(now==aLi.length) now=0;
			move1(oUl,{left:-now*aLi[0].offsetWidth},{easing:fx,duration:500,complete:function(){
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].style.width=0;	
				}	
				if(!pause){
					wuxian();	
				}
			}});
		}});	
	}
	
	
	oDiv.onmouseover=function(){
		pause=true;
		for(var i=0;i<aSpan.length;i++){
			clearInterval(aSpan[i].timer);
			aSpan[i].style.width=0;	
		}
	};
	oDiv.onmouseout=function(){
		pause=false;
		wuxian();
	};
});