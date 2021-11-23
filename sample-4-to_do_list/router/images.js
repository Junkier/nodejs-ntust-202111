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


let isFileExist = (req,res,next)=>{
    if(!req.file) res.status(400).json({message:"Lacking of image files."});
    else next();
};



var router = express.Router();


// 照片取得
router.get("/",
    (req,res)=>{
        let to_do_id = req.query.to_do_id;
        model.toDoList
             .findOne({to_do_id},{to_do_id:1, attachments : 1})
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
    async (req,res)=>{

        // 1. 建立檔案 絕對路徑
        let file = path.join(__dirname,"../","application",req.body.src);

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
