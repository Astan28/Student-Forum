'use strict';

const config = require('config');

const { jwtSecret } = config;

const { createVerifyToken } = require('../../common/lib/verify-token');

// console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
// console.log(verifyToken);
const {
  getThreadsSchema,
  getThreadSchema,
  createThreadSchema,
  deleteThreadSchema,
  deleteThreadsSchema,
  updateThreadSchema
} = require('./schemas');

const {
  getThreads,
  getThread,
  createThread,
  deleteThread,
  deleteThreads,
  updateThread
} = require('./threadController');

function threadRoutes(fastify, options, done) {
  fastify.get('/threads', { schema: getThreadsSchema }, getThreads);

  fastify.get('/threads/:id', { schema: getThreadSchema }, getThread);

  fastify.post('/threads', { schema: createThreadSchema, preHandler: verifyToken }, createThread);

  fastify.delete('/threads/:id', { schema: deleteThreadSchema, preHandler: verifyToken }, deleteThread);
  fastify.delete('/threads/board/:id', { schema: deleteThreadsSchema, preHandler: verifyToken }, deleteThreads);

  fastify.put('/threads/:id', { schema: updateThreadSchema, preHandler: verifyToken }, updateThread);

  done();
}

module.exports = threadRoutes;
