const express = require("express");
const router = express.Router();

const model = require("../models");  // require 為資料夾的話 , 預設會找 index.js

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 

// 取得 影集資料
// GET /dramas/list?type={}  
router.get("/list", async (req,res)=>{
  try{
    // 全部搜尋
    // let data = await model.dramas.find(); // 透過 model.dramas 物件去拉資料

    // 使用 type 做搜尋
    let condition = req.query.type === "全" ? {} : { "category" : req.query.type };
    let data = await model.dramas.find(condition);
    res.json({ result : data });
  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！" });
  };
});


// 新增 影集資料
// POST /dramas/data 
// payload : {category: 犯罪 , name: ZZZZ , score: 2.5}

// 修改 影集資料
// PUT /dramas/detail/:dramaId
// payload : { name: ABCDE , score: 5 }

// 刪除 影集資料
// DELETE /dramas/detail/:dramaId 

module.exports = router;