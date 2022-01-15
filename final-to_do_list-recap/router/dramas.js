const express = require("express");
const model   = require("../models");

let router    = express.Router();

router.get("/page",
    (req,res)=>{
        let name = req.session.userInfo.name;
        res.render("dramas.html",{ templateName : name });
    }
);


router.get("/list",
    (req,res)=>{
        let category = req.query.type;
        let query    = (category && category !== "全") ? { category } : {};
        model.dramas
             .find(query,{_id : 0 , __v : 0})
             .then(result=>{
                 res.json({result});
             })
             .catch(err=>{
                 res.status(500).json({message:"Server internal fault."});
             });
    }
);


router.post("/detail",
    (req,res)=>{
        model.dramas
        
            ////// 和下方邏輯相同 
            //  .find({},{"dramaId":1})
            //  .sort({"dramaId":-1})
            //  .limit(1)
            //////
             .findOne({},{"dramaId":1})
             .sort({"dramaId":-1})
            //////
            
             .then(ele=>{
                let newDramaId      = Number(ele.dramaId) + 1 ;
                req.body["dramaId"] = String(newDramaId);
                return model.dramas.create(req.body);
             })
             .then(result=>{
                 res.json({message:"ok."});
             })
             .catch(err=>{
                 console.log(err);
                 res.status(500).json({message:"Server internal fault."});
             });
    }
);



module.exports = router;