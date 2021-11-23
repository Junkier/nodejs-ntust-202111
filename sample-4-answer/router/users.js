const express = require("express");
const model   = require("../models");

const logger = require("log4js").getLogger("Users");

let router    = express.Router();

let isAccountAndPasswdExist = (req,res,next)=>{
    if(!req.body.account || !req.body.passwd){
        res.status(400).json({ message : "帳號或密碼 欄位有遺漏 !" });
        return;
    };

    next();

};


// POST /auth
router.post("/",
    isAccountAndPasswdExist,
    async (req,res,next)=>{
        try{
            let r = await model.members.findOne({
                account : req.body.account
            });

            if(r) return res.status(400).json({
                message : "該帳號已存在！",
            });

            next();

        } catch (err) {
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };

    },
    async (req,res)=>{
        try{
            let r = await model.members.create({
                account : req.body.account,
                passwd  : req.body.passwd
            });

            logger.info(`Creating new user : ${req.body.account}`)

            res.json({
                message : "ok! 您現在可使用該帳號登入.",
            });


        } catch (err) {
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);

module.exports = router;




