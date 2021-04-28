import fetch from "../fetch";
import baseServ from "../baseServ";
import FN from "../../publicFn/publicFn"
export default {
	...baseServ,
	apis: {
		// 搜索音乐
        get_courseList:`search?`
	},
	/**
	* 将接口路径后面加上时间戳
	* @param {String} url -接口
	*/
	joinDate:url => {
		return `${url}date=${FN.createDate()}`
	},
	/**
	* 搜索音乐
	* @param {String} keywords -搜索条件
	*/
	getMusicList(keywords){
		return fetch({
			url: `${this.joinDate(this.apis.get_courseList)}`,
			method: "post",
			data: {
				keywords
			},
		});
    }
};