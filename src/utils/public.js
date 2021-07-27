const publicFunction = {
	/**
	* 将接口路径后面加上时间戳
	* @param {String} url 接口路径
	*/
	joinTime: url => `${url}?time=${new Date().getTime()}`,
	/**
	* 数字转整数 如 100000 转为10万
	* @param {Number} num 需要转化的数
	* @param {Number} point 需要保留的小数位数
	*/
	tranNumber(num, point) {
		let numStr = num.toString()
		// 十万以内直接返回
		if (numStr.length < 6) {
			return numStr
		}
		// 大于8位数是亿
		else if (numStr.length > 8) {
			let decimal = numStr.substring(
				numStr.length - 8,
				numStr.length - 8 + point
			)
			return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
		}
		//大于6位数是十万 (以10W分割 10W以下全部显示)
		else if (numStr.length > 5) {
			let decimal = numStr.substring(
				numStr.length - 4,
				numStr.length - 4 + point
			)
			return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
		}
	},
	/**
	* 休眠
	* @param {Number} time 休眠时间
	*/
	sleep(time = 1000) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, time)
		})
	},
	/**
  * 去除首尾空格或内部全部空格
  * @param {String} value 字符串
  * @param {Boolean} all 全部空格
  */
	trim(value, all = false) {
    let reg = /(^\s*)|(\s*$)/g
    if (all) {
      reg = /\s/g
    }
    return value.replace(reg, '')
  },
	/**
  * 下载文件
  * @param {string} url 文件地址
  */
	downloadFile(url) {
    let aaa = document.createElement('a')
    aaa.setAttribute('id', 'download')
    aaa.setAttribute('href', url)
    aaa.style.display = 'none'
    document.body.appendChild(aaa)
    aaa.click()
    document.body.removeChild(document.getElementById('download'))
  },
	/**
  * 对象深拷贝
  * @param {Object} obj 目标对象
  */
	deepClone(obj) {
		let target
		if (typeof obj === 'object') {
			target = Array.isArray(obj) ? [] : {}
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] !== 'object') {
						target[key] = obj[key]
					} else {
						target[key] = publicFunction.deepClone(obj[key])
					}
				}
			}
		} else {
			target = obj
		}
		return target
	}
}

export default publicFunction