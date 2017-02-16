'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var encodeUrl = require('encodeurl');

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
							callback(null, body);
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
							callback(null, body);
							break;
						default:
							callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
					}
				}
			});
		}
	}, {
		key: 'getProtocolPDF',
		value: function getProtocolPDF(protoid, callback) {
			var reqURL = encodeUrl('https://www.protocols.io/api/open/get_protocol_pdf?key=' + this._apikey + '&protocol_id=' + protoid);
			request(reqURL, function (error, response, body) {
				if (error) {
					callback(error, null);
					return;
				} else {
					switch (response.statusCode) {
						case 200:
							callback(null, body);
							break;
						default:
							callback('UNSUPPORTED STATUS CODE: ${response.statusCode}', null);
					}
				}
			});
		}
	}]);

	return ProtocolsIO;
}();

var test = function test() {
	var protocols = new ProtocolsIO(muhApiKey);
	protocols.getProtocolJSON('5038', function (error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
	});
};
module.exports = ProtocolsIO;
