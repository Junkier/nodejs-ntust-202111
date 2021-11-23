const mongoose = require('mongoose');
const db       = require("./db");

// 建立 schema
let membersSchema = new mongoose.Schema({
  "account" : String,
  "passwd"  : String
  }, { collection: "members"}
);
  

// 建立 model
let membersModel = db.model("members",membersSchema);

// export 出去 , 整合到 index.js 裡
module.exports = membersModel;
  