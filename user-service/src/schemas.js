'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  course: {
    type: String,
    enum: ['Graphic artist', 'It specialist']
  },
  semester: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7']
  },
  group: {
    type: String,
    enum: ['AZI', 'BZI', 'CZI', 'DZI', 'ION', 'TIN', 'MIION']
  },
});

// const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema, 'users');

const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: userSchema,
      },
    },
  },
};

const getUserSchema = {
  schema: {
    response: {
      200: userSchema,
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
      201: userSchema,
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
      200: userSchema,
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
