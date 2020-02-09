const app = require('./app/app');
const http = require('http');

const server = http.createServer(app)

server.listen(80, () => {
  console.log(`Listening on 80`);
});
