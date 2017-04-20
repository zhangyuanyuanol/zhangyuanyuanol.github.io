
function move(obj,json,options){
	function getStyle(obj,name){
		  return (obj.currentStyle||getComputedStyle(obj,null))[name];
	}
	options = options || {};
	options.duration = options.duration || 700;
	options.fn=options.fn||null;
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
			options.fn && options.fn();	
		}
		
	},30);
	
}