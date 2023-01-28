const Router = require('koa-router');
const contact_query = require('../repositry/contatc_repo');
const Koa = require('koa');

const app = new Koa();

const router = new Router({ prefix: '/contacts' });
app.use(router.routes()).use(router.allowedMethods());

// To get data
router.get('/', contact_query.getAll);

// To post data in the table
router.post('/', contact_query.postdata);

module.exports = router;
