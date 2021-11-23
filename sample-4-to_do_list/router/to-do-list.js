const express = require("express");

let router = express.Router();



router.get("/",(req,res,next)=>{
    res.render("to-do-list.html",{
        templateName : "jeff"
    });
});


module.exports = router;