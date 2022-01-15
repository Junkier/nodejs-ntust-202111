const mongoose = require("mongoose");
const conn = require("./db");

//// 2. 建立 Schema & Models
// 建立 Schema 
const dramaSchema = new mongoose.Schema({
  "dramaId"  : String,
  "category" : String,
  "name"     : String,
  "score"    : Number
},{
  collection : "dramas-table"  // 要操作的 collection (table) 名稱
});

// 建立 Model 物件 (在 conn 連線上, 註冊一個物件)
// (Node.js 透過 Model 物件 , 和 collection (表格) 互動)
let dramasModel = conn.model("Dramas" , dramaSchema);

module.exports = dramasModel;