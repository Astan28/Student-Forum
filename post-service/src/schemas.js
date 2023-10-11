'use strict';

const Post = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    text: { type: 'string' },
    thread: { type: 'string' },
    author: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const getPostsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Post,
      },
    },
  },
};

const getPostSchema = {
  schema: {
    response: {
      200: Post,
    },
  },
};

const createPostSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['text', 'thread', 'author'],
      properties: {
        text: { type: 'string' },
        thread: { type: ['string'] },
        author: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
    response: {
      200: Post,
    },
  },
};

const deletePostSchema = {
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

const deletePostsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Post,
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

const updatePostSchema = {
  schema: {
    response: {
      200: Post,
    },
  },
};

module.exports = {
  getPostSchema,
  getPostsSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  deletePostsSchema
};
