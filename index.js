require('http').createServer(function (req, res) {
    if (req.url == '/') {
      res.statusCode = 200;
      res.end('lab2');
    } else {
      res.statusCode = 404;
      res.end();
    }
  }).listen(process.env.LEANCLOUD_APP_PORT);