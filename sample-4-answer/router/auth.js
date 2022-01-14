const express = require("express");
const model   = require("../models");

let router    = express.Router();

let isAccountAndPasswdExist = (req,res,next)=>{
    if(!req.body.account || !req.body.passwd){
        res.status(400).json({ message : "帳號或密碼 欄位有遺漏 !"});
        return;
    };

    next();

};

let isUserValid = async (req,res,next) => {
    try{
        let r = await model.members
                           .findOne({
                                account : req.body.account,
                                passwd  : req.body.passwd
                           });
        if(!r){
            res.status(400).json({ message : "帳號或密碼 有誤 !"});
            return;
        };
        next();

    } catch(err){
        console.error(err);
        res.status(500).json({message:"Server internal fault."});
    };
};


let setUserInfo = (req,res,next)=>{
    req.session.userInfo = {
        name : "jeff",
        isLogined : true
    };

    next();
};



// POST /auth
router.post("/",

    // 1. 檢查 account / passwd 是否存在
    isAccountAndPasswdExist,

    // 2. 檢查 account / passwd (使用者資訊) 是否有效
    isUserValid,

    // 3. 設定 user info on session
    setUserInfo,
    
    (req,res)=>{
        // console.log(req.body);
        res.json({
            message : "ok. 您現在可存取 API.",
            redirect: "/"
        });
    }
);

module.exports = router;




