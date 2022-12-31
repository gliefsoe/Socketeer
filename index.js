const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8080;

app.get('/', (req, res) => {
    // send plain HTML
  //res.send('<h1>Hello world</h1><br>hey hey!');
  // send the index.html file
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id );

  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id );
  });
  socket.on('chat message', (msg) => {
    //console.log('message from: ' + clientId + ' : ' + msg);
    // emit to all connected sockets
    io.emit('chat message', '(' + clientId + ') : ' + msg);
  });

  console.log('timeout called');
  timeout();

});

function timeout() {
    console.log('in function timeout');
  setTimeout( function() {
    console.log('in timeout ');
    io.emit('reply', "A message from server");
    timeout();
  }, 5000);
}

server.listen(port, () => {
  console.log('listening on *:' + port);
});