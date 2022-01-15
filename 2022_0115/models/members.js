const mongoose = require("mongoose");
const conn = require("./db");

const membersSchema = new mongoose.Schema({
  "name" : String,
  "age"  : Number,
  "math_score" : Number,
  // "testqq" : String
  // "math_score" : String,
},{
  collection : "members",
  versionKey : false // 移除 __v 欄位
}); 

let membersModel = conn.model("Members" , membersSchema);

module.exports = membersModel;