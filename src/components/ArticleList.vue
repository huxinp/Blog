<style lang="scss" scoped>
	.list{
		width: 600px;
		padding: 10px;
	}
	.item{
		margin-bottom: 20px;
		background-color: #fff;
	}
	.article-author{
		.icon{
			width: 40px;
			height: 40px;
			float: left;
			margin-right: 10px;
			img{
				max-width: 100%;
				max-height: 100%;
			}
		}
		.nick-name{
			padding-top: 5px;
			font-weight: bold;
			color: #00BFFF;
		}
		.create-time{
			font-size: 12px;
		}
	}
	.article-title{
		font-weight: bold;
		padding: 10px 20px 0;
	}
	.article-content{
		padding: 10px;
	}
	.article-refs{
		padding: 10px;
		.img-warp{
			width: 100px;
			height: 100px;
			margin-right: 5px;
			display: inline-block;
			img{
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
	.article-control{
		clear: both;
		overflow: hidden;
		font-size: 12px;
		padding: 5px;
		>div{
			float: left;
			margin-right: 20px;
		}
	}
</style>
<template>
    <div class="article-list">
		<div class="list">
			<div class="item" v-for="item in articleList" @click="getArticleFn(item.sid)">
				<div class="article-header">
					<div class="article-author">
						<div class="icon">
							<img :src="item.author.icon" alt="">
						</div>
						<div class="nick-name">{{item.author.nickName}}</div>
						<div class="create-time">{{item.createdTimestamp}}</div>
					</div>
				</div>
				<div class="article-title">
					{{item.title}}
				</div>
				<div class="article-content" v-if="item.content">
					{{item.content}}
				</div>
				<div class="article-refs" v-if="item.picture">
					<!--<div class="img-warp" v-for="ref in item.refs">-->
						<!--<img :src="ref.src" alt="">-->
					<!--</div>-->
					<div class="img-warp">
						<img :src="item.picture" alt="">
					</div>
				</div>
				<div class="article-control">
					<div class="topic" v-if="item.topic">#{{item.topic.name}}#</div>
					<div class="received">赞</div>
					<div class="favorite">收藏</div>
				</div>
			</div>
		</div>
		<Pagination v-show="pagination.currentPage" :currentPage="pagination.currentPage" :totalPage="pagination.totalPage" :gotoPage="getArticleFn" />
    </div>
</template>
<script type="text/ecmascript-6">
	import Pagination from './Pagination.vue';
	import {mapActions,mapGetters} from 'vuex';
	export default{
	    data(){
	        return {
				sid: '',
			}
		},
		created(){
	        this.sid = this.$route.params.sid;
	        this.getArticlesFn(1);
		},
		methods: {
			...mapActions([
			    'getFreshArticle',
				'getUserArticle',
				'getArticle'
			]),
			getFreshArticleFn(currentPage){
			    this.getFreshArticle({
					pageSize: 5,
					currentPage: currentPage
				});
			},
			getUserArticleFn(currentPage){
				let _this = this;
				this.getUserArticle({
					pagination: {
						pageSize: 5,
						currentPage: currentPage
					},
					sid: _this.user.sid
				});
			},
			getArticlesFn(currentPage){
				if(this.$route.params.sid){
					this.getUserArticleFn(1)
				}else{
					this.getFreshArticleFn(1)
				}
			},
			getArticleFn(articleSid){
			    this.getArticle(articleSid);
			}
		},
		computed: {
			...mapGetters([
			    'articleList',
				'pagination'
			])
		},
		mounted(){

		},
		components: {
	        Pagination
		},
		watch: {
		    sid(){
		        this.getArticleFn(1);
			}
		}
	}
</script>
