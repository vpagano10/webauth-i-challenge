const express = require('express');

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');

const server = express();

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;