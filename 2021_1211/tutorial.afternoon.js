////// 非同步 處理機制
// 處理讀取檔案
const fs = require("fs");

// 1. 使用 readFileSync 
// let d1 = fs.readFileSync("models/data1.json","utf8");    // 同步 , 執行完才往下
// console.log("d1 完成！！！");
// let d2 = fs.readFileSync("models/data2.json","utf8");    // 同步 , 執行完才往下
// console.log("d2 完成！！！");
// let d3 = fs.readFile("models/data3.json","utf8",()=>{}); // 非同步 , d3 為 undefined
// console.log("d3 完成！！！");

// console.log(JSON.parse(d1));
// console.log(JSON.parse(d2));
// console.log(JSON.parse(d3));

////////////////////////////////////////////////////////////////////////
// 2. 使用 Promise 
// 1) 宣告 Promise 
let readFilePromise = (dataPath)=>{
  return new Promise( (resolve,reject)=>{
    fs.readFile(dataPath , "utf8" , (err,data)=>{  
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(data));
      };
    });
  }) ;
};


// 2) 使用 Promise
readFilePromise("./models/data12345.json")
  .then(result=>{
    console.log("我是 .then 區 ~~~");
    console.log(result);
  })
  .catch(err =>{
    console.log("我是 .catch 區！！！")
    console.log(err);
  });


