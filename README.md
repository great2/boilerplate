# Plugin Document

## **【Includes Loader】**

項目名稱: Includes 載入器
檔案名稱: includesloader.js
說明: front-end 初始化時從外部載入組件

依賴程式: jQuery、imagesloaded.js 以及下方 function

```javascript
function listenImagesLoading(
  target,
  callback = function() {},
  progress = function(per, instance) {
    console.log(per + "% (" + IMG_COUNTER + "/" + instance.images.length + ")");
  }
) {
  console.log("%cImages Loading Listening...", logInfoStyle);
  let IMG_COUNTER = 0;

  target
    .imagesLoaded({ background: true })
    .always(() => {
      console.log("%cImages Loading Completed!", logSafeStyle);
      callback();
    })
    .progress(instance => {
      IMG_COUNTER++;
      var per = Math.floor((IMG_COUNTER / instance.images.length) * 100);
      progress(per, instance);
    });
}
```

呼叫範例:

```javascript
includesloader({
  filesRootPath: "./includes/",
  filesExtension: ".html",
  callback: mainFunc,
  includesList: [
    { // rootPath、extension 未設定則直接引用 filesRootPath、filesExtension
      target: ".page-header",
      fileName: "_page-header"
      callback: function() {
        console.log("page-header 下載完成");
      }
    },
    {
      target: "#popup",
      rootPath: "./popup/",
      fileName: "_news",
      extension: ".txt",
      callback: function() {
        alert("最新消息!");
      }
    }
  ]
});
```

> Uptions

| item        |     filesRootPath      |
| ----------- | :--------------------: |
| type        |         String         |
| default     |     "./includes/"      |
| description | 所有載入檔案之預設目錄 |

| item        |      filesExtension      |
| ----------- | :----------------------: |
| type        |          String          |
| default     |         ".html"          |
| description | 所有載入檔案之預設附檔名 |

| item        |          callback          |
| ----------- | :------------------------: |
| type        |          Function          |
| default     |         undefined          |
| description | 將於全部檔案下載完畢後執行 |

| item        |  includesList  |
| ----------- | :------------: |
| type        |     Array      |
| default     |   undefined    |
| description | 下載檔案之清單 |

| item        | includesList:[{target}] |
| ----------- | :---------------------: |
| type        |         String          |
| default     |        undefined        |
| description |  該檔案匯入之目標 DOM   |

| item        | includesList:[{rootPath}] |
| ----------- | :-----------------------: |
| type        |          String           |
| default     |       filesRootPath       |
| description |        該檔案目錄         |

| item        | includesList:[{fileName}] |
| ----------- | :-----------------------: |
| type        |          String           |
| default     |         undefined         |
| description |        該檔案名稱         |

| item        | includesList:[{extension}] |
| ----------- | :------------------------: |
| type        |           String           |
| default     |       filesExtension       |
| description |        該檔案附檔名        |

| item        | includesList:[{callback}] |
| ----------- | :-----------------------: |
| type        |         Function          |
| default     |         undefined         |
| description | 將於該檔案下載完畢後執行  |
