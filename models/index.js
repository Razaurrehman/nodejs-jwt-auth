
const mongoose = require('mongoose');
const dbConfig = require("../config/db-pg.config.js");
const Sequelize = require("sequelize");

mongoose.Promise = global.Promise;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;