# 回家試身手4 - Middleware 設計

1. 建立 **1個 router**, 程式為 
    - router/members.js

2. 在 members.js 內分別設計 **3個 API**

   API 的相關說明 , 請依照下列動作 , 執行好 express server

    1) 複製該資料夾 , 並執行 ``` npm install ``` 安裝所需套件
    2) 執行 ``` node server.js ``` 

   即可從 http://localhost:8088 看到 API 說明文件
   
   相關資料放在 **data.json & config/secrets.js** 中 
        
   <!-- 亦可參考線上版 [Swagger.io 文件](https://reurl.cc/NZkVD6)  等等 GOGOGO !!!-->

3. 補充說明 
    1) 資料夾結構應為
        - server.js
        - config/
          - secrets.js (此為模擬 server 端所持有的 認證token)
        - package.json
        - data.json
        - router/
          - members.js
        - api-docs  ( API 文件 , 無須更動)

    2) 本試題為使用 **Middleware** 將 API  **內部動作流程** 分解, 並透過閱讀 Swagger API 文件 , 完成三組 /members 的 API 設計。

       <h3>
       目的： 使 API 本身具備 token 權限驗證 / 參數檢查 等機制 
       </h3>
       且讓使用者可透過這些 API , 進而修改 data.json 的資料
       
    3) 解答將於 **週三** 公佈於 [mentorJe！傑夫尬程式](https://reurl.cc/kL6bLK) 的頻道上

---

4. 反思區
    1) QQQ