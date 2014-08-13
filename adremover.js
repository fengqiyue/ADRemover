/*
  adremover.js
  2014-7-2 0:40
  codz by PortWatcher

  fuck all of those who promote native app in web app
*/

(function () {
  var configs = {
    'mobile.twitter.com': [{
      selector: 'prompt',
      type: 'tag',
      action: 'remove'
    }, {
      selector: 'install-app-prompt-container',
      type: 'class',
      delay: 100,
      action: 'remove'
    }],

    'w.mail.qq.com': [{
      selector: 'top_announce',
      type: 'class',
      action: 'hide'
    }, {
      selector: '.enter_mail_button_td > a',
      type: 'query',
      action: 'click'
    }],

    'huaban.com': [{
      selector: 'top_promotion',
      type: 'id',
      action: 'remove'
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

    'm.taobao.com': [{
      selector: 'smartAd',
      type: 'id',
      action: 'remove'
    }],

    'm.xiami.com': [{
      selector: 'open-app',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'gobrowse',
      type: 'class',
      index: 1,
      action: 'click',
      clicked: false
    }],

    'm.dangdang.com': [{
      selector: 'app_list',
      type: 'class',
      action: 'remove'
    }],

    'i.meituan.com': [{
      selector: 'banner',
      type: 'class',
      action: 'remove'
    }, {
      selector: 'i_link',
      type: 'id',
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
      }, 10);

      break;
    }
  }
})();
