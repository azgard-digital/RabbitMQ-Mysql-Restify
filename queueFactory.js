const rabbitDriver = require('./RabbitMqDriver');

const RABBIT = 'RABBIT';

module.exports = (type = '') => {
    switch (type) {
        case RABBIT:
            return rabbitDriver;
        default:
            return rabbitDriver;
    }
}