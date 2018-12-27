/**
 * 項目名稱: Includes 載入器
 *
 * 說明:
 *    監聽所有 includes 的載入、並作同步處理，
 *    下載完成後進入 listenImagesLoading，
 *    監聽完成即進入 this.callback。
 *
 * 注意事項：
 *    includesList.callback 為異步事件。
 *
 */

function includesLoader(userOpts) {
  const {
    filesRootPath = "./includes/",
    filesExtension = ".html",
    callback: loaderCallback,
    includesList
  } = userOpts;

  /*==================== Start Loading ====================*/
  console.log("%cIncludes Loading...", logInfoStyle);

  const LIST_LEN = includesList.length;
  let counter = 0;

  // list 遍歷
  $.each(includesList, (idx, includeData) => {
    const {
      target,
      rootPath = filesRootPath,
      fileName,
      extension = filesExtension,
      callback
    } = includeData;

    const fullPath = rootPath + fileName + extension;

    // 正式載入
    $(target).load(fullPath, () => {
      counter++;
      console.log(`${fileName} was being loaded (${counter}/${LIST_LEN})`);

      if (callback) {
        callback();
      }

      // Progress Listening...
      listenIncludesLoading(LIST_LEN, counter);
    });
  });

  function listenIncludesLoading(len, counter) {
    // 如果全部已下載完畢
    if (len === counter) {
      console.log("%cIncludes Loading Completed!", logSafeStyle);

      listenImagesLoading($doc, loaderCallback);
    }
  }
}
