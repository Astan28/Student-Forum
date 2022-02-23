'use strict';

const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  text: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
});

module.exports = mongoose.model('Thread', threadSchema, 'threads');
