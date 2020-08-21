const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USER
const password  = process.env.DATABASE_PASS

const sequelize = new Sequelize(database, username, password, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been made established successfully..");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

//  START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
