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
			<div class="item" v-for="item in articleList">
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
				<div class="article-refs" v-if="item.refs">
					<div class="img-warp" v-for="ref in item.refs">
						<img :src="ref.src" alt="">
					</div>
				</div>
				<div class="article-control">
					<div class="topic" v-if="item.topic">#{{item.topic.name}}#</div>
					<div class="received">赞</div>
					<div class="favorite">收藏</div>
				</div>
			</div>
		</div>
		<Pagination v-show="pagination.currentPage" :currentPage="pagination.currentPage" :totalPage="pagination.totalPage" :gotoPage="getArticles" />
    </div>
</template>
<script type="text/ecmascript-6">
	import Pagination from './Pagination.vue';
	import {mapActions,mapGetters} from 'vuex';
	export default{
	    data(){
	        return {

			}
		},
		created(){
	        this.getArticles(1);
		},
		methods: {
			...mapActions([
			    'getFreshArticle'
			]),
			getArticles(currentPage){
			    this.getFreshArticle({
					pageSize: 5,
					currentPage: currentPage
				})
			}
		},
		computed: {
			...mapGetters([
			    'articleList',
				'pagination'
			])
		},
		components: {
	        Pagination
		}
	}
</script>
