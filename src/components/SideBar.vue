<template>
    <div class="side-bar">
		<a href="javascript:;" @click="newArticle">发布文章</a>
		<a href="javascript:;">特别关心</a>
		<a href="javascript:;">关注的人</a>
		<a href="javascript:;">我的收藏</a>
		<a href="javascript:;">我的等级</a>
    </div>
</template>
<script type="text/ecmascript-6">
	import router from '../router';
	export default{
	    data(){
	        return {

			}
		},
		methods: {
	        newArticle(){
	            router.push('newArticle');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.side-bar{
		width: 200px;
		color: #e4e4e4;
		text-align: center;
		line-height: 40px;
		a{
			display: block;
			height: 40px;
			color: #e4e4e4;
			text-decoration: none;
		}
		a:hover{
			background-color: rgba(0, 191, 255, 0.2);
		}
	}
</style>
