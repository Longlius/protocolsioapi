# What is this?
protocolsioapi is an NPM module that allows you easy access to the protocols.io REST api for searching protocols, retrieving metadata in JSON format, and downloading a PDF specification.

# How do I use it?

First add it to your project with:

```$ npm install protocolsioapi```

Then import it into your code using:

```javascript
var ProtocolsIO = require('protocolsioapi');
var protocolsioapi = new ProtocolsIO('<your api key here>');
```

To get a listing of all protocols matching a the keyword 'foo', use:

```javascript
protocolsioapi.getProtocols('foo', null, function(error, result) {
	if(error) {
		console.log(error);
	} else {
		/// do something with result here
	}
});
```

You can get individual pages of results using the pageid argument:

```javascript
protocolsioapi.getProtocols('foo', '3', function(error, result) {
	if(error){
		console.log(error);
	} else {
		/// do something with result here
	}
});
```

Getting JSON metadata works similarly but requires a protocol id number:

```javascript
protocolsioapi.getProtocolJSON('5308', function(error, result) {
	if(error) {
		console.log(error);
	} else {
		// do something with the result
	}
});
```

And to get the PDF specification of the protocol:

```javascript
protocolsioapi.getProtocolPDF('5308', function(error, result) {
	if(error) {
		console.log(error);
	} else {
		// do something with the result (perhaps save it to the disk?)
	}
});
```
