var https = require("https");
var appid = "wx7a7f2796bfb4e0df"
var secret = "dc6630f438a8053ba5e06bc6c5bdcde1"
var util = {
	getToken : function(func){
		var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
		https.get(url, function(res) {  
		console.log("statusCode: ", res.statusCode);
  		console.log("headers: ", res.headers);
    	res.on('data', function(data) {  
    	console.log("Got data: " + data);  
    	data = JSON.parse(data); 
    	func(data.access_token);
 	 	});  
		 
	});
	}
}

exports.utils = util;
// util.getToken();
