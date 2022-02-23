'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
});

module.exports = mongoose.model('Board', boardSchema, 'boards');
