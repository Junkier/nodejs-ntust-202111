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

////////////////////////////
//// [Code] 以下開發 API
// 完成下列開發
// 1. 串接好 to-do-list 頁面
// 2. MongoDB 新增好 to-do-list 資料
// 3. 2組 API 之開發
//   1) GET /to-do-list/list
//   2) GET /to-do-list/detail/:to_do_id
////////////////////////////

module.exports = router;