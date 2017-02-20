'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var encodeUrl = require('encodeurl');
var fs = require('fs');

var ProtocolsIO = function () {
	function ProtocolsIO(apikey) {
		_classCallCheck(this, ProtocolsIO);

		this._apikey = apikey;
	}

	_createClass(ProtocolsIO, [{
		key: '_constructURL',
		value: function _constructURL(keywords, pageid) {
			var currURL = 'https://www.protocols.io/api/open/get_protocols?key=' + this._apikey;
			if (keywords != null) {
				currURL += '&keywords=' + keywords;
			}
			if (pageid != null) {
				currURL += '&page_id' + pageid;
			}
			return encodeUrl(currURL);
		}
	}, {
		key: 'getProtocols',
		value: function getProtocols(keywords, pageid, callback) {
			var muhKeywords = keywords == undefined ? null : keywords;
			var muhPageID = pageid == undefined ? null : pageid;
			var reqURL = this._constructURL(muhKeywords, muhPageID);
			request(reqURL, function (error, response, body) {
				if (error) {
					callback(error, null);
					return;
				} else {
					switch (response.statusCode) {
						case 200:
							callback(null, JSON.parse(body));
							break;
						default:
							callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
					}
				}
			});
		}
	}, {
		key: 'getProtocolJSON',
		value: function getProtocolJSON(protoid, callback) {
			var reqURL = encodeUrl('https://www.protocols.io/api/open/get_protocol_json?key=' + this._apikey + '&protocol_id=' + protoid);
			request(reqURL, function (error, response, body) {
				if (error) {
					callback(error, null);
					return;
				} else {
					switch (response.statusCode) {
						case 200:
							callback(null, JSON.parse(body));
							break;
						default:
							callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
					}
				}
			});
		}
	}, {
		key: 'getProtocolJSONArray',
		value: function getProtocolJSONArray(protoidarr, callback) {
			var retValue = {};
			var promiseArray = [];
			var currentObjectInstance = this;
			if (!Array.isArray(protoidarr)) {
				callback('ERROR: getProtocolJSONArray() only accepts arrays.', null);
			} else {
				var _loop = function _loop(i) {
					promiseArray.push(new Promise(function (resolve, reject) {
						currentObjectInstance.getProtocolJSON(protoidarr[i], function (error, result) {
							if (error) {
								resolve(null);
							} else {
								resolve({ protoidarr: protoidarr[i], result: result });
							}
						});
					}));
				};

				for (var i = 0; i < protoidarr.length; ++i) {
					_loop(i);
				}
				Promise.all(promiseArray).then(function (protocols) {
					protocols.map(function (protocol) {
						retValue[protocol.protoidarr] = protocol.result;
					});
					callback(null, retValue);
				}).catch(function (err) {
					callback(Error('Error: ' + err.message), null);
				});
			}
		}
	}, {
		key: 'getProtocolPDF',
		value: function getProtocolPDF(protoid, callback) {
			var reqURL = encodeUrl('https://www.protocols.io/api/open/get_protocol_pdf?key=' + this._apikey + '&protocol_id=' + protoid);
			request({ url: reqURL, encoding: null }, function (error, response, body) {
				if (error) {
					callback(error, null);
					return;
				} else {
					switch (response.statusCode) {
						case 200:
							var didCatch = false;
							try {
								var x = JSON.parse(body);
							} catch (e) {
								didCatch = true;
								callback(null, body);
							}
							if (!didCatch) {
								callback(null, null);
							}
							break;
						default:
							callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
					}
				}
			});
		}
	}, {
		key: 'getProtocolPDFArray',
		value: function getProtocolPDFArray(protoidarr, callback) {
			var retValue = {};
			var promiseArray = [];
			var currentObjectInstance = this;
			if (!Array.isArray(protoidarr)) {
				callback('ERROR: getProtocolPDFArray() only accepts arrays.', null);
			} else {
				var _loop2 = function _loop2(i) {
					promiseArray.push(new Promise(function (resolve, reject) {
						currentObjectInstance.getProtocolPDF(protoidarr[i], function (error, result) {
							if (error) {
								resolve(null);
							} else if (result == null) {
								resolve({ protoidarr: protoidarr[i], result: null });
							} else {
								resolve({ protoidarr: protoidarr[i], result: result });
							}
						});
					}));
				};

				for (var i = 0; i < protoidarr.length; ++i) {
					_loop2(i);
				}
				Promise.all(promiseArray).then(function (protocols) {
					protocols.map(function (protocol) {
						retValue[protocol.protoidarr] = protocol.result;
					});
					callback(null, retValue);
				}).catch(function (err) {
					callback(Error('Error: ' + err.message), null);
				});
			}
		}
	}]);

	return ProtocolsIO;
}();

var test = function test() {
	var muhApiKey = process.env.PIO_API_KEY;
	var protocols = new ProtocolsIO(muhApiKey);
	var protopdf = protocols.getProtocolPDF('foo', function (error, result) {
		if (error) {
			console.log(error);
		} else {
			fs.writeFile('329.pdf', result, function (err) {
				if (err) {
					console.log(err);
				}
				console.log('File written successfully.');
			});
		}
	});
};
module.exports = ProtocolsIO;
