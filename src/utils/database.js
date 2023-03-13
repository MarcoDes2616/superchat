const sequelize = require ("sequelize")

const db = new sequelize({
    database: "superchat",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root2616",
    dialect: "postgres",
    logging: false,
  });

module.exports = db;