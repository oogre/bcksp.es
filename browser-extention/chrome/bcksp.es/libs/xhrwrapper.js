// JS-Snippets : HXR Wrapper
// A handy wrapper for XMLHttpRequests, allowing both synchronous and asynchronous requests, both GET and POST.
// Async is snappy but jQuery is fatty, let's make async queries easy to use without jQuery.
// 2012 Getyoo, Jean-Karim Bockstael <jkb@getyoo.com>

// Parameters:
// - url : (string) request url
// - parameters : (object) key-values of request parameters
// - method : (string) "GET" | "POST"
// - callback : (optional) (function) callback function, the request will be async if this is set

var _http = function(url, parameters, method) {
	var deffered = new Deffered();
	// Warning : no parameters type/value checking, careful what you feed it
	var params = new FormData();
	for (var key in parameters) {
		if (parameters.hasOwnProperty(key)) {
			params.append(key, parameters[key]);
		}
	}
	// You can't use these beautiful FormData objects in GET requests
	if (method === "GET") {
		params = null;
		var paramString = "";
		for (var key in parameters) {
			if (parameters.hasOwnProperty(key)) {
				paramString += key + "=" + parameters[key] + "&";
			}
		}
		if (paramString.length > 0) {
			url += "?" + paramString.slice(0, -1);
		}
	}
	var req = new XMLHttpRequest();
	req.open(method, url, true);
	req.onreadystatechange = function() {
		if (req.readyState === 4) {
			if (req.status < 400) {
				if(req.responseText){
					try{
						var data = JSON.parse(req.responseText) || null;
						if(data && data.status){
							if("ok" == data.status){
								deffered.resolve(data);
							}else{
								deffered.reject(data);
							}
						}else{
							deffered.reject(req.responseText);
						}
					}catch(e){
						deffered.resolve(req.responseText);
					}
				}
			}
			else {
				deffered.reject();
			}
		}
	};
	req.send(params);
	return deffered;
};
