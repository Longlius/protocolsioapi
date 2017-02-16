var assert = require('assert');
var ProtocolsIO = require('../protocolsio.js');
var apikey = process.env.PIO_API_KEY;

// Helper function for verifying JSON
function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

describe("ProtocolsIO", function() {
	describe('#getProtocols()', function() {
		it('should return proper JSON even when no parameters are passed', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocols(null, null, function(error, result) {
				if(error) {
					done(error);
				} else if (result['request'] === "OK") {
					done();
				} else {
					done(error);
				}
			});
		});
	});
	
	describe('#getProtocolJSON()', function() {
		it('should return proper JSON when passed a valid protocol id', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolJSON('5308', function(error, result) {
				if(error) {
					done(error);
				} else if (typeof result['api_version'] === 'string') {
					done();
				} else {
					done(error);
				}
			});
		});
	});
	
	describe('#getProtocolPDF()', function() {
		it('should not generate an error when passed a valid protocol id', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolPDF('4936', function(error, result) {
				if(error) {
					done(error);
				} else {
					done();
				}
			});
		});
	});
});
