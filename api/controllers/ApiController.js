/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findPrint : function(req, res, next){
		var params = req.params.all();

		params = {
			where : params.where && "undefined" != params.where ? JSON.parse(params.where) : null,
			limit : params.limit && "undefined" != params.limit ? JSON.parse(params.limit) : null,
			sort : params.sort && "undefined" != params.sort ? JSON.parse(params.sort) : null,
			skip : params.skip && "undefined" != params.skip ? JSON.parse(params.skip) : null,
			/*[{
				name 
				option : {}
			}]*/
			populates : params.populates && "undefined" != params.populates ? JSON.parse(params.populates) : [],
		};

		var print = Print
					.find()
					.where(params.where)
					.sort(params.sort)
					.limit(params.limit)
					.skip(params.skip);
		
		params
		.populates
		.map(function(populate){
			print = print.populate(populate.name, populate.option);
		});

		print
		.then(function (prints){
			var length =	Print
							.count()
							.then(function(length){
								return length;
							})
							.catch(function(err){
								return 0;
							});
			return [prints, length];
		})
		.spread(function(prints, length){
			return res.api(200, {
				prints : prints,
				length : length,
				params : params
			});
		})
		.catch(function(err){
			return res.api(500, err);
		})
	},
	backspace : function(req, res, next){

	}
};

