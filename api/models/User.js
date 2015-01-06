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

    facebook : {
      type : "json"
    },

    lang : {
      // [TODO] update for users doesn't have yet
      type:"String"
    },
    apps : {
      // [TODO]
      type:"String"
    },

    captureEmail :{
      type:"boolean",
      defaultsTo: true
    },

    capturePassword : {
      type:"boolean",
      defaultsTo: true
    },

    captureBlacklist : {
      type:"string",
      defaultsTo: ""
    },

    backspace:{
      collection: 'backspace',
      via: 'owner'
    },

    print:{
      collection: 'print',
      via: 'owner',
      dominant: true
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
      delete obj.captureBlacklist;
      delete obj.capturePassword;
      delete obj.captureEmail;
      delete obj.volume;
      delete obj.updatedAt;
      delete obj.createdAt;
      delete obj._csrf;
      return obj;
    },

    initSession : function(session){
      var birthDate = new Date()
      var deathDate = new Date(birthDate.getTime() + sails.config.session.cookie.maxAge);
      session.cookie.expires = deathDate;
      session.authenticated = true;
      session.User = this.cleanSession();
      this.online = true;
      return this;
    },

    destroySession : function(session){
      this.online = false;
      session.destroy();
      return this;
    },

    signup : function(session, next){
      this
      .initSession(session)
      .save(function saved(err, user){
        if(err){
          user.destroySession(session);
          return next(err);
        }
        User.publishCreate(user.toJSON());
        return next(null, user);
      });
    },

    signin : function(session, next){
      this
      .initSession(session)
      .save(function saved(err, user){
        if(err){
          user.destroySession(session);
          return callback(err); 
        }
        User.publishUpdate(user.id,{ 
          online : user.online 
        });
        return next(null, user);
      });
    },

    signout : function (session, next){
      this
      .destroySession(session)
      .save(function saved(err, user){
        if(err){
          return next(err);
        }
        User.publishUpdate(user.id, { 
          online : user.online 
        });
        return next(null, user);
      });
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

