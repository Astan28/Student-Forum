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

  fastify.post('/users', { schema: registerUserSchema }, registerUser);

  // fastify.post('/login', {schema: loginUserSchema}, loginUser)

  fastify.delete('/users/:id', { schema: deleteUserSchema }, deleteUser);

  fastify.put('/users/:id', { schema: updateUserSchema }, updateUser);

  done();
}

module.exports = userRoutes;
