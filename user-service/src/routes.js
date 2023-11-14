'use strict';

const config = require('config');

const { jwtSecret } = config;

const { createVerifyToken } = require('../../common/lib/verify-token');

// console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
// console.log(verifyToken);

const {
  getUsersSchema,
  getUserSchema,
  registerUserSchema,
  deleteUserSchema,
  updateUserSchema,
  loginUserSchema,
} = require('./schemas');
const {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
} = require('./userController');

function userRoutes(fastify, options, done) {
  fastify.get('/users', { schema: getUsersSchema }, getUsers);

  fastify.get('/users/:id', { schema: getUserSchema }, getUser);

  fastify.post('/users/register', { schema: registerUserSchema }, registerUser);

  fastify.post('/users/login', { schema: loginUserSchema }, loginUser);

  fastify.delete('/users/:id', { schema: deleteUserSchema, preHandler: verifyToken }, deleteUser);

  fastify.put('/users/:id', { schema: updateUserSchema, preHandler: verifyToken }, updateUser);

  done();
}

module.exports = userRoutes;
