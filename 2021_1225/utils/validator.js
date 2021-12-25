// 1. 檢查 headers 是否有 token (M1)
let isTokenExist = (req,res,next) => {
  // 檢查 headers --> req.headers
  // console.log(req.headers);
  if(!req.headers["x-jeff-token"] ){
    console.log("[M1] 無 token !!!");
    res.status(400).json({ message : "token 人呢！？！？！？"});
  }else{
    next();
  };
};

// 2. 檢查 token 值是否正確 (M2)
let isTokenValid = (req,res,next) => {
  if(req.headers["x-jeff-token"] !== "APTX4869"){
    console.log("[M2] token 錯誤！！！");
    // status_code=403 --> 無權限 (Forbidden.)
    res.status(403).json({ message : "您沒有權限！"});
  }else{
    next();
  };
};

// 1. 檢查 account / passwd 是否存在
let isAccountAndPasswdExist = (req,res,next) => {
  // 檢查 payload (Form data , req.body)
  if(!req.body.account || !req.body.passwd){  // 若 account or passwd 不存在
    res.status(400).json({ message : "帳號 or 密碼 缺少！"});
  }else{
    next();
  };
};

// 2. 再 檢查 account / passwd 是否和 server 端一致
let isUserValid = (req,res,next) =>{
  // 若 account && passwd 和 server 端一致
  if( !(req.body.account === "jeff" && req.body.passwd === "testqq") ) {   
    res.status(400).json({ message : "帳號 or 密碼 錯誤!"});
  }else{
    next();
  };
};


// 一定要 module.exports 出去 
module.exports = {
    "isTokenExist" : isTokenExist, // value 為 middleware 本人 
    "isTokenValid" : isTokenValid,
    "isAccountAndPasswdExist" : isAccountAndPasswdExist,
    "isUserValid" : isUserValid
};
