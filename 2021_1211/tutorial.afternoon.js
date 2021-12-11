////// 非同步 處理機制
// 處理讀取檔案
const fs = require("fs");

//// 1. 使用 readFileSync 
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
//// 2. 使用 Promise 
// 1) 宣告 Promise 
let readFilePromise = (dataPath)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(dataPath , "utf8" , (err,data)=>{  
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(data));
      };
    });
  });
};

// 2) 使用 Promise
readFilePromise("./models/data1.json")
  .then(result=>{
    console.log("我是 .then 區 ~~~");
    console.log(result);
  })
  .catch(err =>{
    console.log("我是 .catch 區！！！")
    console.log(err);
  });



console.log("-".repeat(50));

//// Promise 特性
// flipCoin function
let flipCoin = ()=>{
  return new Promise( (resolve,reject)=>{
    // 延遲時間 執行 , 以毫秒 (ms) 為單位 
    setTimeout(()=>{
      if(Math.random() >0.5){
        resolve("上課囉！！！");
      }else{
        reject("翹課 -.-");
      }
    } , 500);
  });
};

// 使用 .then / .catch 
// 處理 "成功" / "失敗" 狀態
// flipCoin()
//   .then(result=>{
//     console.log("我是 flipCoin 的 .then 區～");
//     console.log(result);
//   })
//   .catch(err=>{
//     console.log("我是 flipCoin 的 .catch 區!!!");
//     console.log(err);
//   });

// .then 可多接幾段 , 並用 return 往下傳值
flipCoin()
  .then(result=>{
    console.log("我是 flipCoin 的 .then 區～");
    console.log(result);
  })
  .then(r2=>{
    console.log("r2 :",r2);
    console.log("這是第二個！！！");
    return "ABCD";
  })
  .then(r3=>{
    console.log("r3 :",r3);
    console.log("這是第三個！！！");
  })
  .then(r4=>{
    console.log("這是第四個！！！");
  })
  .catch(err=>{
    console.log("我是 flipCoin 的 .catch 區!!!");
    console.log(err);
  });


