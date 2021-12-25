const express = require("express");
const router = express.Router();

router.post("/",(req,res,next)=>{
  res.json({message : "接到 requests , 等待開發～～～"});
});


module.exports = router;