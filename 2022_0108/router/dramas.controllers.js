const express = require("express");
const fs = require("fs");
const router = express.Router();

const validator = require("../utils/validator");
// 此時 validator 變數 即為 {
//     "isTokenExist" : isTokenExist, // value 為 middleware 本人 
//     "isTokenValid" : isTokenValid  
// }


let readFilePromise = (dataPath)=>{
  return new Promise( (resolve , reject) =>{
    fs.readFile(dataPath,"utf8" , (err,data)=>{
      if(err) reject(err);
      else resolve( JSON.parse(data) );
    });
  });
};

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 

// [Work4] 使用 .use -> request 100% 會經過的 Middleware 
router.use(
  validator.isTokenExist,   // 檢查 token 是否存在
  validator.isTokenValid,   // 檢查 token 是否正確
);


// [改動]
// GET /dramas/list  --> 取得 資料
// [Work1] 加入參數檢查 Middleware 
// [Work3] 使用 共用的 Middleware (實名 Middleware)
router.get("/list" ,
  // 1. 檢查 type 值是否存在 (M1)
  (req,res,next) => {
    if(!req.query.type){
      // 調整 status_code=400 --> 前端接到 , 才會進到 error 區的程式
      console.log("發生錯誤！！！");
      res.status(400).json({ message : "type 人呢?" });
    }else{
      next();
    };
  },
  // 2. 檢查 type 是否正確 (M2)
  (req,res,next) => {
      
    // type 值 是否正確 
    let data = ["犯罪","殭屍","愛情","政治","其他","全"];
    
    // if indexOf -> -1 , type 不在 array 裡
    if( data.indexOf(req.query.type) === -1  ){
      console.log("發生錯誤2！！！");
      // status_code=400 -> Client 端 request 有問題
      res.status(400).json({ message : "type 值有誤！"});
    }else{
      next();
    };

  },
  // 最後的 Middleware (M3 , 處理業務邏輯)
  async (req,res)=>{   
    //// 讀取 models/sample2.json  
    //// 再透過 type 過濾資料 , 最後 response 給前端
    try {
      let data = await readFilePromise("models/sample2.json");
      let type = req.query.type;

      // 過濾資料
      if( type === "全"){
        res.json({ result : data });
      }else{
        let filteredData = data.filter( ele => ele["category"] === type );
        res.json({ result : filteredData });
      };

    } catch (err){
      ////// Status code 整理
      // 2xx --> 請求 ok
      // 3xx --> 請求 ok , 但資源換位置 , response 會告訴你下一個位置
      // 4xx --> Client 端問題 , ex: 參數帶錯
      // 5xx --> Server 端問題 , ex: server.js 出現 bug 
      console.log(err);
      res.status(500).json({ message: "系統有問題！"});
    };
  }
);


// POST /dramas/data  --> 新增資料 
// [Work 2] 加入 API token 檢查機制 , 預期 使用者 token 寫在 headers
router.post("/data" , 

  //////////////////////////////
  // [Work3] 使用 共用的 Middleware (實名 Middleware)
  // validator.isTokenExist,   // 檢查 token 是否存在
  // validator.isTokenValid,   // 檢查 token 是否正確
  //////////////////////////////

  //////////////////////////////
  // 匿名 Middleware (anonymous middleware)
  // // 1. 檢查 headers 是否有 token (M1)
  // (req,res,next) => {
  //   // 檢查 headers --> req.headers
  //   // console.log(req.headers);
  //   if(!req.headers["x-jeff-token"] ){
  //     console.log("[M1] 無 token !!!");
  //     res.status(400).json({ message : "token 人呢！？！？！？"});
  //   }else{
  //     next();
  //   };
  // },
  // // 2. 檢查 token 值是否正確 (M2)
  // (req,res,next) => {
  //   if(req.headers["x-jeff-token"] !== "AZ"){
  //     console.log("[M2] token 錯誤！！！");

  //     // status_code=403 --> 無權限 (Forbidden.)
  //     res.status(403).json({ message : "您沒有權限！"});
  //   }else{
  //     next();
  //   };
  // },
  //////////////////////////////
  // 3. 處理業務邏輯 (M3)
  async (req,res) =>{  // API 佳 ！！！
    try{
      ////////////// 2) 新增 dramaId (Primary Key , 主鍵)
      // 將 req.body (Form Data) 寫入到 sample2.json 裡
      // 1. 先讀出此 Array
      let data = await readFilePromise("models/sample2.json");

      // 2. 使用 .push 
      // data -> [{} , {} , {} , ... ]
      // 抓出最新的 dramaId 
      let latestDramaId = data.map( ele => ele["dramaId"])    // 取得 dramaId
                              .filter( v=> v !== undefined)   // 過濾 undefined 資料
                              .sort((a,b)=> b-a)[0];          // 從大 -> 小排序

      let newDramaId = Number(latestDramaId )+ 1 ; // 因 latestDramaId 為 String

      // 新增 dramaId 欄位
      req.body.dramaId = String(newDramaId) ;  // 將 newDramaId 轉換為 String

      data.push(req.body);

      // 3. 再把 資料寫出去 sample2.json (同步處理)
      fs.writeFileSync("models/sample2.json", JSON.stringify(data) , "utf8");

      res.json({message : "ok."});
      //////////////


    } catch(err){
      console.log(err);
      res.status(500).json({ message : "系統有問題！"});
    };
  }
);

module.exports = router;