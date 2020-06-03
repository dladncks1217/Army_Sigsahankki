const sequelize = require('sequelize');
const env = process.env.NODE_ENV||'development';
const config = require('../config/config.js');

const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Location = require('./location')(sequelize,Sequelize);
db.Restaurants = require('./restaurant')(sequelize,this.Sequelize);

module.exports = db;