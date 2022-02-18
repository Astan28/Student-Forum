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
    type: String
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
});

module.exports = mongoose.model('Thread', threadSchema, 'threads');
