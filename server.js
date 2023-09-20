const http = require('http');

const server = http.createServer((req, res) => {
  // Lida com as solicitações HTTP aqui
  res.end('Hello, world!');
});

const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
