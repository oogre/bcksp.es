/**
 * PrintController
 *
 * @description :: Server-side logic for managing prints
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"index" : function(req, res, next){
		var personnal = false;
		if(req.param("id") == req.session.User.id){
			User.findOne()
			.where({
				id : req.param("id")
			})
			.populate('backspace')
			.then(function (user){
				if(!user) return res.redirect('/'+req.session.locale);
				return res.view({
					backspace : user.backspace.map(function(backspace){ return Object.keys(backspace.content).map(function(key){ return backspace.content[key] }).join("") }).join("")
				});
			})
			.catch(function(err){
				if(err) return next(err);
			});
		}else{
			LastBackspace.findOne()
			.where({
				name : "last"
			})
			.then(function(lastBackspace){
				if(!lastBackspace) return res.notFound();
				return res.view({
					backspace : lastBackspace
				});
			})
			.catch(function(err){
				if(err) return next(err);
			})
		}
	},

	"poster" : function(req, res, next){

		var PDF = require("../modules/pdf.js");
		var poster = sails.config.poster;
		var maxLine = 4;
		var maxLength = Math.ceil( 200*Math.random() );
		pdf = new PDF(poster.config);
		pdf = poster.templates(pdf);

		var finish = function(sentence){
			if(!_.isString(sentence)){
				return next(sentence);
			}
			sentence = 	sentence
						.split("\n")
						.slice(0, maxLine)
						.join("\n")
						.substr(0, maxLength);
			pdf
			.template("shape", 10)
			.template("sentence", sentence)
			.template("text", poster.txt.fr)
			.template("footer", ["bcksp.es", "we archive backspace"])
			.end();

			setTimeout(function(){
				var client = require('scp2');
				var scp_config = sails.config.scp;
				var filename = new Date().getTime()+".pdf";
				sails.config.scp.path += filename;
				client.scp(pdf.getUrl(), sails.config.scp, function(err) {
					if(!err){
						var fs = require('fs-extra');
						fs.unlink(__dirname+"/../../"+pdf.getUrl(), function(){
							return res.view({
								url : "http://archive.bcksp.es/poster/"+filename
							});
						});
					}else{
						console.log(err);
					}
				});
			}, 500);

		};

		var sentence = req.param("txt");
		var id = req.param("id");

		if(sentence){
			return finish(sentence);
		}
		else if(id){
			return Backspace.getRandom({
				owner : id
			}, maxLength, finish);
		}
		else{
			var date = new Date();
			date = new Date(date.getFullYear(), date.getMonth(), date.getDay());
			return Backspace.getRandom({
				updatedAt : {
					">=" : date}
			}, maxLength, finish);
		}

	}
};

