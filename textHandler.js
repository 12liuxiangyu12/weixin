var xo = require("./xmlObject.js");
var keywords = {};
var wxid = "gh_3516ef030215"
keywords["笑话"] = function(){
	return "这就是个段子";
}
keywords["段子"] = function(){
	return "这就是个段子";
}

var keys = [];
for(var key in keywords){
	keys.push(key);
}
function handler(msg,res){
	console.log('texthandler:',msg);
	var responseText = "已将您的消息发给主人啦，有空就回复哦！"
	var content = msg['Content'] || "";
	for(var i in keys){
		if(contain(content,keys[i])){
			responseText = keywords[keys[i]]();
			break;
		}
	}
	console.log("收到msg发消息")
	var msg = xo.object.getTextMsg(msg['ToUserName'],msg['FromUserName'],responseText);
	res.end(msg.toString());

	}




function contain(text,regexstring){
	return text.indexOf(regexstring) >= 0; 
}
exports.handler = handler;
