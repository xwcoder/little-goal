/**
 *
 * @param date Date类型或毫秒数时间戳
 * @param f 格式化字符串 如'yyyy-MM-dd hh:mm:ss.SSS'
 * @return s 格式化后的字符串
 */

export function formatTime (date, f) {

  if ({}.toString.call(date) !== '[object Date]') {
    date = new Date(parseInt(date, 10))
  }

  const map = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds()
  }

  for (const k in map) {
    if (new RegExp(`(${k})`).test(f)) {
      f = f.replace(RegExp.$1, `00${map[k]}`.substr(-RegExp.$1.length))
    }
  }
  return f
}
