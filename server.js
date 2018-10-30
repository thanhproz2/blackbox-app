var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var port = normalizePort(process.env.PORT || '8088');
var bodyParser = require('body-parser');
var server = http.createServer(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'dist/blackbox-app')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/blackbox-app/index.html'))
});

app.listen(port, (req, res) => {
  console.log(`Blackbox server listening on port ${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}