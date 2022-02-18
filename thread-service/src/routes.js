'use strict';

const config = require('config');

console.log('config ', config);

const { jwtSecret } = config;

const { createVerifyToken } = require('common/lib/verify-token');

console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
console.log(verifyToken);
const {
  getThreadsSchema,
  getThreadSchema,
  createThreadSchema,
  deleteThreadSchema,
  updateThreadSchema
} = require('./schemas');

const {
  getThreads,
  getThread,
  createThread,
  deleteThread,
  updateThread
} = require('./threadController');

function threadRoutes(fastify, options, done) {
  fastify.get('/threads', { schema: getThreadsSchema }, getThreads);

  fastify.get('/threads/:id', { schema: getThreadSchema }, getThread);

  fastify.post('/threads', { schema: createThreadSchema, preHandler: verifyToken }, createThread);

  fastify.delete('/threads/:id', { schema: deleteThreadSchema, preHandler: verifyToken }, deleteThread);

  fastify.put('/threads/:id', { schema: updateThreadSchema, preHandler: verifyToken }, updateThread);

  done();
}

module.exports = threadRoutes;
