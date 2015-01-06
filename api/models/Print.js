/**
* Print.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		type : {
			model : "printType",
			required : true
		},
		sentence : {
			type : "string",
			required : true	
		},
		viewed : {
			type : "integer",
			defaultsTo : 1,
		},
		print : {
			type : "integer",
			defaultsTo : 0,
		},
		sold : {
			type : "integer",
			defaultsTo : 0,
		},
		url : {
			type : "string",
			required : true
		},
		owner : {
			collection : "user",
			via : "print"
		}
	}
};