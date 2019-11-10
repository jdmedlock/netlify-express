'use strict';
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const sherpabot = require("./sherpabot");

const app = express();
const router = express.Router();

const result = dotenv.config();
if (result.error) {
  throw result.error
}
sherpabot().then((value) => {
  router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
  });
  router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
  router.post('/', (req, res) => res.json({ postBody: req.body }));
  
  app.use(bodyParser.json());
  app.use('/.netlify/functions/server', router);  // path must route to lambda
  app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
})


module.exports = app;
module.exports.handler = serverless(app);
