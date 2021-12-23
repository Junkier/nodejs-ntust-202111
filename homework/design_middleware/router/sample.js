const express = require('express');
const router = express.Router();

const authHelper = require("../utils/auth-helper");


router.get("/",(req,res)=>{
  res.send(`
    產生 jwt : <a href='/sample/create-token'> /sample/create-token </a>
    <br>
    解密 jwt : <a href='/sample/decode-token?token='> /sample/decode-token?token={你產生的 token} </a>
  `);
});



// [模擬1] 產生 jwt 
router.get("/create-token",

  // 1. 模擬資料 , 存入 req.data 
  (req,res,next)=>{
    req.data = {
      name : "jeff",
      age  : 18,
    }
    next();
  },  

  // 2. 使用 auth-helper.js 裡的 createToken middleware 加密出 jwt
  authHelper.createToken,

  // 3. 將 token 回傳給 end-user
  (req,res)=>{
    res.json({ 
      token : req.token ,
      hint  : "可嘗試連結 /sample/decode-token?token=${token} , 記得把 token 帶上！" 
    });
  }
);


// [模擬2] 解密 jwt , 讀取資料
router.get("/decode-token",
  // 1. 檢查 token 是否有攜帶
  (req,res,next)=>{
    if(!req.query.token) res.status(401).json({ message : "token 人呢 =.=" });
    else next();
  },
  // 2. 使用 auth-helper.js 裡的 decodeToken middleware 解密出資料 , 並存入 req.user 上
  authHelper.decodeToken,

  // 3. 將解密的資料 , 回傳給 end-user
  (req,res)=>{
    let data = req.user;
    res.json({ 
      data ,
      hint  : "此即為解密的用法 , 細節可參考 /utils/auth-helper.js 的程式～" 
    });
  }
); 


module.exports = router;
