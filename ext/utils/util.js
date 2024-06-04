const blob_type = 'blob:http://';

/**
 * 判断值是否为空
 * @param {判断的值} value
 */
function isNullOrEmpty(value) {
    if (null == value || 'undefined' == typeof (value) || undefined == typeof (value)) {
        return true;
    }
    if (value instanceof String) {
        if (0 == value.length) {
            return true;
        }
    }
    return false;
}

/**
 * 获取客户端时间
 */
function getTime() {
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
    let strRst = strYear + "-" + strMonth + "-" + strDay + " " + strHours + ":" + strMinutes + ":" + strSeconds;
    return strRst;
}

/**
 * 转换为时分秒
 * @param {any} time
 */
function convertTime(time) {
    // 转换为式分秒
    let h = parseInt(time / 60 / 60 % 24)
    h = h < 10 ? '0' + h : h
    let m = parseInt(time / 60 % 60)
    m = m < 10 ? '0' + m : m
    let s = parseInt(time % 60)
    s = s < 10 ? '0' + s : s
    // 作为返回值返回
    return [h, m, s]
}

/**
 * 获取随机字符串
 *
 * @param lngSize:字符串长度
 * @param isTimeStamp:是否附加时间戳
 */
function getRandomChar(lngSize, isTimeStamp) {
    let strBase = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    let strValue = "";
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
 * 判断是否为数字字符串
 * @param {等待验证的值} str
 */
function isNumeric(str) {
    return /^\d+$/.test(str);
}

/**
 * 验证是否为整数
 * 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
 * @param {等待验证的值} str
 */
function isInteger(str) {
    if (!isNumeric(str)) {
        return false;
    }
    if (isNaN(parseInt(str))) {
        return false;
    }
    return true;
}

/**
 * 判断是否为浮点数
 * @param {等待验证的值} str
 */
function isFloat(str) {
    if (!isDouble(str)) {
        return false;
    }
    if (isNaN(parseFloat(str))) {
        return false;
    }
    return true;
}

/**
 * 判断是否为浮点数字符串
 * @param {等待验证的值} str
 */
function isDouble(str) {
    return /^(-?\d+)(\.\d+)?$/.test(str);
}

/**
 * 判断是否为数字
 * @param {等待验证的值} str
 */
function isDigit(str) {
    return (isInteger(str) || isFloat(str))
}

/**
 * 判断是否为手机号码
 * @param {等待验证的值} str
 */
function isPhoneNumber(str) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(str);
}

/**
 * 判断是否为电子邮箱
 * @param {等待验证的值} str
 */
function isEmail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    return reg.test(str)
}

/**
 * 判断是否为IPV4
 * @param str
 * @returns {boolean}
 */
function isIPv4(str) {
    let pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    let ips = str.split('.');
    if (!(ips && 4 == ips.length)) {
        return false;
    }
    for (let i = 0; i < ips.length; i++) {
        if (!isInteger(ips[i])) {
            return false;
        }
        let ip = parseInt(ips[i]);
        if (ip < 0 || ip > 255) {
            return false;
        }
    }
    return pattern.test(str);
}

/**
 * 判断字符串是否
 * @param str
 * @returns {boolean}
 */
function isBlob(str) {
    return str.startsWith(blob_type);
}

/**
 * 获取URL查询参数值
 * @param {any} name
 */
function getParameterValue(name) {
    let search = location.search.substring(1)
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    let result = search.match(reg)
    if (result == null) {
        return null
    } else {
        return result[2]
    }
}

/**
 * html编码
 * @param {any} str
 */
function htmlEncodeByRegExp(str) {
    let temp = "";
    if (str.length == 0) return "";
    temp = str.replace(/&/g, "&amp;");
    temp = temp.replace(/</g, "&lt;");
    temp = temp.replace(/>/g, "&gt;");
    temp = temp.replace(/\s/g, "&nbsp;");
    temp = temp.replace(/\'/g, "&#39;");
    temp = temp.replace(/\"/g, "&quot;");
    return temp;
}

/**
 * html解码
 * @param {any} str
 */
function htmlDecodeByRegExp(str) {
    let temp = "";
    if (str.length == 0) return "";
    temp = str.replace(/&amp;/g, "&");
    temp = temp.replace(/&lt;/g, "<");
    temp = temp.replace(/&gt;/g, ">");
    temp = temp.replace(/&nbsp;/g, " ");
    temp = temp.replace(/&#39;/g, "\'");
    temp = temp.replace(/&quot;/g, "\"");
    return temp;
}

/**
 * 获取GUID
 * */
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4() + S4());
}

/**
 * 清除标点
 * @param str
 * @returns {*}
 */
function palindrome(str) {
    let arr = str.replace(/[`:_.~!@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~！@#￥%……&*（）—— \+ ={}|《》？：“”【】、；‘’，。、]/g,
        '');
    return arr;
}

/**
 * 获取中文字符串
 * @param {字符串} str
 */
function getChineseString(str) {
    let reg = /[\u4e00-\u9fa5]/g;
    let result = str.match(reg);
    if (isNullOrEmpty(result)) {
        return '';
    }
    return result.join("");
}

/**
 * 判断是否存在方法
 * @param {any} fname
 */
function functionExists(fname = '') {
    let res = false;
    try {
        if (typeof (eval(fname)) == "function") {
            // 存在
            res = true;
        } else {
            // 不存在
            res = false;
        }
    } catch (e) {
        // 不存在
        res = false;
    }
    return res;
}

/**
 * 通用脱敏方法
 * @param str
 * @param beginLen
 * @param endLen
 * @returns {*|string}
 */
function desensitization(str, beginLen, endLen) {
    let len = str.length;
    let firstStr = str.substr(0, beginLen);
    let lastStr = str.substr(endLen);
    let middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/ig, '*');
    let result = firstStr + middleStr + lastStr;
    return result;
}

/**
 * 电话号码脱敏
 * @param str
 * @returns {string|*}
 */
function encryptPhone(str) {
    if (null != str && str != undefined) {
        let pat = /(\d{3})\d*(\d{4})/;
        return str.replace(pat, '$1****$2');
    } else {
        return "";
    }
}

/**
 * 身份证脱敏
 * @param str
 * @returns {string|*}
 */
function encryptIdNo(str) {
    if (null != str && str != undefined) {
        let pat = /(\d{4})\d*(\d{4})/;
        return str.replace(pat, '$1***********$2');
    } else {
        return "";
    }
}

/**
 * 姓名脱敏
 * @param str
 * @returns {string}
 */
function encryptName(str) {
    if (null != str && str != undefined) {
        if (str.length <= 3) {
            return "*" + str.substring(1, str.length);
        } else if (str.length > 3 && str.length <= 6) {
            return "**" + str.substring(2, str.length);
        } else if (str.length > 6) {
            return str.substring(0, 2) + "****" + str.substring(6, str.length)
        }
    } else {
        return "";
    }
}

/**
 * 邮件脱敏
 * @param email
 * @returns {string}
 */
function noPassByEmail(email) {
    let new_email = email;
    if (String(email).indexOf('@') > 0) {
        let str = email.split('@');
        let _s = '';
        if (str[0].length > 3) { //@前面多于3位
            for (let i = 3; i < str[0].length; i++) {
                _s += '*';
            }
            new_email = str[0].substr(0, 3) + _s + '@' + str[1];
        } else { //@前面小于等于于3位
            for (let i = 1; i < str[0].length; i++) {
                _s += '*'
            }
            new_email = str[0].substr(0, 1) + _s + '@' + str[1]
        }
    }
    return new_email;
}

/**
 * 数组按照字段分组
 * @param array
 * @param key
 * @returns {*}
 */
function groupBy(array, key) {
    return array.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
