'use strict';

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    // password: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' },
    course: { type: 'string' },
    semester: { type: 'string' },
    group: { type: 'string' },
  },
};

const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
};

const getUserSchema = {
  schema: {
    response: {
      200: User,
    },
  },
};

const registerUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'password', 'email', 'course', 'semester', 'group'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        course: { type: 'string' },
        semester: { type: 'string' },
        group: { type: 'string' },
      },
    },
    response: {
      200: User,
    },
  },
};

const loginUserSchema = {
  schema: {
    body: {
      type: 'object',
      require: ['name', 'password'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        require: ['jwt'],
        properties: {
          jwt: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
};

const deleteUserSchema = {
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

const updateUserSchema = {
  schema: {
    response: {
      200: User,
    },
  },
};

module.exports = {
  getUsersSchema,
  getUserSchema,
  registerUserSchema,
  loginUserSchema,
  deleteUserSchema,
  updateUserSchema
};
