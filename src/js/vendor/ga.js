(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

// Customer's Meta
ga('create', 'UA-35284685-1', 'auto');
ga('send', 'pageview');

function trackClickBtn(BtnCode) {
  ga('send', 'event', 'button', 'click', BtnCode);
}

function bindGABtn() {
  $('a').click(function (e) {
    var $this = $(this);
    var BtnCode = $this.attr('data-ga');
    var target = $this.attr('target');
    var href = $this.attr('href');

    if (BtnCode != undefined && target != '_blank') {
      e.preventDefault();
      trackClickBtn(BtnCode);

      if (href != '#' || href != undefined) {
        setTimeout(function () {
          location.href = href;
        }, 600);
      }
    } else if (BtnCode != undefined) {
      trackClickBtn(BtnCode);
    }
  });
}