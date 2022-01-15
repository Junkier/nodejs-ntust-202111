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
  collection : "dramas-table"  // 要操作的 collection (table) 名稱
});
// {
//     "_id" : ObjectId("61d94c57db5049d56e3bbe2d"),
//     "dramaId" : "1002",
//     "category" : "殭屍",
//     "name" : "屍戰朝鮮",
//     "score" : 9.0
// }

// 建立 Model 物件 (在 conn 連線上, 註冊一個物件)
// (Node.js 透過 Model 物件 , 和 collection (表格) 互動)
let dramasModel = conn.model("Dramas" , dramaSchema);

//// 3. 透過 Model物件 進行 CRUD 操作
// 非同步的動作 --> 使用 Promise 處理
// dramasModel.find()
//            .then(data=>{
//              console.log(data);
//            })
//            .catch(err=>{
//             console.log(err);
//            });

// Async / Await 處理
let main = async () => {
  try{
    // let data = await dramasModel.find();
    // console.log(data);

    // [補充] .find(條件 , 顯示欄位)
    let data2 = await dramasModel.find(
      { category : "政治" } , 
      { category : 1 , name : 1 , score: 1 , _id : 0}
    );
    console.log(data2);
  } catch(err){
    console.log(err);
  }
};

// main();


//////////////////////////////
// 建立 2nd Schema & Model 
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

let findMain2 = async ()=>{
  try{
    // math_score >= 85
    // let data2 = await membersModel.find({ "math_score" : { "$gte" : 85 } }); // --> .find , 回傳 Array
    // let data2 = await membersModel.findOne({ "math_score" : { "$gte" : 85 } }); // --> .findOne , 回傳 Object

    // 使用不同的 Model -> 操作資料庫不同的 collection
    let data2 = await membersModel.find({ "name" : "jeff" }); 
    // let data2 = await dramasModel.find({ "score" : {"$gt" : 123 } }); 
    console.log(data2);
  } catch(err){
    console.log(err);
  }
};

// findMain2();

let insertMain2 = async ()=>{
  try{
    // 正常情況
    // let result = await membersModel.create({ name : "benson" , age : 47 , math_score:100 }); 

    // 亂塞欄位
    // let result = await membersModel.create({ name : "david" , eng_score: 100 , message : "嗨嗨～～～～" }); 

    let result = await membersModel.create({ name : "Elle" , math_score: 100 , message : "嗨嗨～～～～" }); 
    console.log("新增的資料 :",result);
  } catch(err){
    console.log(err);
  }
};
insertMain2();

///////
// 查看 connection 上的 Model 物件
// console.log(conn.models);
///////

