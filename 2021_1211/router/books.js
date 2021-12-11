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
  fs.readFile("data.json" , "utf8" , (err,data)=>{
    console.log(data);
    console.log(typeof data);  // 檢查資料型別

    console.log("-".repeat(50));

    let result = JSON.parse(data);  // 轉成 JSON (Object) 資料型別
    console.log(result);
    console.log(typeof result);
    
    res.json(result);   // 回傳前端 JSON 資料
    // res.send(data);  // 回傳前端 String 資料
  });
});


// [module][1] 將 router 導出 , 等著別人 require 引入使用
module.exports = router;