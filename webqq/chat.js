var url = "http://zhinengshe.com/exercise/im/api.php";
var token = getCookie("token");
var username = getCookie("username");
var maxId = 0;


if(!(token && username)){
	window.location = "login.html";
}

function tmplate(oTmp,json){
	var obj = oTmp.cloneNode(true);
	obj.removeAttribute("id");
	obj.innerHTML = obj.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
		s = s.substring(2,s.length - 2);
		return json[s];
	});
	return obj;	
}


//M 数据层
function requestData(data,fn){
	jsonp({
		url:url,
		data:data,
		success:function(json){
			fn && fn(json);	
		}	
	});
}

//V 显示 
//1 表情
function createLi(json){
	var oUl  = document.getElementById("ulu");
	var oTmp = document.getElementById("tmpFace");
	var oLi = tmplate(oTmp,json);
	oUl.appendChild(oLi);

}

/*
6.获取用户列表
?a=get_user_list&token=&cb=xxx
{err: 0, data: [{ID: 用户ID,username: 用户名,face: 用户头像}]}
*/
function getUerList(){
	requestData({
		    a:"get_user_list",	
		token:token,	
	},function(json){
		var arr = json.data;
		var oUl  = document.getElementById("ulu");
		for(var i = 0; i < arr.length; i++){
			var face = arr[i].face;
			face <= 0 && (face = 1);
			face > 8 && (face = 8);
			arr[i].face = face;
			createLi(arr[i]);	
		}	
			oUl.scrollTop = oUl.scrollHeight;
	});	
}

/*4.完整获取
	?a=get_msg&token=&cb=xxx
	{err: 0, data: [{ID: 消息ID, post_time: 消息时间,content: 消息内容,username: 发言用户,"face":""},...]}
*/

//2 聊天内容
function createDl(json){
	
	//修改最大id
	if(maxId < json.ID){
		maxId = json.ID;
	}
	
	var oWrap  = document.getElementById("content");
	var oTmp = document.getElementById("tmpDl");
	var oDl = tmplate(oTmp,json);
	oWrap.appendChild(oDl);
}

function getAllMsg(){
	requestData({
		    a:"get_msg",	
		token:token,	
	},function(json){
		//alert(JSON.stringify(json));
		var arr = json.data;
		var oWrap  = document.getElementById("content");
		for(var i = 0; i < arr.length; i++){
			arr[i].time = formatDate(arr[i].post_time);
			
			createDl(arr[i]);
		}
		oWrap.scrollTop = oWrap.scrollHeight;
	});	
}
function fillZero(n){
	return n<10?'0'+n:''+n;
}
function formatDate(time){
	var oDate = new Date(time*1000);
	var arr = [
		oDate.getFullYear(),"-",
		fillZero(oDate.getMonth()+1),"-",
		fillZero(oDate.getDate())," ",
		fillZero(oDate.getHours()),":",
		fillZero(oDate.getMinutes()),":",
		fillZero(oDate.getSeconds())
	];
	
	return arr.join("");
}


//获取更新
/*	?a=get_msg_n&n=消息ID&token=&cb=xxx
			{err: 0, data: [{ID:'1',post_time:'1364873875',content:'asdfsdf',face:'1',username:'test',to:'发给谁'},...]}	*/	
			
function refreshData(){
	requestData({
		    a:"get_msg_n",
			n:maxId,	
		token:token	
	},function(json){
		//alert(JSON.stringify(json));
		var oWrap = document.getElementById("content");
		var arr = json.data;
		for(var i = 0; i < arr.length; i++){
			arr[i].time = formatDate(arr[i].post_time);
			createDl(arr[i]);
		}
		oWrap.scrollTop = oWrap.scrollHeight;
	});	
}	

window.onload = function(){

	var oText = document.getElementById("txt");
	var oBtn  = document.getElementById("btn");
	var oWrap = document.getElementById("content");
	var oClose=document.getElementById('close');
	//刷新留言
	
	
	//获取用户列表
	
	//获取聊天内容
	
	/*3.发言
	?a=snd_msg&content=内容&token=&cb=xxx
	{err: 0, time: 发布时间, ID: 消息ID}*/

	//C
	oBtn.onclick = function(){
		var content = oText.value;
		//M
		requestData({
			      a: "snd_msg",
			content:content,
			  token:token
		},function(json){
			//V
            getAllMsg();
			oText.value='';
		});
	};
	getAllMsg();
	getUerList();
	var timer1=setInterval(refreshData,1000);
	oClose.onclick=function(){
/*		?a=logout&token=&cb=xxx
		{err: 0, msg: "成功退出登录"}*/
		requestData({
			 a: "logout",
			 token:token
		},function(json){
			//V
			alert(json.msg);
			window.location='login.html';
		});
	}
	
};