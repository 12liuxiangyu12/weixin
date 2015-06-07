var fs = require("fs");
var util = require("./util.js").utils;
var https = require("https");
var URL = require("url")
function createMenu(){
var menu = fs.readFileSync("./create_menu.json");
if (!menu) return;
util.getToken(function(data){
	postUrl = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + data;
	console.log("postUrl",postUrl)
	var opt = URL.parse(postUrl);
	opt.method = "POST";
	var request = https.request(opt,function(serverFeedback){
		if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; })
            .on('end', function () { 
            console.log(body);
            result = JSON.parse(body)
            if(result.errmsg == "ok"){
            	console.log("添加自定义菜单成功");
            }else{
            	console.log("添加自定义菜单失败",result);
            }
            });  
        }  
	});
	request.write(menu);
	request.end();
})
}

exports.createMenu = createMenu;