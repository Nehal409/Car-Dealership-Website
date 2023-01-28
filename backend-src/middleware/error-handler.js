const Logging = require('../library/logging');

module.exports.errorHandler = function (ctx, next) {
  const error = new Error('Sorry, not found!');
  Logging.error(error);
  ctx.status = 500;
  ctx.body = { message: error.message };
  next();
};
