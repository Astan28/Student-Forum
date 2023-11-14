'use strict';

const config = require('config');
const fs = require('fastify-static');

console.log(config);
const uploadPath = require('path');

const { jwtSecret } = config;

const { createVerifyToken } = require('../../common/lib/verify-token');

const { verifyToken } = createVerifyToken(jwtSecret);
const {
  getFileSchema,
  getFilesSchema,
  createFileSchema,
  deleteFileSchema,
  deleteFilesSchema
} = require('./schemas');

const {
  getFiles,
  getFile,
  uploadFile,
  deleteFile,
  deleteFiles,
  fieldsUpload,
} = require('./fileController');

function fileRoutes(fastify, options, done) {
  fastify.post('/files/upload', { preHandler: [fieldsUpload, verifyToken], schema: createFileSchema }, uploadFile);
  fastify.get('/files/:id', { schema: getFileSchema }, getFile);
  fastify.get('/files', { schema: getFilesSchema }, getFiles);
  fastify.register(fs, {
    root: uploadPath.join(__dirname, '../public/uploads'),
    prefix: '/uploaded/',
    prefixAvoidTrailingSlash: true,
    index: false,
    list: true
  });
  fastify.delete('/files/:id', { schema: deleteFileSchema, preHandler: verifyToken }, deleteFile);
  fastify.delete('/files', { schema: deleteFilesSchema, preHandler: verifyToken }, deleteFiles);

  done();
}

module.exports = fileRoutes;
