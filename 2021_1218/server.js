const express = require("express");
const path = require("path");
const hbs = require("hbs");   // 記得 npm install hbs
const app = express();
const portNum = 8088;

// [1] 設定模板引擎 (解析 html 檔 , 讓 express 看懂 html 程式)
// hbs -> handlebars 為一種模版引擎
// 另外一種熱門的模版引擎 --> pug 
app.engine("html" , hbs.__express);

// [2] 設定模板 (template) 位置
app.set("views" , path.join(__dirname , "application" , "views" ));

// [3] 設定靜態檔的位置 (讀取 *.css / *.js / *.jpg / *.png / *.mp4 / ...)
// --> 處理 靜態檔 相關 requests
app.use( express.static( path.join( __dirname , "application") ));

app.get("/" , (req,res)=>{
  // res.send("嗨嗨,  我是 Node.js server.");
  
  // [4] 使用 .render (渲染) 回傳 html 頁面
  res.render("index.html");
});


// HTML / Css / 前端 Js 教學
app.get("/testqq",(req,res)=>{
  res.render("template.html");
});

app.get("/data",(req,res)=>{
  res.json({ name : "jeff" , age : 18 , message : "今天好冷喔～～～" });
});


app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
