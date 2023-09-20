const http = require('http');
const app = require('./app')

const port = process.env.PORT || 5000;
const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//   // Lida com as solicitações HTTP aqui
//   res.end('Hello, world!');
// });

// const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
