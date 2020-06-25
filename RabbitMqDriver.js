const rabbit = require('./rabbitConnection');

class RabbitMqDriver {
    constructor(connection, queue) {
        this.queue = queue
        this.connection = connection
    }

    consume(event) {
        this.connection.then((ch) => {
            return ch.assertQueue(this.queue).then((ok) => {
                return ch.consume(this.queue, (msg) => {
                    if (msg !== null) {
                        const message = msg.content.toString('utf-8');
                        ch.ack(msg);
                        event.emit('event-message', message);
                        console.log(`Message received from queue ${this.queue} - ${message}`);
                    }
                });
            }).catch((err) => { console.error(err) });
        }).catch((err) => { console.error(err) });
    }

    publish(message) {
        this.connection.then((ch) => {
            return ch.assertQueue(this.queue).then((ok) => {
                console.log(`Test message for queue: ${this.queue} was send`);
                return ch.sendToQueue(this.queue, Buffer.from(message));
            });
        }).catch(console.warn);
    }

    close() {
        this.connection.close((err) => {console.error(err)});
    }
}

module.exports = new RabbitMqDriver(rabbit.connection, rabbit.queue);