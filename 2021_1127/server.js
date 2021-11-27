const express = require("express");
const app = express();

app.get("/" , (req,res)=>{
   res.send("嗨嗨 , 我是 Node.js server !!!");
});

// app.get("/testqq")  --> 路徑 , end-point 
// (req,res)=>{ ... }  --> 處理函式
// res.send            --> response 的回覆處理

app.get("/testqq" ,(req,res)=>{
    res.send("嗨嗨 , 我是 /testqq 路徑");
});

app.listen(8088,()=>{
    console.log("Server is running at localhost:8088");
});



////////////////////////
// Ctrl+c --> terminal 終止程式