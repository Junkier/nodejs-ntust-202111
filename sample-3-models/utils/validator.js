// 實名 Middleware 
let isTokenValid = (req,res,next) => {

    // token 是否存在
    if(!req.query.token){
        res.status(400).send("缺少 token");
        return;
    };

    // token 是否正確
    if(req.query.token !== "APTX4869"){
        res.status(400).send("token 錯誤!");
        return;
    };

    next();

};

let isTokenValidInHeaders = (req,res,next)=>{

     // token 是否存在
     if(!req.headers.token){
        res.status(400).send("缺少 token");
        return;
    };

    // token 是否正確
    if(req.headers.token !== "APTX4869"){
        res.status(400).send("token 錯誤!");
        return;
    };

    next();

};


let isUserLogined = (req,res,next)=>{
    if(!req.session.userInfo || !req.session.userInfo.isLogined){
        res.status(401).send("請先 <a href='/login'>登入</a> !!!");
        return;
    };

    next();
};

module.exports = {
    isTokenValid          : isTokenValid,
    isTokenValidInHeaders : isTokenValidInHeaders,
    isUserLogined         : isUserLogined
};