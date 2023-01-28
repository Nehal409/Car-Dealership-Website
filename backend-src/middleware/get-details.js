const db = require('../db/database');

// api to get vehicle price,dealer for that vehicle and inventory id to post in receipt table
async function getDetails(ctx, next) {
  const { item_id } = ctx.params;
  try {
    await db('inventory as i')
      .innerJoin('dealer as d', 'd.dealer_id', 'i.dealer_id')
      .innerJoin('vehicle as v', 'v.id', 'i.id')
      .select('i.item_id', 'd.dealer_id', 'v.Price')
      .where({ item_id })
      .then((data) => {
        ctx.response.status = 200;
        ctx.data = data;
        next();
      });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
}

module.exports = getDetails;
