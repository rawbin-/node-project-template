/* eslint-disable no-var */
const QUEUE_NAME = 'testqueue';
// Create a new connection manager
const connection = require('amqp-connection-manager').connect([{
  hostname:'localhost',
  port: 5672,
  username:'admin',
  password:'admin',
  vhost: 'testvhost',
  heartbeat: 30
}]);
connection.on('connect', function() {
  console.log('Connected!');
});
connection.on('disconnect', function(err) {
  console.log('Disconnected.', err.stack);
});


function receiver(){
  // Handle an incomming message.
  var onMessage = function(data) {
    const message = JSON.parse(data.content.toString());
    console.log("receiver: got message", message);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    channelWrapper.ack(data);
  }

// Set up a channel listening for messages in the queue.
  var channelWrapper = connection.createChannel({
    setup: function(channel) {
      // `channel` here is a regular amqplib `ConfirmChannel`.
      return Promise.all([
        channel.assertQueue(QUEUE_NAME, {durable: true}),
        channel.prefetch(1),
        channel.consume(QUEUE_NAME, onMessage)
      ]);
    }
  });


  channelWrapper.waitForConnect()
    .then(function() {
      console.log("Listening for messages");
    });
}


function sender(){
// Create a channel wrapper
  const channelWrapper = connection.createChannel({
    json: true,
    setup: function(channel) {
      // `channel` here is a regular amqplib `ConfirmChannel`.
      return channel.assertQueue(QUEUE_NAME, {durable: true});
    }
  });

// Send messages until someone hits CTRL-C or something goes wrong...
  const sendMessage = function() {
    channelWrapper.sendToQueue(QUEUE_NAME, {time: Date.now()})
      .then(function() {
        console.log("Message sent");
        return true;
      })
      .then(function() {
        return sendMessage();
      }).catch(function(err) {
      console.log("Message was rejected:", err.stack);
      channelWrapper.close();
      connection.close();
    });
  };

  console.log("Sending messages...");
  sendMessage();
}

setInterval(sender,2000)
setInterval(receiver,2000)
