const express = require("express");
const router = express.Router();

const authHelper = require("../utils/auth-helper");

const USERS = require("../users").USERS;
// console.log(USERS);

router.post("/",
  // 1. 檢查 payload 是否有 account & passwd 
  (req,res,next)=>{
    if(!req.body.account || !req.body.passwd){
      res.status(400).json({ 
        message : "payload 缺少 account & passwd"
      });
      return;
    };

    next();
  }, 
  // 2. 檢查 account & passwd 和 USERS 資料是否一致
  (req,res,next)=>{
    let account = req.body.account;
    let passwd  = req.body.passwd;

    // USERS[account] --> 檢查 account 是否存在
    // USERS[account]["passwd"] === passwd --> 檢查 passwd 是否和前端傳來的一致
    if(!USERS[account] || USERS[account]["passwd"] !== passwd){
      res.status(400).json({
        message : "account or passwd 錯誤"
      });
      return;
    };

    // 送入 createToken Middleware 
    req.data = USERS[account];

    next();
  },
  // 3. 產生 token 
  authHelper.createToken,
  // 4. res 回去給前端
  (req,res)=>{
    // 可取得 req.token 

    res.json({
      token : req.token
    });
    // res.send(" /auth API !!!");
  }
);

module.exports = router;