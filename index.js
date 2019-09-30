var http = require('http');
var net = require('net');
var url = require('url');

function request(cReq, cRes) {
  console.log('request ' + cReq.url)

  let req = cReq;
    let res = cRes;

  if (req.url == '/') {
    res.statusCode = 200;
    res.end('lab2');
    return;
  } else {
      if (req.url === '/1.1/functions/_ops/metadatas') {
          res.statusCode = 404;
          res.end();
          return;
      }
  }
  
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

function connect(cReq, cSock) {
  console.log('connect ' + cReq.url)
    var u = url.parse('http://' + cReq.url);

    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

http.createServer()
    .on('request', request)
    .on('connect', connect)
    .listen(process.env.LEANCLOUD_APP_PORT);