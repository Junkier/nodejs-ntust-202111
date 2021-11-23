const express = require('express');
const app = express();

const hbs    = require("hbs");
const path   = require("path");

const bodyParser   = require("body-parser");


const dramasRouter = require("./router/dramas");
const aboutRouter  = require("./router/about");


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



app.use("/about",aboutRouter);
app.use("/dramas",dramasRouter);


app.get("/",(req,res)=>{
    res.render("index.html");
});



app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});



