function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function dateFormat(date, fmt) {
  var d = new Date(date);
  var o = {
      'M+': d.getMonth() + 1, //月份
      'd+': d.getDate(), //日
      'h+': d.getHours(), //小时
      'm+': d.getMinutes(), //分
      's+': d.getSeconds(), //秒
      'q+': Math.floor((d.getMonth() + 3) / 3), //季度
      //'S': d.getMilliseconds() //毫秒
  };

  //o['S'] = ('000' + o['S']).substr(('' + o['S']).length);

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}
function checkTel(tel) {
  var isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
  var ret = isMob.test(tel);
  return ret;
}

module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
  checkTel: checkTel
}
