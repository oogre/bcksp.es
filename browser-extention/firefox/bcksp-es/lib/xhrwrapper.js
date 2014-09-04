// JS-Snippets : HXR Wrapper
// A handy wrapper for XMLHttpRequests, allowing both synchronous and asynchronous requests, both GET and POST.
// Async is snappy but jQuery is fatty, let's make async queries easy to use without jQuery.
// 2012 Getyoo, Jean-Karim Bockstael <jkb@getyoo.com>

// Parameters:
// - url : (string) request url
// - parameters : (object) key-values of request parameters
// - method : (string) "GET" | "POST"
// - callback : (optional) (function) callback function, the request will be async if this is set


const {Cc,Ci} = require("chrome");


exports.xhrwrapper = function xhrwrapper(url, parameters, method) {
	var Deffered = require("Deffered").Deffered;
	var deffered = new Deffered();

	var Request = require("sdk/request").Request;
	var req = Request({
  		url: url,
  		content : parameters,
		onComplete: function (response) {
			if(response.json && response.json.status == "ok"){
				deffered.resolve(response.json);
			}
			else{
				deffered.reject(response.json);
			}
		}
	});

	switch(method.toLowerCase()){
		case "get":
		req.get();
		break;
		case "post":
		req.post();
		break;
		case "put":
		req.put();
		break;
		case "head":
		req.head();
		break;
		case "delete":
		req.delete();
		break;
	}

	return deffered;
};