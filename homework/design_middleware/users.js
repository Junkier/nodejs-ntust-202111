// server 端 有效的帳號密碼  
const USERS = {
    "jeff" : {
      "account" : "jeff",   // 帳號
      "passwd" : "testqq",  // 密碼
      "level"  : 2          // 等級 , 唯有 level=2 的人 , 才可呼叫 POST /members API 新增資料
    },
    "leo" : {
      "account" : "leo",
      "passwd" : "abcd1234",
      "level"  : 1
    },
    "ginne" : {
      "account" : "ginne",
      "passwd" : "good_kk",
      "level"  : 1
    }
};

module.exports = {
  USERS
};