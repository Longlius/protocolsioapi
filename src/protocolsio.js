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
	
	getProtocolJSONArray(protoidarr, callback) {
		var retValue = {};
		var promiseArray = [];
		var currentObjectInstance = this;
		if(!Array.isArray(protoidarr)) {
			callback('ERROR: getProtocolJSONArray() only accepts arrays.', null);
		} else {
			for(let i = 0; i < protoidarr.length; ++i) {
				promiseArray.push(new Promise(function(resolve, reject) {
					currentObjectInstance.getProtocolJSON(protoidarr[i], function(error, result) {
						if(error) {
							resolve(null);
						} else {
							resolve({protoidarr: protoidarr[i], result: result});
						}
					});
				}));
			}
			Promise.all(promiseArray).then(protocols => {
				protocols.map(function(protocol) {
					retValue[protocol.protoidarr] = protocol.result;
				});
				callback(null, retValue);
			}).catch(function(err) {
				callback(Error('Error: ' + err.message), null);
			});
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
						var didCatch = false;
						try {
							var x = JSON.parse(body);
						} catch(e) {
							didCatch = true;
							callback(null, body);
						}
						if(!didCatch) {
							callback(null, null);
						}
						break;
					default:
						callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
				}
			}
		});
	}
	
	getProtocolPDFArray(protoidarr, callback) {
		var retValue = {};
		var promiseArray = [];
		var currentObjectInstance = this;
		if(!Array.isArray(protoidarr)) {
			callback('ERROR: getProtocolPDFArray() only accepts arrays.', null);
		} else {
			for(let i = 0; i < protoidarr.length; ++i) {
				promiseArray.push(new Promise(function(resolve, reject) {
					currentObjectInstance.getProtocolPDF(protoidarr[i], function(error, result) {
						if(error) {
							resolve(null);
						} else if(result == null) {
							resolve({protoidarr: protoidarr[i], result: null});
						} else {
							resolve({protoidarr: protoidarr[i], result: result});
						}
					});
				}));
			}
			Promise.all(promiseArray).then(protocols => { 
				protocols.map(function(protocol) {
					retValue[protocol.protoidarr] = protocol.result;
				});
				callback(null, retValue);
			}).catch(function(err) {
				callback(Error('Error: ' + err.message), null);
			});
		}
	}
}

var test = function() {
	var muhApiKey = process.env.PIO_API_KEY;
	var protocols = new ProtocolsIO(muhApiKey);
	var protoarr = protocols.getProtocolPDFArray(['5038', 'foo', '555'], function(err, result) {
		if(err) {
			console.log(err);
		}
		for(let i in result) {
			console.log('Protocol ID: ' + i + '\tSize of PDF: ' + ((typeof result[i] === 'string') ? result[i].length : 'N/A'));
		}
	});
};
module.exports = ProtocolsIO;
