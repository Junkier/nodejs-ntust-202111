const express = require("express");
const router = express.Router();

const model = require("../models");  // require 為資料夾的話 , 預設會找 index.js
// console.log(model);

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
// POST /dramas/detail 
// payload : {category: 犯罪 , name: ZZZZ , score: 2.5}
router.post("/detail", async (req,res)=>{
  try{
    // 1. 取得最新的 dramaId 
    let lastElement = await model.dramas.findOne({} , { dramaId : 1})
                                        .sort({ dramaId : -1 }) // 透過 dramaId 大 -> 小 排序

    let newestDramaId = Number(lastElement["dramaId"]) + 1;
    req.body["dramaId"] = String(newestDramaId);  // 在 req.body 上 , 新增 dramaId
    
    // 2. 新增資料 -> model.drama.create()
    let result = await model.dramas.create(req.body);
    console.log("新增的資料 :" , result);

    res.json({ message : "ok." }); 
  } catch(err) {
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！" });
  };
});


// 修改 影集資料
// PUT /dramas/detail/:dramaId
// payload : { name: ABCDE , score: 5 }
router.put("/detail/:dramaId", async (req,res)=>{
   try{
     let dramaId = req.params.dramaId;
     console.log( { dramaId } );  // 解構

     let result = await model.dramas.updateOne(
          { dramaId } , 
          { "$set" : { name : req.body.name , score : req.body.score } }
        );

      console.log("修改結果 :" , result);
      res.json({ message : "ok."});
  } catch(err) {
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！" });
  };
});


// 刪除 影集資料
// DELETE /dramas/detail/:dramaId 
router.delete("/detail/:dramaId", async (req,res)=>{
  try{
    let dramaId = req.params.dramaId;
    let result  = await model.dramas.deleteOne({ dramaId });

    console.log("刪除結果 :",result);
    res.json({ message : "ok." });
  }catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！" });
  };
});

module.exports = router;