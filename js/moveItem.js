	var oUl = document.getElementById("skillControll");
	var aSpan = oUl.getElementsByTagName("figure");
	var aPos=[[0,200],[280,180],[600,250],[850,200]];
	var oQipao=document.getElementById('qipao');
	var timer=null;
function moveItem(){	
	
	//var aSpanTimer = null;
	var oIcon1=document.getElementById('icon1');
	
	for (var i = 0; i < aSpan.length;i++) {
		
		(function(index){
			var oImag=aSpan[index].getElementsByTagName('img')[0];
			aSpan[index].timer1 = setInterval(function(){
					move(aSpan[index], {left:(aPos[index][0]+rnd(-150,120)),top:(aPos[index][1]+rnd(-120,220))}, {duration:2500,easing:                    'linear'});
			},2500);
				
			aSpan[index].onmouseover = function(ev){ 
					var oEvt=ev||event;
		            var fromObj=oEvt.fromElement||oEvt.relatedTarget;//来自哪里
		            if(aSpan[index].contains(fromObj)){//里面不算
			             return;	
		            }  
					timer=setTimeout(function(){
						oQipao.style.display='block';
					},1000);    
//			        aSpan[index].style.transition = "1s all ease";
//			        aSpan[index].style.transform="rotate(45deg)";
	                oImag.style.transition = "1s all ease";
					oImag.style.transform="rotate(0deg)";
					oImag.style.borderRadius="0%";
					aSpan[index].style.borderRadius="0%";
				    clearInterval(aSpan[index].timer1);
		       aSpan[index].onclick=function(){
		//				clearInterval(aSpan[index].timer1);
		                 clearTimeout(timer);
						 oQipao.style.display='none';
						  parent.window.parHide();
						oIcon1.onclick=function(){
									parent.window.parShow();
			//					    aSpan[index].style.transform="rotate(45deg)";
			                        oImag.style.transition = "0.5s all ease";
									oImag.style.transform="rotate(0deg)";
									oImag.style.borderRadius="0%";
									aSpan[index].style.borderRadius="0%";
									var timer2=setTimeout(function(){
									  
//										 	aSpan[index].style.transition = "1s all ease";
			//						        aSpan[index].style.transform="rotate(0deg)"; 
			                                aSpan[index].style.borderRadius="50%";
											oImag.style.transition = "1s all ease";
											oImag.style.transform="rotate(-405deg)";
											oImag.style.borderRadius="50%";
									 },1500);
			//					   
			//					   var timer3=setTimeout(function(){
			//							   aSpan[index].timer1 = setInterval(function(){
			//					move(aSpan[index], {left:(aPos[index].left+rnd(-150,120)),top:(aPos[index].top+rnd(-120,220))}, {duration:2500,easing:'linear'});
			//			    },2500);
			//		
				
				   
			  
			//						},1000);
					
				       }
				}
			};
			aSpan[index].onmouseout = function(ev){
					var oEvt=ev||event;
		            var toObj=oEvt.toElement||oEvt.relatedTarget;//去向哪里
		            if(aSpan[index].contains(toObj)){
			               return;	
		            }
//				   aSpan[index].style.transition = "1s all ease";
//				   aSpan[index].style.transform="rotate(0deg)";
		                 clearTimeout(timer);
						 oQipao.style.display='none';
				   oImag.style.transition = "1s all ease";
				   oImag.style.transform="rotate(-405deg)";
				   oImag.style.borderRadius="50%";
				   aSpan[index].style.borderRadius="50%";
				   aSpan[index].timer1 = setInterval(function(){
					      move(aSpan[index], {left:(aPos[index][0]+rnd(-150,120)),top:(aPos[index][1]+rnd(-120,220))}, {duration:2500,                          easing:'linear'});
			       },2500);
		   };


		})(i);
		
	}
	
}

function rnd(n,m){
	return n + Math.random()*(m-n);
	
}

//options duration easing complete 
function move(obj,json,options){
	
	options = options || {};
	options.duration = options.duration || 700;
	//options.easing = options.easing || Tween.Bounce.easeOut;
	options.easing = options.easing || "ease-out";
	
	//起点 
	var start = {};
	var dis = {};
	var count = Math.round(options.duration/30);
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	//console.log(dis)
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			
			switch(options.easing){
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a);
					break;
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in-out':
					if(n/count<=0.5){
						
						var a=n/count*1.5;
					    var cur=start[name]+dis[name]*a*a;  
						
					}else{
						
						move(obj,json,{duration:options.duration/2,easing:'ease-out',fn:options.fn});
					}
					break;
				
			}
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			}  else if (name == "transform"){
				
				obj.style.transform = "rotateZ("+cur+"deg)";
				
			} else {
				obj.style[name] = cur +　"px";
			}
		
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
		
	},30);
	
}
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}