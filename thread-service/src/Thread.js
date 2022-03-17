'use strict';

const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name is required',
  },
  text: {
    type: String,
    required: 'Text is required',
  },
  author: {
    required: 'Author is required',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  board: {
    required: 'Board is required',
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
