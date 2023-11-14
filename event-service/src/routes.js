'use strict';

const config = require('config');

const { jwtSecret } = config;

const { createVerifyToken } = require('../../common/lib/verify-token');

// console.log(jwtSecret);
const { verifyToken } = createVerifyToken(jwtSecret);
// console.log(verifyToken);
const {
  getEventsSchema,
  getEventSchema,
  createEventSchema,
  deleteEventSchema,
  updateEventSchema
} = require('./schemas');

const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
} = require('./eventController');

function eventRoutes(fastify, options, done) {
  fastify.get('/events', { schema: getEventsSchema }, getEvents);

  fastify.get('/events/:id', { schema: getEventSchema }, getEvent);

  fastify.post('/events', { schema: createEventSchema, preHandler: verifyToken }, createEvent);

  fastify.delete('/events/:id', { schema: deleteEventSchema, preHandler: verifyToken }, deleteEvent);

  fastify.put('/events/:id', { schema: updateEventSchema, preHandler: verifyToken }, updateEvent);

  done();
}

module.exports = eventRoutes;
