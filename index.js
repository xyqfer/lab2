const proxy = require('http-proxy');

const proxyServer = proxy.createProxyServer({
    target: 'http://127.0.0.1:' + process.env.LEANCLOUD_APP_PORT,
});
proxyServer.listen(8000);

require('http').createServer(function (req, res) {
    if (req.url == '/') {
      res.statusCode = 200;
      res.end('lab2');
    } else {
        if (req.url === '/1.1/functions/_ops/metadatas') {
            res.statusCode = 404;
            res.end();
        } else {
            console.log(req.url);
            proxyServer.web(req, res, { target: req.url });
            proxyServer.on('error', function(e) {
                console.log("Error in proxy call");
                console.log(e);
            });
        }
    }
  }).listen(process.env.LEANCLOUD_APP_PORT);