const express = require("express");
const app = express();
const portNum = 8088;


// 路由設定 / end-point 設定 / API 設計
app.get("/" , (req,res)=>{
  res.send("嗨嗨,  我是 Node.js server.");
});

// app.get("/books/page",()=>{ ... });

//// 將 /books , /about 處理機制轉到 router 去
// /books/page
// /books/data 
// /about/page 
// /about/hihi

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
