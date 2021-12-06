'use strict';

const config = require('config');

const { mongoUrl } = config;

const mongoose = require('mongoose');

const md5 = require('crypto-js/md5');
const jwt = require('jsonwebtoken');

const User = require('./User');

const secret = process.env.JWT_SECRET || 'secret';

mongoose.connect(mongoUrl);

const getUsers = async (req, reply) => {
  // const users = await fastify.mongoDb.collection('users');
  const users = await User.find();
  reply.send(users);
};

const getUser = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const user = await User.findById(id);
  reply.send(user);
};

const registerUser = async (req, reply) => {
  const {
    name, password, email, role, course, semester, group
  } = req.body;

  const [userByName] = await User.find({ name });
  if (userByName && userByName.id) {
    throw new Error('User with this name already exists');
  }

  const [userByEmail] = await User.find({ email });
  if (userByEmail && userByEmail.id) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = md5(password).toString();
  const user = new User({
    name,
    password: hashedPassword,
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

const loginUser = async (req, reply) => {
  const {
    name, password
  } = req.body;
  const hashedPassword = md5(password).toString();
  const [user] = await User.find({ name, password: hashedPassword });

  if (!user || !user.id) {
    throw new Error('User with such credentials does not exist');
  }

  const token = jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    course: user.course,
    semester: user.semester,
    group: user.group
  }, secret);

  return reply.send({
    token
  });
};

const deleteUser = (req, reply) => {
  const { id } = req.params;

  // const users = users.filter(user => user.id !== id);
  User.findByIdAndDelete(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed User : ', docs);
    }
  });
  reply.send({ message: `User ${id} has been removed` });
};

const updateUser = (req, reply) => {
  const { id } = req.params;
  const {
    name, password, email, role, course, semester, group
  } = req.body;
  // const users = users.map(user => (user.id === id ? {
  //   id, name, password, email, role, course, semester, group
  // } : user));
  // const user = users.find(user => user.id === id);

  User.findById(id).then(user => {
    user.name = name;
    user.password = password;
    user.email = email;
    user.role = role;
    user.role = role;
    user.course = course;
    user.semester = semester;
    user.group = group;
    user.save();
    reply.send(user);
  });
};

module.exports = {
  getUser,
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser
};
