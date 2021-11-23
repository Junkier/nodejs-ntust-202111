const mongoose = require('mongoose');
const db       = require("./db");

// 建立 schema

let toDoListSchema = new mongoose.Schema({
    "to_do_id"        : String,
    "subject"         : String,
    "reserved_time"   : String,
    "modified_time"   : String,
    "brief"           : String,
    "author"          : String,
    "content"         : String,
    "level"           : Number,
    "attachments"     : Array,
  }, { 
    collection: "to-do-list",
    versionKey: false
  }
);
  

// 建立 model
let toDoListModel = db.model("ToDoList",toDoListSchema);

// export 出去 , 整合到 index.js 裡
module.exports = toDoListModel;
  