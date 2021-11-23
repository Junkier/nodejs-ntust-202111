let isUserLogined = (req,res,next)=>{
    if(!req.session.userInfo || !req.session.userInfo.isLogined){
        res.status(401).json({
            message : "請先登入!"
        });
        return;
    }
    next();
};


let isToDoIdInQuery = (req,res,next)=>{
    if(!req.query.to_do_id) res.status(400).json({message:"query_string 缺少 to_do_id 參數！"});
    else next();
};



module.exports = {
    isUserLogined,
    isToDoIdInQuery
};