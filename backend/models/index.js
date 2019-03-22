const mongoose = require('mongoose');
require('dotenv').config(); 
mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));
  module.exports.Recipe = require('./recipe');
  module.exports.User = require('./user');
