const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence');

const uri = process.env.MONGODB_URI || "mongodb://admin:n3v3rch%40ngedLX@201.16.140.153:27017/acacio?authSource=admin&readPreference=secondary&appname=MongoDB%20Compass&ssl=false";

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