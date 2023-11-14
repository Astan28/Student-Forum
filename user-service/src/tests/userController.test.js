'use strict';

const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const User = require('../User');

let server;

describe('Users', () => {
  beforeEach(() => {
    server = require('../../server');
  });
  afterEach(async () => {
    await User.remove({});
    await server.close();
  });
  describe('getUsers', () => {
    it('should return all users', async () => {
      await User.collection.insertMany([
        {
          name: 'user1',
          password: 'user1',
          email: 'user1@gmail.com',
          role: 'ADMIN',
          semester: '5',
          group: 'TIN',
          course: 'Informatyka'
        },
        {
          name: 'user2',
          password: 'user2',
          email: 'user2@gmail.com',
          role: 'ADMIN',
          semester: '5',
          group: 'TIN',
          course: 'Informatyka'
        },
      ]);

      const res = await request(server).get('/users');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(u => u.name === 'user1')).toBeTruthy;
      expect(res.body.some(u => u.name === 'user2')).toBeTruthy;
    });
  });
});
