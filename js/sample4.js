// JavaScript Document
   window.onload=function(){
	   var oDiv= document.getElementById('fill_in');
	   var aIpt=oDiv.getElementsByTagName('input');
	   var oStrong=document.getElementsByTagName('strong')[0];
	   var oDay= document.getElementById('day');
	   var oHour= document.getElementById('hour');
	   var oMin= document.getElementById('min');
	   var oSec= document.getElementById('sec');
	   var oClick = document.getElementById('go');
	  /* var Target = new Date();
	   Target.setFullYear(aIpt[0].value,aIpt[1].value-1,aIpt[2].value);
	   Target.setHours(0,0,0,0);*/
	   var Target;
	   oClick.onclick=function(){
		   Target = new Date();
	       Target.setFullYear(aIpt[0].value,aIpt[1].value-1,aIpt[2].value);
	       Target.setHours(0,0,0,0);
		   
		   oStrong.innerHTML=aIpt[0].value+'年'+aIpt[1].value+'月'+aIpt[2].value+'日';
		  
		   setInterval(tick,1000);
	   }
	   function tick(){
		     var Now=new Date();
			 var s = parseInt((Target.getTime()-Now.getTime())/1000);
             oDay.innerHTML = fillZero(parseInt(s/86400));
			 s%=86400;
			 oHour.innerHTML= fillZero(parseInt(s/3600));
			 s%=3600;
			 oMin.innerHTML= fillZero(parseInt(s/60));
			 oSec.innerHTML = fillZero(parseInt(s%60));
	   }
	   function fillZero(n){
		   return n<10?'0'+n:''+n;
	   }
   }