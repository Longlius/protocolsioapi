var request = require('request');
var encodeUrl = require('encodeurl');

class ProtocolsIO {
	constructor(apikey) {
		this._apikey = apikey;
	}
	
	_constructURL(keywords, pageid) {
		var currURL = 'https://www.protocols.io/api/open/get_protocols?key=' + (this._apikey);
		if (keywords != null) {
			currURL += '&keywords=' + keywords; 
		}
		if (pageid != null) {
			currURL += '&page_id' + pageid;
		}
		return encodeUrl(currURL);
	}
	
	getProtocols(keywords, pageid, callback) {
		var muhKeywords = (keywords == undefined) ? null : keywords;
		var muhPageID = (pageid == undefined) ? null : pageid;
		var reqURL = this._constructURL(muhKeywords, muhPageID);
		request(reqURL, function(error, response, body) {
			if (error) {
				callback(error,null);
				return;
			} else {
				switch(response.statusCode) {
					case 200:
						callback(null,body);
						break;
					default:
						callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
				}
			}
		});
	}
	
	getProtocolJSON(protoid, callback) {
		var reqURL = encodeUrl('https://www.protocols.io/api/open/get_protocol_json?key=' + (this._apikey) + '&protocol_id=' + protoid);
		request(reqURL, function(error, response, body) {
			if(error) {
				callback(error,null);
				return;
			} else {
				switch(response.statusCode) {
					case 200:
						callback(null, body);
						break;
					default:
						callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
				}
			}
		});
	}
	
	getProtocolPDF(protoid, callback) {
		var reqURL = encodeUrl('https://www.protocols.io/api/open/get_protocol_pdf?key=' + (this._apikey) + '&protocol_id=' + protoid);
		request(reqURL, function(error, response, body) {
			if(error) {
				callback(error,null);
				return;
			} else {
				switch(response.statusCode) {
					case 200:
						callback(null, body);
						break;
					default:
						callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
				}
			}
		});
	}
}

var test = function() {
	var muhApiKey = 'a133bf5894b63d3cbf0c5f9698aad215';
	var protocols = new ProtocolsIO(muhApiKey);
	protocols.getProtocolJSON('5038', function(error, result){
			if(error) {
				console.log(error);
			} else {
				console.log(result);
			}
	});
};
module.exports = ProtocolsIO;
