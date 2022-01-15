const mongoose = require('mongoose');
const conn     = require("./db");

// 建立 schema
let toDoListSchema = new mongoose.Schema({
    "to_do_id" : String,
    "subject" : String,
    "reserved_time" : String,
    "modified_time" : String,
    "brief" : String,
    "level" : Number,
    "author" : String,
    "content" : String,
    "attachments" : Array
}, { 
    collection: "to-do-list",
    versionKey : false 
  }
);
  

// 建立 model
let toDoListModel = conn.model("ToDoList",toDoListSchema);

// export 出去 , 整合到 index.js 裡
module.exports = toDoListModel;
  