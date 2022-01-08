////// 初步教學
//// 新增 (insert)

// .insertMany 
// 將 sample-3-models/sample-data/sample2.json 塞入
db.getCollection('mongo-tutorial').insertMany([{
    "dramaId" : "1001",
    "category" : "犯罪",
    "name" : "絕命毒師",
    "score" : 10.0
}, ... ]);
// 總共有 7 筆

// .insert 新增一筆資料
db.getCollection('mongo-tutorial').insert( { "today" : "星期六" , "weather" : "sunny"} )

// .find 查看 全部資料
db.getCollection('mongo-tutorial').find({})

////////////////////////////////////////////////////////////
//// 查詢 (find)

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
////////////////////////////////////////////////////////////
//// 更新 (update)
// ex1: 更新 _id=1234567 的資料 , 欄位為 score=8.1 , category=其他_QQQQ
db.getCollection('mongo-tutorial').updateOne(
    { "_id"  : "1234567" } , 
    { "$set" : {
         "score" :8.1,
         "category" : "其他_QQQQ"  
      } 
    } 
)

// ex2: 更新 category=政治 多組資料 , 欄位為 age=100 , math_score=123 , message=卡卡的
db.getCollection('mongo-tutorial').updateMany(
    { "category"  : "政治" } , 
    { "$set" : {
         "age" : 100,
         "math_score" : 123,
         "message" : "卡卡的~"
      } 
    } 
)

// 有欄位 -> update value 值 ; 沒有欄位 -> 新增 key-value pair 

////////////////////////////////////////////////////////////
//// 刪除 (delete)
// ex1: 刪除一筆
db.getCollection('mongo-tutorial').deleteOne({ "name" : "Keven" })

// ex2: 刪除多筆
db.getCollection('mongo-tutorial').deleteMany({ "name" : "Keven" })


////////////////////////////////////////////////////////////
// [Bonus]
// find score > 8 && score <=9 的資料
db.getCollection('mongo-tutorial').find({
    "score" : {
       "$gt" : 8,
       "$lte" : 9    
    }
})



//// 小試身手#3 
// 1.  建立 tutorial-2 的 collection , 將 sample3.json 資料打入
db.getCollection('tutorial-2').insertMany([{
    "dramaId" : "1001",
    "category" : "犯罪",
    "name" : "絕命毒師",
    "score" : 10.0
},
{
    "dramaId" : "1002",
    "category" : "殭屍",
    "name" : "屍戰朝鮮",
    "score" : 9.0
},
...
])

// 2. find score >=8 && category=政治
//    顯示 {name,dramaId} 欄位
db.getCollection('tutorial-2').find(
  {
    "score" : {
      "$gte" : 8   
    },
    "category" : "政治"
  },
  {
     "name" : 1 ,
     "dramaId" : 1 , 
     "_id" : 0
  }
)

// 3. update category=犯罪 資料 => 新增 remark="good!"
db.getCollection('tutorial-2').updateMany(
    { "category" : "犯罪"} , 
    { "$set" : { "remark" : "good!" } }
)

// 4. delete name in ["QQQQ","SSS","ABCD"] 的資料 
db.getCollection('tutorial-2').deleteMany({ 
    "name" : {
      "$in" : ["QQQQ","SSS","ABCD"]    
    }
})