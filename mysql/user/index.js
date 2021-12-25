module.exports = db => {
    const login = (username, password) => {
            return new Promise((resolve, reject) => {
                let select = `select * from newLogin where username='${username}' and password='${password}'`;
                db.query(select, (err, rows) => {
                    rows.length ? resolve(rows) : resolve(0);
                })
            })
        }
        //检测用户是否存在
    const testUser = (username) => {
        return new Promise((resolve, reject) => {
            let select = `select * from newLogin where username='${username}'`;
            db.query(select, (err, rows) => {
                rows.length ? resolve(1) : resolve(0);
            })
        })
    }
    const register = (username, password) => {
        return new Promise((resolve, reject) => {
            let select = `insert into newLogin(username, password) values ('${username}', '${password}')`;
            db.query(select, (err, rows) => {
                console.log(err);
                !rows.length ? resolve(1) : resolve(0);
            })
        })
    }
    const getUser = id => {
        return new Promise((resolve, reject) => {
            let select = `select * from newLogin where id='${id}'`;
            db.query(select, (err, rows) => {
                rows.length ? resolve(rows) : resolve(0);
            })
        })
    }
    return {
        login,
        testUser,
        register,
        getUser
    }
}