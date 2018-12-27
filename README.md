# GreatOne Boilerplate Document

![GreatOne Logo](./images/great_logo.jpg)

## **【Includes Loader】**

**檔案名稱:** includesloader.js  
**說明:** front-end 初始化時從外部載入組件

Dependencies:

1. jQuery
1. imagesloaded.js
1. 下方之 function

```javascript
function listenImagesLoading(
  target,
  callback = () => {},
  progress = (per, instance) => {
    console.log(`${per}% (${IMG_COUNTER}/${instance.images.length})`);
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
  // filesRootPath、filesExtension 未設定則採用預設值: "./includes/"、".html"
  callback: mainFunc,
  includesList: [
    { // rootPath、extension 未設定則直接引用: filesRootPath、filesExtension
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

<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">filesRootPath</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>"./includes/"</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>所有載入檔案之預設目錄</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">filesExtension</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>".html"</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>所有載入檔案之預設附檔名</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">callback</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Function</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>將於全部檔案下載完畢後執行</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Array</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>下載檔案之清單</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList:[{target}]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>該檔案匯入之目標 DOM</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList:[{rootPath}]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>filesRootPath</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>該檔案目錄</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList:[{fileName}]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>該檔案名稱</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList:[{extension}]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>String</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>filesExtension</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>該檔案附檔名</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align: center">includesList:[{callback}]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Function</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>將於該檔案下載完畢後執行</td>
    </tr>
  </tbody>
</table>
