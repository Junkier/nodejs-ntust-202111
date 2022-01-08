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

// [Session 外存][1]
// 追加 redis 套件 (Node.js 使用)
const redis = require("redis");
const redisClient = redis.createClient();  // 產生 redisClient 的連線實例 (Instance)

// [Session 外存][2]
// 追加 connect-redis 套件 (專門為 express 設計的對接套件)
const redisStore = require("connect-redis")(session);

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
  // [Session 外存][3] 設定好 redisStore 
  store : new redisStore({ client : redisClient }), // session 資料存放的地方
  secret : "abcd1234" ,  // session 資料加密使用
  resave : true,          // 不論修改 , 是否要回存到 store 上
  saveUninitialized : false, // 初始化的 session , 是否要存到 store 上
  name   : "_ntust_tutorial_id",  // cookie 的 key 值
  ttl    : 24*60*60*1             // session 資料有效時間 (以 s 為單位)
  // name   : "_testqq_abcd",
}));
//////////////////////////////////////////

////// 登入驗證
// V 1. 加入 login 頁面
// V 2. POST /auth API 驗證 + 紀錄資料到 session 上
// V 3. 加入 登入驗證 middleware (isUserLogined)
// V 4. GET /logout 登出 API 


// 監測 session 的 middleware 
app.use((req,res,next)=>{
  console.log(req.session);
  next();
});


// 加入 login 頁面
app.get("/login" , (req,res)=>{
  res.render("login.html");
});

// 登出 API 
app.get("/logout",(req,res)=>{
  req.session.destroy(); // 刪掉 session 物件資料
  res.clearCookie("_ntust_tutorial_id"); // 刪掉 cookie 的 key-value pair
  res.redirect("/login"); // 導入到 /login 頁面
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
