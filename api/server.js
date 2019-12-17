const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const knexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const knex = require('../data/dbConfig');

const server = express();

const sessionConfiguration = {
    name: 'oatmealraisin',
    secret: 'keep it secret, keep it safe!',
    saveUninitialized: true,
    resave: false,

    store: new knexSessionStore({
        knex,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: 'sid',
        tablename: 'sessions',
    }),

    cookies: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    }
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;