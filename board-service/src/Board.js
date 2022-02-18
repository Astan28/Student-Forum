'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  author: {
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
});

module.exports = mongoose.model('Board', boardSchema, 'boards');
