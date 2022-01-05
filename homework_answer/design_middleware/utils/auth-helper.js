const jwt         = require('jsonwebtoken');

const jwtSecret    = require("../config/config").jwtSecret;
const jwtOptions   = require("../config/config").jwtOptions;
const jwtExpTime   = require("../config/config").jwtExpTime;


// [注意！！！] 請將 user 的資訊 , 放在 req.data 裡
// 方便 createToken 加密在 jwt 之中
exports.createToken = (req,res,next)=>{

    let payload = {
        data: req.data,  // jwt 解密後可取得資料  
        exp:( Math.floor(Date.now() / 1000) + (jwtExpTime)),  
        iat:( Math.floor(Date.now() / 1000) - 10)
    };

    // 此為 jwt 字串 
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY291bnQiOiJqZWZmIiwicGFzc3dkIjoidGVzdHFxIiwibGV2ZWwiOjJ9LCJleHAiOjE2NDExOTc2OTgsImlhdCI6MTY0MTE5NDA4OH0.5tzE6VGNdQrAlRoz6yQvJHihPBdo4IMiOWtrciq-MNQ

    // 將 jwt 加密
    jwt.sign(payload , jwtSecret , jwtOptions , (err,token)=>{
        if(err){
            console.error(err);
            res.status(500).json({ "message": "Server Internal Error."});
            return;
        };
        req.token = token;
        next();
    });

};

exports.decodeToken = (req,res,next) => {
    // 預期前端使用 query_string 方式攜帶 jwt
    let token = req.query.token;

    // 將 jwt 解密
    jwt.verify(token, jwtSecret, jwtOptions, (err, decoded)=> {
        if(err){
            console.error(err);
            res.status(400).json({message : "該 token 無效!"});
            return;
        };

        // 解密的資料 , 存入 req.user 上
        req.user = decoded.data;

        next();
    });
};

// 檢查 token 是否有攜帶
exports.isTokenExist = (req,res,next)=>{
    if(!req.query.token){
        res.status(401).json({message : "缺少 token!"});
        return;
    };
    next();
};