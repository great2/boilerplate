"use strict"; // 全域採用嚴格模式

/*==================== Variables ====================*/
/* Window */
const $win = $(window);
let winW;
let winH;

/* Document */
const $doc = $("html");
const $body = $("body");

/* Log Style */
const logSafeStyle = "color: 	limegreen; font-weight: bold;";
const logInfoStyle = "color: yellow;";

/*==================== Library ====================*/
/**
 * 項目名稱: 圖片載入進度偵聽器
 *
 * 參數內容:
 *    dom = 作用對象 (預設整個 document)
 *    callback = 圖片全部下載完畢時的 Callback
 *
 * 說明:
 *    所有 DOM 都確認載入後，開始監聽所有圖片是否載入完畢。
 *    亦可取用進度數值作 progress bar 之用。
 *
 * 注意事項:
 *    imagesLoadingCallback 為必填(預設為 buildPlugins)
 *    位置在 includesLoader 結束後(預設狀況下)
 */
function listenImagesLoading(
  target,
  callback = function() {},
  progress = function(per, instance) {
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

/**
 * 項目名稱: 淡出後移除DOM
 *
 * 參數內容:
 *    opt = {
 *      dom - 作用對象,
 *      type - 過渡方式 (預設 'fadeOut' & 'slideUp')
 *      duration - 過渡時間,
 *      callback - 過渡完畢時的 Callback
 *    }
 *
 * 適用對象: Loading、Lightbox... etc.
 *
 * 注意事項: 預設 opt.type 為 "fadeOut"
 */
function transitionThenRemove(opt) {
  const { dom, type, duration, callback } = opt;

  switch (type) {
    case "slideUp":
      dom.stop().slideUp(duration, transitionCallback);
      break;
    default:
      dom.stop().fadeOut(duration, transitionCallback);
      break;
  }

  function transitionCallback() {
    dom.remove();
    if (!!callback) {
      callback();
    }
  }
}

/* 參數型別驗證: Object */
function paraObjTypeValidation(para, _this) {
  if (para === undefined) {
    para = {};
    return true;
  } else if (typeof para !== "object") {
    throw new Error(
      `${_this.__proto__.constructor.name} 參數錯誤: 應為 "物件" 型別!`
    );
  }

  return true;
}

/* DOM 是否存在 */
function isExist() {
  const args = [];

  // for Loop for IE11
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  const ans = args.some(el => $(el).length > 0);

  return ans;
}
