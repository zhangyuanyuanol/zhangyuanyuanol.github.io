// JavaScript Document
window.onload=function(){
	
	var oDiv=document.getElementById('div1');
	var aDiv=oDiv.children;
	for(var i=1;i<aDiv.length;i++){
		aDiv[i].style.left=i*20+'px';
	}
	
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].index=i;
		aDiv[i].onmouseover=function(){
			for(var i=0;i<aDiv.length;i++){
				if(i<=this.index){
					//←		i*span.w
					//console.log(aDiv[i]);
					//aDiv[i].style.left=i*20+'px';
					move(aDiv[i],{left:i*20},{duration:500,easing:'ease-in-out'});
					//move(aDiv[i],{left:i*20});
				}else{
					//→	div.w+(i-1)*span.w
					//aDiv[i].style.left=840+(i-1)*20+'px';
					move(aDiv[i],{left:840+(i-1)*20},{duration:500,easing:'ease-in-out'});
					//move(aDiv[i],{left:840+(i-1)*20});
				}	
			}
		};	
	}
}