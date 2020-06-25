const mysql = require('./mysqlConnection');

class MysqlDriver {
    constructor(query) {
        this.query = query
    }

    async query(q, params = []) {
        return await this.query(q, params)
    }
}

module.exports = new MysqlDriver(mysql.query);