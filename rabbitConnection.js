const connectionString = 'amqp://user:bitnami@localhost:5672?heartbeat=60';
const connection = require('amqplib')
    .connect(connectionString)
    .then(function(conn) {
        return conn.createChannel();
    })
    .catch((err) => { console.log(err) });

module.exports.connection = connection;
module.exports.queue = 'orders';