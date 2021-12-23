// jwt 加密 / 解密 用到的 secret
const jwtSecret  =  "APTX_(_4869";   

// jwt 加密 / 解密 時的參數配置
//   ex: algorithm -> 使用何種 加密演算法
//   其他自己查 :) 
const jwtOptions = {
    algorithm : 'HS256',   
};

// jwt 的有效期限
const jwtExpTime = 1 * 60 * 60;  // 預設為 1hr 

module.exports = {
  jwtSecret,
  jwtOptions,
  jwtExpTime,
}