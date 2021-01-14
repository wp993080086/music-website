<template>
  <div>
    <HelloWorld msg="搜索音乐"/>
		<el-input v-model="value" placeholder="请输入内容开始搜索" @input="searchFn"></el-input>
		<div>
			<p v-for="(item,index) in list" :key="item.id">
				第{{index}}首：{{item.name}}
			</p>
		</div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import homeApi from "../request/Api/homeApi";

export default {
  name: 'Home',
  props: {
    msg: String
	},
	data(){
		return {
			value:"",
			list:[]
		}
	},
  created() {},
	mounted() {},
	destroyed() {},
	methods: {
		// 搜索音乐
		searchFn(){
			if(this.value.length > 0){
				homeApi.getMusicList(this.value).then(res=>{
					console.log(res)
					this.list = res.result.songs;
				})
			}else{
				this.list = [];
			}
		}
	},
	components: {
    HelloWorld
	},
	watch: {},
}
</script>

<style scoped>

</style>
