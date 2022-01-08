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
db.getCollection('mongo-tutorial').find({ "category" : "政治" })

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

// ex4: score <= 9.5
db.getCollection('mongo-tutorial').find({  
    "score" : {  
         //"$lt" : 9.5  
         "$lte" : 9.5   
    }    
})

// ex5: 找到 age 欄位存在的資料
db.getCollection('mongo-tutorial').find({  
    "age" : { 
        "$exists" :  true
     }
})

// ex6: today 欄位'不存在' && category=政治 && score >=9.4 
db.getCollection('mongo-tutorial').find({  
     "today" : { 
        "$exists" :  false
     },
     "category" : "政治",
     "score" : {
        "$gte" : 9.4    
     }
})
  
// ex7: 搜尋全部 + 顯示 {category , name} 欄位 , _id 不顯示
// ==>  .find(條件 , 欄位顯示)
db.getCollection('mongo-tutorial').find( {} ,  { "category" : 1 , "name" : 1 , "_id" : 0 }  )

////////////////////////////////////////////////////////////

// {
//   // "_id" -> primary_key (主鍵) , 可由 MongoDB 自動產生 ,
//   // 也可以自行建立
//     "_id" : ObjectId("61d92d5fdb5049d56e3bbdeb"),   
//     "dramaId" : "1002",
//     "category" : "殭屍",
//     "name" : "屍戰朝鮮",
//     "score" : 9.0
// }