var request = require('request');
var encodeUrl = require('encodeurl');

class ProtocolsIO {
	constructor(apikey) {
		this._apikey = apikey;
	}
	
	_constructURL(keywords) {
		var currURL = 'https://www.protocols.io/api/open/get_protocols?key=' + (this._apikey) + '&page_id=1&keywords=' + keywords;
		return encodeUrl(currURL);
	}

	getProtocols(keywords) {
		var reqURL = this._constructURL(keywords);
		request(reqURL, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		}	
	}
}

export { ProtocolsIO as default }
