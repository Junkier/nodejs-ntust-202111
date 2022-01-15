//// mongoose 操作教學
const mongoose = require("mongoose");

//// 1. 建立連線 (connection)
// 連線的設定值: "mongodb://{host_ip}:{port}/{db_name}"
const connConfig = "mongodb://localhost:27017/nodejs-tutorial";
const conn = mongoose.createConnection(connConfig);

// 一旦連線成功 , 觸發 callback function 
conn.on("connected",()=>{
  console.log("MongoDB is connected");
});

//// 2. 建立 Schema & Models
// 建立 Schema 
const dramaSchema = new mongoose.Schema({
  "dramaId"  : String,
  "category" : String,
  "name"     : String,
  "score"    : Number
},{
  collection : "dramas-table"  // 要操作的 collection (table)名稱
});
// {
//     "_id" : ObjectId("61d94c57db5049d56e3bbe2d"),
//     "dramaId" : "1002",
//     "category" : "殭屍",
//     "name" : "屍戰朝鮮",
//     "score" : 9.0
// }

// 建立 Model 物件
let dramasModel = conn.model("Dramas" , dramaSchema);

//// 3. 透過 Model物件 進行 CRUD 操作
// 非同步的動作 --> 使用 Promise 處理
dramasModel.find()
           .then(data=>{
             console.log(data);
           })
           .catch(err=>{
            console.log(err);
           });