const messageFactory = require('./messageFactory')
const EventEmitter = require('events');
const EventsModel = require('./Events');

class EventsObserver extends EventEmitter {}

const event = new EventsObserver({captureRejections: true});

function dbEvents(db) {
    event.on('event-message', async (hash) => {
        try {
            const events = new EventsModel(db);
            let result = await events.getByHash(hash)

            if (result.length > 0) {
                result = result.shift()
                let Factory = messageFactory(result.event)
                Factory = new Factory(db, JSON.parse(result.message))
                result = await Factory.add()

                if (result) {
                    events.delete(hash)
                }
            }
        } catch (e) {
            console.log(e)
        }
    });

    this.event = event;
}

module.exports = dbEvents;