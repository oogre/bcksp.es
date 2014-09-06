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
    view: 'static/index'
  },

  "/faq" : {
    view : 'static/faq'
  },

  "/privacy" : {
    view : 'static/privacy'
  },

  "/terms" : {
    view : 'static/terms'
  },
  
  "get /app" : 'AppController.index',

/* SessionController  */
  "get /session/new/?" : 'SessionController.new',
  "post /session/create/?" : 'SessionController.create',
  "post /session/destroy/?" : 'SessionController.destroy',

/* UserController  */
  "get /user/new/?" : 'UserController.new',
  "post /user/confirmation/?" : 'UserController.confirmation',
  "get /user/create/?" : 'UserController.create',
  "get /user/show/:id?" : 'UserController.show',
  "get /user/index/?" : 'UserController.index',
  "get /pwd/?" : 'UserController.pwd',
  "post /pwd/recovery/?" : 'UserController.pwdrecovery',
  "get /pwd/new/:id?" : 'UserController.pwdnew',
  "post /pwd/submit/?" : 'UserController.pwdsubmit',
  "post /user/destroy/?" : 'UserController.destroy',
  "get /user/subscribe/?" : 'UserController.subscribe',
  "get /user/online/?" : 'UserController.online',
  "post /user/update/:id?" : 'UserController.update',


/* BackspaceController */
  "get /backspace/token/?" : 'BackspaceController.token',
  "post /backspace/append/?" : 'BackspaceController.append',
  "get /backspace/last/?" : 'BackspaceController.last',
  "get /backspace/watch/?" : 'BackspaceController.watch',
  "get /backspace/subscribe/:id?" : 'BackspaceController.subscribe',

/* AuthController */
  "get /auth/facebook" : "AuthController.facebook",
  "get /auth/facebook/callback" : "AuthController.facebook/callback",

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
