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


////////////////////////////////////////////////////////////
// 帶參數
// 1. query_string
// 2. parameters
// 3. body 

app.get("/data",(req,res)=>{
    // req: requests 資料
    // res: response 資料

    // 取得 query_string 帶來的參數

    // let name = req.query.name;
    // console.log(name);
    // res.send("嗨嗨 , " + name + " 您好～");

    // 追加 age123 , message 參數處理
    let name = req.query.name;
    let age  = req.query.age123;
    let message = req.query.message;
    console.log(name,age,message);
    res.send("嗨嗨, 您傳的參數為 :" + name + "/" + age + "/" + message);
    // res.send("我是第二個 res.send !!!!");
    // "嗨嗨" --> 字串資料
    // 字串 + 字串 --> 字串合併
    // "嗨嗨" + "我是 Jeff 老師" --> "嗨嗨我是 Jeff 老師"
});

// 取得 parameters 帶來的參數
// "/department/A101/members/10003"
app.get("/department/:depNo/members/:memNo" , (req,res)=>{
    let depNo = req.params.depNo;
    let memNo = req.params.memNo;

    let message = "部門:" + depNo + " ," + "會員編號: " + memNo;
    console.log(message);
    res.send(message);
});

// app.post 
// app.put
// app.delete 


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