var xo = require("./xmlObject.js");
var http=require('http');  

var events = {};
var mymsg={};
events["V1000-JOKE"] = getJoke;

function handler(msg,res){
	var eventType = msg.Event || "";
	if(!eventType) return;
	if(typeof(events[eventType]) == "function" ){
		events[eventType](msg,function(data){
			var msg = xo.object.getTextMsg(mymsg['ToUserName'],mymsg['FromUserName'],data);
			res.end(msg.toString());
		})
	}

}

function getJoke(func){
	http.get("http://brisk.eu.org/api/joke.php", function(res) {  
    res.on('data', function(data) {  
    console.log("Got data: " + data);  
    data = data.toString().replace(new RegExp("\r\n","gm"),"");
    func(data);
  	});  
	}).on('error', function(e) {  
    console.log("Got error: " + e.message);  
    func("获取笑话失败")
});  
}
exports.handler = handler;