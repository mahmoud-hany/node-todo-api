const mongoose = require('mongoose');

//connect the Databse
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};