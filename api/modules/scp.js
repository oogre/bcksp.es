module.exports = function(param, next){
	var Client = require('scp2').Client;
	var filename = param.filename;
	var dest = param.dest;
	var conf = param.conf;
	var src = param.src;
	
	new Client(conf)
	.upload(src, dest+filename, function(err){
		if(err) return next(err);
		require('fs-extra')
		.unlink(__dirname+"/../../"+src, function(){
			return next(null, filename);
		});
	})
}