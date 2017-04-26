const Sequelize = require('sequelize');
const db = require('../_db');

var Dtweets = db.define('dtweets', {
  twitterId: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT
  },
  hashtags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Dtweets;
