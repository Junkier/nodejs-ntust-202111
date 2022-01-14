const express = require("express");
const model   = require("../models");

const logger = require("log4js").getLogger("ToDoList");

var router = express.Router();

// to-do-list 清單頁面
router.get("/page/list",
    (req,res)=>{
        res.render("to-do-list.html",{ 
            templateName : req.session.userInfo.name 
        });
    }
);

// to-do-list 細節頁面 
router.get("/page/detail",
    (req,res)=>{
        res.render("to-do-detail.html",{
            templateName : req.session.userInfo.name,
        });
    }
);


// to-do-list 清單資料
router.get("/list",
    async (req,res)=>{
        try{
            let result = await model.toDoList
                                    .find({},{content:0, modified_time:0 ,_id:0 , attachments:0});
            res.json({result});                   
        } catch(err){
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);




// to-do-list 細節資料
router.get("/detail/:to_do_id",
    async (req,res)=>{
        try{
            let result = await model.toDoList
                                    .findOne({to_do_id : req.params.to_do_id},{"_id":0})
            res.json({result});                   
        } catch(err){
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);


//  新增/更新  該待辦事項
router.post("/detail/:to_do_id",
    async (req,res)=>{
        try{
            let result = await model.toDoList
                                    .updateOne(
                                        { to_do_id : req.params.to_do_id },
                                        { "$set"   : req.body },
                                        { upsert : true }
                                    );
            let affectedRows = result.upserted ? 1 : result.nModified;
            res.json({
                message : "ok." , 
                affectedRows
            });                 
        } catch(err){
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);


// 刪除  該待辦事項
router.delete("/detail/:to_do_id",
    async (req,res)=>{
        try{
            let result = await model.toDoList
                                    .deleteOne(
                                        { to_do_id : req.params.to_do_id },
                                    );
            let affectedRows = result.deletedCount;
            res.json({
                message : "ok.",
                affectedRows
            });             
        } catch(err){
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);  


// 取得最新的 to_do_id 
router.get("/the-newest-id",
    async (req,res)=>{
        try{
            let ele = await model.toDoList
                                    .findOne({},{to_do_id:1})
                                    .sort({to_do_id:-1});
            let lastToDoId = ele.to_do_id;
            let newToDoId = Number(lastToDoId) + 1;
    
            res.json({ result : newToDoId});        
        } catch(err){
            logger.error(err);
            res.status(500).json({message:"Server internal fault."});
        };
    }
);


module.exports = router;