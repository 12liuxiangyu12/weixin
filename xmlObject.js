var XMLWriter = require('xml-writer');
var object = {
	getTextMsg:function(fromUser,toUser,content){
		xw = new XMLWriter;
    	xw.startElement('xml');
    	insert_Element(xw,'FromUserName',fromUser);
    	insert_Element(xw,'ToUserName',toUser);
    	insert_Element(xw,'MsgType',"text");
    	insert_Element(xw,'Content',content);
    	insertTime(xw)
    	//console.log(xw.toString());
    	return xw;
		}
}
function insertTime(xml){
	xml.startElement('CreateTime');
	xml.text("1234");
	xml.endElement();
}
function insert_Element(xml,name,cddata){
	console.log(name,cddata);
	xml.startElement(name);
	xml.writeCData(cddata);
	xml.endElement();
}
exports.object = object;
