const express = require("express");
const fs = require("fs");
const router = express.Router();

let readFilePromise = (dataPath)=>{
  return new Promise( (resolve , reject) =>{
    fs.readFile(dataPath,"utf8" , (err,data)=>{
      if(err) reject(err);
      else resolve( JSON.parse(data) );
    });
  });
};

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 


// GET /dramas/getDramaListData 
router.get("/getDramaListData" , async (req,res)=>{
  // res.json({ message : "嗨嗨～～～"});

  //// 純 讀取 models/sample2.json  , response 給前端
  // try {
  //   let data = await readFilePromise("models/sample2.json");
  //   res.json({ result : data });
  // } catch (err){
  //   res.status(500).json({ message: "系統有問題！"});
  // };


  //// 讀取 models/sample2.json  
  //// 再透過 type 過濾資料 , 最後 response 給前端
  try {
    let data = await readFilePromise("models/sample2.json");
    let type = req.query.type;

    // console.log(testJJJJ);
    // console.log(data);
    // console.log(type);

    // 過濾資料
    if( type === "全"){
      res.json({ result : data });
    }else{
      let filteredData = data.filter( ele => ele["category"] === type );
      res.json({ result : filteredData });
    };

  } catch (err){
    console.log(err);
    res.status(500).json({ message: "系統有問題！"});
  };
});

module.exports = router;