'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  course: {
    type: String,
    enum: ['Graphic artist', 'IT specialist']
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
