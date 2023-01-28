require('dotenv').config();
const jwt = require('jsonwebtoken');

async function headerauth(ctx, next) {
  try {
    // access the authorization header
    const authHeader = ctx.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null || typeof token === 'undefined') {
      //tell the user you do not have access
      ctx.response.status = 401;
      ctx.body = { message: 'Unauthorized Access' };
    }
    //if token is not null then
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.user = decoded.user_id;
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.body = { message: "you don't have access" };
  }
}

module.exports = headerauth;
