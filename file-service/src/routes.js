'use strict';

const {
  getFileSchema,
  getFilesSchema,
  createFileSchema,
  deleteFileSchema
} = require('./schemas');

const {
  getFiles,
  getFile,
  uploadFile,
  deleteFile,
  fieldsUpload,
} = require('./fileController');

function fileRoutes(fastify, options, done) {
  fastify.post('/files/upload', { preHandler: fieldsUpload }, uploadFile);
  fastify.get('/files/:id', { schema: getFileSchema }, getFile);
  fastify.get('/files', { schema: getFilesSchema }, getFiles);
  fastify.get('/files/public', { schema: getFilesSchema }, getFiles);
  fastify.delete('/files/:id', { schema: deleteFileSchema }, deleteFile);

  done();
}

module.exports = fileRoutes;
