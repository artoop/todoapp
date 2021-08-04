var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((request, response) => {
   const pathname = url.parse(request.url).pathname;

   fs.readFile(pathname.substr(1), (err, data) => {
      if (err) {
         console.log(err);
         response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
         response.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
         });
         response.write(data.toString());
      }
      response.end();
   });
}).listen(8081);

console.log('Servidor rodando em localhost:8081/...');