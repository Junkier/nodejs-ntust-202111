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

app.get("/this-is-a-book" , (req,res)=>{
    console.log("今天星期六！");
    console.log("好冷好冷～");
    res.send("中午吃啥麼！？");
});


// 讓 server.js 佔有 8088 的 port
app.listen(8088,()=>{
    console.log("Server is running at localhost:8088");
    // console.log("嗨嗨 , 我是第一次看 Node.js 程式");
    // console.log("怎麼有點難ＱＱ");
});

// 程式執行後 , 進入 "等待" (Pending) 的狀態 
// 等 使用者 連線進來 (發 requests 過來)


////////////////////////
// Ctrl+c --> terminal 終止程式