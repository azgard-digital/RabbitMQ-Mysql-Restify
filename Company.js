class Company {
    constructor(db) {
        this.db = db;
    }

    async add(name, identity) {
        try {
            return await this.db.query('INSERT INTO companies SET ?', {name: name, identity: identity})
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

module.exports = Company;