const db = require('../db/database');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getAllUser = async (ctx) => {
  try {
    await db('user')
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

exports.signup = async (ctx) => {
  try {
    const { name, email, password, phone } = ctx.request.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await db('user').insert({
      name: name,
      email: email,
      password: hash,
      phone: phone
    });
    if (user) {
      ctx.response.status = 200;
      ctx.body = { message: 'Signup Successful' };
    }

    // For duplicate entry
  } catch {
    ctx.response.status = 400;
    ctx.body = { message: 'User already exist' };
  }
};

exports.login = async (ctx, next) => {
  try {
    const { email, password, user_id } = ctx.request.body;
    const user = await db('user').first('*').where({ email: email });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        // Generating JWT
        // 1- Gets us access to user
        // 2- secret token
        // 3- expiration date which we have not used here

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1200s' });

        ctx.response.status = 200;
        ctx.body = { message: 'valid email and password!', token: token };
      } else {
        ctx.body = { message: 'invalid password!' };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.status = 404;
      ctx.body = { message: 'User not found!' };
    }
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = { message: err.message };
  }
};

exports.completeOrder = async (ctx) => {
  try {
    const { method } = ctx.request.body;

    await db('receipt')
      .insert({
        unit_price: ctx.data[0].Price,
        method: method,
        dealer_id: ctx.data[0].dealer_id,
        inventory_id: ctx.data[0].item_id,
        user_id: ctx.user
      })
      .then((data) => {
        ctx.response.status = 200;
        ctx.body = { message: data };
      });
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: error.message };
  }
};
