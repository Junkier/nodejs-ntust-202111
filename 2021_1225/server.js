const express = require("express");
const path = require("path");
const hbs = require("hbs");   // 記得 npm install hbs

const bodyParser = require("body-parser");  // 記得 npm install body-parser

const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas");


//////////////////////////////////////////
// 設定模板引擎
app.engine("html" , hbs.__express);

app.set("views" , path.join(__dirname , "application" , "views" ));

app.use( express.static( path.join( __dirname , "application") ));
//////////////////////////////////////////

//////////////////////////////////////////
// 使用 body-parser 處理  Form data 
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



app.get("/hello" , 
  (req,res,next)=>{
    // 往下一個 Middleware (中介函式) 執行
    console.log("我是 Middleware 1");

    // 顯示 name 參數
    console.log(`您是 :${ req.query.name }`);
    next();
  },
  (req,res,next)=>{
    console.log("我是 Middleware 2");

    // 顯示 age 參數
    console.log(`您今年 : ${req.query.age} 歲`);
    next();
  },
  (req,res,next)=>{
    console.log("我是 Middleware 3");
    next();
  },
  (req,res)=>{
    console.log("我是 Middleware 4");
    res.send("Hello , 過敏好可怕～～～");
  }
);





app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
