const mysqlDriver = require('./MysqlDriver')

const MYSQL = 'MYSQL';

/**
 * @param type
 * @return MysqlDriver
 */
module.exports = (type = '') => {
    switch (type) {
        case MYSQL:
            return mysqlDriver;
        default:
            return mysqlDriver;
    }
}
