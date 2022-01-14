const express = require('express');
const app = express();

const hbs    = require("hbs");
const path   = require("path");

const log4js       = require("log4js");

const session     = require("express-session");
const redis       = require("redis");
const redisStore  = require("connect-redis")(session);
const redisClient = redis.createClient({
  host     : process.env.REDIS_HOST || "localhost",
  port     : 6379
});


const bodyParser   = require("body-parser");


const authRouter     = require("./router/auth");
const dramasRouter   = require("./router/dramas");
const toDoListRouter = require("./router/to-do-list");
const imagesRouter   = require("./router/images");
const aboutRouter    = require("./router/about");

const apiDocs       = require("./router/api-docs");


const utils    = require("./utils");

// log4js config.
log4js.configure("./config/log4js.json");

const logger = log4js.getLogger("SERVER");



// 設定模板引擎
app.engine('html',hbs.__express);

// 設定模板 位置
app.set("views" , path.join(__dirname ,"application","views"));

// 設定靜態檔 位置
app.use(express.static(path.join(__dirname,"application")));


// Setting body-parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
		extended : false ,
		limit : "1mb",
		parameterLimit : '10000'
}));


// Use Session
app.use(session({
    store : new redisStore({ client: redisClient}),
    secret : "c90dis90#" ,
    resave : true,
    saveUninitialized : false,
    name:"_ntust_tutorial_id",
    ttl : 24*60*60*1
}))



app.get("/",(req,res)=>{
  if(req.session.userInfo && req.session.userInfo.isLogined) res.redirect("/welcome");
  else res.send("Hello World ! Please going to login <a href='/login'>Login page</a>");
});


app.get("/login",(req,res)=>{
  res.render("login.html");
});

app.get("/logout",(req,res)=>{
	req.session.destroy();
	res.clearCookie("_ntust_tutorial_id");
	res.redirect("/login");
});


app.use("/auth",authRouter);
app.use(`/api-docs`,apiDocs);

app.use(utils.isUserLogined);

app.use("/to-do-list",toDoListRouter);
app.use("/images",imagesRouter);

app.use("/dramas",dramasRouter);
app.use("/about", aboutRouter);


app.get(["/","/welcome"],
  (req,res)=>{
    res.render("welcome.html",{templateName : req.session.userInfo.name});
  }
);



app.listen(8088,() => {
  logger.info("Server is running at http://localhost:" + String(8088));
});
