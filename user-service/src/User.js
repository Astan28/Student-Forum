'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name is required',
  },
  password: {
    type: String,
    required: 'Password is required',
    minLength: [6, 'Password too short'],
  },
  email: {
    type: String,
    required: 'Email address is required',
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  course: {
    type: String,
    required: 'Course is required',
    enum: ['Grafika komputerowa', 'Informatyka']
  },
  semester: {
    type: String,
    required: 'Semester is required',
    enum: ['1', '2', '3', '4', '5', '6', '7']
  },
  group: {
    type: String,
    required: 'Group is required',
    enum: ['AZI', 'BZI', 'CZI', 'DZI', 'ION', 'TIN', 'MIION']
  },
});

module.exports = mongoose.model('User', userSchema, 'users');
