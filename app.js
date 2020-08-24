const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser')
const xss = require('xss-clean');
const cors = require('cors')
const userController = require('./controllers/userController.js')

const AppError = require('./utils/appError');

const app = express();

// MIDDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Data sanitize against XSS
app.use(xss());


app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the MVP application!", app: "MVP" });
});

// ROUTES
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUser)
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

module.exports = app;