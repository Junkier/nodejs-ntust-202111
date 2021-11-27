const express = require("express");
const app = express();


app.get("/" , (req,res)=>{
   res.send("嗨嗨 , 我是 Node.js server !!!");
});

app.listen(8088,()=>{
    console.log("Server is running at localhost:8088");
});