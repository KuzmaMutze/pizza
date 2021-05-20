const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./public/db.json');
// const cors = require('cors')
const middlewares = jsonServer.defaults({
  static: './build',
  noCors: true
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);
// app.use(cors())

server.listen(PORT, () => {
  console.log('Server is running');
});