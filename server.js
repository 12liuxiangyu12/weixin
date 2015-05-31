var server = require('http');
var url = require('url');
var qs = require('querystring');
var xp = require("./xmlParser.js");
var xo = require("./xmlObject.js");
var msgRouter = require("./msgRouter.js");
server.createServer(function(req,res){
	var queryUrl = req.url;
	query = url.parse(queryUrl).query;
	var postData=""
	req.on('data',function(data){
	postData += data;
	})
	req.on('end',function(){
	//var msg = xo.object.getTextMsg("gh_3516ef030215","o5j2Bsz5H5Y-ema7SzKITlzEj198","发的消息");
	//console.log(msg.toString());
	//res.end(msg.toString());
	console.log("拿到的postdata:",xp.processMessage(postData))
	msgRouter.router(xp.processMessage(postData),res);
	})
	query = qs.parse(query);
	//console.log('req',req);
	//res.end(query['echostr']);
	//console.log('return',query['echostr']);
}).listen(80)
	console.log('开始监听');
