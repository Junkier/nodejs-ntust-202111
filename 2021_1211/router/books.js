//// 建立 Router 
const express = require("express");
const router  = express.Router();   // 產生 router 物件 , 存入變數
const fs      = require("fs");  // File system , 是 Node.js 原生套件

// 路徑設定 / API 設計
// /books/ 的路徑
router.get("/",(req,res)=>{
  res.send("我是 /books 的根路徑");
});

// /books/page 的路徑
router.get("/page",(req,res)=>{
  res.json({ message : "我是 /books/page 的路徑！！！"});
});

router.get("/data",(req,res)=>{

  // 檔案系統的 I/O ==> 非同步的動作 (asynchronous)
  fs.readFile("data.json" , "utf8" , (err,data)=>{   // err -> 錯誤資料 ; data -> 您的資料
    // 若有錯誤 , 通常沒事 err 為 undefined
    if(err){
      console.log(err);
      res.send("檔案有問題！！！！");
    } else {
      console.log(data);
      console.log(typeof data);  // 檢查資料型別

      console.log("-".repeat(50));

      let result = JSON.parse(data);  // 轉成 JSON (Object) 資料型別
      console.log(result);
      console.log(typeof result);

      res.json(result);   // 回傳前端 JSON 資料
      // res.send(data);  // 回傳前端 String 資料
    };
  });
});


router.get("/data-2" , (req,res)=>{
  let data2 = fs.readFile("data.json","utf8",()=>{});  // 您會得到一個 神秘 undefined
  console.log(data2);
  res.send(data2);

  // let result = JSON.parse(data2);
  // res.json(result);
});


router.get("/multi-data" , (req,res)=>{
  // 讀 models/data${n}.json 的資料
  let result = {};

  // callback hell  --> 不佳
  fs.readFile("./models/data1.json" , "utf8" , (err,data1)=>{  
    fs.readFile("./models/data2.json" , "utf8" , (err,data2)=>{  
      fs.readFile("./models/data3.json" , "utf8" , (err,data3)=>{  
        fs.readFile("./models/data4.json" , "utf8" , (err,data4)=>{  
          fs.readFile("./models/data5.json" , "utf8" , (err,data5)=>{  
            result["data1"] =  JSON.parse(data1);
            result["data2"] =  JSON.parse(data2);
            result["data3"] =  JSON.parse(data3);
            result["data4"] =  JSON.parse(data4);
            result["data5"] =  JSON.parse(data5);
            res.json(result);
          });
        });
      });
    });
  });
});


// [module][1] 將 router 導出 , 等著別人 require 引入使用
module.exports = router;