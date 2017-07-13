<template>
    <div class="main">
		<Navigation />
		<User-header />
		<div class="content">
			<div class="left">
				<Side-bar />
			</div>
			<div class="center">
				<Article-list />
			</div>
			<div class="right">
				<Sub-side-bar />
			</div>
		</div>
    </div>
</template>
<script type="text/ecmascript-6">
	import Navigation from './Navigation.vue';
	import Header from './Header.vue';
	import SideBar from './SideBar.vue';
	import SubSideBar from './SubSideBar.vue';
	import ArticleList from './ArticleList.vue';
	export default{
	    data(){
	        return {

			}
		},
		created(){},
		methods: {

		},
		computed: {

		},
		components: {
		    Navigation,
			'User-header': Header,
		    SideBar,
			SubSideBar,
			ArticleList
		}
	}
</script>
<style lang="scss" scoped>
	.main{
		margin: 0 auto;
		min-width: 800px;
		max-width: 1024px;
		height: 100%;
		.content{
			margin-top: 5px;
			position: relative;
			clear: both;
			/*overflow: hidden;*/
			.left{
				float: left;
				border: 1px solid #ccc;
				background-color: #4682B4;
			}
			.center{
				width: 600px;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				border: 1px solid #ccc;
				background-color: #4682B4;
			}
			.right{
				float: right;
				border: 1px solid #ccc;
				background-color: #4682B4;
			}
		}
	}
</style>
