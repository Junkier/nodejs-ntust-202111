////// 回家試身手
// 1.
for(let i= 0 ; i < 11 ; i++){
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
let data =  [ "a", "b", "c", "c", "c", "a", "d", "b", "b", "a", "c" ,"d" , "kk" , "a"];
let result = {};  // 期望最終長成 { "a" : 3 , "b" : 5 , "c" : 3 } 

for(let i=0 ; i < data.length ; i++){
  let key = data[i];
  // console.log(key); 
  // 檢查元素是否在 result 裡
  // V -> value += 1
  // X -> 新增一組 key-value pair --> ex: "a" : 1
  if(key in result){
    result[key] += 1;
  }else{
    result[key] = 1;
  };
}; 

console.log(result);
