<template>
    <div class="navigation">
		<div class="logo">Blog</div>
		<div class="personal-center">个人中心</div>
		<div class="personal-homepage">我的主页</div>
		<div class="favorite">个人收藏</div>
		<div class="follow">关注的人</div>
		<div class="message">消息</div>
    </div>
</template>
<script type="text/ecmascript-6">
	export default{
	    data(){
	        return {}
		},
		methods: {

		},
		computed: {

		}
	}
</script>
<style lang="scss" scoped>
.navigation{
	width: 100%;
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	color: #fff;
	background-color: #000;
	>div{
		float: left;
		margin: 0 10px;
	}
	.logo{
		font-size: 35px;
		font-weight: bold;
		font-style: italic;
	}
}
</style>
