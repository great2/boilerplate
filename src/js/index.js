/*==================== Variables ====================*/
/* Constant */
const DURATION = {
  FAST: 150,
  FASTER: 200,
  STD: 300,
  NOR: 400,
  SLOWER: 500,
  SLOW: 600
};

/*==================== Initialize ====================*/
/**
 * 【程式進入點】
 * 項目名稱: Includes 載入器
 *
 * 說明:
 *    監聽所有 includes 的載入、並作同步處理，
 *    下載完成後進入 listenImagesLoading，
 *    監聽完成即進入 this.callback。
 *
 * 必填項目: includesList
 */
includesLoader({
  // filesRootPath: "./includes/",
  // filesExtension: ".html",
  callback: mainFunc,
  includesList: [
    {
      target: ".page-header",
      // rootPath: "./includes/",
      fileName: "_page-header"
      // extension: ".html",
      // callback: function() {}
    },
    {
      target: ".page-footer",
      fileName: "_page-footer"
    }
  ]
});

/*==================================================*\
        Main Function
\*==================================================*/
function mainFunc() {
  /* window 事件: Resize & scroll */
  windowEvents();

  $("button").lightbox(() => {
    $("._slick").slick();
  });

  /***** Start Coding Here *****/

  /* 收掉 .page-loading */
  transitionThenRemove({
    dom: $(".page-loading"),
    duration: DURATION.STD,
    callback: () => {
      console.log("%cBuild Completed!", logSafeStyle);
    }
  });
}

/*==================================================*\
        window Events
\*==================================================*/
let isFirstTime = true;
function windowEvents() {
  // Window Resize
  $win.on("resize", _resize).resize();
  // Window Scroll
  $win.on("scroll", _scroll).scroll();
}

/*========== Window Resize ==========*/
function _resize() {
  getSize();

  // 斷點偵測
  detectiveBreakpoint([
    {
      minimum: -1,
      mq: function() {}
    },
    {
      phoneMini: 320,
      mq: function() {}
    },
    {
      phone: 400,
      mq: function() {}
    },
    {
      phoneWide: 480,
      mq: function() {}
    },
    {
      phablet: 560,
      mq: function() {}
    },
    {
      tabletSmall: 640,
      mq: function() {}
    },
    {
      tablet: 768,
      mq: function() {}
    },
    {
      tabletWide: 1024,
      mq: function() {}
    },
    {
      notebook: 1366,
      mq: function() {}
    },
    {
      desktop: 1680,
      mq: function() {}
    }
  ]);
}

function getSize() {
  winW = $win.width();
  winH = $win.height();
}

/*========== Window Scroll ==========*/
let nowPos;
function _scroll() {
  getPos();
}

function getPos() {
  nowPos = {
    x: $doc.scrollLeft(),
    y: $doc.scrollTop()
  };
}

/*==================================================*\
        Library
\*==================================================*/
/* 斷點偵測 (for window resize) */
let preBP = { minimum: -1 };
function detectiveBreakpoint(breakpoint) {
  let nowBP = breakpoint[0];

  $.each(breakpoint, (idx, obj) => {
    const objName = Object.getOwnPropertyNames(obj)[0];
    const val = obj[objName];

    if (winW > val && val > nowBP[Object.getOwnPropertyNames(nowBP)[0]]) {
      nowBP = obj;
    }
  });

  if (
    Object.getOwnPropertyNames(nowBP)[0] ===
    Object.getOwnPropertyNames(preBP)[0]
  ) {
    return false;
  }

  // 執行 Media Query
  mediaQuery(nowBP);
}

// 執行 Media Query
function mediaQuery(nowBP) {
  const nowBPName = Object.getOwnPropertyNames(nowBP)[0];
  console.log(`Breakpoint {${nowBPName}: ${nowBP[nowBPName]}}`);

  // 執行該斷點 Media Query
  if (!nowBP.hasOwnProperty("mq")) {
    throw new Error(`此斷點(↑)尚未設定 Media Query 之屬性 "mq"(function)`);
  } else if (typeof nowBP.mq !== "function") {
    throw new Error(`此中斷點之 Media Query 型別並非 "function`);
  } else {
    nowBP.mq();
  }

  preBP = nowBP;
}
