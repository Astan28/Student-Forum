'use strict'

const { verifyToken } = require('./lib/verify-token');
const User = require('./lib/User');
module.exports = {
    verifyToken,
    User
};

