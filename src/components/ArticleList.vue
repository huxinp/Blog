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
				<div class="article-content">
					{{item.content}}
				</div>
				<div class="refs">
					<div class="img-warp" v-for="ref in item.refs">
						<img :src="ref.src" alt="">
					</div>
				</div>
				<div class="article-control">
					<div class="topic">#{{item.topic.name}}#</div>
					<div class="received">赞</div>
					<div class="favorite">收藏</div>
				</div>
			</div>
		</div>
		<Pagination />
    </div>
</template>
<script type="text/ecmascript-6">
	import Pagination from './Pagination.vue';
	import {mapActions,mapGetters} from 'vuex';
	export default{
	    data(){
	        return {
				list: [],
				pagination:{},
			}
		},
		created(){
	        this.getFreshArticle({pageSize: 5, currentPage: 1});
		},
		methods: {
			...mapActions([
			    'getFreshArticle'
			])
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
<style lang="scss" scoped>
	.list{
		height: 400px;
		width: 600px;
		padding: 10px;
		.item{
			margin: 10px;
			height: 200px;
			background-color: #fff;
		}
	}
</style>
