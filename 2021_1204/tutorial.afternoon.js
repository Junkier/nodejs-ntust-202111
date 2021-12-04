//// Function
// let arr1 = [1,2,3,4,5];
// console.log(arr1.map(n=>n*2));

// 早期的 function 
let add1 = function(a,b){
  return a+b;
};

// 現在 arrow function
let add2 = (a,b) => {
  return a+b;
};


console.log( "add1(3,5) :",add1(3,5) );
console.log( "add1(6,-5) :", add1(6,-5) );

console.log("add2(3,5) :",   add2(3,5) );
console.log("add2(6,-5) :",  add2(6,-5) );

console.log("-".repeat(50));

// 定義 (宣告) function
let sayHello = (name) => {
  //  此為 function 執行區塊 (scope)
  console.log("嗨嗨");
  console.log("我是");
  console.log(name);
  console.log("~~~~~");

  let arr3 = [3,4,5,6,7];
  console.log( arr3.map(n =>n*3) );
};

// 使用 (呼叫) function 
sayHello("Jeff!!!");

sayHello("Leo ~~~");

console.log("-".repeat(50));

//// function 特性介紹
let sayHello2 = (name2,age2) => {
  // name2 , age2 為 input (輸入參數)
  console.log("[sayHello2] 嗨嗨 , 我是" + name2 + "," + "年紀是" + age2);
}

let sayHello2_with_output = (name2,age2)=>{
  // name2 , age2 為 input (輸入參數)
  console.log("[sayHello2_with_output] 嗨嗨 , 我是" + name2 + "," + "年紀是" + age2);
  
  // return 後的東西為 output (輸出結果)
  return "下課囉！！！！";
};

// sayHello2("Jeff",18);
// sayHello2_with_output("Jeff",18);

let msg1 = sayHello2("Jeff",18);
console.log(msg1);
let msg2 = sayHello2_with_output("Jeff",18);
console.log(msg2);


let arr3 = [1,2,3,4,5];
// arr3.map(n => n*3) 等同於
let map3 = arr3.map((n) => {
  console.log(n);
  console.log("AAA");
  console.log("BBB");
  return n*3;
});

// 簡寫法
// let map3 = arr3.map( n => n*3 );
console.log("map3 :" , map3);

console.log( "-".repeat(50) );

//// function 特性介紹#2
// 全域 (Global) V.S 區域 (Local)
let test1 = ()=>{
  // num1 -> 區域變數
  var num1 = 12;
  return num1;
};

let test2 = ()=>{
  // num2 -> 區域變數
  let num2 = 15;
  return num2;
};

let test3 = ()=>{
  // num3 -> 全域變數
  num3 = 18;
  return num3;
};

console.log( test1() );
console.log( test2() );
console.log( test3() );

console.log("num3 :", num3);
// console.log("num2 :", num2);
// console.log("num1 :", num1);

//// function 特性介紹#3 
// var / let / const 差異
// var   : function scope , 值可以任意改
// let   : block scope    , 值可以任意改
// const : block scope    , 值不可任意改
console.log("-".repeat(50));

let test4 = ()=>{
  let num4 = 150;
  var message ;

  if(num4 >0){
    message = "正數！！！";
    // console.log("正數！！！");
  }else{
    message = "負數！！！";
    // console.log("負數！！！");
  };

  console.log(message);

};

test4();
