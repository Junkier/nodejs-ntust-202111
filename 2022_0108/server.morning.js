const express = require("express");
const path = require("path");
const hbs = require("hbs");   

const bodyParser = require("body-parser");  
const session = require("express-session");   // [Session][1] 安裝 express-session 

const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas.controllers");
const authRouter = require("./router/auth");

const validator = require("./utils/validator");


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

//////////////////////////////////////////
// 處理 session 資料的 middleware 
// 後面才可用 req.session 做資料存取
// [Session][2] 設定 session middleware
app.use(session({
  secret : "c90dis90#" ,
  resave : true,
  saveUninitialized : false,
  name   : "_ntust_tutorial_id",
  ttl    : 24*60*60*1
}));
//////////////////////////////////////////

////// 登入驗證
// V 1. 加入 login 頁面
// 2. POST /auth API 驗證 + 紀錄資料到 session 上
// 3. GET /logout 登出 API 
// 4. 加入 登入驗證 middleware (isUserLogined)


// 監測 session 的 middleware 
app.use((req,res,next)=>{
  console.log(req.session);
  next();
});


// 加入 login 頁面
app.get("/login" , (req,res)=>{
  res.render("login.html");
});


app.get("/" , 
  // [Session][4] 加入 登入驗證判斷 middleware

  validator.isUserLogined,
  // (req,res,next)=>{  // 是否登入驗證
  //   // console.log(req.session);

  //   if(!req.session.userInfo || req.session.userInfo.isLogined === false){
  //     // res.send("您尚未登入!!!");
  //     res.redirect("/login");
  //     return;
  //   };

  //   next();
  //     // res.send("您尚未登入！！！");

  //   // 改成 error first 
  //   // if(req.session.userInfo && req.session.userInfo.isLogined === true){
  //   //   next();
  //   // }else{
  //   //   res.send("您尚未登入！！！");
  //   // };
  // },
  (req,res)=>{
    res.render("index.html");
  }
);

app.use("/dramas", validator.isUserLogined, dramasRouter);
app.use("/auth" , authRouter);


// 關於我們 頁面
app.get("/about/us",
  validator.isUserLogined,
  (req,res)=>{
    res.render("aboutus.html");
  }
);


app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
