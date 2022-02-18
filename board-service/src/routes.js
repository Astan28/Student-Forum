'use strict';

const config = require('config');

console.log('config ', config);

const { jwtSecret } = config;

const { createVerifyToken } = require('common/lib/verify-token');

console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
console.log(verifyToken);
const {
  getBoardsSchema,
  getBoardSchema,
  createBoardSchema,
  deleteBoardSchema,
  updateBoardSchema
} = require('./schemas');

const {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
} = require('./boardController');

function boardRoutes(fastify, options, done) {
  fastify.get('/boards', { schema: getBoardsSchema }, getBoards);

  fastify.get('/boards/:id', { schema: getBoardSchema }, getBoard);

  fastify.post('/boards', { schema: createBoardSchema, preHandler: verifyToken }, createBoard);

  fastify.delete('/boards/:id', { schema: deleteBoardSchema, preHandler: verifyToken }, deleteBoard);

  fastify.put('/boards/:id', { schema: updateBoardSchema, preHandler: verifyToken }, updateBoard);

  done();
}

module.exports = boardRoutes;
