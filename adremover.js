/*
  adremover.js
  2014-7-2 0:40
  codz by PortWatcher

  fuck all of those who promote native app in web app
*/

(function () {
  var configs = {
    'w.mail.qq.com': [{
      selector: 'top_announce',
      type: 'class',
      action: 'hide'
    }, {
      selector: '.enter_mail_button_td > a',
      type: 'query',
      action: 'click'
    }],

    'ui.ptlogin2.qzone.com': [{
      selector: 'guide',
      type: 'id',
      action: 'remove'
    }, {
      selector: 'btn_app_down',
      type: 'id',
      action: 'remove'
    }],

    'm.mtime.cn': [{
      selector: 'clientAd',
      type: 'id',
      action: 'remove'
    }],

    'm.douguo.com': [{
      selector: 'dgmsx',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'topBan',
      type: 'id',
      action: 'remove'
    }, {
      selector: '[onclick="setFlag()"]',
      type: 'query',
      action: 'click',
      clicked: false
    }],

    'm.weibo.cn': [{
      selector: 'J-tips top-tips pic',
      type: 'class',
      action: 'remove'
    }],

    'tieba.baidu.com': [{
      selector: 'client_ad_top',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'client_ad_dialog',
      type: 'id',
      action: 'remove'
    }],

    'taobao.com': [{
      selector: 'smartAd-close',
      type: 'id',
      action: 'click'
    }, {
      selector: 'smartAd-close J_smartClose',
      type: 'class',
      action: 'click'
    }],

    'xiami.com': [{
      selector: 'open-app',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'gobrowse',
      type: 'class',
      index: 1,
      action: 'click',
      clicked: false
    }, {
      selector: 'app-bar',
      type: 'class',
      action: 'remove'
    }],

    'm.dangdang.com': [{
      selector: 'close_btn',
      type: 'id',
      action: 'click'
    }],

    'i.meituan.com': [{
      selector: 'banner',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'i-link',
      type: 'class',
      action: 'click'
    }, {
      selector: 'pop-close',
      type: 'class',
      action: 'click'
    }],

    'mail.163.com': [{
      selector: 'mailMasterTip',
      type: 'id',
      action: 'remove'
    }],

    'mo.amap.com': [{
      selector: '.go_web > a',
      type: 'query',
      action: 'click'
    }, {
      selector: 'map_tips',
      type: 'class',
      action: 'remove'
    }],

    'm.u17.com': [{
      selector: 'down_app',
      type: 'id',
      action: 'remove'
    }],

    'm.maoyan.com': [{
      selector: 'banner',
      type: 'id',
      action: 'remove'
    }],

    'm.ctrip.com': [{
      selector: 'close_icon',
      type: 'id',
      action: 'click'
    }],

    'm.mogujie.com': [{
      selector: 'ui-hada-close',
      type: 'class',
      action: 'click'
    }],

    'mt.renren.com/download': [{
      selector: 'a[href="http://mt.renren.com/login?redirect=http%3A%2F%2Fmt.renren.com%2Fhome"]',
      type: 'query',
      action: 'click'
    }],

    'mt.renren.com': [{
      selector: 'closedl_btn',
      type: 'id',
      action: 'click'
    }],

    'guokr.com': [{
      selector: '#spread > .icon-close',
      type: 'query',
      action: 'click'
    }],

    'jd.com': [{
      selector: 'home-clientapp-entry',
      type: 'id',
      action: 'remove'
    }, {
      selector: 'down_app',
      type: 'id',
      action: 'remove'
    }],

    'm.dianping.com': [{
      selector: 'go-on',
      type: 'class',
      action: 'click'
    }, {
      selector: 'J_close_banner',
      type: 'class',
      action: 'click'
    }],

    'www.tudou.com': [{
      selector: 'closeAppRecom',
      type: 'id',
      action: 'click'
    }],

    'www.tmall.com': [{
      selector: 'J_GloablSmartBannerClose',
      type: 'id',
      action: 'click'
    }],

    'm.damai.cn': [{
      selector: 'box bgc4',
      type: 'class',
      action: 'click'
    }, {
      selector: '#footerDiv > .close',
      type: 'query',
      action: 'click'
    }],

    'm.xiachufang.com': [{
      selector: '.apps-download > a',
      type: 'query',
      action: 'click'
    }],

    'm.yohobuy.com': [{
      selector: 'header_layer_close',
      type: 'id',
      action: 'click'
    }, {
      selector: 'float_layer_close',
      type: 'id',
      action: 'click'
    }]
  };

  var isDomainContained = function (domain) {
    var url = window.location.href;
    var result = url.search(domain);

    if (result === -1) {
      return false;
    } else {
      return true;
    }
  }

  var fetchElement = function (ad) {
    var element;

    switch (ad.type) {
    case 'id':
      element = document.getElementById(ad.selector);

      break;
    case 'class':
      if (ad.index) {
        element = document.getElementsByClassName(ad.selector)[ad.index];
      } else {
        element = document.getElementsByClassName(ad.selector)[0];
      }

      break;
    case 'tag':
      element = document.getElementsByTagName(ad.selector)[0];

      break;

    case 'query':
      element = document.querySelector(ad.selector);

      break;
    default:
      break;
    }

    return element;
  }

  for (var domain in configs) {
    if (isDomainContained(domain)) {
      var ads = configs[domain];
      var count = 0;
      var intervalId = setInterval(function () {
        count++;
        ads.forEach(function (ad) {
          if (count === 600) {
            clearInterval(intervalId);
          }

          var element = fetchElement(ad);
          if (element instanceof Array || !element) {
            return;
          }

          if (ad.action === 'remove') {
            if (!element.parentNode) {
              return;
            }

            element.parentNode.removeChild(element);
          } else if (ad.action === 'hide') {
            element.style.display = 'none';
          } else if (ad.action === 'click') {
            if (!ad.clicked) {
              element.click();
              ad.clicked = true;
            }
          }
        });

        // fuck you, smart AD banner.
        if (isDomainContained('m.taobao.com')) {
          var divs = document.querySelectorAll('body > div');
          [].forEach.call(divs, function (div) {
            if (div && div.className.indexOf('dsk') >= 0) {
              var sign = div.className.substring(0, div.className.length - 3);
              var closeIcon = document.querySelector('.' + sign + '-close');
              closeIcon.click();
            }
          });
        }
      }, 10);

      break;
    }
  }
})();
