const express = require("express");
const app = express();
const portNum = 8088;


// 路由設定 / end-point 設定 / API 設計
app.get("/" , (req,res)=>{
  res.send("嗨嗨,  我是 Node.js server.");
});

// app.get("/books/page",()=>{ ... });


// /books/page
// /books/data 
// /about/page 
// /about/hihi

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
