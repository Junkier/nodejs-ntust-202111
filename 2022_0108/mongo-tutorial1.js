//// 初步教學


// .insertMany 
// 將 sample-3-models/sample-data/sample2.json 塞入
db.getCollection('mongo-tutorial').insertMany([{
    "dramaId" : "1001",
    "category" : "犯罪",
    "name" : "絕命毒師",
    "score" : 10.0
},... ]);

// .find 查看資料
db.getCollection('mongo-tutorial').find({})