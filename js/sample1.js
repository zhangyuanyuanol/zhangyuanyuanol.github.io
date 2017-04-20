$(function(){
	(function(){
			var oPlay=document.getElementById('play');
			var oOl=oPlay.children[2];
			var aCardHead=oOl.children;
			var oCardBody=oPlay.children[3];
			var oCardBodyLi=oCardBody.children;
			var oPrev=document.getElementsByClassName('prev')[0];
			var oNext=document.getElementsByClassName('next')[0];
			var now=0;
			var ready=true;
			//0.布局定位
			oCardBody.innerHTML+=oCardBody.innerHTML;
			oCardBody.style.width=oCardBodyLi[0].offsetWidth*oCardBodyLi.length+'px';
			//1.选项卡	oCardBody.left=-li.w*index
			for(var i=0;i<aCardHead.length;i++){
				(function(index){
					aCardHead[i].onclick=function(){
						if(!ready) return;
						now=index;//更新now
						tab();
					};
				})(i);	
			}
			function tab(){
				for(var i=0;i<aCardHead.length;i++){
					aCardHead[i].className='';	
				}
				if(now==5){
					aCardHead[0].className='active';	
				}else{
					aCardHead[now].className='active';	
				}
				ready=false;
				move(oCardBody,{left:-oCardBodyLi[0].offsetWidth*now},{duration:1000,fn:function(){
					ready=true;
					if(now==5){
						//归位
						oCardBody.style.left=0;
						now=0;	
					}
				}});
			}
			function next(){
				now++;
				//if(now==5) now=0;		//5==aCardHead.length
				tab();	
			}
			
			var timer=setInterval(function(){
				oNext.onclick();	
			},2000);
			oPlay.onmouseover=function(){
				clearInterval(timer);	
			};
			oPlay.onmouseout=function(){
				timer=setInterval(function(){
					oNext.onclick();	
				},2000);	
			};
			
			oNext.onclick=function(){
				if(!ready) return;
				next();	
			};
			oPrev.onclick=function(){
				if(!ready) return;
				if(now==0){
					//归位
					now=4	//length-1
					oCardBody.style.left=-oCardBody.offsetWidth/2+'px';	
				}else{
					now--;	
				}
				tab();	//动
			};
	})();
    (function(){
        var oBox2 = getByClass(document,"box2")[0];
        var oUl = oBox2.children[0].children[0];
        var aLi = oBox2.children[1].children[1].children;
        var oSpan = oBox2.children[1].children[0];
        var Now = 0;

        for (var i = 0; i < aLi.length; i++) {
            (function(index){
                aLi[i].onmouseover=function(){
                    Now = index;
                    tab();
                };
            })(i);
        };
        function next(){
           Now++;
            Now == aLi.length && (Now=0);
            tab();
        }
        var timer = setInterval(next , 1000);
        function tab(){
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className='';
            };
            aLi[Now].className='active';
            move1(oUl,{top:-Now*oUl.children[0].offsetHeight});
            move1(oSpan,{top:Now*55})
        };
        oBox2.onmouseover=function(){
            clearInterval(timer);
        };
        oBox2.onmouseout=function(){
            timer = setInterval(next, 1000);
        };
    })();
});