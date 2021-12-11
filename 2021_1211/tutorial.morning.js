////// 回家試身手
// 1.
for(let i = 0 ; i < 11 ; i++){
  // console.log(i);
  // if(i<6){
  //   console.log("*".repeat(6-i));
  // }else{
  //   console.log("*".repeat(i-4));
  // };

  // 可省略 {} 不寫
  if(i<6) console.log("*".repeat(6-i));
  else console.log("*".repeat(i-4));
};

console.log("-".repeat(50));

// 2. Word Count (字詞統計)
let data = ["a","b","c","c","c","a","d","b","b","a","c","d","kk","a"];
let result = {};  // 期望最終長成 { "a" : 3 , "b" : 5 , "c" : 3 } 

for(let i = 0 ; i < data.length ; i++){
  let key = data[i];
  // console.log(key); 
  // 檢查元素是否在 result 裡
  // V -> value += 1
  // X -> 新增一組 key-value pair --> ex: "a" : 1

  // 有值 --> 直接抓 value , 視為 true
  // 無值 --> 得到 undefined , 視為 false
  // 0 , null , undefined ==> 都會視為 false 
  if(result[key]){  
    result[key] += 1;
  }else{
    result[key] = 1;
  };

  // if(key in result){  // 檢查 key 值是否存在於 Object 中 , ex: check "a" 是否在 Object 裡
  //   result[key] += 1;
  // }else{
  //   result[key] = 1;
  // };
}; 

console.log(result);

//// 檢查 key 是否存在於 Object
let data2 = { name : "jeff" , age : 18 };
console.log("name" in data2);
console.log("age" in data2);
console.log("message" in data2);

console.log(data2["name"]);     // 取出 value
console.log(data2["age"]);      // 取出 value
console.log(data2["message"]);  // key 不存在 , 得到 undefined
console.log(data2["testqq"]);
////

console.log("-".repeat(50));


// 3. 九九乘法表
// (1) 純顯示結果
// for(let i = 1 ; i < 10 ; i++){
//   for(let j = 1 ; j < 10 ; j++){
//     // console.log(i,j);
//     console.log(`${i}x${j}=${i*j}`);
//   };
// };

// (2) 排列成方陣
for(let i = 1 ; i < 10 ; i++){

  // 宣告一個 message 
  let message = "";

  // 合併成大字串 -> "1x1=1 1x2=2 ... 1x9=9"
  for(let j = 1 ; j < 10 ; j++){
    // console.log(i,j);
    // console.log(`${i}x${j}=${i*j}`);

    let space = "";
    if(i*j <10) space = "  ";  // 單位數 -> 兩個空白
    else space = " ";          // 雙位數 -> 一個空白

    message += `${i}x${j}=${i*j}${space}`;
  };

  // 再輸出顯示
  console.log(message);
};
