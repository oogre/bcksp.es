module.exports.twitter = {
    app : {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
    },
    user : {
      token : process.env.TWITTER_USER_TOKEN,
      secret : process.env.TWITTER_USER_SECRET,
    },
    length : 140,
    tweet : {
      poster : "I want to share with you this poster : [POSTER_URL]"
    },
    share:{
    	url : "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fbcksp.es&amp;text=[TWEET_TEXT]&amp;tw_p=tweetbutton&amp;url=&amp;via=bckspes",
    	length : 127
    }
}


    