'use strict';

require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('fastify-cors'), {
  // put your options here
});

fastify.register(require('./src/routes'));

const { mongoUrl } = config;
mongoose.connect(mongoUrl);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
