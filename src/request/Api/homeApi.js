import fetch from "../fetch";
import baseServ from "../baseServ";

export default {
	...baseServ,
	apis: {
		// 查询总后台监课课程列表
        get_courseList:"search?"
	},
	/**
	* 查询总后台监课课程列表
	* @param {String} keywords -搜索条件
	*/
	getM(keywords){
		return fetch({
			url: this.apis.get_courseList,
			method: "post",
			data: {
				keywords
			},
		});
    }
};