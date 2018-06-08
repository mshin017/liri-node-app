var fs = require("fs");
var dotenv = require('dotenv').config()

console.log('this is loaded');
var keys = {
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },

  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  },
 

}
module.exports = keys;