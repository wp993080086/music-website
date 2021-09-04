import { Message, MessageBox, Notification } from 'element-ui'

export default {
	/**
	* 普通提示
	* @param {String} text
	* @param {Number} time
	*/
	info(text, time = 2000) {
		Message({
			message: text,
			type: 'info',
			duration: time
		})
	},
	/**
	* 成功提示
	* @param {String} text
	* @param {Number} time
	*/
	success(text, time = 2000) {
		Message({
			message: text,
			type: 'success',
			duration: time
		})
	},
	/**
	* 警告提示
	* @param {String} text
	* @param {Number} time
	*/
	warning(text, time = 2000) {
		Message({
			message: text,
			type: 'warning',
			duration: time
		})
	},
	/**
	* 错误提示
	* @param {String} text
	* @param {Number} time
	*/
	error(text, time = 2000) {
		Message({
			message: text,
			type: 'error',
			duration: time
		})
	},
	/**
	* 提示框
	* @param {String} text
	*/
	alert(text) {
		return new Promise((resolve, reject) => {
			MessageBox.alert(text, '温馨提示', {
				confirmButtonText: '确定',
				callback: action => {
					if (action === 'confirm') {
						resolve(action)
					} else {
						reject(action)
					}
				}
			})
		})
	},
	/**
	* 确认框
	* @param {String} text
	* @param {String} type
	*/
	confirm(text, type = 'info') {
		return new Promise((resolve, reject) => {
			MessageBox.confirm(text, '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type,
				callback(action) {
					if (action === 'confirm') {
						resolve(action)
					} else {
						reject(action)
					}
				}
			})
		})
	},
	/**
	* 通知框
	* @param {String} text
	* @param {String} type
	* @param {Number} time
	*/
	notify(text, type = 'info', time = 2000) {
		Notification({
			title: '通知',
			type,
			message: text,
			duration: time
		})
	}
}
