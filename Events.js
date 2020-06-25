class Events {
    constructor(db) {
        this.db = db;
    }

    async exist(hash) {
        try {
            return await this.db.query('select 1 from events where hash=?',[hash])
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async add(event, hash, message) {
        try {
            return await this.db.query('INSERT INTO events SET ?',{event: event, hash: hash, message: JSON.stringify(message)})
        } catch (e) {
            console.error(e)
            return false
        }
    }

    delete(hash) {
        this.db.query('delete from events where hash=?', [hash]).catch(console.error)
    }

    async getByHash(hash) {
        try {
            return await this.db.query('select event, message from events where hash=? limit 1', [hash])
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

module.exports = Events;