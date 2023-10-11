'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  course: {
    type: String,
    enum: ['Grafika komputerowa', 'Informatyka']
  },
  semester: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7']
  },
  group: {
    type: String,
    enum: ['AZI', 'BZI', 'CZI', 'DZI', 'ION', 'TIN', 'MIION']
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
