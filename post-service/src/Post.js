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
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
});

module.exports = mongoose.model('Post', postSchema, 'posts');
