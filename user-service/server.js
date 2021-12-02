'use strict';

require('dotenv').config();

const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});
const fastifyEnv = require('fastify-env');

// const schema = {
//     type: 'object',
//     required: ['MONGO_URL', 'MONGO_DB'],
//     properties: {
//         'MONGO_URL': {
//             type: 'string',
//             default: ''
//         },
//         'MONGO_DB': {
//             type: 'string',
//             default: ''
//         }
//     }
// }

// const options = {
//   schema,
//   dotenv: true
// };

// fastify.register(fastifyEnv, options);
fastify.register(require('./src/routes'));

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
