'use strict';

const config = require('config');

console.log('config ', config);

const { jwtSecret } = config;

const { createVerifyToken } = require('common/lib/verify-token');

console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
console.log(verifyToken);
const {
  getPostsSchema,
  getPostSchema,
  createPostSchema,
  deletePostSchema,
  deletePostsSchema,
  updatePostSchema
} = require('./schemas');

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  deletePosts,
  updatePost
} = require('./postController');

function postRoutes(fastify, options, done) {
  fastify.get('/posts', { schema: getPostsSchema }, getPosts);

  fastify.get('/posts/:id', { schema: getPostSchema }, getPost);

  fastify.post('/posts', { schema: createPostSchema, preHandler: verifyToken }, createPost);

  fastify.delete('/posts/:id', { schema: deletePostSchema, preHandler: verifyToken }, deletePost);

  fastify.delete('/posts/thread/:id', { schema: deletePostsSchema, preHandler: verifyToken }, deletePosts);

  fastify.put('/posts/:id', { schema: updatePostSchema, preHandler: verifyToken }, updatePost);

  done();
}

module.exports = postRoutes;
