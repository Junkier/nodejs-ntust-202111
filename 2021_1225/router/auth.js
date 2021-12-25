const express = require("express");
const router = express.Router();

const validator = require("../utils/validator");

router.post("/",
  // 1. 檢查 account / passwd 是否存在
  validator.isAccountAndPasswdExist,

  // 2. 再 檢查 account / passwd 是否和 server 端一致
  validator.isUserValid,

  // 3. 紀錄資料在 session 上面
  validator.setSessionInfo,

  // 4. response 回應前端
  (req,res,next)=>{

    res.json({ message : "ok." });
    // res.json({message : "接到 requests , 等待開發～～～"});
  }
);


module.exports = router;