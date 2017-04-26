
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
		   $(function(){         
			   var oHeader=document.getElementById('div1');
			   var oDemo=getByClass(document,'demo')[0];
			   var aBtn=getByClass(document,'nav_btn');
			   var oPage1=document.getElementById('page1');
			   var oNav=document.getElementById('nav');
			   var aPre=getByClass(document,'pre');
			   var aBack=getByClass(document,'back');
			   var aNavLi=oNav.children;
			   var oFrameg=document.getElementById('iframeg');
			   function addSrc(){
				   if(oFrameg.src==""){
					   oFrameg.src="flip.html";
				   }   
			   }
			   for(var i=0;i<aBtn.length;i++){
				   (function(index){
					   aBtn[i].onclick=function(){
						   for(var j=0;j<aBtn.length;j++){
							   aPre[j].style.transform='translate3d(0,0,0) rotate3d(1,0,0,0deg)';
							   aPre[j].style.opacity=1;
							   aBack[j].style.transform='translate3d(0,0,-150px) rotate3d(1,0,0,90deg)';
							   aBack[j].style.opacity=0;
						   }
						   move(oDemo,{top:-index*720},{time:800,fn:function(){
							   if(index==2){
								   showLi();
							   }else if(index==3){
								   addSrc();
							   }else{
								   var oUl=document.getElementById('page2').getElementsByTagName('ul')[0];
								   oUl.innerHTML='';
							   }
						   }});
						   aPre[index].style.transform='translate3d(0,150px,0) rotate3d(1,0,0,-90deg)';
						   aPre[index].style.opacity=0;
						   aBack[index].style.transform='rotate3d(1,0,0,0deg)';
						   aBack[index].style.opacity=1;
						   if(index!=0){
							   move(oHeader,{opacity:1},{time:500})
						   }
						   aNavLi[index].onmouseover=null;
						   aNavLi[index].onmouseout=null;
                           for(var k=0;k<aNavLi.length;k++){
							   (function(index1){
								   aNavLi[k].onmouseover=function(ev){
										var oEvt=ev||event;
										var fromObj=oEvt.fromElement||oEvt.relatedTarget;//来自哪里
										if(fromObj && aNavLi[index1].contains(fromObj)){//里面不算
											return;	
										}
										if(aPre[index1].style.opacity==0){
											return;
										}
											   aPre[index1].style.transform='translate3d(0,150px,0) rotate3d(1,0,0,-90deg)';
											   aPre[index1].style.opacity=0;
											   aBack[index1].style.transform='rotate3d(1,0,0,0deg)';
											   aBack[index1].style.opacity=1;
										var oAnchor=aBack[index1].getElementsByTagName('a')[0];
										aNavLi[index1].onmouseout=function(ev){
											var oEvt=ev||event;
											var toObj=oEvt.toElement||oEvt.relatedTarget;//来自哪里
											if(toObj && aNavLi[index1].contains(toObj)){//里面不算
												return;	
											}
										   aPre[index1].style.transform='translate3d(0,0,0) rotate3d(1,0,0,0deg)';
										   aPre[index1].style.opacity=1;
										   aBack[index1].style.transform='translate3d(0,0,-150px) rotate3d(1,0,0,90deg)';
										   aBack[index1].style.opacity=0;
										}
										oAnchor.onclick=function(){
											move(oDemo,{top:-index1*720},{time:800,fn:function(){
												if(index1==2){
													showLi();
												}else if(index1==3){
													addSrc();
												}else{
													var oUl=document.getElementById('page2').getElementsByTagName('ul')[0];
								                    oUl.innerHTML='';
												}
											}});
											if(index1!=0){
											   move(oHeader,{opacity:1},{time:500});
											}
											if(index1==0){
											   move(oHeader,{opacity:0},{time:500});
											}
										   for(var j=0;j<aBtn.length;j++){
											   aPre[j].style.transform='translate3d(0,0,0) rotate3d(1,0,0,0deg)';
											   aPre[j].style.opacity=1;
											   aBack[j].style.transform='translate3d(0,0,-150px) rotate3d(1,0,0,90deg)';
											   aBack[j].style.opacity=0;
										   }
											aNavLi[index1].onmouseout=function(ev){
													var oEvt=ev||event;
													var toObj=oEvt.toElement||oEvt.relatedTarget;//来自哪里
													if(toObj && aNavLi[index1].contains(toObj)){//里面不算
														return;	
													}
												   aPre[index1].style.transform='translate3d(0,150px,0) rotate3d(1,0,0,-90deg)';
												   aPre[index1].style.opacity=0;
												   aBack[index1].style.transform='rotate3d(1,0,0,0deg)';
												   aBack[index1].style.opacity=1;
											}
										   aPre[index1].style.transform='translate3d(0,150px,0) rotate3d(1,0,0,-90deg)';
										   aPre[index1].style.opacity=0;
										   aBack[index1].style.transform='rotate3d(1,0,0,0deg)';
										   aBack[index1].style.opacity=1;
										}	
								   }
							   })(k);
						   }
					   }
				   })(i);
			   }
			   function showLi(){
					   var oUl=document.getElementById('page2').getElementsByTagName('ul')[0];
					   var aPos=[];
					   oUl.innerHTML='';
					   for(var i=0;i<6;i++){
						   var oLi=document.createElement('li');
						   oUl.appendChild(oLi);
					   }
						var aLi= oUl.children;
						for(var i=0;i<aLi.length;i++){
						   aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop}
						   aLi[i].style.left=aPos[i].left+'px';
						   aLi[i].style.top=aPos[i].top+'px';
						   aLi[i].style.WebkitTransform="scale(2)"; 
						   aLi[i].style.MozTransform="scale(2)"; 
						   aLi[i].style.transform="scale(2)";
						 }
						for(var i=0;i<aLi.length;i++){
							aLi[i].style.position='absolute';
							aLi[i].style.margin='0';
						 }	 
						 setTimeout(show,100);
						 var arr=["熟练使用HTML、HTML5，能够书写语义合理，结构清晰，易维护的HTML结构","熟练使用CSS、CSS3，能够还原视觉设计，并兼容业界承认的主流浏览器","熟练使用原生JS,能够自主编写JS实现相关的前台功能","熟练使用jQuery等相关类库的使用","熟悉AJAX和JSONP的数据交互机制，能够手写AJAX和JSONP获取函数","对面向对象、PHP有一定的了解，便于和后台人员沟通"]
						 function show(){  								
								for(var i=0;i<aLi.length;i++)
								{   	          
									aLi[i].style.transition=".5s "+(aLi.length-i)*300+"ms";
									aLi[i].style.WebkitTransform="scale(1)";
									aLi[i].style.MozTransform="scale(1)";
									aLi[i].style.transform="scale(1)";
									aLi[i].style.opacity=1;
									aLi[i].innerHTML="<p>"+arr[i]+"</p>";
								}
						 }
			  }
				function rnd(n,m){
					return parseInt(Math.random()*(m-n) + n);
				}
				var oJie = document.getElementById("jieshao");
				var oC = document.getElementById("ca");
				var gd = oC.getContext("2d");
				          
				var winW = oJie.offsetWidth;
				var winH = oJie.offsetHeight;
				
				oC.width = winW;
				oC.height = winH;
		
				//个数
				var N = 5;

				var aPoint = [];
				
				//初始化坐标点
				for(var i = 0; i < N; i++){
					aPoint[i] = {
						w:1,
						h:1,
						x:rnd(0,winW),
						y:rnd(0,winH),
						speedX:rnd(-7,7),
						speedY:rnd(-7,7)
					};
				}
				
				
				//
				var oldPoint = [[5],[10]];
				
				//动起来
				setInterval(function(){
					
					//清除画布
					gd.clearRect(0,0,oC.width,oC.height);
					
					for(var i = 0; i < N; i++){
						drawPoint(aPoint[i]);
						
						
						if(aPoint[i].x < 0){
							aPoint[i].x = 0;
							aPoint[i].speedX *= -1;
						}
						if(aPoint[i].x > winW){
							aPoint[i].x = winW;
							aPoint[i].speedX *= -1;
						}
						if(aPoint[i].y < 0){
							aPoint[i].y = 0;
							aPoint[i].speedY *= -1;
						}
						if(aPoint[i].y > winH){
							aPoint[i].y = winH;
							aPoint[i].speedY *= -1;
						}
						
					
						aPoint[i].x += aPoint[i].speedX;
						aPoint[i].y += aPoint[i].speedY;
					
					}
					
					
					//连接
					gd.beginPath();
					gd.moveTo(aPoint[0].x,aPoint[0].y);
					for(var i = 1; i < N; i++){
						gd.lineTo(aPoint[i].x,aPoint[i].y);
						
					}
					gd.strokeStyle = "#fff";
					gd.closePath();
					gd.stroke(); 
					
					//尾巴 影子
					var arr = [];//存当前的坐标路径
					
					for(var i = 0; i < N; i++){
						arr.push({x:aPoint[i].x,y:aPoint[i].y});
					}
					
					oldPoint.push(arr);
			
					while(oldPoint.length > 10){
						oldPoint.shift();
					}
					 
					//重新绘制影子
					for(var i = 0; i < oldPoint.length; i++){
						
						gd.beginPath();
						gd.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
						for(var j = 0; j < oldPoint[i].length; j++){
							gd.lineTo(oldPoint[i][j].x,oldPoint[i][j].y);
							
						}
						var opacity = i/(oldPoint.length - 1);
						gd.strokeStyle = "rgba(255,0,0,"+opacity+")" 
						gd.closePath();
						gd.stroke();
					}
				},16);
				
				
				function drawPoint(p){
					gd.fillStyle = "#fff";
					gd.fillRect(p.x,p.y,p.w,p.h);
					gd.strokeRect(p.x,p.y,p.w,p.h);
				} 

		   });