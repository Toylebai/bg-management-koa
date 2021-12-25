module.exports = db => {
        //获取信息
        const getList = uid => {
                return new Promise((resolve, reject) => {
                    let select = `select * from newList where uid=${uid}`;
                    db.query(select, (err, rows) => {
                        rows.length ? resolve(rows) : resolve(0);
                    })
                })
            }
            //获取单条数据（给修改的时候上传页）
        const getoneList = id => {
                return new Promise((resolve, reject) => {
                    let select = `select * from newList where id=${id}`;
                    db.query(select, (err, rows) => {
                        rows.length ? resolve(rows) : resolve(0);
                    })
                })
            }
            //删除
        const delList = id => {
                return new Promise((resolve, reject) => {
                    let select = `delete from newList where id=${id}`;
                    db.query(select, (err, rows) => {
                        console.log(err);
                        !err ? resolve(1) : resolve(0);
                    })
                })
            }
            //上传
        const upload = ({ uid, title, author, content, files }) => {
                const create_time = new Date().toLocaleString();
                return new Promise((resolve, reject) => {
                    let select = `insert into newList(uid,title, author, content,files, create_time, mod_time) values ('${uid}', '${title}', '${author}', '${content}', '${JSON.stringify(files)}','${create_time}','${create_time}')`;
                    db.query(select, (err, rows) => {
                        console.log(err);
                        !err ? resolve(1) : resolve(0);
                    })
                })
            }
            //修改
        const modList = ({ mid, title, author, content, files = null }) => {
                const mod_time = new Date().toLocaleString();
                return new Promise((resolve, reject) => {
                            let select = `update newList set title='${title}',mod_time='${mod_time}', author='${author}', content='${content}' ${files ? `, files='${JSON.stringify(files)}'` : ''} where id=${mid}`;
                db.query(select, (err, rows) => {
                    console.log(err);
                    !err ? resolve(1) : resolve(0);
                })
            })
        }
    return {
        getList,
        delList,
        upload,
        getoneList,
        modList
    }
}