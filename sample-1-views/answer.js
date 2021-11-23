const express = require('express');
const app = express();


const hbs    = require("hbs");
const path   = require("path");


// 設定模板引擎
app.engine('html',hbs.__express);

// 設定模板 位置
app.set("views" , path.join(__dirname ,"application","views"));

// 設定靜態檔 位置
app.use(express.static(path.join(__dirname,"application")));



app.get(["/","/hello"],(req,res)=>{
    let name = req.query.name;
    res.render("index.html",{ templateName : name });
});


app.get("/dramas/page",(req,res,next)=>{
    let name = req.query.name;
    res.render("dramas.html",{ templateName : name });
});


// app.get("/about/me",(req,res)=>{
//     res.render("aboutme.html");
// });


app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});
