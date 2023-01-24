const express = require('express');

const productsRouter = require('../Routes/productsRouter.js');
const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(productsRouter);

module.exports = app;
