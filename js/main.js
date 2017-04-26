
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
        animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd','MozAnimation': 'MozAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend'},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var oScale=document.getElementById('scale');
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.01, 1 );
                    oScale.innerHTML=parseInt(progress*100)+'%';
					instance.setProgress( progress );
                    
					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						var timer1=setTimeout(initIndex,2000);
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();
    
})();

// JavaScript Document

function initIndex(){
                circle("hotWord");
}
function write1(id){
	var oDiv = document.getElementById(id);
	var oPrivateMsg = getClass(oDiv,"onebyone")[0];
	oPrivateMsg.style.opacity = 1;
	oPrivateMsg.style.filter = "alpha(opacity=100)";
	var oLi = oPrivateMsg.getElementsByTagName("li");
	var oAudio = oPrivateMsg.getElementsByTagName("audio")[0];
	var oSpan = oPrivateMsg.getElementsByTagName("span");
	if(oSpan.length == 0){
		for(var i=0;i<oLi.length;i++){
			var str = oLi[i].innerHTML;
			oLi[i].innerHTML = "";
			for(var j=0;j<str.length;j++){
				var oSpan = document.createElement("span");
				oSpan.innerHTML = str.charAt(j);
				oLi[i].appendChild(oSpan);
			}
		}
	}else{
		return;
	}

	var i = 0;
	var timer = null;
	oSpan = oPrivateMsg.getElementsByTagName("span");
	console.log(oSpan);
	timer = setInterval(function(){
		oAudio.play();
		(function(index){
			move(oSpan[index],{opacity:1},{fn:function(){
				if(index == oSpan.length-1){
					oAudio.pause();
				}
			}});
		})(i);
		i++;
		if(i == oSpan.length){
			clearInterval(timer);
		}
	},100);
	//}
	
}



function circle(id){
	var oCircle = document.getElementById(id);
	var oBox = getClass(oCircle,"box")[0];
	var oUl = oCircle.getElementsByTagName("ul")[0];
	var oLi = oUl.getElementsByTagName("li");


		if(hasClass(this,"active"))return;
		addClass(this,"active");
		write1("component");
		for(var i=0;i<oLi.length;i++){
			oLi[i].style.display = "block";
			var arg = 360/oLi.length*i;
			moveCircle(oLi[i],150,arg,{time:500});
			oLi[i].rotate=arg;
		}
		var k=1;
	    var timer1=setTimeout(rotateY,1500);
		function rotateY(){
				console.log(k)
				for(var i=0;i<oLi.length;i++){
					(function(index){
						moveRotate(oLi[index],(k+index)*360/8,{fn:function(){
							k++;
							rotateY();
						}});
					})(i);	
				}
		}

}
function moveRotate(obj,iTarget,opational){
	var start=obj.rotate;
	var dis=iTarget-start;
	var time=1500;
	var count=Math.round(time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var cur=start+dis/count*n;
		setPos(obj,cur);
		obj.rotate=cur;
		if(n==count){
			clearInterval(obj.timer);
			opational.fn && opational.fn();
		}
	},30);
}
function setPos(obj,n){
	var x=Math.sin(argToRad(n))*150;
	var y=Math.cos(argToRad(n))*150;
	obj.style.left=x+150+'px';
	obj.style.top=115-y+'px';
}
function moveCircle(obj,r,arg,optional){
	var optional = optional || {};
	optional.time = optional.time || 300;
	optional.fn = optional.fn || null;
	optional.type = optional.type || 'ease-out';
	var start = {};
	var count = Math.round(optional.time/30);
	var n = 0;

	
	start.left = parseFloat(getStyle(obj,"left"));
	start.top = parseFloat(getStyle(obj,"top"));
	var radian = argToRad(arg);

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		var a = 0;
		switch (optional.type){
			case "linear":
			a = n/count;
			break;
			case "ease-in":
			a = n/count;
			a = a*a*a;
			break;
			case "ease-out":
			a = 1 - n/count;
			a = 1 - a*a*a;
			break;
		}

		var l = start.left + r*Math.sin(radian)*a;
		obj.style.left = l +'px';
		var t = start.top - r*Math.cos(radian)*a;
		obj.style.top = t +'px';
		console.log(l,Math.cos(radian));

		if(n == count){
			clearInterval(obj.timer);
			optional.fn && optional.fn();
		}
	},30)
}
