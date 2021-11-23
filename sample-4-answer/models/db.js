const mongoose = require('mongoose');

const host = process.env.MONGODB_HOST || "test_mongo";

const connConfig = `mongodb://${host}:27017/tutorial` ;

const logger = require("log4js").getLogger("DB");


const conn = mongoose.createConnection(connConfig,{ 
    poolSize: 5 , 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
});


// Testing conn.
conn.on('connected', function(){
    logger.info("MongoDB is connected.");
});

conn.on('error', function(err){
    logger.error("MongoDB conn gets error.");
});

module.exports = conn;

