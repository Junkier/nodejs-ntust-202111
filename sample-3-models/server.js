const express = require('express');
const app = express();

const hbs    = require("hbs");
const path   = require("path");

const bodyParser   = require("body-parser");
const session      = require("express-session");
const redis        = require("redis");
const redisStore   = require("connect-redis")(session);
const redisClient  = redis.createClient();


const dramasRouter = require("./router/dramas");
const aboutRouter  = require("./router/about");
const authRouter   = require("./router/auth");

const validator    = require("./utils/validator");


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


app.use(session({
  store : new redisStore({ client: redisClient}),
	secret : "c90dis90#" ,	     // 加密 session_id (salt)
	resave : true,               // 不論修改 , 回存到 stores 
	saveUninitialized : false,   // 初始化的　session data , 使否存到 stores
	name:"_ntust_tutorial_id",   // cookie name
	ttl : 24*60*60*1             // session 有效時間
}));

////// 之後可存取 req.session 物件

app.use("/about", validator.isUserLogined, aboutRouter);
app.use("/dramas",validator.isUserLogined, dramasRouter);
app.use("/auth",authRouter);



app.get("/",
	validator.isUserLogined,
	(req,res)=>{
		let name = req.session.userInfo.name;
		res.render("index.html",{ templateName : name });
	}
);


app.get("/login",
	(req,res,next)=>{
		if(req.session.userInfo && req.session.userInfo.isLogined) res.redirect("/");
		else next();
	},
	(req,res)=>{
		res.render("login.html");

	}
);


app.get("/logout",(req,res)=>{
	req.session.destroy();
	res.clearCookie("_ntust_tutorial_id");
	res.redirect("/login");
});


app.listen(9099,function(){
    console.log("Server is running at http://localhost:" + String(9099));
});



