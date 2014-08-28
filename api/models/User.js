/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema:true,
  attributes: {
/* SHORT DATA */
    email :{
  		type: "String",
  		email: true,
  		required: true
  	},
    encryptedPassword:{
  		type:"String"
  	},
    admin: {
      type: "boolean",
      defaultsTo: false
    },
    online : {
      type: "boolean",
      defaultsTo: false
    },

    volume : {
      type : "integer",
        defaultsTo: 0
    },

    lang : {
      // [TODO] update for users doesn't have yet
      type:"String"
    },
    apps : {
      // [TODO]
      type:"String"
    },

    backspace:{
      collection: 'backspace',
      via: 'owner'
    },
    passwordRecoveryToken:{
      type:"String"
    },
    /* SHPPING */

    firstname:{
    	type:"String",
    },
    lastname:{
    	type:"String",
    },
    adress:{
    	type:"String",
    },
    city:{
    	type:"String",
    },
    zipcode:{
    	type:"String",
    },
    country:{
    	type:"String",
    },

    toJSON: function(){
      var  obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj.passwordRecoveryToken;
      delete obj._csrf;
      return obj;
    },

    cleanSession : function(){
      var  obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj.passwordRecoveryToken;
      delete obj.volume;
      delete obj.updatedAt;
      delete obj.createdAt;
      delete obj._csrf;
      return obj;
    }

  },

  beforeUpdate : function(values, next){
    if(values.password){
      if(values.password != values.confirmation){
        return next({
          err : ["Password doesn't match password confirmation"]
        });
      }
      require("bcrypt").hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        if(err)return next(err);
        values.encryptedPassword = encryptedPassword;
        next();
      });   
    }else{
      next();
    }
  }
};

