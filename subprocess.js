const queue = require('./queueFactory')();
const db = require('./dbFactory')();
const EventsObserver = require('./EventsObserver');
const DbEvents = new EventsObserver(db);

queue.consume(DbEvents.event);
