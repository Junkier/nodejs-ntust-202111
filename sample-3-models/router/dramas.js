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



//// 以下為 sample3 新加入
router.get("/detail/:dramaId",
    (req,res)=>{
        model.dramas
             .findOne({dramaId : req.params.dramaId })
             .then(result=>{
                 res.json({result});
             })
             .catch(err=>{
                 res.status(500).json({message:"Server internal fault."});
             });
    }
);


router.put("/detail/:dramaId",
    (req,res)=>{
        let payload = {
            name  : req.body.name , 
            score : req.body.score
        };

        model.dramas.updateOne({dramaId : req.params.dramaId },{ "$set" : payload })
            .then(result=>{
                res.json({message : "ok."});
            })
            .catch(err=>{
                res.status(500).json({message:"Server internal fault."});
            });
    }
);


router.delete("/detail/:dramaId",
    (req,res)=>{
        model.dramas
             .deleteOne({dramaId : req.params.dramaId })
             .then(result=>{
                res.json({message : "ok."});
             })
             .catch(err=>{
                res.status(500).json({message:"Server internal fault."});
             });
    }
);


module.exports = router;