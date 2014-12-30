module.exports = function(param){
	var _ = require('lodash');
	var fs = require('fs-extra');
	var PDFKit = require('pdfkit');
	var _param = {
		dest : "public/files",
		filename : "default.pdf",
		page : {
			size : "A4",
			margins : {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			},
			colomn : 1
		},
		fonts : []
	};
	param = _.extend(_param, param);

	if(!fs.existsSync(param.dest)){
		fs.mkdirSync(param.dest, 0777, true);
	}	
	param.dest += "/"+param.filename;
	
	var doc = new PDFKit({
		bufferPages: true,
		size : param.page.size
	});
	
	var writeStream = fs.createWriteStream(param.dest);
	doc.pipe(writeStream);
	doc.page.margins = param.page.margins;
	
	param.fonts.map(function(font){
		doc.font(font.file, font.name);
	});

	var _templates = {};

	return {
		end : function(next){
			var _this = this;
			doc.end();
			writeStream
			.on('finish', function () {
				next(_this);
			});
			return this;
		},
		doc : function(){
			return doc;
		},
		getUrl : function(){
			return param.dest;
		},
		template : function(){
			if(arguments.length == 0){
				return _templates;
			}
			else if(arguments.length == 1){
				var name = arguments[0];
				if(_.isString(name)){
					return _templates[name];
				}
			}
			else if(arguments.length == 2){
				if(_.isString(arguments[0])){
					var name = arguments[0];
					if(_.isFunction(arguments[1])){
						var template = arguments[1];
						_templates[name] = template;
						return this;
					}
					else if(_.isFunction(_templates[name])){
						var fnc = _templates[name];
						var data = arguments[1];
						fnc(doc, data);
						return this;
					}
				}
			}
		}
	}
};