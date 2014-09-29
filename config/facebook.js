module.exports.facebook = {
    appId : process.env.FACEBOOK_APP_ID,
    appSecret : process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://www.bcksp.es/auth/facebook/callback",
    
    share:{
    	url : "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.bcksp.es&amp;t=[FB_TEXT]",
    	length : 200
    }
}