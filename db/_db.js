'use strict';

var Sequelize = require('sequelize');
var databaseURI = 'postgres://localhost:5432/TrumpBot';

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = db;