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
						callback(null, JSON.parse(body));
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
						callback(null, JSON.parse(body));
						break;
					default:
						callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
				}
			}
		});
	}
	
	getProtocolJSONArray(protoidarr) {
		var retValue = {};
		var promiseArray = [];
		var currentObjectInstance = this;
		if(!Array.isArray(protoidarr)) {
			throw Error("ERROR: getProtocolJSONArray() only accepts array arguments.");
		} else {
			for(let i = 0; i < protoidarr.length; ++i) {
				promiseArray.push(new Promise(function(resolve, reject) {
					currentObjectInstance.getProtocolJSON(protoidarr[i], function(error, result) {
						if(error) {
							reject(Error(error));
						} else {
							resolve([protoidarr[i],result]);
						}
					});
				}));
			}
			Promise.all(promiseArray).then(protocols => {
				protocols.map(function(protocol) {
					retValue[protocol[0]] = protocol[1];
				});
			});
			return retValue;
		}
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
	var muhApiKey = process.env.PIO_API_KEY;
	var protocols = new ProtocolsIO(muhApiKey);
	var protoarr = protocols.getProtocolJSONArray(['5038', '4096', '1022']);
	for(let prop in protoarr) {
		console.log('Protocol ID: ' + prop + '\n\n' + JSON.stringify(protoarr[prop]) + '\n\n');
	}
};

module.exports = ProtocolsIO;
