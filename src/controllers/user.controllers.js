const UsersServices = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    await UsersServices.create(newUser);
    res.status(201).json();
  } catch (error) {
    // next(error);
    res.status(400).json(error)
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UsersServices.getAll();
    res.status(201).json(result);
  } catch (error) {
    // next(error);
    res.status(400).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;
    const result = await UsersServices.update(id, { name, lastname });
    res.status(204).send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
};
