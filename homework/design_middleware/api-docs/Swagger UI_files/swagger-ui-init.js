
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.1",
    "info": {
      "title": "回家試身手4 - Middleware 設計",
      "description": "本試題為「Node.js 後端網站架設實作坊」第四次回家練習題\n\n試題詳細說明請參考 <a href=\"\nhttps://reurl.cc/vg9oxa\" target='_blank'>https://reurl.cc/vg9oxa</a>\n\n請依照下方的 API 說明, 在 nodejs_express 上設計此 4 組 API\n",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:8088"
      }
    ],
    "tags": [
      {
        "name": "auth",
        "description": "登入驗證"
      },
      {
        "name": "members",
        "description": "會員資料"
      }
    ],
    "paths": {
      "/auth": {
        "post": {
          "tags": [
            "auth"
          ],
          "summary": "登入驗證檢查",
          "description": "當使用者發出 POST /auth request 時 , 該 API 會檢查 **users.js** 裡的 **USERS** 資料 \n\n若檢查無誤 , 則產生一組 **token (jwt)** 並回傳給使用者\n\n---\n<h3>\n本組 API 處理需滿足下列功能\n  1. 檢查 payload 是否有 account & passwd 的 key-value pair\n      - 參數有誤 -> 回覆失敗 400 : { \"message\" : \"payload 缺少 account & passwd\"}\n    \n  2. account & passwd 是否和 users.js 上的 USERS 資料一致  \n      - 不一致  ->  回覆失敗 400: { \"message\" : \"account or passwd 錯誤\"}\n  \n  3. 正常    \n     - 成功 200 並回傳 token , ex: { \"token\" : \"eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM\"}\n     \n       之後呼叫其他的 API , 都必須攜帶該 token 做驗證\n     \n     ```(可使用 auth-helper.js 上的 createToken middleware 進行加密) ```\n     \n  4. 其他失敗 \n     - 回覆失敗 500 : { \"message\": \"Server 端發生錯誤！\"}\n</h3>\n\n---\nex1: **POST /auth  ( 正常更新狀況 #1 )** \n```\n[payload]:\n  {\n    \"account\": \"jeff\",\n    \"passwd\" : \"testqq\"\n  }\n  \n[response 200]:\n  { \n    \"token\" : \"eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM\"\n  }\n```\n\nex2: **POST /auth  ( req.body 有誤之狀況 )**\n```\n[payload]:\n  {\n    \"account\": \"keven\"\n  }\n  \n[response 400]:\n  { \n    \"message\" : \"payload 缺少 account & passwd\"\n  }\n```\n\nex3: **POST /auth  ( account & passwd 有誤之狀況 )**\n```\n[payload]:\n  {\n    \"account\": \"leo\",\n    \"passwd\": \"ABCDEEEE\"\n  }\n  \n[response 400]:\n  { \n    \"message\" : \"account or passwd 錯誤\"\n  }\n```\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "account": {
                      "type": "string",
                      "description": "帳號",
                      "example": "jeff"
                    },
                    "passwd": {
                      "type": "string",
                      "description": "密碼",
                      "example": "testqq"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "<h2>正常新增資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (驗證成功)",
                      "value": {
                        "token": "eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "<h2>req.body 的資料有誤</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed1": {
                      "summary": "failed1 (req.body 資料格式有誤)",
                      "value": {
                        "message": "payload 缺少 account & passwd"
                      }
                    },
                    "failed2": {
                      "summary": "failed2 (account & passwd 有誤)",
                      "value": {
                        "message": "account or passwd 錯誤"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        }
      },
      "/members/all": {
        "get": {
          "tags": [
            "members"
          ],
          "summary": "取得 全體 會員資料",
          "description": "當使用者發出 GET /members/all request 時 , 該 API 會回傳 **全體** 會員資料\n\n ---\n\n<h2>需攜帶 token 才能呼叫此 API。</h2>\n\n---\n<h3>\n本組 API 處理需滿足下列功能\n  1. 檢查 req 上的 token 參數是否正確 \n      - 無攜帶 token        -> 回覆失敗 401: { \"message\" : \"缺少 token!\" } \n      \n      - token decoded 失敗  -> 回覆失敗 400: { \"message\" : \"該 token 無效!\" }\n     \n      ```(可使用 auth-helper.js 上的 decodeToken middleware 進行解密)```\n   \n  2. 正常    \n     - 成功 200 並回傳 data 的所有資料，i.e. : { \"10001\" : {…}, \"10002\" : {…} ,\"10003\" : {…} , … }\n     \n  3. 其他失敗 \n     - 回覆失敗 500 : { \"message\": \"Server 端發生錯誤！\"}\n</h3>\n",
          "parameters": [
            {
              "in": "query",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "jwt 驗證 token",
              "example": "eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM"
            }
          ],
          "responses": {
            "200": {
              "description": "<h2>正常回傳資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok",
                      "value": {
                        "10001": {
                          "name": "Jeff",
                          "gender": "M",
                          "age": 18
                        },
                        "10002": {
                          "name": "Leo",
                          "gender": "M",
                          "age": 22
                        },
                        "10003": {
                          "name": "Jenny",
                          "gender": "F",
                          "age": 30
                        },
                        "10004": {
                          "name": "Holy",
                          "gender": "F",
                          "age": 31
                        },
                        "10005": {
                          "name": "Gina",
                          "gender": "F",
                          "age": 35
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/400TokenIsInvalid"
            },
            "401": {
              "$ref": "#/components/responses/401TokenIsEmpty"
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        }
      },
      "/members": {
        "get": {
          "tags": [
            "members"
          ],
          "summary": "取得 編號為 {memNo} 的會員資料",
          "description": "當使用者發出 GET /members?memNo={memNo} request 時 , 該 API 會回傳 **{memNo}** 所對應之會員資料\n\n---\n\n<h2>需攜帶 token 才能呼叫此 API。</h2>\n\n---\n<h3>\n本組 API 處理需滿足下列功能\n  1. 檢查 req 上的 token 參數是否正確 ==> 機制和 GET /members/all 相同\n  \n  2. 檢查 req 是否有攜帶 memNo 參數\n     - 無攜帶 memNo -> 回覆失敗 400: { message : \"memNo 不可為空！\" } \n   \n  3. 正常    \n     - 成功 200 並回傳該 memNo 所屬資料 , ex: { \"name\": \"Jeff\" , \"gender\": \"male\"} \n     - 查無資料 -> 回覆失敗 404: { \"message\": \"Not Found\" } \n     \n  4. 其他失敗 \n     - 回覆失敗 500 : { \"message\": \"Server 端發生錯誤！\"}\n</h3>\n",
          "parameters": [
            {
              "in": "query",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "jwt 驗證 token",
              "example": "eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM"
            },
            {
              "in": "query",
              "name": "memNo",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "字串型數字",
              "example": 10001
            }
          ],
          "responses": {
            "200": {
              "description": "<h2>正常回傳資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (以 memNo=10001 為例)",
                      "value": {
                        "name": "Jeff",
                        "gender": "M",
                        "age": 18
                      }
                    },
                    "ok2": {
                      "summary": "ok (以 memNo=10005 為例)",
                      "value": {
                        "name": "Gina",
                        "gender": "F",
                        "age": 35
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "<h2>參數有誤</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed1": {
                      "summary": "failed (無效 token)",
                      "value": {
                        "message": "該 token 無效!"
                      }
                    },
                    "failed2": {
                      "summary": "failed (缺少 memNo)",
                      "value": {
                        "message": "memNo 不可為空！"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "$ref": "#/components/responses/401TokenIsEmpty"
            },
            "404": {
              "description": "<h2>查無資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed": {
                      "summary": "failed (以 memNo=12345 為例)",
                      "value": {
                        "message": "Not Found"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        },
        "post": {
          "tags": [
            "members"
          ],
          "summary": "新增 會員資料",
          "description": "當使用者發出 POST /members request 時 , 該 API 新增一組會員資料\n\n其中 memNo 需由 server 端統一編製 , \n以 **memNo 最大的數字+1** , 作為新資料的 memNo\n\nex1:\n\n檢查資料 , 若目前最大的 **memNo=10005**, 則新資料為 **memNo=10006**\n\nex2:\n\n檢查資料 , 若目前資料有 \"10001\",\"10002\",\"10007\",\"10009\" 四組資料\n\n最大的 **memNo=10009**, 則新資料為 **memNo=10010**\n\n---\n\n<h2>需攜帶 token 且 level=2 的人 , 才能呼叫此 API。</h2>\n\n---\n<h3>\n本組 API 處理需滿足下列功能\n  1. 檢查 req 上的 token 參數是否正確 ==> 機制和 GET /members/all 相同\n  \n  2. 檢查 該使用者是否有權限 ==> 透過 token 解密後 , 查看 level 資訊\n     - level=1 -> 回覆失敗 403: { \"message\" : \"Forbidden\" } \n     - level=2 -> ok , 正常執行\n     \n  3. 檢查 payload 是否有 name & gender & age 的 key key-value pair\n     - 參數有誤 -> 回覆失敗 400 : { \"message\" : \"payload 資料格式有誤！\" }\n    \n  4. 正常 , 進行資料新增 , 並由 server 端編製 memNo\n     - 成功 200 並回傳該 memNo 所屬資料 \n       \n       ex: { message : \"ok\" , memNo : ${新編制的 memNo} }\n     \n  5. 其他失敗 \n     - 回覆失敗 500 : { \"message\": \"Server 端發生錯誤！\"}\n</h3>\n\n<h3>【註】：</h3>\n \n<h3>\n1. 新增完後 , 可嘗試發  GET /members/all  檢查資料是否有 新增 資料成功 !\n</h3>\n---\nex1: **POST /members  ( 正常更新狀況 #1 )** \n```\n[payload]:\n  {\n    \"name\": \"阿夫老師\",\n    \"gender\": \"M\",\n    \"age\": 38\n  }\n  \n[response 200]:\n  { \n    \"message\" : \"ok\",\n    \"memNo\"   : \"10012\"\n  }\n```\n\nex2: **POST /members  ( token 解密後 , level 資格不符 )**\n```\n[payload]:\n  {\n    \"name\": \"QQ助教\",\n    \"gender\": \"F\",\n    \"age\": 31\n  }\n  \n[response 403]:\n  { \n    \"message\": \"Forbidden\"\n  }\n```\n\nex3: **POST /members  ( req.body 有誤之狀況 )**\n```\n[payload]:\n  {\n    \"name\": \"測試人\",\n    \"gender\": \"F\"\n  }\n  \n[response 400]:\n  { \n    \"message\": \"payload 資料格式有誤！\"\n  }\n```\n",
          "parameters": [
            {
              "in": "query",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "jwt 驗證 token",
              "example": "eyJ01NiJ9.eyJ1c2VySwYmQifQ.-xN_h8237t3rGzcM"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "姓名",
                      "example": "Jeff"
                    },
                    "gender": {
                      "type": "string",
                      "description": "性別",
                      "example": "M"
                    },
                    "age": {
                      "type": "number",
                      "description": "年紀",
                      "example": 18
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "<h2>正常新增資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (成功新增資料)",
                      "value": {
                        "message": "ok",
                        "memNo": "10012"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "<h2>參數有誤</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed1": {
                      "summary": "failed1 (無效 token)",
                      "value": {
                        "message": "該 token 無效!"
                      }
                    },
                    "failed2": {
                      "summary": "failed2 (payload 資料格式有誤)",
                      "value": {
                        "message": "payload 資料格式有誤！"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "$ref": "#/components/responses/401TokenIsEmpty"
            },
            "403": {
              "description": "<h2>資格不符</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed1": {
                      "summary": "failed (level=1 時)",
                      "value": {
                        "message": "Forbidden"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        }
      }
    },
    "components": {
      "responses": {
        "200MessageOk": {
          "description": "successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "example": "ok"
                  }
                }
              }
            }
          }
        },
        "400BadPayload": {
          "description": "<h2>req.body 的資料格式有誤</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "req.body 的資料格式有誤！"
                  }
                }
              }
            }
          }
        },
        "400TokenIsInvalid": {
          "description": "<h2>Token 有誤</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "該 token 無效!"
                  }
                }
              }
            }
          }
        },
        "401TokenIsEmpty": {
          "description": "<h2>缺少 Token</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "缺少 token!"
                  }
                }
              }
            }
          }
        },
        "404NotFound": {
          "description": "<h2>查無資料</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "Not Found",
                    "affectedRows": 0
                  }
                }
              }
            }
          }
        },
        "500ServerError": {
          "description": "<h2>Server 端發生錯誤</h2>",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "example": "Server 端發生錯誤！"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
