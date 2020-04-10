const express = require('express');

const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Projects & Actions</h2>`);
});

server.use(logger);

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

module.exports = server;