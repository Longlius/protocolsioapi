# What is this?
protocolsioapi is an NPM module that allows you easy access to the protocols.io REST api for searching protocols, retrieving metadata in JSON format, and downloading a PDF specification.

# How do I use it?

First add it to your project with:

```$ npm install protocolsioapi```

Then import it into your code using:

```var protocolsioapi = require('protocolsioapi');```

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
