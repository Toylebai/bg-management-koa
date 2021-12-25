const mysql = require('mysql');
const { mysqlConfig } = require('../hostConfig');
const user = require('./user/index');
const list = require('./list/index');
const db = mysql.createConnection(mysqlConfig);
db.connect(err => {
    console.log('数据库链接成功！')
})

module.exports = {
    user: user(db),
    list: list(db),
}