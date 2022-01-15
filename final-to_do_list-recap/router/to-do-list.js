const express = require("express");
var router = express.Router();

const model = require("../models");

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
// V 1. 串接好 to-do-list 頁面
// V 2. MongoDB 新增好 to-do-list 資料
// V 3. 2組 API 之開發
//   Ｖ 1) GET /to-do-list/list
//   V 2) GET /to-do-list/detail/:to_do_id
////////////////////////////
router.get("/list", async (req,res)=>{
    try{
        let result = await model.toDoList.find( {} , {
                    to_do_id: 1, subject: 1,
                    reserved_time: 1, brief: 1,
                    level: 1, author: 1 , _id: 0
                });
        res.json({ result });
    } catch(err){
        console.log(err);
        res.status(500).json({ message : "Server internal fault." });
    };
});

router.get("/detail/:to_do_id", async (req,res)=>{
    try{
        // 駝峰式 命名 --> ex: mathTeacherName 
        // 底線式 命名 --> ex: math_teacher_name 
        let toDoId = req.params.to_do_id;
        let result = await model.toDoList.findOne({ "to_do_id" : toDoId});
        res.json({ result });
    } catch(err){
        console.log(err);
        res.status(500).json({ message : "Server internal fault." });
    };
});


module.exports = router;