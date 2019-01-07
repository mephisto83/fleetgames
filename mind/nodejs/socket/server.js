const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.on('data', (data) => {
    console.log(data.toString());
  });
  var count = 0;
  setInterval(()=>{
      count++;
    c.write(count+'this is a command | asf|\r\n');
  }, 10000)
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(3000, () => {
  console.log('server bound');
});