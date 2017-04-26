const router = require('express').Router()
var db = require('../../db');
var Dtweets = db.models.dtweets;
var Mtweets = db.models.mtweets;
var Promise = require('bluebird');
const pRequest = require('request-promise');
var Twit = require('twit');
var info = require('../../secret.config')

// twitter access instance
var T = new Twit({
  consumer_key: info.clientID,
  consumer_secret: info.clientSecret,
  access_token: info.accessToken,
  access_token_secret: info.accessTokenSecret,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

// trump twitter id: 25073877
// pull trump tweets
router.get('/recent', (req, res, next) => {
  T.get('statuses/user_timeline', {screen_name: 'realDonaldTrump', count: 100, max_id: '736234989591121922'})
  .then(tweets => {
    Promise.all(tweets.data.map(tweet => {
      Dtweets.create({
        twitterId: tweet.id_str,
        text: tweet.text,
        hashtags: tweet.entities.hashtags.map(hashObj => hashObj.text)
      });
    }))
    .then(() => {
      console.log('length of tweets pulled from Twitter: ', tweets.data.length);
      res.send(tweets);
    });
  })
  .catch(next);
});

// post your new status
router.get('/statusupdate', (req, res, next) => {
  T.post('statuses/update', {status: 'hello world, i am trumpbot #itsAlive #helloworld'})
  .then(postresponse => {
    Mtweets.create({
      twitterId: postresponse.id_str,
      text: postresponse.text,
      hashtags: postresponse.entities.hashtags.map(hashObj => hashObj.text)
    })
    .then(newstatus => {
      console.log(newstatus);
      console.log(postresponse.data.id);
      res.send(postresponse);
    });
  })
  .catch(next);
});

module.exports = router;
