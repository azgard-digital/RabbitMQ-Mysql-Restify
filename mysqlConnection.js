const mysql = require('mysql');
const params = {user:"root", password:"password", host:"localhost", database:"orders_test"};

const connection = mysql.createConnection(params);
connection.connect(error => {
    if (error) {
        console.error(error)
        process.exit(1);
    }
})

const query = async (q, params) => new Promise(
    (resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        connection.query(q, params, handler);
    });
;
module.exports.query = query;