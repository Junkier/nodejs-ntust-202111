// alert("嗨嗨 , 我是 .js 檔 ~~~~");  // 跳出警示訊息

//////
// jQuery (Javascript 語法糖)
// 進階 -> Vue.js / React.js / Angular.js 
//////

$(function(){   // 等 HTML 上的標籤完成 , 才開始執行 
  console.log("嗨嗨 , 我是 .js ~");

  // [前端 jQuery 語法]
  // 透過 id 修改文字
  // $("#wording").text(" JS 修改文字～～～");
  setTimeout(()=>{
    $("#wording").text("JS 修改文字～～～");
  },1000);

  // 透過 class 綁定 click 事件 （事件聆聽)
  $(".test-btn").click(()=>{
    alert("按到按鈕！！！");
  }); 

});