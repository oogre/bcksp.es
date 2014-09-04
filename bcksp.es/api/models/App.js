/**
* App.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema:true,
	attributes: {
	/* SHORT DATA */
		extension_id :{
			type: "String",
			required: true
		},
		application_name:{
			type:"String"
		},
		store_name:{
			type:"String"
		},
		extension_link: {
			type: "string"
		},
		help_link:{
				type: "string"
		},
		devlink:{
			type: "string"
		}
	}
};