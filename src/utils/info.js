import {
  Message,
  MessageBox,
  Notification,
  Loading
} from "element-ui"

const MSG = {
  /**
	* 轻提示
  * @param {String} msg
	* @param {Number} type
  * @param {Number} time
	*/
  info(msg, type = 0, time = 2000) {
    switch (type) {
      case 0:
        Message({
          message: msg,
          type: 'info',
          duration: time
        })
      break
      case 1:
        Message({
          message: msg,
          type: 'success',
          duration: time
        })
      break
      case 2:
        Message({
          message: msg,
          type: 'warning',
          duration: time
        })
      break
      case 3:
        Message({
          message: msg,
          type: 'error',
          duration: time
        })
      break
    }
  },
  /**
	* 提示框
  * @param {String} msg
	*/
  alert(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.alert(msg, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          resolve(action)
        }
      })
    })
  },
  /**
	* 确认框
  * @param {String} msg
  * @param {String} type
	*/
  confirm(msg, type = 'info') {
    return MessageBox.confirm(msg, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type
    })
  },
  /**
	* 通知框
  * @param {String} msg
  * @param {String} type
  * @param {Number} time
	*/
  notify(msg, type = 'info', time = 2000) {
    Notification({
      title: '通知',
      type,
      message: msg,
      duration: time
    })
  },
  LOADING: null,
  /**
	* 开启&关闭 Loading
  * @param {Boolean} type
	*/
  loading(type = true) {
    if (type) {
      if (MSG.LOADING) {
        MSG.LOADING.close()
        MSG.LOADING = null
      }
      MSG.LOADING = Loading.service({
        lock: false,
        text: '加载中...'
      })
    } else {
      MSG.LOADING && MSG.LOADING.close()
    }
  }
}

export default MSG