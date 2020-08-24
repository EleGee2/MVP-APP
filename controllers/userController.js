const User = require("../userModel");
const Pool = require("pg").Pool;

const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const { response } = require("../app");

dotenv.config({ path: "./config.env" });

const getUsers = catchAsync(async (req, res, next) => {
  await User.findAll().then((user) => {
    res.status(200).json({
      status: "success",
      data: { data: user },
    });
  });
});

const getUser = catchAsync(async (req, res, next) => {
  await User.findByPk(req.params.id).then((user) => {
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
    res
      .status(200)
      .json({
        status: "success",
        data: { data: user },
      })
      .catch((error) => res.status(400).send(error));
  });
});

const createUser = catchAsync(async (req, res, next) => {
  return User.create(req.body)
  .then((user, error) => {
    if (error) {
      response.send(400).send(error)
    }
    res.status(200).json({
      status: "success",
      data: { data: user }
    })
  }).catch(error => res.status(400).send(error))
})

const updateUser = catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  await User.findByPk(id).then((user) => {
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
    user.update(req.body).then((doc) => {
      res.status(200).json({
        status: "success",
        data: { data: doc }
      })
    })
  }).catch(error => {throw new Error(error)})
})

const deleteUser = catchAsync(async (req, res, next) => {
  await User.destroy( { where: { id: req.params.id} } ).then((user) => {

    if (!user) {
      res.status(404).send(`No document found with ID of ${req.params.id}`)
    }
    res.status(204).json({
      status: "success",
      data: { user: null }
    })
  })
})

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
