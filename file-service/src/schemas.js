'use strict';

const File = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    path: { type: 'string' },
    thread: { type: 'string' },
    post: { type: 'string' },
  },
};

const getFilesSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: File,
      },
    },
  },
};

const getFileSchema = {
  schema: {
    response: {
      200: File,
    },
  },
};

const createFileSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'path'],
      properties: {
        name: { type: 'string' },
        path: { type: ['string'] },
        thread: { type: 'string' },
        post: { type: 'string' },
      },
    },
    response: {
      200: File,
    },
  },
};

const deleteFileSchema = {
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

module.exports = {
  getFileSchema,
  getFilesSchema,
  createFileSchema,
  deleteFileSchema
};
