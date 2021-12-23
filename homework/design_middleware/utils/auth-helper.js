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

    // 將 jwt 加密
    jwt.sign(payload , jwtSecret , jwtOptions , (err,token)=>{
        if(err){
            console.error(err);
            res.status(500).json({ "message": "Server Internal Error."});
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
