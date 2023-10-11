'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: {
    type: String
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
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

module.exports = mongoose.model('Post', postSchema, 'posts');
