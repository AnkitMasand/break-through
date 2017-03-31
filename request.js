// import
var https       = require('https');
var http 		= require('http');
var querystring = require('querystring');


// a wrapper for HTTP/HTTPS request
// the protocol is passed as a string in the first parameter
// the method, host, port, path and headers are passed in an object in the second parameter
// any data that is to be sent is passed as an object(key-value) in the third parameter (optional. can be null if no data needs to be passed)
// this function be used as a generic module for many types of requests
function sendRequest(strProtocol, objRequestOptions, objRequestParams, cb) {

	// declare response variable
	var strResponse = "";

	// the protocol is kept dynamic
	// package used to make the request also becomes dynamic
	var pkgProtocol = strProtocol === 'http' ? http : https;

	// in case of a get request, request params will not be passed
	// assign only if they are passed - better error handling technique
	var strRequestParams = objRequestParams ? querystring.stringify(objRequestParams) : null;

	// create options object
	var objOptions = {
		host: objRequestOptions.host,
		port: objRequestOptions.port,
		method: objRequestOptions.method,
		path: objRequestOptions.path,
		headers: objRequestOptions.headers
	};

	 //console.log("in request->sendRequest. options", objOptions, new Date().toString());
	 //console.log("in request->sendRequest. params", objRequestParams, new Date().toString());

	// make and wait for request
	var req = pkgProtocol.request(objOptions, function(res) {
		res.on('data', function(response){
			strResponse = strResponse + response.toString();
		});
		res.on('error', function(error) {
			return cb(error, null);
		});
		res.on('end', function() {
			return cb(null, strResponse);
		});
	});

	// write request params if present
	if (strRequestParams) req.write(strRequestParams)
	
	// never forget to end a request. Might create havoc in the code
	req.end();

}

// export functions
module.exports = {
	sendRequest: sendRequest
}
