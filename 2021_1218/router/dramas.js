const express = require("express");
const router = express.Router();

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 


// GET /dramas/getDramaListData 
router.get("/getDramaListData" , (req,res)=>{
  res.json({ message : "嗨嗨～～～"});
});

module.exports = router;