const http = require('http');
var net = require('net');
var url = require('url');

http.createServer(function (req, res) {
    if (req.url == '/') {
      res.statusCode = 200;
      res.end('lab2');
    } else {
        if (req.url === '/1.1/functions/_ops/metadatas') {
            res.statusCode = 404;
            res.end();
        } else {
            let cReq = req;
            let cRes = res;
            var u = url.parse(cReq.url);

            var options = {
                hostname : u.hostname, 
                port     : u.port || 80,
                path     : u.path,       
                method     : cReq.method,
                headers     : cReq.headers
            };

            var pReq = http.request(options, function(pRes) {
                cRes.writeHead(pRes.statusCode, pRes.headers);
                pRes.pipe(cRes);
            }).on('error', function(e) {
                cRes.end();
            });

            cReq.pipe(pReq);
        }
    }
  }).listen(process.env.LEANCLOUD_APP_PORT);