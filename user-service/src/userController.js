'use strict';

// const fastify = require('fastify')();
// let users = require('./Users')
// const { v4: uuidv4 } = require('uuid');
const config = require('config');

const { mongoUrl } = config;

const mongoose = require('mongoose');

const User = require('./schemas');

mongoose.connect(mongoUrl);

// User.findById('61a60c383cb13d0ca5e99a59');

const getUsers = async (req, reply) => {
  // const users = await fastify.mongoDb.collection('users');
  reply.send(users);
};

const getUser = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const user = await User.findById(id);
  reply.send(user);
};

const registerUser = (req, reply) => {
  const {
    name, password, email, role, course, semester, group
  } = req.body;
  const user = new User({
    name,
    password,
    email,
    role,
    course,
    semester,
    group
  });
  // const users = [...users, user];
  user.save();
  reply.code(201).send(user);
};

const deleteUser = (req, reply) => {
  const { id } = req.params;

  const users = users.filter(user => user.id !== id);
  reply.send({ message: `User ${id} has been removed` });
};

const updateUser = (req, reply) => {
  const { id } = req.params;
  const {
    name, password, email, role, course, semester, group
  } = req.body;
  const users = users.map(user => (user.id === id ? {
    id, name, password, email, role, course, semester, group
  } : user));
  const user = users.find(user => user.id === id);
  reply.send(user);
};

module.exports = {
  getUser,
  getUsers,
  registerUser,
  deleteUser,
  updateUser
};
