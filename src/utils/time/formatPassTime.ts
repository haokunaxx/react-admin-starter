const TEN_SEC = 10,
  ONE_MIN_SEC = TEN_SEC * 6,
  ONE_HOUR_SEC = ONE_MIN_SEC * 60,
  ONE_DAY_SEC = ONE_HOUR_SEC * 24,
  ONE_MONTH_SEC = ONE_DAY_SEC * 31,
  ONE_YEAR_SEC = ONE_DAY_SEC * 365

/**
 * @description 通过传入的时间戳返回相对于当前时间的相对格式。
 * 
 * 有以下几种格式：
    - 刚刚
    - -秒前
    - -分钟前
    - -个小时前
    - -天前
    - -个月前
    - -年前
 * @param {number} timestamp 时间戳
 * @return {string} 相对于当前时间的相对格式
*/
export function formatPassTime(timestamp: number = Date.now() + 1): string {
  const now = Date.now()
  const diffTemp = (now - timestamp) / 1000
  let res = ''
  if (diffTemp < 0) return res
  const map: [(val: number) => boolean, (val: number) => string][] = [
    [(val) => val < TEN_SEC, () => '刚刚'],
    [(val) => val >= TEN_SEC && val < ONE_MIN_SEC, (val) => `${val}秒前`],
    [
      (val) => val >= ONE_MIN_SEC && val < ONE_HOUR_SEC,
      (val) => `${Math.floor(val / ONE_MIN_SEC)}分钟前`
    ],
    [
      (val) => val >= ONE_HOUR_SEC && val < ONE_DAY_SEC,
      (val) => `${Math.floor(val / ONE_HOUR_SEC)}个小时前`
    ],
    [
      (val) => val >= ONE_DAY_SEC && val < ONE_MONTH_SEC,
      (val) => `${Math.floor(val / ONE_DAY_SEC)}天前`
    ],
    [
      (val) => val >= ONE_MONTH_SEC && val < ONE_YEAR_SEC,
      (val) => `${Math.floor(val / ONE_MONTH_SEC)}个月前`
    ],
    [
      (val) => val >= ONE_YEAR_SEC,
      (val) => `${Math.floor(val / ONE_YEAR_SEC)}年前`
    ]
  ]
  const diff = Math.floor(diffTemp)
  for (const [condFn, getter] of map) {
    if (condFn(diff)) {
      res = getter(diff)
      break
    } else {
      continue
    }
  }
  return res
}

/*
  测试用例：
    console.log(formatPassTime(Date.now() - 9920)) //刚刚
    console.log(formatPassTime(Date.now() - 59123)) //59秒前
    console.log(formatPassTime(Date.now() - 120 * 1000)) //2分钟前
    console.log(formatPassTime(Date.now() - 179 * 1000)) //2分钟前
    console.log(formatPassTime(Date.now() - 181 * 1000)) //3分钟前
    console.log(formatPassTime(Date.now() - 59 * 60 * 1000)) //59分钟前
    console.log(formatPassTime(Date.now() - (59 * 60 + 30) * 1000)) //59分钟前
    console.log(formatPassTime(Date.now() - 60 * 60 * 1000)) //1个小时前
    console.log(formatPassTime(Date.now() - 119 * 60 * 1000)) //1个小时前
    console.log(formatPassTime(Date.now() - 120 * 60 * 1000)) //2个小时前
    console.log(formatPassTime(Date.now() - 23 * 60 * 60 * 1000)) //23个小时前
    console.log(formatPassTime(Date.now() - (23 * 60 * 60 + 59 * 60) * 1000)) //23个小时前
    console.log(formatPassTime(Date.now() - 24 * 60 * 60 * 1000)) //1天前
    console.log(formatPassTime(Date.now() - 30 * 24 * 60 * 60 * 1000)) //30天前
    console.log(formatPassTime(Date.now() - 31 * 24 * 60 * 60 * 1000)) //1个月前
    console.log(formatPassTime(Date.now() - 10 * 31 * 24 * 60 * 60 * 1000)) //10个月前
    console.log(formatPassTime(Date.now() - 364 * 24 * 60 * 60 * 1000)) //11个月前
    console.log(formatPassTime(Date.now() - 365 * 24 * 60 * 60 * 1000)) //1年前
    console.log(formatPassTime(Date.now() - 700 * 24 * 60 * 60 * 1000)) //1年前
    console.log(formatPassTime(Date.now() - 730 * 24 * 60 * 60 * 1000)) //2年前
    console.log(formatPassTime()) //
*/
