const express = require("express");
const path = require("path");
const hbs = require("hbs");   // 記得 npm install hbs

const bodyParser = require("body-parser");  // 記得 npm install body-parser

const app = express();
const portNum = 8088;

// const dramasRouter = require("./router/dramas.views");
const dramasRouter = require("./router/dramas.controllers"); // [改動]


//////////////////////////////////////////
// 設定模板引擎
app.engine("html" , hbs.__express);

app.set("views" , path.join(__dirname , "application" , "views" ));

app.use( express.static( path.join( __dirname , "application") ));
//////////////////////////////////////////

//////////////////////////////////////////
// 使用 body-parser 處理  Form data  (req.body)
// [Body-Parser][1] 解析 application/json
app.use(bodyParser.json());

// [Body-Parser][2] 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended : false,   // 是否用 額外套件 解析字串
  limit : "1mb",      // 限制 參數資料大小
  parameterLimit : "10000" // 限制參數個數 
}));
//////////////////////////////////////////


app.get("/" , (req,res)=>{
  // res.send("嗨嗨,  我是 Node.js server.");
  
  // [Views][4] 使用 .render (渲染) 回傳 html 頁面
  res.render("index.html");
});

app.use("/dramas",dramasRouter);


// 關於我們 頁面
app.get("/about/us",(req,res)=>{
  res.render("aboutus.html");
});


////////////////////////////////////////
// Middleware (中介函式)
app.get("/hello" , 
  (req,res,next)=>{
    
    console.log("我是 Middleware 1");

    // [1] 顯示前端 name 參數
    // console.log(`您是 :${ req.query.name }`);

    // [2] Middleware 間傳參數
    // req (request 物件) 上 設定資料
    req.test = { name : "jeff" , age :18 };

    // [3] 往下一個 Middleware (中介函式) 執行
    // next();

    // [4] 檢查 name 參數 是否存在
    // V -> ok , 往下一個 Middleware 執行
    // X -> 回傳 { message : "name 人呢？" }
    // 使用 error first 寫法
    // if( req.query.name === undefined){ // 還可以更好
    if(!req.query.name){  // 更佳 !!!
      res.json({ message : "name 人呢？" });
    }else{
      next();
    };

  },
  (req,res,next)=>{
    // 100% 確保 name 參數必存在
    console.log("我是 Middleware 2");

    // [1] 顯示前端 age 參數
    // [1] 顯示前端 name 參數
    console.log(`您是 : ${ req.query.name }`);
    console.log(`您今年 : ${req.query.age} 歲`);
    next();
  },
  (req,res,next)=>{
    console.log("我是 Middleware 3");
    console.log("req.test :" , req.test);
    next();
  },
  (req,res)=>{
    console.log("我是 Middleware 4");
    res.json({ result : req.test });
    // res.send("Hello , 過敏好可怕～～～");
  }
);
////////////////////////////////////////



app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
