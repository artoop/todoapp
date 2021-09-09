var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((request, response) => {
   const pathname = url.parse(request.url).pathname.substr(1);

   if (request.method === 'POST') {
      request.on('data', (data) => {
         fs.writeFile(pathname, data, (err) => {
            if (err) {
               response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
               response.writeHead(201, {
                  'Content-Type': 'text/html',
                  'Access-Control-Allow-Origin': '*'
               });
            }
            response.end();
         })
      })
   } else {
      fs.readFile(pathname, (err, data) => {
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
   }

}).listen(8081);

console.log('Servidor rodando em localhost:8081/...');