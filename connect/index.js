const connect = require('connect');
const setup = require('./logger');
const errorHandler = require('./error');

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}
const app = connect()
  .use(setup(':method :url'))
  .use(hello)
  .use(errorHandler)
  .listen(3000);
