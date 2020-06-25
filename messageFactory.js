const Company = require('./Company');
const Customer = require('./Customer');
const COMPANY_EVENT = 'company';
const CUSTOMER_EVENT = 'customer';

function messageFactory(event) {
    switch (event) {
        case COMPANY_EVENT:
            return CompanyFactory;
        case CUSTOMER_EVENT:
            return CustomerFactory;
        default:
            throw Error('Incorrect event type!')
    }
}

class CompanyFactory {
    #model = null;
    #message = null;

    constructor(db, message) {
        this.#model = new Company(db)
        this.#message = message
    }

    async add() {
       return await this.#model.add(this.#message.name, this.#message.identity)
    }
}

class CustomerFactory {
    #model = null;
    #message = null;

    constructor(db, message) {
        this.#model = new Customer(db)
        this.#message = message
    }

    async add() {
        return await this.#model.add(this.#message.name, this.#message.email)
    }
}

module.exports = messageFactory;