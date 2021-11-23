const express = require("express");
let router    = express.Router();



let isUserLogined = (req,res,next)=>{
    if(!req.session.userInfo || !req.session.userInfo.isLogined){
        res.status(401).send("請先 <a href='/login'>登入</a> !");
        return;
    }
    next();
}


router.use(isUserLogined);


router.get("/us",(req,res)=>{
    res.render("aboutus.html");
});

module.exports = router;