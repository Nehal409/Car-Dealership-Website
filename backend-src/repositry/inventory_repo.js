const db = require('../db/database');

exports.specsFeatures = async (ctx) => {
  const { item_id } = ctx.params;
  try {
    await db('inventory as i')
      .innerJoin('vehicle as v', 'v.id', 'i.id')
      .innerJoin('dealer as d', 'd.dealer_id', 'i.dealer_id')
      .select('v.make', 'v.model', 'v.name', 'v.status', 'v.engine_type', 'v.engine_capacity', 'v.img_url', 'v.transmission', 'i.color', 'i.mileage', 'i.item_id', 'd.company_name')
      .where({ item_id })
      .then((data) => {
        ctx.response.status = 200;
        ctx.body = { json: data };
      });
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error.message };
  }
};

exports.purchaseNow = async (ctx) => {
  const { item_id } = ctx.params;
  try {
    await db('inventory as i')
      .innerJoin('vehicle as v', 'v.id', 'i.id')
      .select('v.name', 'i.statuss', 'v.img_url', 'v.Price', 'i.color')
      .where({ item_id })
      .then((data) => {
        ctx.response.status = 200;
        ctx.body = { json: data };
      });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
};
