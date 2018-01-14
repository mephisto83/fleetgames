var server = require('http').createServer();
console.log('created server')
var io = require('socket.io')(server);
console.log('created io')
io.on('connection', function(client){
    console.log('on connection');
  client.on('event', function(data){
      console.log(data);
  });
  client.on('disconnect', function(){
    console.log('disconnected');
  });
});
var port = 3000;
console.log(`'listen on port ${port}'`);
server.listen(port);