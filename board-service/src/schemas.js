'use strict';

const Board = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    author: { type: 'string' },
    threads: { type: 'array' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const getBoardsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
};

const getBoardSchema = {
  schema: {
    response: {
      200: Board,
    },
  },
};

const createBoardSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'author'],
      properties: {
        name: { type: 'string' },
        author: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
    response: {
      200: Board,
    },
  },
};

const deleteBoardSchema = {
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

const updateBoardSchema = {
  schema: {
    response: {
      200: Board,
    },
  },
};

module.exports = {
  getBoardSchema,
  getBoardsSchema,
  createBoardSchema,
  updateBoardSchema,
  deleteBoardSchema
};
