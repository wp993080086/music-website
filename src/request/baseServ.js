import { Message } from 'element-ui'

export default {
	statusHandle(code, msg) {
		switch (code) {
		case 'w':
			this.toast(msg)
			break
		case 'n':
			this.toast(msg)
			break
		}
	},
	toast(message) {
		Message({
			type: 'error',
			message,
			duration: 1000
		})
	}
}
