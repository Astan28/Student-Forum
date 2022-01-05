'use strict';

const {
  fileUploaded, upload
} = require('./fileController');

function fileRoutes(fastify, options, done) {
  fastify.post('/upload', { preHandler: upload.single('file') }, fileUploaded);

  done();
}

module.exports = fileRoutes;
