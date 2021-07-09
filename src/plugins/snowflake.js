// 定义雪花
function CreateSnow(snowBox, src1, src2) {
	try {
		this.snowBox = document.getElementById(snowBox) // 找到容器
		this.maxLeft = this.snowBox.offsetWidth - Math.random() * 5 + 3 // 运动范围
		this.maxTop = this.snowBox.offsetHeight - Math.random() * 5 + 3
		this.left = this.snowBox.offsetWidth * Math.random() // 起始位置
		this.top = this.snowBox.offsetHeight * Math.random()
		this.angle = 1.1 + 0.8 * Math.random() // 飘落角度
		this.minAngle = 1.1
		this.maxAngle = 1.9
		this.angleDelta = 0.01 * Math.random()
		this.speed = 1.4 + Math.random() // 下落速度
		const random = Math.floor(Math.random() * 2 + 1)
		if (random === 1) {
			this.createEle(src1)
		} else {
			this.createEle(src2)
		}
	} catch (err) {
		console.warn(err)
	}
}
// 雪片生成+下落
CreateSnow.prototype = {
	// 生成雪花元素
	createEle: function(baseSrc) {
		const image = new Image()
		image.src = baseSrc
		this.ele = document.createElement('img')
		this.ele.setAttribute('src', baseSrc)
		this.ele.style.position = 'absolute'
		this.ele.style.zIndex = '99'
		this.snowBox.appendChild(this.ele)
		// 设置雪花尺寸
		const img = this.ele
		// 判断IE
		function isIE() {
			const b = document.createElement('b')
			b.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->'
			return b.getElementsByTagName('i').length === 1
		}
		image.onload = function() {
			const imgW = image.width
			img.setAttribute('width', Math.ceil(imgW * (0.1 + Math.random())))
			// 如果旧IE，设置高度
			if (isIE()) {
				const imgH = image.height
				img.setAttribute('height', Math.ceil(imgH * (0.1 + Math.random())))
			}
		}
	},
	// 雪花运动
	move: function() {
		if (this.angle < this.minAngle || this.angle > this.maxAngle) {
			this.angleDelta = -this.angleDelta
		}
		this.angle += this.angleDelta
		this.left += this.speed * Math.cos(this.angle * Math.PI)
		this.top -= this.speed * Math.sin(this.angle * Math.PI)
		if (this.left < 0) {
			this.left = this.maxLeft
		} else if (this.left > this.maxLeft) {
			this.left = 0
		}
		// 雪花掉出来后回到顶部
		if (this.top > this.maxTop) {
			this.top = 0
		}
		this.ele.style.left = this.left + 'px'
		this.ele.style.top = this.top + 'px'
	}
}
export default { CreateSnow }
