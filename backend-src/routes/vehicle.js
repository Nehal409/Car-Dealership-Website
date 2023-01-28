const Router = require('koa-router');
const Koa = require('koa');
const vehicle_query = require('../repositry/vehicle_repo');
const app = new Koa();

// Prefix all routes with: /vehicle which means all
// endpoints in vehicle-koa will start with /vehicle
const router = new Router({ prefix: '/vehicles' });
app.use(router.routes()).use(router.allowedMethods());

// To get all cars
router.get('/', vehicle_query.getallcars);

module.exports = router;
