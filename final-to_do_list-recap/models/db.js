const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://localhost:27017/tutorial");

conn.on("connected" , ()=>{
  console.log("MongoDB is connected.");
});

module.exports = conn;