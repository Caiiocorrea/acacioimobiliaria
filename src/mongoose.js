const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/acacio";

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