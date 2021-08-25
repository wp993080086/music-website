import { Loading } from 'element-ui'

const LOADING_TIMEOUT = 0

let loading
let timeout

export default {
  /**
	* 打开Loading
  * @param {String} options 额外配置
	*/
  show(options = {}) {
    try {
      timeout = setTimeout(() => {
        loading = Loading.service(Object.assign({
          fullscreen: false,
          body: true,
          lock: true
        }, options))
      }, LOADING_TIMEOUT)
      return loading
    } catch (error) {
      console.warn(error)
    }
  },
  /**
	* 关闭Loading
	*/
  hide() {
    try {
      if (loading) {
        loading.close()
      }
      clearTimeout(timeout)
      return loading
    } catch (error) {
      console.warn(error)
    }
  }
}
