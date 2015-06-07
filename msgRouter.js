var textHandler = require("./textHandler.js");

function router(msg,res){
	console.log(msg);
	var msgType = message.MsgType
	if(msgType == "text"){
		textHandler.handler(msg,res);
	}
	if(msgType == "event"){
		eventHandler.handler(msg,res);
	}
}

exports.router = router;
