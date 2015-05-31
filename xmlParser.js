    var crypto=require("crypto");
    var xml=require("node-xml");
//var messageSender=require("./messageSender.js");
    function isLegel(signature,timestamp,nonce,token){
    var array=new Array();
    array[0]=timestamp;
    array[1]=nonce;
    array[2]=token;
    array.sort();
    var hasher=crypto.createHash("sha1");
    var msg=array[0]+array[1]+array[2];
    hasher.update(msg);
    var msg=hasher.digest('hex');
    if(msg==signature){
        return true;
    }else{
        return false;
    }
}

function processMessage(data){
var result = {};
var parse=new xml.SaxParser(function(cb){
    cb.onStartElementNS(function(elem,attra,prefix,uri,namespaces){
        tempName=elem;
    });

    cb.onCharacters(function(chars){
        chars=chars.replace(/(^\s*)|(\s*$)/g, "");
        if(!tempName) return;
	result[tempName] = chars;
    });






    cb.onCdata(function(cdata){
        if(!tempName) return;
	result[tempName] = cdata;
    });

    cb.onEndElementNS(function(elem,prefix,uri){
        tempName="";
    });

    cb.onEndDocument(function(){
        // console.log("onEndDocument");
        tempName="";
        // var date=new Date();
        // var yy=date.getYear();
        // var MM=date.getMonth() + 1;
        // var dd=date.getDay();
        // var hh=date.getHours();
        // var mm=date.getMinutes();
        // var ss=date.getSeconds();
        // var sss=date.getMilliseconds();
        // var result=Date.UTC(yy,MM,dd,hh,mm,ss,sss)
    });
});
    parse.parseString(data);
    return result;
}
module.exports.isLegel=isLegel;
module.exports.processMessage=processMessage;

