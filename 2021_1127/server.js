const express = require("express");  // 引入套件
const path    = require("path");
const app = express();

// 根路徑 
app.get("/" , (req,res)=>{
   res.send("嗨嗨 , 我是 Node.js server !!!");
});

// app.get("/testqq")  --> 路徑 , end-point 
// (req,res)=>{ ... }  --> 處理函式
// res.send            --> response 的回覆處理
app.get("/testqq" ,(req,res)=>{
    res.send("嗨嗨 , 我是 /testqq 路徑");
});

app.get("/this-is-a-book" , (req,res)=>{
    console.log("今天星期六！");
    console.log("好冷好冷～");
    res.send("中午吃啥麼！？");
});


////////////////////////////////////////////////////////////
// 帶參數
// 1. query_string     -> ex: /data?name=jeff&age=18
// 2. parameters       -> ex: /department/1234/members/10002
//                     (server 端： /department/:depNo/members/:memNo)
// 3. body (in future)

app.get("/data",(req,res)=>{
    // req: requests 資料
    // res: response 資料

    // 取得 query_string 帶來的參數

    // let name = req.query.name;
    // console.log(name);
    // res.send("嗨嗨 , " + name + " 您好～");

    // 追加 age123 , message 參數處理
    let name = req.query.name;
    let age  = req.query.age123;
    let message = req.query.message;
    console.log(name,age,message);
    res.send("嗨嗨, 您傳的參數為 :" + name + "/" + age + "/" + message);
    // res.send("我是第二個 res.send !!!!");

    ////////////////////////
    // "嗨嗨" --> 字串資料
    // 字串 + 字串 --> 字串合併
    // "嗨嗨" + "我是 Jeff 老師" --> "嗨嗨我是 Jeff 老師"
});

// 取得 parameters 帶來的參數
// "/department/A101/members/10003"
app.get("/department/:depNo/members/:memNo" , (req,res)=>{
    let depNo = req.params.depNo;
    let memNo = req.params.memNo;

    let message = "部門:" + depNo + " ," + "會員編號: " + memNo;
    console.log(message);
    res.send(message);
});

//////////////////////// 
// 其他 requests 的路徑處理 (in future)
// app.post 
// app.put
// app.delete 


////////////////////////////////////////////////////////////
// response 資料回覆
app.get("/response-data/:imgNo",(req,res)=>{

    // 1. .send --> 回傳文字資料
    // res.send("嗨嗨, 我是文字資料～～～");

    /////////////////////

    // 2. .json --> 回傳 JSON 資料 (類似於 Object 資料型別)
    // res.json({ "name" : "jeff" , "age" : 18 , "message" : "嗨嗨～～～"});

    // 從 瀏覽器 傳 name 參數 (query_string), 組合成 message 
    // 再回傳 JSON 給 瀏覽器 (前端)
    // let name = req.query.name;
    // let message = "嗨嗨 , 我是" + name;
    // res.json({
    //     "name" : "jeff",
    //     "age"  : 18 ,
    //     "message" : message
    // });

    /////////////////////

    // 3. .sendFile --> 回傳 檔案 資料 (ex: 影像檔)
    // let fileName = "./demo-1.jpeg";  // 不可用 相對路徑

    // path --> node.js 原生路徑套件
    // __dirname --> 保留字, 程式執行位置

    // [Question] 使用 type 帶參數, 抽換 梗圖 照片
    // let imgType = req.query.type;
    let imgType = req.params.imgNo;
    let imgName = "demo-" + imgType + ".jpeg";
    console.log(imgName);

    let fileName = path.join(__dirname,imgName);  // 使用 絕對路徑
    console.log("__dirname :",__dirname);
    console.log("imgName :",imgName);
    console.log("fileName :",fileName);
 
    res.sendFile(fileName); 

    /////////////////////

    // 4. .redirect 轉址處理
    // res.redirect("https://youtube.com");

});




// 讓 server.js 佔有 8088 的 port
app.listen(8088,()=>{
    console.log("Server is running at localhost:8088");
    // console.log("嗨嗨 , 我是第一次看 Node.js 程式");
    // console.log("怎麼有點難ＱＱ");
});

// 程式執行後 , 進入 "等待" (Pending) 的狀態 
// 等 使用者 連線進來 (發 requests 過來)


////////////////////////
// Ctrl+c --> terminal 終止程式