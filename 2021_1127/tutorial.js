// console.log("HiHi , I'm Jeff.");

//// 資料型別 #1
// Number  , 數值資料
let a = 123;   // 宣告變數
let b = 456;
console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(a/b);

console.log( "-".repeat(50) );

// String , 字串 ,  文字資料
let name2 = "Jeff";
let message2 = '要下課了啦啦啦～';
console.log(name2,message2);
console.log(name2 + "說: " + message2 + "!!!");

console.log( "-".repeat(50) );

// Boolean , 布林值 , 只有 true / false 
let d = true;
let e = false;
console.log("d :",d);
console.log("e :",e);
console.log("d && e :", d && e );  // 取交集 , and
console.log("d || e :", d || e );  // 取連集 , or 

let f = (a > 100) ;  // 請問 a>100 嗎 ?  V-> true ; X -> false
console.log("f :",f);

console.log( "-".repeat(50) );


// Date , 時間資料
let time = new Date();
console.log(time);
console.log( time.getFullYear() );
console.log( time.getMonth() );
console.log( time.getMinutes() ) ;