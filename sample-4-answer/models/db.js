const mongoose = require('mongoose');

const host = process.env.MONGODB_HOST || "localhost";

const connConfig = `mongodb://${host}:27017/tutorial` ;

const logger = require("log4js").getLogger("DB");


const conn = mongoose.createConnection(connConfig,{ 
    maxPoolSize: 5 ,   // 最多同時建立 5 個連線
    useNewUrlParser: true ,   // mongoose 新加參數 , 使用 new parser 解析 connConfig 
    useUnifiedTopology: true, // 串接成 cluster 時 , 使用 new discover & topology 技術
});


// Testing conn.
conn.on('connected', function(){
    logger.info("MongoDB is connected.");
});

conn.on('error', function(err){
    logger.error("MongoDB conn gets error.");
});

module.exports = conn;

