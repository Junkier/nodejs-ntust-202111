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


// 一定要 module.exports 出去 
module.exports = {
    "isTokenExist" : isTokenExist, // value 為 middleware 本人 
    "isTokenValid" : isTokenValid  
};
