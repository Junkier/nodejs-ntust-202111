//// 建立 Router 
const express = require("express");
const router  = express.Router();   // 產生 router 物件 , 存入變數

// 路徑設定 / API 設計
router.get("/",(req,res)=>{
  res.send("我是 /books 的根路徑");
});

router.get("/page",(req,res=>{
  res.json({ message : "我是 /books/page 的路徑！！！"});
}));

