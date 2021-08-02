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
	* 格式化时间毫秒转分秒
	* @param {Number} time 时间
	*/
  formatTime(time) {
    time = ~~time
    let formatTime
    if (time < 10) {
      formatTime = '00:0' + time
    } else if (time < 60) {
      formatTime = '00:' + time
    } else {
      var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      if (m < 10) {
        m = '0' + m
      }
      var s = ~~parseInt((time % (1000 * 60)) / 1000)
      if (s < 10) {
        s = '0' + s
      }
      formatTime = m + ':' + s
    }
    return formatTime
  },
	/**
	* 秒转00:00
	* @param {Number} Seconds 秒
	*/
  formatSecondTime(Seconds) {
		const m = Number.parseInt(Seconds / 60)
		let s = Number.parseInt(Seconds % 60)
		s < 10 ? s = `0${s}` : s
		return `0${m}:${s}`
  },
	/**
	* 时间戳转换成几分钟前，几小时前，几天前
	* @param {Number} timestamp 时间戳
	*/
  formatMsgTime(timestamp) {
    let result = ''
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const now = new Date().getTime()
    const diffValue = now - timestamp
    if (diffValue < 0) return
    const monthC = diffValue / month
    const weekC = diffValue / (7 * day)
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + '月前'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前'
    } else {
      result = '刚刚'
    }
    return result
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
	},
	/**
  * 返回数据类型
  * @param  {all} value 任意值 返回数据类型 比如 returnType(false) 返回 'Boolean'
  */
	returnType(value) {
		if(!Number.isNaN) {
			Number.isNaN = function(val) {
				return( typeof(val) === "number" && window.isNaN(val))
			}
		}
		let type
		if(typeof(value) === "number" && isNaN(value)) {
			type = 'NaN'
		} else {
			let info = Object.prototype.toString.call(value)
			type = info.split(' ')[1].split(']')[0]
		}
		return type
	},
	/**
  * 身份证号验证
  * @param  {String} value 身份证号 正确返回true
  */
	identityCardVerify(value) {
		const CITY = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北 ',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏 ',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外 '
		}
		const RegExp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
		let info = true
		if (!value || !RegExp.test(value)) {
			info = '身份证号格式错误'
			return info
		}
		if (!CITY[value.substr(0, 2)]) {
			info = '身份证号地址编码错误'
			return info
		}
		// 18位身份证需要验证最后一位校验位
		if (value.length === 18) {
			value = value.split('')
			// 加权因子
			const FACTOR = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
			// 校验位
			const PARITY = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
			let sum = 0
			let ai = 0
			let wi = 0
			for (let i = 0; i < 17; i++) {
				ai = value[i]
				wi = FACTOR[i]
				sum += ai * wi
			}
			let last = PARITY[sum % 11]
			if (last != value[17]) {
				info = '请输入真实准确的身份证号码'
				return info
			}
		}
		return info
	},
	/**
  * 手机号验证
  * @param  {String} value 手机号
  */
	mobileVerify(value) {
		let info = true
		if (!value) {
			info = '手机号码不能为空'
			return info
		}
		const RegExp = /^1\d{10}$/
		if (!RegExp.test(value)) {
			info = '请输入正确的手机号码'
			return info
		}
		return info
	},
	/**
  * 邮箱验证
  * @param  {String} value 邮箱
  */
	mailboxVerify(value) {
		let info = true
		if (!value) {
			info = '邮箱不能为空'
			return info
		}
		const RegExp = /^[.A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
		if (!RegExp.test(value)) {
			info = '请输入正确的邮箱'
			return info
		}
		return info
	},
	/**
  * 昵称验证
  * @param  {String} value 昵称
  */
	nickNameVerify(value) {
		let info = true
		if (!value) {
			info = '昵称不能为空'
			return info
		}
		const RegExp = /^[A-Za-z\u4e00-\u9fa5\s]+$/
		if (!RegExp.test(value)) {
			info = '昵称仅限汉字或字母'
			return info
		}
		return info
	},
	/**
  * 仅限纯数字验证
  * @param  {String} value 内容
  */
	numberVerify(value) {
		let info = true
		if (!value) {
			info = '不能为空'
			return info
		}
		const RegExp = /^[0-9]*$/
		if (!RegExp.test(value)) {
			info = '请输入纯数字'
			return info
		}
		return info
	},
	/**
  * 仅限数字或字母验证
  * @param  {String} value 内容
  */
	numberOrLetterVerify(value) {
		let info = true
		if (!value) {
			info = '不能为空'
			return info
		}
		const RegExp = /^[0-9a-zA-Z]+$/
		if (!RegExp.test(value)) {
			info = '请输入数字或字母'
			return info
		}
		return info
	},
	/**
  * 仅限汉字或字母验证
  * @param  {String} value 内容
  */
	 chineseOrLetterVerify(value) {
		let info = true
		if (!value) {
			info = '不能为空'
			return info
		}
		const RegExp = /^[A-Za-z\u4e00-\u9fa5]+$/
		if (!RegExp.test(value)) {
			info = '仅限汉字或字母'
			return info
		}
		return info
	},
	/**
  * 仅限汉字或字母或数字验证
  * @param  {String} value 内容
  */
	chineseOrLetterOrNumberVerify(value) {
		let info = true
		if (!value) {
			info = '不能为空'
			return info
		}
		const RegExp = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/
		if (!RegExp.test(value)) {
			info = '仅限汉字、字母或数字'
			return info
		}
		return info
	},
	/**
  * 不允许标点和数字验证
  * @param  {String} value 内容
  */
	notNumPointVerify(value) {
		let info = true
		if (!value) {
			info = '不能为空'
			return info
		}
		const RegExp = /^[A-Za-z\u4e00-\u9fa5()（）]+$/
		if (!RegExp.test(value)) {
			info = '不允许输入标点或数字'
			return info
		}
		return info
	},
	/**
	* 点击复制文本
	* @param {string} text 文本值
	*/
	copyByClick(text) {
    try {
      let input = document.createElement('input')
      document.body.appendChild(input)
      input.value = text
      input.select()
      document.execCommand('copy') // 执行浏览器复制命令
      document.body.removeChild(input)
    } catch (e) {
      console.log(e)
    }
  },
	/**
  * 检查对象字段是否为空或者null
  * @param {Array} text 数组 需要检查的字段数组
  * @param {Object} obj 对象 需要检查的对象
  */
	checkParaIsNullOrEmpty(paraArr, obj) { // 检测对象某个值是否为空
    return paraArr.every((key) => {
      return ![undefined, null, ''].includes(obj[key])
    })
  },
  /**
  * 复制对象中指定key值
  * @param {Array} text 数组 需要复制的key值数组
  * @param {Object} obj 对象
  * @param {boolean} bool 值为数组是否取第一个值
  */
  copyObjKeys(paraArr, obj, bool = true) {
    const res = {}
    paraArr.map(item => {
      if (Object.prototype.toString.call(obj[item]) == '[object Array]' && obj[item].length > 0 && bool) {
        res[item] = obj[item][0]
      } else {
        res[item] = obj[item]
      }
    })
    return res
  },
  /**
  * 找出两个对象中指定字段相等且值不为空的元素
  * @param {Object} OriginalObj 对象
  * @param {Object} obj 对象
  * @param {Array} fields  字段数组
  */
  compareObj(OriginalObj, obj, fields) {
    const res = []
    fields.map((key) => {
      if (![undefined, null, ''].includes(OriginalObj[key])) {
        if (OriginalObj[key] == obj[key]) {
          res.push(key)
        }
      }
    })
    return res
  },
	/**
  * 根据属性值查找key
  * @param {Object} obj
  * @param {String} value
  * @param {Function} compare
  */
	findKey(obj, value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value))
  },
	/**
  * 遍历一棵树，对所有结点做处理，子节点属性为children
  * @param {Object} tree
  * @param {Function} fn
  */
	travTree(tree, fn = function () { }, childrenName = 'children') {
    function trav(node, parent) {
      fn(node, parent)
      if (node[childrenName] && node[childrenName].length > 0) {
        for (let item of node[childrenName]) {
          trav(item, node)
        }
      }
    }
    if (_.isArray(tree)) {
      for (let item of tree) {
        trav(item, null)
      }
    } else {
      trav(tree, null)
    }
  }
}

export default publicFunction