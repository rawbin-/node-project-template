const queueName = 'testqueue';

const open = require('amqplib').connect({
  hostname:'localhost',
  port:5672,
  username: 'admin',
  password: 'admin',
  vhost: 'testvhost',
  heartbeat: 30
});

// Publisher
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(queueName).then(function(ok) {
    return Promise.all([
      ch.sendToQueue(queueName, Buffer.from('something to do xxxxx')),
      ch.sendToQueue(queueName, Buffer.from('something to do yyyyy')),
    ]);
  });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(queueName).then(function(ok) {
    return ch.consume(queueName, function(msg) {
      if (msg !== null) {
        console.log('getmsg:', msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);
