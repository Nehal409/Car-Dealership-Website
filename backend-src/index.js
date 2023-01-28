const Koa = require('koa');
const json = require('koa-json');
const koaBody = require('koa-body');
const serve = require('koa-static');
const cors = require('@koa/cors');
const path = require('path');

const vehiclekoa = require('./routes/vehicle');
const userkoa = require('./routes/user');
const customerContactkoa = require('./routes/customer_cont_form');
const Logging = require('./library/logging');
const { errorHandler } = require('./middleware/error-handler');

const app = new Koa();
app.use(cors());

// middleware functions
app.use(koaBody());
app.use(json());

app.use(serve(path.join(__dirname, '../public')));

//Routes
app.use(vehiclekoa.routes()).use(vehiclekoa.allowedMethods());

app.use(userkoa.routes()).use(userkoa.allowedMethods());

app.use(customerContactkoa.routes()).use(customerContactkoa.allowedMethods());

app.use(errorHandler);

const port = process.env.port;
app.listen(port, () => Logging.info(`Server is running on port ${port}`));
