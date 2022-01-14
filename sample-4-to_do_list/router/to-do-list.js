const express = require("express");
var router = express.Router();

// to-do-list 清單頁面
router.get("/page/list",
    (req,res)=>{
        res.render("to-do-list.html",{ 
            templateName : req.session ? req.session.userInfo.name : ""
        });
    }
);

// to-do-list 細節頁面 
router.get("/page/detail",
    (req,res)=>{
        res.render("to-do-detail.html",{
            templateName : req.session ? req.session.userInfo.name : ""
        });
    }
);

//// [Code] 以下開發 API


module.exports = router;