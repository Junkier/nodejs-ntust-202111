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