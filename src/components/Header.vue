<style lang="scss" scoped>
	.header{
		padding: 30px;
		padding-bottom: 0;
		clear: both;
		overflow: hidden;
		background: url('../assets/img/f37b41a05da73abd0bee55c9ebf38928.jpg') no-repeat 0 -200px;
		-webkit-background-size: 100%;
		background-size: 100%;
		.title{
			height:40px;
			margin-top: 10px;
			margin-bottom: 70px;
			line-height: 40px;
			font-size: 30px;
			color: #295CA2;
			text-shadow: 0 0 2px #fff, 0 0 8px #ff0;
		}
		.icon{
			float: left;
			width: 130px;
			height: 130px;
			margin-right: 20px;
		}
		.detail{
			padding-top: 60px;
			.name{
				line-height: 30px;
				font-size: 24px;
				color: #00BFFF;
			}
			.nav{
				height: 40px;
				margin-top: 10px;
				font-size: 16px;
				font-weight: bold;
				line-height: 40px;
				color: #fff;
				>div{
					margin-right: 40px;
					float: left;
					cursor: pointer;
				}
			}
		}
	}
</style>
<template>
    <div class="header">
		<div class="title">{{user.nickName}}的博客</div>
		<div class="icon">
			<img :src="user.icon" alt="">
		</div>
		<div class="detail">
			<div class="name">{{user.nickName}}</div>
			<div class="nav">
				<div class="blog"><router-link :to="blogLink">Blog</router-link></div>
				<div class="favorite">收藏</div>
				<div class="follow">关注</div>
			</div>
		</div>
    </div>
</template>
<script type="text/ecmascript-6">
	import {mapGetters,mapActions} from 'vuex';
	export default{
	    data(){
	        return {
	            blogLink: '',
			}
		},
		created(){
	        this.blogLink = '/homepage/blog/' + this.user.sid;
		},
		methods: {
			...mapActions([
			    'getUserArticle'
			]),
			getUserArticles(currentPage){
				let _this = this;
				this.getUserArticle({
					pagination: {
						pageSize: 5,
						currentPage: currentPage
					},
					sid: _this.user.sid
				});
			}
		},
		computed: {
			...mapGetters([
			    'user'
			])
		}
	}
</script>
