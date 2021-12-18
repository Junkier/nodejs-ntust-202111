const express = require("express");
const router = express.Router();

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 

module.exports = router;