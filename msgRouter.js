var textHandler = require("./textHandler.js");

function router(msg,res){
	console.log(msg);
	if(msg['MsgType'] == "text"){
		textHandler.handler(msg,res);
	}
}

exports.router = router;
