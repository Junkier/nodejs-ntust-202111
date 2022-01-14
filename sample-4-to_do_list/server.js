const express = require('express');
const app = express();


const apiDocs       = require("./router/api-docs");
const toDoListRouter = require("./router/to-do-list");


//// Model 部分建立完 , 再開啟即可使用
// const dramasRouter   = require("./router/dramas");
// const imagesRouter   = require("./router/images");
// const aboutRouter    = require("./router/about");

// app.use("/dramas",dramasRouter);
// app.use("/images",imagesRouter);
// app.use("/about", aboutRouter);
////////////

app.use(`/api-docs`,apiDocs);
app.use("/to-do-list",toDoListRouter);



app.get("/",(req,res)=>{
  res.send("Hello world!");
});


app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});



app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});
