'use strict';

require('dotenv').config();

const config = require('config');

const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-multipart'));

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./src/routes'));

const { port } = config;

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
