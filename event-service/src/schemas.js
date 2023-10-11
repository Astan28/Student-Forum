'use strict';

const Event = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    author: { type: 'string' },
    semester: { type: 'string' },
    group: { type: 'string' },
    startDate: { type: 'date' },
    finishdate: { type: 'date' },
  },
};

const getEventsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Event,
      },
    },
  },
};

const getEventSchema = {
  schema: {
    response: {
      200: Event,
    },
  },
};

const createEventSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'author', 'semester', 'group', 'startDate', 'finishDate'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
        semester: { type: 'string' },
        group: { type: 'string' },
        startDate: { type: 'date' },
        finishDate: { type: 'date' },
      },
    },
    response: {
      200: Event,
    },
  },
};

const deleteEventSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

const updateEventSchema = {
  schema: {
    response: {
      200: Event,
    },
  },
};

module.exports = {
  getEventSchema,
  getEventsSchema,
  createEventSchema,
  updateEventSchema,
  deleteEventSchema
};
