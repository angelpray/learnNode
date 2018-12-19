const net = require('net');

net.createServer((socket) => {
  socket.once('data', (data) => {
    socket.write(data);
  });
}).listen(8000);
