const express = require("express");
const path = require("path");
const hbs = require("hbs");   

const bodyParser = require("body-parser");  

const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas.controllers");
const authRouter = require("./router/auth");


//////////////////////////////////////////
// 設定模板引擎
app.engine("html" , hbs.__express);
app.set("views" , path.join(__dirname , "application" , "views" ));
app.use( express.static( path.join( __dirname , "application") ));
//////////////////////////////////////////

//////////////////////////////////////////
// 使用 body-parser 處理  Form data  (req.body)
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended : false,   // 是否用 額外套件 解析字串
  limit : "1mb",      // 限制 參數資料大小
  parameterLimit : "10000" // 限制參數個數 
}));
//////////////////////////////////////////

////// 登入驗證
// V 1. 加入 login 頁面
// 2. POST /auth API 驗證 + 紀錄資料到 session 上
// 3. GET /logout 登出 API 
// 4. 加入 登入驗證 middleware (isUserLogined)


// 加入 login 頁面
app.get("/login" , (req,res)=>{
  res.render("login.html");
});


app.get("/" , (req,res)=>{
  res.render("index.html");
});

app.use("/dramas",dramasRouter);
app.use("/auth" , authRouter);


// 關於我們 頁面
app.get("/about/us",(req,res)=>{
  res.render("aboutus.html");
});


app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
