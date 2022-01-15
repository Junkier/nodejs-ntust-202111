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


module.exports = conn;