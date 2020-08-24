const fs = require('fs')
const path = require('path')
const Sequelize = require("sequelize");
const app = require("./app");
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/config.json`)[env];
const User = require("./userModel");


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

console.log(process.env[config.use_env_variable])

User.sync()

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//  START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
