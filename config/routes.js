/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/


  
  
  '/': {
    controller: 'static',
    action : "index"
  },
  'r|^\/fr$|lang': {
    controller: 'static',
    action : "index"
  },
  'r|^\/en$|lang': {
    controller: 'static',
    action : "index"
  },
  
  "get /:lang/static/lang" : 'staticController.lang',
  "get /:lang/faq" : 'staticController.faq',
  "get /:lang/privacy" : 'staticController.privacy',
  "get /:lang/terms" : 'staticController.terms',
  
  "get /:lang/app" : 'AppController.index',

/* SessionController  */
  "get  /session/new/?" : 'SessionController.new',
  "get /:lang/session/new/?" : 'SessionController.new',
  "post /:lang/session/create/?" : 'SessionController.create',
  "post /:lang/session/destroy/?" : 'SessionController.destroy',


/* UserController  */
  "get /:lang/user/new/?" : 'UserController.new',
  "post /:lang/user/confirmation/?" : 'UserController.confirmation',
  "get /:lang/user/create/?" : 'UserController.create',
  "get /user/show/:id?" : 'UserController.show',
  "get /:lang/user/show/:id?" : 'UserController.show',
  "get /:lang/user/index/?" : 'UserController.index',
  "get /:lang/pwd/?" : 'UserController.pwd',
  "post /:lang/pwd/recovery/?" : 'UserController.pwdrecovery',
  "get /:lang/pwd/new/:id?" : 'UserController.pwdnew',
  "post /:lang/pwd/submit/?" : 'UserController.pwdsubmit',
  "post /user/destroy/:id?" : 'UserController.destroy',
  "delete /user/destroy/:id?" : 'UserController.destroy',
  "get /user/subscribe/?" : 'UserController.subscribe',
  "get /user/online/?" : 'UserController.online',
  "post /:lang/user/update/:id?" : 'UserController.update',


/* BackspaceController */
  "get /backspace/token/?" : 'BackspaceController.token',
  "post /backspace/append/?" : 'BackspaceController.append',
  "get /backspace/last/?" : 'BackspaceController.last',
  "get /backspace/watch/?" : 'BackspaceController.watch',
  "get /backspace/subscribe/:id?" : 'BackspaceController.subscribe',
  "get /backspace/index/:id?" : 'BackspaceController.index',

/* AuthController */
  "get /:lang/auth/facebook" : "AuthController.facebook",
  "get /auth/facebook/callback" : "AuthController.facebook/callback",


/* PrintController */
  "get /:lang/print/index/:id?" : "PrintController.index",
  "get /:lang/print/poster/:id?" : "PrintController.poster",

/* public file */
  'get /public/files/*': function(req, res, next) {
    return res.sendfile(sails.config.appPath+req.path);
  },



/* PaymentController */
  "get /:lang/payment/success/:id?" : "PaymentController.success",
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
