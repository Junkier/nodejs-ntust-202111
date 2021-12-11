////// 非同步 處理機制
const fs = require("fs");

// Sync.
let d1 = fs.readFileSync("models/data1.json","utf8");    // 同步 , 執行完才往下
console.log("d1 完成！！！");
let d2 = fs.readFileSync("models/data2.json","utf8");    // 同步 , 執行完才往下
console.log("d2 完成！！！");
let d3 = fs.readFile("models/data3.json","utf8",()=>{}); // 非同步 , d3 為 undefined
console.log("d3 完成！！！");

console.log(JSON.parse(d1));
console.log(JSON.parse(d2));
console.log(JSON.parse(d3));
