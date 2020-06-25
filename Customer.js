class Customer {
    constructor(db) {
        this.db = db;
    }

    async add(name, email) {
        try {
            return await this.db.query('INSERT INTO customer SET ?', {name: name, email: email})
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

module.exports = Customer;