const express = require('express');
const app = express();

const portNum = 8088;

const sampleRouter = require("./router/sample");


//////////////////////////////////// 
// This is for swagger API documents.
const swaggerUi         = require('swagger-ui-express');
const YAML              = require('yamljs');
const swaggerDocument   = YAML.load('./api-docs/api-doc.yaml');

let options = {
    customCss: '.swagger-ui .wrapper { width: 80% }'
};

app.use(`/api-docs`,
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument,options)
);
//////////////////////////////////// 

app.get("/",(req,res)=>{
  res.send(`
    嗨嗨 , 這是 Node.js server 
    <br> 
    <h3>想看 作業內容 , 查看 <a href='/api-docs'> members API 文件 </a></h3>
    <h3>想看 JWT 如何使用 , 可參考這個 <a href='/sample/'> sample API </a></h3>
  `);
})


app.use("/sample",sampleRouter);


app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});



app.listen(portNum,()=>{
    console.log(`API server is running at localhost:${portNum}`);
});
