# 回家試身手4 - Middleware 設計

本試題為 **使用 Middleware 將 API 內部動作流程分解** , 並透過閱讀 Swagger API 文件 , 完成 4組 /members 的 API 設計。

有別於課程中的 session , 本試題使用 **JWT (jsonwebtoken)** 實作登入驗證機制

<h3>
目的： 使 API 本身具備 token 權限驗證 / 參數檢查 等機制 
</h3>

且讓使用者可透過這些 API , 進而修改 data.json 的資料

---

1. 建立 **2個 router**, 程式為 
    - router/auth.js
    - router/members.js

2. API 的相關說明 , 請依照下列動作 , 執行好 express server

    1) 複製該資料夾 , 並執行 ``` npm install ``` 安裝所需套件
    2) 執行 ``` node server.js ``` 

   即可從 http://localhost:8088 看到 API 說明文件

   在 auth.js 內設計 **1個 API** , 做為登入驗證用

   在 members.js 內分別設計 **3個 API** , 作為操作資料使用
   
   <!-- 亦可參考線上版 [Swagger.io 文件](https://reurl.cc/NZkVD6)  等等 GOGOGO !!!-->

3. 補充說明 
    1) 前端預期 使用者 會先透過 ```POST /auth``` 做登入驗證 , 取得 ```access_token```
       之後再攜帶 ```access_token``` 操作其他 API , 達到修改 ```data.json``` 的目的
       相關使用者之帳號密碼 , 收錄在 ```users.js``` 中
       
    2) 資料夾結構應為
        - server.js
        - users.js (使用者之帳號密碼)
        - config/
          - config.js (jwt 相關設定檔)
        - utils/
          - auth-helper.js (router/auth.js 會用到的輔助程式)
        - models/
          - data.json (API 操作之資料)
        - router/
          - members.js
          - auth.js
        - package.json
        - api-docs  (API 文件 , 無須更動)
       
    2) 解答將於 **???** 公佈於 [mentorJe！傑夫尬程式](https://reurl.cc/kL6bLK) 的頻道上

---

4. 反思區
    1) QQQ