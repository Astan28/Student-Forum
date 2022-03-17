'use strict';

const Thread = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    text: { type: 'string' },
    author: { type: 'string' },
    board: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const getThreadsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Thread,
      },
    },
  },
};

const getThreadSchema = {
  schema: {
    response: {
      200: Thread,
    },
  },
};

const createThreadSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'text', 'author', 'board'],
      properties: {
        name: { type: 'string' },
        text: { type: 'string' },
        author: { type: 'string' },
        board: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
    response: {
      200: Thread,
    },
  },
};

const deleteThreadSchema = {
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

const deleteThreadsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Thread,
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
const updateThreadSchema = {
  schema: {
    response: {
      200: Thread,
    },
  },
};

module.exports = {
  getThreadSchema,
  getThreadsSchema,
  createThreadSchema,
  updateThreadSchema,
  deleteThreadSchema,
  deleteThreadsSchema
};
