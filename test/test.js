var ProtocolsIO = require('../protocolsio.js');
var apikey = process.env.PIO_API_KEY;

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
	
	describe('#getProtocolJSONArray()', function() {
		it('should fail when anything but an array is passed in', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolJSONArray('5038', function(error, result) {
				if(error) {
					done();
				} else {
					done(Error('ERROR: getProtocolJSONArray did not fail when passed bad data'));
				}
			});
		});
		it('should return JSON for each of the protocol ids passed in', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolJSONArray(['5038', '4714', '2248'], function(error, result) {
				if(error) {
					done(error);
				} else {
					if(result['2248'] == null) {
						done(Error('ERROR: JSON not returned for id 2248'));
					}
					if(result['5038'] == null) {
						done(Error('ERROR: JSON not returned for id 5038'));
					}
					if(result['4714'] == null) {
						done(Error('ERROR: JSON not returned for id 4714'));
					}
					done()
				}
			});
		});
	});
	
	describe('#getProtocolPDFArray()', function() {
		it('should fail when anything but an array is passed in', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolPDFArray('5038', function(error, result) {
				if(error) {
					done();
				} else {
					done(Error('ERROR: getProtocolPDFArray did not fail when passed bad data'));
				}
			});
		});
		it('should return null for invalid protocol ids', function(done) {
			var protocolsioapi = new ProtocolsIO(apikey);
			protocolsioapi.getProtocolPDFArray(['5038', 'foo'], function(error, result) {
				if(error) {
					done(error);
				} else {
					if(result['foo'] != null) {
						done(Error('Invalid protocol ID foo should be mapped to null.'));
					} else {
						done();
					}
				}
			});
		});
	});
});
