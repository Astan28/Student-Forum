'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  semester: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7']
  },
  group: {
    type: String,
    enum: ['AZI', 'BZI', 'CZI', 'DZI', 'ION', 'TIN', 'MIION']
  },
  startDate: {
    type: Date
  },
  finishDate: {
    type: Date
  },
});

module.exports = mongoose.model('Event', eventSchema, 'events');
