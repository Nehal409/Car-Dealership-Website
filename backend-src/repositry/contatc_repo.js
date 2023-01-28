const db = require('../db/database');

exports.getAll = async (ctx) => {
  try {
    await db('customer_contact')
      .select()
      .then((data) => {
        ctx.response.status = 200;
        ctx.body = { json: data };
      });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
};

exports.postdata = async (ctx) => {
  const postData = ctx.request.body;
  try {
    await db('customer_contact')
      .insert(postData)
      .then(() => {
        ctx.response.status = 200;
        ctx.body = { json: 'Your request have been registered' };
      });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
};
