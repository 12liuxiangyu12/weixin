var xo = require("./xmlObject.js");
var http=require('http');  
var keywords = {};
var wxid = "gh_3516ef030215"
keywords["笑话"] = getJoke;
keywords["段子"] = getJoke;

var keys = [];
for(var key in keywords){
	keys.push(key);
}
function handler(msg,res){
	var responseText = "已将您的消息发给主人啦，有空就回复哦！"
	var content = msg['Content'] || "";
	for(var i in keys){
		if(contain(content,keys[i])){
				keywords[keys[i]](function(data){
				console.log("收到msg发消息")
				var msg = xo.object.getTextMsg(msg['ToUserName'],msg['FromUserName'],data);
				res.end(msg.toString());
			});
			return
		}
	}
	console.log("收到msg发消息")
	var msg = xo.object.getTextMsg(msg['ToUserName'],msg['FromUserName'],responseText);
	res.end(msg.toString());

	}


function getJoke(func){
	http.get("http://brisk.eu.org/api/joke.php", function(res) {  
    res.on('data', function(data) {  
    console.log("Got data: " + data);  
    func(data.toString());
  });  
}).on('error', function(e) {  
    console.log("Got error: " + e.message);  
    func("获取笑话失败")
});  
}

function contain(text,regexstring){
	return text.indexOf(regexstring) >= 0; 
}
exports.handler = handler;
