const express = require('express');

app.use(express.json());
app.use(route);

const route = require('../router/router');
const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
