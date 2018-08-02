const mongoose = require('mongoose');

//connect the Databse
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI );

module.exports = {mongoose};