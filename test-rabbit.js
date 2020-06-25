let q = 'tasks';

let open = require('amqplib').connect('amqp://user:bitnami@localhost:5672?heartbeat=60');

// Publisher
open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
        console.log(`Test message for queue: ${q} was send`);
        return ch.sendToQueue(q, Buffer.from('Test message'));
    });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, function(msg) {
            if (msg !== null) {
                console.log(`Message received from queue ${q} - ${msg.content.toString()}`);
                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);