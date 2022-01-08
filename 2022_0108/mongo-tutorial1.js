//// 初步教學


// .insertMany 
// 將 sample-3-models/sample-data/sample2.json 塞入
db.getCollection('mongo-tutorial').insertMany([{
    "dramaId" : "1001",
    "category" : "犯罪",
    "name" : "絕命毒師",
    "score" : 10.0
}, ... ]);
// 總共有 7 筆

////////////////////////////////////////////////////////////

// .insert 新增一筆資料
db.getCollection('mongo-tutorial').insert( { "today" : "星期六" , "weather" : "sunny"} )

// .find 查看 全部資料
db.getCollection('mongo-tutorial').find({})

// 有條件的 .find(condition)
// ex1: category="政治"
db.getCollection('mongo-tutorial').find({ "category" : "政治"})

// ex2: category="政治" && score=9.5
db.getCollection('mongo-tutorial').find({ "category" : "政治" , "score" : 9.5 })


// ex3: category="政治" && score > 9.5
db.getCollection('mongo-tutorial').find({  
  "category" : "政治" ,
  "score" : {
    "$gt" : 9.5      // > 9.5
    // "$gte" : 9.5  // >= 9.5 
  }
})
  
