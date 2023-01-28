const db = require('../db/database');

// cars page and home page all cars
//used
exports.getallcars = async (ctx) => {
  try {
    const limit = parseInt(ctx.query.limit);
    await db('inventory as i')
      .innerJoin('vehicle as v', 'v.id', 'i.id')
      .select('v.name', 'v.Price', 'v.img_url', 'v.id', 'i.item_id')
      .limit(limit)
      .then((data) => {
        ctx.response.status = 200;
        ctx.body = { json: data };
      });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
};
