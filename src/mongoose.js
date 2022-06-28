const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence');
const config = require('./config')

const uri =  config.MONGODB_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(connection);

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

module.exports = {
  connection,
  AutoIncrement
};