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
		var maxLength = 200;
		pdf = new PDF(poster.config);
		pdf = poster.templates(pdf);

		var finish = function(err, sentence, users){
			if(err) return next(err);
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
			.template("sentence", sentence);
			if(users){
				pdf.template("signature", users);
			}
			pdf
			.template("text", poster.txt.fr)
			.template("footer", ["bcksp.es", "we archive backspace"])
			.end(function(pdf){
				require("../modules/scp.js")({
					conf : sails.config.scp,
					filename : "poster/"+new Date().getTime()+".pdf",
					src  : pdf.getUrl(),
					dest : sails.config.scp.path
				}, function(err, filename){
					if(err) return next(err);
					return res.view({
						sentence : sentence,
						url : sails.config.scp.url+filename
					});
				});
			});
		};

		var sentence = req.param("txt");
		var id = req.param("id");

		if(sentence){
			return finish(null, sentence, false);
		}
		else if(id){
			maxLength = Math.ceil( 200*Math.random() );
			return Backspace.getRandom({
				owner : id
			}, true, maxLength, finish);
		}
		else{
			maxLength = Math.ceil( 200*Math.random() );
			var date = new Date();
			date = new Date(date.getFullYear(), date.getMonth(), date.getDay());
			return Backspace.getRandom({
				updatedAt : {
					">=" : date}
			}, false, maxLength, finish);
		}

	}
};

