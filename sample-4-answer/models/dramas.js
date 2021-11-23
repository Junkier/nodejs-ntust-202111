const mongoose = require('mongoose');
const db       = require("./db");

// 建立 schema
let dramaSchema = new mongoose.Schema({
    "dramaId"  : String,
    "category" : String,
    "name"     : String,
    "score"    : Number,
  }, { collection: "dramas_table"}
);
  

// 建立 model
let dramaModel = db.model("Dramas",dramaSchema);

// export 出去 , 整合到 index.js 裡
module.exports = dramaModel;
  