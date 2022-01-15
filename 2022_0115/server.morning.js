const express = require("express");
const path = require("path");
const hbs = require("hbs");   

const bodyParser = require("body-parser");  
const session = require("express-session");   

const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas.controllers");
const authRouter = require("./router/auth");

const validator = require("./utils/validator");

const redis = require("redis");
const redisClient = redis.createClient(); 

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
app.use(session({
  store : new redisStore({ client : redisClient }), 
  secret : "abcd1234" ,  
  resave : true,          
  saveUninitialized : false, 
  name   : "_ntust_tutorial_id",  
  ttl    : 24*60*60*1             
}));
//////////////////////////////////////////


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
  validator.isUserLogined,
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
