//// mongoose 操作教學

const mongoose = require("mongoose");


//// 1. 建立連線 (物件)
// 連線設定格式 -> mongodb://{host}:{port}/{db_name}
const connConfig = "mongodb://localhost:27017/nodejs-tutorial"
const conn = mongoose.createConnection(connConfig);

conn.on("connected" , ()=>{
  console.log("MongoDB is connected");
});

conn.on("error",()=>{
  console.log("MongoDB conn gets error");
});


//// 2. 建立 Schema & Model 
// 建立 Schema 
let dramaSchema = new mongoose.Schema({
    "dramaId"  : String,
    "category" : String,
    "name"     : String,
    "score"    : Number 
}, {
  collection : "dramas-table"
});

// 在 conn 建立 Model 物件 
// (Node.js 透過 Model 物件 , 和 collection 互動)
let dramaModel = conn.model("Drama" , dramaSchema);

//// 3. 透過 Model 來進行 CRUD 操作
// Promise 版
// dramaModel.find()
//           .then(data=>{
//             console.log(data);
//           })
//           .catch(err=>{
//             console.log(err);
//             console.log("有誤！！！");
//           });

// Async / Await 版
let main = async ()=>{
  try{
    // [補充]  .find( 條件 , 顯示欄位 )
    let data = await dramaModel.find(
      { "category" : "政治" },
      { "dramaId" : 1 , "name" : 1 , "category" : 1 , "_id": 0 }
    );
    console.log(data);
  } catch(err){
    console.log(err);
    console.log("有誤！！！");
  };
};

// main();


///////////////////////////////////
//// 建立 2nd Schema & Model 並操作
let memberSchema = new mongoose.Schema({
  "name" : String,
  "age" : Number,
  "message" : String
},{
  collection : "members",
  versionKey : false
});

// 一個 collection , 各自對應到一個 Model
let memberModel = conn.model("Members" , memberSchema );

let createMain2 = async ()=>{
  try{
    // 新增資料
    let data = await memberModel.create({
      name : "Leo",
      age : 20,
      scores : [80,95,97],
      testqq : "休息囉～"
      // message : "好冷喔嗚嗚嗚"
    });
    console.log("新增的資料 :" , data);
  } catch(err){
    console.log(err);
    console.log("有誤！！！");
  };
};

// createMain2();


let findMain2 = async ()=>{
  try{
    // let data = await memberModel.find({ name : "jeff"}) // --> .find , 回傳 Array
    let data = await memberModel.findOne({ name : "jeff"}) // --> .findOne , 回傳 Object
    // let data = await dramaModel.find({ name : "jeff"}) // --> .findOne , 回傳 Object
    console.log(data);
  } catch(err){
    console.log(err);
    console.log("有誤！！！");
  };
};


findMain2();

