require('dotenv').config();

const Router = require('koa-router');
const Koa = require('koa');
const json = require('koa-json');
const koaBody = require('koa-body');
var bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const user_query = require('../repositry/user_repo');
const inventory_query = require('../repositry/inventory_repo');
const headerauth = require('../middleware/headerAuth');
const getDetails = require('../middleware/get-details');
const app = new Koa();

// middleware functions
app.use(bodyParser());
app.use(koaBody());
app.use(cors());
app.use(json());

const router = new Router({ prefix: '/users' });
app.use(router.routes()).use(router.allowedMethods());

// get all users
router.get('/', user_query.getAllUser);

// Purchase now api to get data
router.get('/purchases/:item_id', headerauth, inventory_query.purchaseNow);

// Purchase now api with radio button
router.post('/completeOrder/:item_id', getDetails, headerauth, user_query.completeOrder);

// To get data with specific id  in  vehicle specs and features
router.get('/inventory/:item_id', headerauth, inventory_query.specsFeatures);

// For signup
router.post('/signup', user_query.signup);

// For login
router.post('/login', user_query.login);

module.exports = router;
