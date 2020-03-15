require('dotenv').config();
const http = require('http');
const Router = require('./router/router.js')


const hostname = 'localhost';
const port= '3300';

const server = http.createServer(Router.handleRequest);

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})