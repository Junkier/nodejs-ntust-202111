# 回家試身手4 - Middleware 設計

本試題為 **使用 Middleware 將 API 內部動作流程分解** , 並透過 Swagger API 文件 , 完成 /auth & /members 4組 API 的設計。

有別於課程中的 **cookie & session 機制** , 本試題使用 **JWT (jsonwebtoken)** 實作登入驗證機制

<h3>
目的： 使 API 本身具備 token 權限驗證 / 參數檢查 等功能
</h3>

且讓使用者可透過這些 API , 進而修改 data.json 的資料

---

1. 建立 **2個 router**, 程式為 
    - router/auth.js
        - 在 auth.js 內設計 **1個 API** , 做為登入驗證用
    - router/members.js
        - 在 members.js 內分別設計 **3個 API** , 作為操作資料使用
        - 這些 API 皆必須攜帶 token , 驗證 ok 情況下才可呼叫使用

2. API 的相關說明 , 請依照下列動作 , 執行好 express server

    1) 複製該資料夾 , 並執行 ``` npm install ``` 安裝所需套件
    2) 執行 ``` node server.js ``` 

   即可從 http://localhost:8088 看到 API 說明文件 , 也可參考線上版 [Swagger.io 文件](https://reurl.cc/V5ye96) 

   而 JWT 的用法亦可從 http://localhost:8088 看到說明
   
   程式部分請參考 ```router/sample.js``` && ```utils/auth-helper.js```

3. 補充說明 
    1) 前端預期 使用者 會先透過 ```POST /auth``` 做登入驗證 , 取得 ```token```
       後再攜帶 ```token``` 操作其他 API , 達到修改 ```data.json``` 的目的

       相關使用者之帳號密碼 , 收錄在 ```users.js``` 中
       
    2) 資料夾結構應如下
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
          - sample.js (demo jwt 如何使用)
        - package.json
        - api-docs  (API 文件 , 無須更動)
       
    4) JWT 相關優質好文
       - [阮一峰老師-JSON Web Token 入门教程](https://reurl.cc/RbaEre)
       - [麥克的半路出家筆記-透過 JWT 實作驗證機制](https://reurl.cc/Q68GLp)
    
    3) 解答將於 **???** 公佈於 [mentorJe！傑夫尬程式](https://reurl.cc/kL6bLK) 的頻道上

---

4. 反思區
    1) JWT / cookie & session 機制差異在哪裡? 各有什麼優缺點?
    2) 如何有效地 開發 & 設計 API ?
    3) 受夠修改 data.json 了嗎？