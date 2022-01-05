const express = require("express");
const fs = require("fs");
const authHelper = require("../utils/auth-helper");

const router = express.Router();

let readFilePromise = (dataPath)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(dataPath,"utf8",(err,data)=>{
      if(err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

router.use(
  authHelper.isTokenExist,  // 1. 檢查 token 是否有攜帶
  authHelper.decodeToken,   // 2. Decode token
);

// GET /members/all
router.get("/all",
  // 1. 檢查 token 是否有攜帶
  // authHelper.isTokenExist,
  // 2. Decode token
  // authHelper.decodeToken,
  // 3. 取得 models/data.json 資料並回傳
  async (req,res)=>{
    try{
      
      console.log(req.user);

      let data = await readFilePromise("./models/data.json");
      res.json(data);
    } catch(err){
      console.log(err);
      res.status(500).json({ message : "Server 端發生錯誤！" });
    };
  // res.send(" /members API !!!");
  }
);

// GET /members?memNo={memNo}
router.get("/",
  // 1. 檢查 token 是否有攜帶
  // authHelper.isTokenExist,
  // 2. Decode token 
  // authHelper.decodeToken,
  // 3. 檢查 memNo 是否有攜帶
  (req,res,next)=>{
    if(!req.query.memNo){
      res.status(400).json({ message : "memNo 不可為空！"});
      return;
    };
    next();
  },
  // 4. 取得 特定 memNo 資料
  async (req,res)=>{
    try{
      let data = await readFilePromise("./models/data.json");
      // data -> { "10001" : {...} , "10002" : {...} , ... , "10005" : {...} }

      if(!data[req.query.memNo]){
        res.status(404).json({message : "Not Found"});
        return;
      };

      res.json(data[req.query.memNo]);
    } catch(err){
      console.log(err);
      res.status(500).json({ message : "Server 端發生錯誤！" });
    };
  }
);


// POST /members
router.post("/",
  // 1. 檢查 req.user.level 是否有權限
  (req,res,next)=>{
    if(req.user.level !== 2){
      res.status(403).json({ message : "Forbidden"});
      return;
    };
    next();
  },
  // 2. 檢查 payload 欄位是否正確
  (req,res,next)=>{
    if(!req.body.name || !req.body.gender || !req.body.age){
      res.status(400).json({ message : "payload 資料格式有誤！"});
      return;
    };
    next();
  },
  // 3. 新增一筆資料到 data.json 上
  async (req,res)=>{
    try{
      let data = await readFilePromise("./models/data.json");
      // data -> { "10001" : {...} , "10002" : {...} , ... , "10005" : {...} }

      // 取得最新的 memNo
      let latestMemNo =  Object.keys(data)
                               .map( key => Number(key))
                               .sort((a,b) => b-a)[0];
      let newMemNo = latestMemNo + 1;

      // 修改 data 資料 , 並存入到 data.json 中
      data[newMemNo] = req.body;

      fs.writeFileSync("./models/data.json" , JSON.stringify(data) , "utf8");

      res.json({
        message : "ok",
        memNo   : String(newMemNo)
      });
    } catch(err){
      console.log(err);
      res.status(500).json({ message : "Server 端發生錯誤！" });
    };
  },
);


module.exports = router;