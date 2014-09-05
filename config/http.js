/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    startFacebookPassportStrategy : function(req, res, next){
      if(req.url!="/" && req.url!="/session/new" && req.url!="/user/new" && !req.url.toLowerCase().match(/\/auth\/facebook\//)){
        return next();
      }
      console.log('Express Middleware -- Start Facebook Passport Strategy');
      
      var FacebookStrategy = require('passport-facebook').Strategy
      var passport = require('passport')
      passport.serializeUser(function (user, done) {
        done(null, user);
      });
      passport.deserializeUser(function (user, done) {
          done(null, user)
      });

      passport.use(new FacebookStrategy({
            clientID: sails.config.facebook.appId,
            clientSecret: sails.config.facebook.appSecret,
            callbackURL: sails.config.facebook.callbackURL,
        },
        function (accessToken, refreshToken, profile, done) {
          process.nextTick(function () {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            return done(null, profile);
          });
      }));

      passport.initialize();
      passport.session();
      return next();
    },

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      "startFacebookPassportStrategy",
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    //RequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
     //    return next();
     //}


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
