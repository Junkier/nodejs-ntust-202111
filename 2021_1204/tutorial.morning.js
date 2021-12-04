//// 資料型別 #1
// Number  , 數值資料
console.log(123);
console.log(3.1415);

// String , 字串 ,  文字資料
console.log("傑夫老師");
console.log('今天禮拜六～');
console.log(`我是字串～`);  // 數字1 的左邊 

// Boolean , 布林值 , 只有 true / false
console.log(true);
console.log(false);
console.log(123 > 456); // false

// Date , 時間資料
console.log(new Date());
let time = new Date();
console.log(time.getFullYear());

console.log("-".repeat(50));

///////////////////////////////////////////////////////////////////////////

// Array , 陣列資料
let arr1 = [1,2,3,4,5];
let arr2 = ["jeff","leo","keven"];
let arr3 = [3.1415, "Jeff老師" , true , { "message" : "嗨嗨"} ];  // 每一個資料稱為 -> 元素 element

console.log(arr1);
console.log(arr2);
console.log(arr3);

// Object , 物件資料
let obj1 = { "name" : "jeff" , "age" : 18 };
let obj2 = {
  "name2" : "Leo",   //  key-value pair
  "age2"  : 22,      //  pair pair 之間 , 以 ',' 做為分隔
  "other2" : [1,2,3,4,5],
  "message2" : {
    "math_score" : 100,
    "eng_score"  : 95
  }
};
let obj3 = {
  "Phycal_score" : 80,
  "Phycal score" : 80 
};
console.log(obj1);
console.log(obj2);
console.log(obj3);

///////////////////////////////////////////////////////////////////////////

// null
let data1 = null;
console.log(data1);

// undefined
let data2;
console.log(data2);

console.log("-".repeat(50));

///////////////////////////////////////////////////////////////////////////
// Array , 陣列資料
let arr4 = [100,80,95,75,80];

// 取值
let a = arr4[0];   // 取出 100 
let b = arr4[2];   // 取出 95
console.log("a:",a);
console.log("b:",b);

// 修改值
arr4[4] = 1000;   // index=4 修改為 1000
arr4[1] = -20;    // index=1 修改為 -20
console.log(arr4);

// 新增值 -> 使用 .push
arr4.push(27);   // array 內建的 「方法」
arr4.push(31);
arr4.push(99);
arr4.push(87);
arr4.push(78);

console.log(arr4);

// 取得 array 的長度 (元素個數)
console.log("Array 長度: ",arr4.length);  // array 內建的 「屬性」
