const User = require("../userModel");
const Pool = require("pg").Pool;
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");

dotenv.config({ path: "./config.env" });

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

const getUsers = catchAsync(async (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    result = results.rows;
    response.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        result,
      },
    });
  });
});

const getUserById = catchAsync(async (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (results.rowCount === 0) {
      throw error
    }
    result = results.rows;
    response.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        result,
      },
    });
  });
});

const createUser = catchAsync(async (request, response) => {
  const { fname, lname, email, phone } = request.body;

  pool.query(
    "INSERT INTO users (fname, lname, email, phone) VALUES ($1, $2, $3, $4)",
    [fname, lname, email, phone],
    (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      response.status(201).json({
        status: 'success',
      });
    }
  ).catch(error => res.status(400).send(error))
});

const updateUser = catchAsync(async (request, response) => {
  const id = parseInt(request.params.id);
  const { fname, lname, email, phone } = request.body;

  pool.query(
    "UPDATE users SET fname = $1, lname = $2, email = $3, phone = $4 WHERE id = $5",
    [fname, lname, email, phone, id],
    (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  ).catch(error => res.status(400).send(error))
});

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
