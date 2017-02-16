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

An example of output from this would be:

```json
{
	"request": "OK",
	"protocols": [{
		"protocol_name": "Transformation of Skeletonema marinoi using Multipulse Electroporation",
		"protocol_id": "5038",
		"version_class": "5038",
		"activity": "1486591925",
		"is_owner": "0"
	}, {
		"protocol_name": "Modeling ecological drivers in marine viral communities using comparative metagenomics and network analyses",
		"protocol_id": "2248",
		"version_class": "2248",
		"activity": "1486591923",
		"is_owner": "0"
	}, {
		"protocol_name": "Enumerating algal viruses by flow cytometry",
		"protocol_id": "4714",
		"version_class": "3172",
		"activity": "1486591921",
		"is_owner": "0"
	}, {
		"protocol_name": "Transient genetic transformation of Bodo caudatus using square wave electroporation system and pUB-GFP plasmid",
		"protocol_id": "5016",
		"version_class": "5016",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Electroporation of COS-7 cells and functionalization of QDs",
		"protocol_id": "4909",
		"version_class": "4909",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Preparation of 1.5 mg\/mL Sera-mag carbolylate modified magnetic particles",
		"protocol_id": "4898",
		"version_class": "4898",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Library Preparation for Sequencing of Assembled Gene Clusters",
		"protocol_id": "4896",
		"version_class": "4896",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Protein renaturation from pellet samples",
		"protocol_id": "4876",
		"version_class": "4876",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Microcystinase (MlrA) sample preparation for enzymatic activity assay",
		"protocol_id": "4874",
		"version_class": "4874",
		"activity": "1484604721",
		"is_owner": "0"
	}, {
		"protocol_name": "Microsome preparation",
		"protocol_id": "4872",
		"version_class": "4872",
		"activity": "1484604721",
		"is_owner": "0"
	}],
	"total_results": "108",
	"total_pages": 11,
	"page_served": 0,
	"extras": {
		"2": [{
			"group_name": "VERVE Net",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/cdqcwwe.png",
			"uri": "verve-net",
			"total": 122
		}, {
			"group_name": "Sullivan Lab",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/fxc3an.jpg",
			"uri": "sullivan-lab",
			"total": 37
		}, {
			"group_name": "BioLegend",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/djiecje.png",
			"uri": "biolegend",
			"total": 31
		}, {
			"group_name": "Hurwitz Lab",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/iscwwe.png",
			"uri": "hurwitz-lab",
			"total": 22
		}, {
			"group_name": "G-Biosciences",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/d6heeee.png",
			"uri": "gbiosciences",
			"total": 20
		}, {
			"group_name": "MetaFunc Course",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/emybvtw.jpg",
			"uri": "metafunc-course",
			"total": 19
		}, {
			"group_name": "OpenPlant Project",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/d73eiee.png",
			"uri": "openplant-project",
			"total": 14
		}, {
			"group_name": "Bioline",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/ftxe5pn.png",
			"uri": "bioline",
			"total": 12
		}, {
			"group_name": "Genetics",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/55wpd.png",
			"uri": "genetics",
			"total": 12
		}, {
			"group_name": "Upton-Lab",
			"group_logo": "https:\/\/s3.amazonaws.com\/pr-journal\/6xbf8w.jpg",
			"uri": "uptonlab",
			"total": 9
		}]
	},
	"author_details": null,
	"host": 1,
	"status_code": 0
}
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
