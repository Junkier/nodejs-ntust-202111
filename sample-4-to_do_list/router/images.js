const express = require("express");
const uuid    = require('uuid/v1');

const fs     = require("fs");
const path   = require("path");
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 6 * 1024 * 1024 // no larger than 6mb
    }
});

const model   = require("../models");

const { isToDoIdInQuery } = require("../utils");


let isFileExist = (req,res,next)=>{
    if(!req.file) res.status(400).json({message:"缺少 images 檔案！"});
    else next();
};


let isToDoIdInBody = (req,res,next)=>{
    if(!req.body.to_do_id) res.status(400).json({message:"body 缺少 to_do_id 參數！"});
    else next();
};


var router = express.Router();

// 目前不放入 swagger 中！！！

// 照片取得
router.get("/",
    isToDoIdInQuery,    
    (req,res)=>{
        let to_do_id = req.query.to_do_id;
        model.toDoList
             .findOne({to_do_id},{to_do_id:1, attachments : 1 , _id :0})
             .then(result=>{
                res.json({result});
             })
             .catch(err=>{
                console.error(err);
                res.status(500).json({message:"Server internal fault."});
             });

    }
);


// 照片上傳
router.post("/",
    isToDoIdInQuery,
    multer.single("attachment"),
    isFileExist,
    async (req,res,next)=>{

        // 1. 產生 file 檔名
        let randomFactor = uuid().replace(/-/g,"");
        let fileType     = req.file.mimetype.match(/^(image|application)\/(.*)/)[2];

        let fileName     = `${randomFactor}.${fileType}`;


        // 2. 照片落地到 application/images 資料夾
        await fs.writeFileSync(path.join(path.dirname(__dirname),`application/images/${fileName}`),req.file.buffer);

        req.fileName = fileName;

        // 3. 回覆 end-user 上傳完成
        res.json({message:"ok",fileName});

        // 4. 進行下一段 middleware 
        next();
    },
    async (req,res)=>{
        let to_do_id = req.query.to_do_id;
        let index    = req.query.index;

        if(!index){
            let result = await model.toDoList.findOne({ to_do_id, },{ attachments : 1});

            let rawIndexs = result.attachments.map((v,i)=>({v,i}))
                                       .filter(ele=>!ele.v);

            index = rawIndexs.length >0 ? rawIndexs[0].i : 1;
        };


        // 5. 照片路徑更新至 mongoDB 
        // edit mode
        await model.toDoList.updateOne({
            to_do_id,
        },{$set:{
            [`attachments.${index}`] : req.fileName
        }});

    }
);


// 照片刪除
router.delete("/",
    isToDoIdInBody,
    async (req,res)=>{

        // 1. 建立檔案 絕對路徑
        let src = req.body.src || "images";
        let file = path.join(__dirname,"../","application",src);

        // 2. 移除 application 裡的照片檔案
        if(fs.existsSync(file)) fs.unlinkSync(file);


        // 3. MongoDB 照片路徑更新成 null 
        let to_do_id = req.body.to_do_id;
        await model.toDoList.updateOne(
            { to_do_id  },
            { $set:{  [`attachments.${req.body.index}`] : null  }}
        );

        // 4. 回覆 end-user 刪除完成
        res.json({message:"ok."});
    }
);


module.exports = router;
