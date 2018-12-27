/*==================================================*\
        Lightbox
\*==================================================*/
;(function($) {
  var btn;
  var announcement = false;
  var $lb;

  // 一次性無綁定 Lightbox
  $.lightbox = function(userOpts, callback) {
    announcement = true;
    $.fn.lightbox(userOpts, callback);
  }

  // 綁定事件 Lightbox
  $.fn.lightbox = function(userOpts, callback) {
    $.each(this, function(idx, el) {
      /*==================== Properties ====================*/
      var _this = $(el);

      /* 預設樣板 */
      var lbTemplate =
        '<div class="lightbox">' +
          '<div class="lb-container">' +
            '<div class="lb-content"></div>' +
            '<div class="lb-close-btn"></div>' +
          '</div>' +
          '<div class="lb-loading">' +
            '<svg><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml"attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>' +
          '</div>' +
        '</div>';
  
      /* 預設選項 */
      var _defaultOpts = {
        closeBtn: true,
        bodyClickClose: true,
        showWhenLanding: false,
        duration: 200,
        lbTemplate: lbTemplate,
        type: 'file',
        filesRootPath: './includes/lightbox/',
        filesDefaultExtension: '.html',
        fileName: '',
        id: '',
        fullPath: '',
        bindEvt: 'click',
        callback: function(){}
      };

      /* 資料處理 */
      if (typeof userOpts !== 'object') {
        var temp = userOpts;
        userOpts = {};
        
        switch (typeof temp) {
          // options 為 function 則實作為 callback
          case 'function':
            userOpts.callback = temp;
            break;
  
          // options 為 string 則實作為 fullPath
          case 'string': 
            userOpts.fullPath = temp;
            break;
        }
      }
  
      var opts = $.extend(_defaultOpts, userOpts);

      // 如果不要關閉按鈕，則強制開啟 "點擊 body 可關閉 lightbox" 功能
      if (!opts.closeBtn) {
        opts.bodyClickClose = true;
      }
  
  
  
      /*==================== Entrance ====================*/
      /* 綁定對象確認 */
      if (announcement) {
        buildLbWrap(_this, opts);
      } else {
        btn = _this;
  
        // 驗證檔案名稱，如未設定檔名，則改用 data-lb 取得
        var btnDataLb = btn.data('lb');
        if (!opts.fileName) {
          opts.fileName = btnDataLb;
        } else if (!btnDataLb) {
          console.log('%c未設定檔案名稱', logErrorStyle);
          return false;
        }
  
        // 如果 fullPath 為空字串，則組裝各檔案資料
        if (opts.fullPath === '') {
          opts.fullPath = getFullPath(opts);
        }

        // 如果 id 為空白，則 id 採用 fileName
        if (!opts.id) {
          opts.id = opts.fileName;
        }
  
        if (opts.showWhenLanding) {
          buildLbWrap(btn, opts);
        } else {
          bindBtn(btn, opts);
        }
      }
    });




    /*==================== Methods ====================*/
    /* 綁定按鈕事件 */
    function bindBtn(btn, opts) {
      btn.on(opts.bindEvt, function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        !isExist('.lightbox') ? 
          buildLbWrap(btn, opts) :
          console.log('%c前 lightbox 尚未關閉', logErrorStyle);
      });

      if (opts.showWhenLanding) {
        btn.trigger(opts.bindEvt)
      }
    }

    /* 建立 Lightbox 基本架構 */
    function buildLbWrap(_this, opts) {
      console.log('%cLightbox is Loading', logInfoStyle);
      var $body = $('body');
      $body.append(opts.lbTemplate);
      $lb = $('.lightbox');

      $lb.attr('id', opts.id);

      // 阻止關閉 Lightbox 的冒泡事件
      $('.lb-container').on('click', function(evt) {
        evt.stopPropagation();
      });

      // 是否需要 "關閉按鈕"
      var $closeBtn = $('.lb-close-btn');
      if (!opts.closeBtn) {
        $closeBtn.remove();
      } else {
        $closeBtn.on('click', function() {
          closeLb(opts);
        });
      }

      // 是否開啟 "點擊 body 可關閉 lightbox" 功能
      if (opts.bodyClickClose) {
        $body.on('click', function() {
          closeLb(opts);
        });
      }

      switch (opts.type) {
        case 'file':
          loadFile(opts);
          break;
      }

      

      // 需調整: 開放使用者自定義
      $lb.stop().animate(
        {
          opacity: 1
        },
        {
          duration: opts.duration
        }
      );
    }

    /* 開始下載檔案 */
    function loadFile(opts) {
      $('.lb-content').load(opts.fullPath, function() {
        listenImagesLoading($lb, function() {
          lbCompleted(opts);
        });
      });
    }

    /* 取得完整路徑 */
    function getFullPath(opts) {
      if (!!opts.fullPath) {
        return opts.fullPath;
      } else {
        return opts.filesRootPath + opts.fileName + opts.filesDefaultExtension;
      }
    }

    /* Lightbox Callback */
    function lbCompleted(opts) {
      opts.callback();
      showContent(opts);
    }

    function showContent(opts) {
      $('.lb-container').stop().animate(
        {
          opacity: 1
        },
        {
          duration: opts.duration,
          complete: function() {
            console.log('%cLightbox Loading Completed!', logSafeStyle);
          }
        }
      );

      $('.lb-loading').stop().animate(
        {
          opacity: 0
        },
        {
          duration: opts.duration,
        }
      );
    }

    /* 關閉 Lightbox */
    function closeLb(opts) {
      if(!isExist('.lightbox')) {
        return false;
      }

      // 需調整: 開放使用者自定義
      $lb.stop().animate(
        {
          opacity: 0
        },
        {
          duration: opts.duration,
          complete: function() {
            $(this).remove();
            console.log('%cLightbox Is Closed', logSafeStyle);
          }
        }
      );
    }



    /* 啟用 jQuery 串香腸功能 */
    return this;
  }
})(jQuery);