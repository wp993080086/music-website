import store from "../store/index.js";

export default{
    open(){
        console.log(store.state.i)//访问vueX的数据
        store.commit("ceshi",2)//修改vueX的数据
    },
    /**
	* Element的msg提示弹窗
	* @param {string} msg   提示语
    * @param {number} myType  类型 1 成功 2 警告 3 普通 4 错误
    * @param {number} time  时间 毫秒
	*/
    myMsg(msg, myType, time){
        switch(myType){
            case 1:
                this.$message({message: msg, type: 'success', duration: time });
                break;
            case 2:
                this.$message({message: msg, type: 'warning', duration: time });
                break;
            case 3:
                this.$message({message: msg, duration: time });
                break;
            case 4:
                this.$message({message: msg, type: 'error', duration: time });
                break;
        }
    },
    // 生成随机uuid
    createUuid() {
        let Time = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function(res) {
            let Random = (Time + Math.random() * 16) % 16 | 0;
            Time = Math.floor(Time / 16);
            return (res == 'x' ? Random : (Random & 0x3 | 0x8)).toString(16);
        });
        return "pdd"+ uuid;
    },
    // 生成时间戳
    createDate() {
        return Date.parse( new Date());
    },
    // 获取url后面的参数
    getUrlParams(Name) {
        var url = window.location.search;
        if (url.indexOf('?') == 1) { return false; }
        url = url.substr(1);
        url = url.split('&');
        var name = Name || '';
        var nameres;
        // 获取全部参数及其值
        for(var i=0;i<url.length;i++) {
            var info = url[i].split('=');
            var obj = {};
            obj[info[0]] = decodeURI(info[1]);
            url[i] = obj;
        }
        // 如果传入一个参数名称，就匹配其值
        if (name) {
            for(let i=0;i<url.length;i++) {
                for (const key in url[i]) {
                    if (key == name) {
                        nameres = url[i][key];
                    }
                }
            }
        } else {
            nameres = url;
        }
        // 返回结果
        return nameres;
    },
    /**
    * url转base64
    * @param {String} url - url地址
    */
    urlToBase64(url) {
        return new Promise ((resolve,reject) => {
            let image = new Image();
            image.onload = function() {
                let canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;
                // 将图片插入画布并开始绘制
                canvas.getContext('2d').drawImage(image, 0, 0);
                // result
                let result = canvas.toDataURL('image/png')
                resolve(result);
            };
            // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
            image.setAttribute("crossOrigin",'Anonymous');
            image.src = url;
            // 图片加载失败的错误处理
            image.onerror = () => {
                reject(new Error('转换失败'));
            };
        });
    },
    /**
    * DataUrl转为File
    * @param {String} dataUrl - dataUrl地址
    * @param {String} fileName - file文件名
    */
    dataURLtoFile(dataUrl, fileName){
        var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
    }
}