const express = require("express");
let router    = express.Router();


router.get("/us",(req,res)=>{
    let name = req.session.userInfo.name;
    res.render("aboutus.html",{ templateName : name });
});

module.exports = router;