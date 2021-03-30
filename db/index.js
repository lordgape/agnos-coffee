const mongoose = require('mongoose');
const Config = require('../config/config.json');

const connect = async () => {
  return mongoose.connect(Config.env.mongoConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
};

const close = () => {
  mongoose.disconnect();
};

module.exports = { connect, close };
