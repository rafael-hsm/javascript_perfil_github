const { createServer } = require('http');
const App = require('./src/App'); // Certifique-se de que o caminho e o nome do arquivo estão corretos

const port = process.env.PORT || 8080;
const server = createServer(App);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
