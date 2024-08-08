import utils from 'hey-utils';
import store from 'js/vuex/store';
import Vue from 'vue';

const rclass = /[\t\r\n\f]/g;

function pow1024(num) {
  return Math.pow(1024, num);
}

export function openWindow(url, opt) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

export default utils.extend({}, utils, {
  getClass(elem) {
    return (elem.getAttribute && elem.getAttribute('class')) || '';
  },
  hasClass(elem, selector) {
    let className;
    className = ` ${selector} `;
    if (elem.nodeType === 1 && (` ${this.getClass(elem)} `)
      .replace(rclass, ' ')
      .indexOf(className) > -1) {
      return true;
    }

    return false;
  },
  last(list) {
    return list[list.length - 1];
  },
  first(list) {
    return list[0];
  },
  confirm(that, content, next) {
    let params = {
      title: '提 醒',
      content: content,
      buttons: [
        {
          type: 'cancel',
          name: '取消'
        },
        {
          type: 'confirm',
          name: '确认',
          color: 'primary'
        }
      ],
      className: 'modal-confirm',
      events: {
        confirm: modal => {
          if (next) {
            next(modal);
          } else {
            modal.close();
          }
        },
        cancel: modal => {
          modal.close();
        }
      }
    };
    that.$Modal(params);
  },
  downloadFile(url, target = '_blank', fileName) {
    const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    if (/(iP)/g.test(window.navigator.userAgent)) {
      console.error('Your browser does not support download!');
      return false;
    }
    if (isChrome || isSafari) {
      const link = document.createElement('a');
      link.href = url;
      link.target = target;

      if (link.download !== undefined) {
        link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
      }

      if (document.createEvent) {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }
    if (url.indexOf('?') === -1) {
      url += '?download';
    }

    openWindow(url, { target });
    return true;
  },
  getCity(idProvince) {
    let now = 0;
    let selects = [];
    // let list = G.get('organizes');
    let list = store.getters['organizes'];
    list.forEach(e => {
      if (e.level == 1200 && e.idProvince == idProvince) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getZone(idCity) {
    let now = 0;
    let selects = [];
    // let list = G.get('organizes');
    let list = store.getters['organizes'];
    list.forEach(e => {
      if (e.level == 1100 && e.idCity == idCity) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  //学校
  getSchool(idZone) {
    let now = 0;
    let selects = [];
    let list = store.getters['organizes'];
    list.forEach(e => {
      if (e.level == 1000 && e.idZone == idZone) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  //学段
  getStage(idSchool) {
    let now = 0;
    let selects = [];
    let list = store.getters['organizes'];
    list.forEach(e => {
      if (e.level == 1000 && e.idSchool == idSchool) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  //年级
  getGrade(idGrade) {
    let now = 0;
    let selects = [];
    let list = store.getters['organizes'];
    console.log(list)
    list.forEach(e => {
      if (e.level == 1000 && e.idGrade == idGrade) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getStamp(str) {
    let strs = str.split('-');
    return new Date(strs[0], strs[1] - 1, strs[2]).getTime();
  },
  getName(id) {
    // let list = G.get('organizes');
    let list = store.getters['organizes'];
    for (let i = 0; list && i < list.length; i++) {
      if (list[i].id == id) {
        return list[i].name;
      }
    }
    return '';
  },
  getYear() {
    let now = 0;
    let str = null;
    let selects = [];
    // let list = G.get('years');
    let list = store.getters['years'];
    ;
    list.forEach(e => {
      selects.push({
        title: e.name,
        key: e.id
      });
      if (e.semester > 0) {
        now = e.id;
        str = e.name;
      }
    });
    return { selects, now, str };
  },
  getTitle(obj) {
    let val = '';
    obj.selects.forEach(e => {
      if (e.key == obj.now) {
        val = e.title;
      }
    });
    return val;
  }
});

/**
 * 验证手机号码
 * @param phone
 * @returns {boolean}
 */
export function isPhone(phone) {
  let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
};

/**
 * 获取当前时间
 * @returns {string}
 */
export function getTime() {
  let objDate = new Date();
  let strYear = objDate.getFullYear();
  let strMonth = objDate.getMonth() + 1;
  strMonth = strMonth >= 10 ? strMonth : ('0' + strMonth);
  let strDay = objDate.getDate();
  strDay = strDay >= 10 ? strDay : ('0' + strDay);
  let strHours = objDate.getHours();
  strHours = strHours >= 10 ? strHours : ('0' + strHours);
  let strMinutes = objDate.getMinutes();
  strMinutes = strMinutes >= 10 ? strMinutes : ('0' + strMinutes);
  let strSeconds = objDate.getSeconds();
  strSeconds = strSeconds >= 10 ? strSeconds : ('0' + strSeconds);
  let strRst = strYear + '-' + strMonth + '-' + strDay + ' ' + strHours + ':' + strMinutes + ':' + strSeconds;
  return strRst;
}

/**
 * 获取GUID
 * */
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + '_' + S4() + '_' + S4() + '_' + S4() + '_' + S4() + S4() + S4());
}

/**
 * 获取随机字符串
 *
 * @param lngSize:字符串长度
 * @param isTimeStamp:是否附加时间戳
 */
export function getRandomChar(lngSize, isTimeStamp) {
  let strBase = '0123456789qwertyuioplkjhgfdsazxcvbnm';
  let strValue = '';
  let strTimeStamp = new Date().getTime();
  for (let i = 0; i < lngSize; i++) {
    strValue += strBase.charAt(Math.ceil(Math.random() * 100000000) % strBase.length);
  }
  if (isTimeStamp) {
    strValue = strTimeStamp + strValue;
  }
  return strValue;
}

/**
 * html编码
 * @param {编码字符串} str
 */
export function htmlEncodeByRegExp(str) {
  let temp = '';
  if (str.length == 0) return '';
  temp = str.replace(/&/g, '&amp;');
  temp = temp.replace(/</g, '&lt;');
  temp = temp.replace(/>/g, '&gt;');
  temp = temp.replace(/\s/g, '&nbsp;');
  temp = temp.replace(/\'/g, '&#39;');
  temp = temp.replace(/\"/g, '&quot;');
  return temp;
}

/**
 * html解码
 * @param {解码字符串} str
 */
export function htmlDecodeByRegExp(str) {
  let temp = '';
  if (str.length == 0) return '';
  temp = str.replace(/&amp;/g, '&');
  temp = temp.replace(/&lt;/g, '<');
  temp = temp.replace(/&gt;/g, '>');
  temp = temp.replace(/&nbsp;/g, ' ');
  temp = temp.replace(/&#39;/g, '\'');
  temp = temp.replace(/&quot;/g, '"');
  return temp;
}

/**
 *
 * @param result
 * @param msg
 */
export function executeResult(result, msg) {
  this.result = result;
  this.msg = msg;
}

/**
 * 是否数字
 * @param str
 * @returns {boolean}
 */
export function isNumeric(str) {
  return /^\d+$/.test(str);
}

/**
 * 是否整数
 * @param str
 * @returns {boolean}
 */
export function isInteger(str) {
  if (!isNumeric(str)) {
    return false;
  }
  if (isNaN(parseInt(str))) {
    return false;
  }
  return true;
}

/**
 * 随机数
 * @param max
 * @returns {number}
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * 序号转字母
 * @param num
 * @returns {string}
 */
export function numberToLetter(num) {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters.substr(num - 1, 1);
}

/**
 * 克隆
 * @param target
 * @returns {*[]|*}
 */
export function objectClone(target) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  let copy = Array.isArray(target) ? [] : {};

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      copy[key] = objectClone(target[key]);
    }
  }
  return copy;
}

export function filterSize(size) {
  if (!size) return '';
  if (size < pow1024(1)) return size + ' B';
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
  return (size / pow1024(4)).toFixed(2) + ' TB';
}

export function getApiURL() {
  // let url = 'http://43.143.240.186:8989/api';
  // let url = 'http://127.0.0.1:8989/api';

  //let url = 'http://192.168.110.127/api';
  //let url = 'http://222.128.67.163:8866/api';
  //let url = 'http://nnyun.w1.luyouxia.net:80/api';

  let url = 'http://yiqi.nnyun.net:80/api';
  return url;
}

export function getFileURL() {
  let url = 'http://222.128.67.163:8866/';
  return url;
}
export function getTextApiKey() {
  let api_key = '1sei2zuzrprgt03033r53uiwrxf8ijs3w4g8kyuflq1n6cui';
  return api_key;
}
