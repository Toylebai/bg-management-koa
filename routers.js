// const { URL } = require('url');
const Router = require('koa-routes');
const route = new Router();
const login = require('./routers/login/index');
const register = require('./routers/register/index');
const list = require('./routers/list/index');
const exit = require('./routers/exit/index');
const del = require('./routers/delect/index');
const upload = require('./routers/upload/index');
const getuser = require('./routers/getuser/index');
const getmodlist = require('./routers/getmodlist/index');
const mod = require('./routers/mod/index');
route.use('/login', login);
route.use('/register', register);
route.use('/list', list);
route.use('/exit', exit);
route.use('/del', del);
route.use('/upload', upload);
route.use('/getuser', getuser);
route.use('/getmodlist', getmodlist);
route.use('/mod', mod)

module.exports = route;