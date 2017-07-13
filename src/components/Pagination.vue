<template>
	<div class="paginations text-center">
		<p @click="gotoTop">
			<button class="btn btn-default radius0" @click="gotoPage(1)" :disabled="currentPage === 1">首页</button>
			<button class="btn btn-default radius0" @click="gotoPage(prev)" :disabled="currentPage === 1">&lt;上一页</button>
			<b>
				<span class="btn btn-default radius0" v-for="pageNum in btnArray" @click="gotoPage(pageNum)"
					  :class="{current: pageNum === currentPage}">{{pageNum}}</span>
			</b>
			<button class="btn btn-default radius0" @click="gotoPage(next)" :disabled="currentPage === totalPage">下一页&gt;</button>
			<button class="btn btn-default radius0" @click="gotoPage(totalPage)" :disabled="currentPage === totalPage">尾页</button>
		</p>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				btnArray: [],    //按钮的页码			4,5,6,7,8
			}
		},
		props: {
			currentPage: Number,//当前页码				5
			totalPage: Number, //总页数 					25
			btnNum: { 			//显示带页码的按钮数
			    type: Number,
				default: 7
			},
			gotoPage: Function,//触发事件类型
		},
		computed: {
			//上一页的页码
			prev(){
				return this.currentPage > 1 ? this.currentPage -1 : this.currentPage;
			},
			//下一页的页码
			next(){
				return this.currentPage + 1 > this.totalPage ? this.totalPage : this.currentPage + 1;
			}
		},
		watch: {
			currentPage(n, o){
				this.generate();
			},
			totalPage(n, o){
				this.generate();
			}
		},
		methods: {
			//生成显示的按钮的页码
			generate(){
				let aBtns = [],
					n,//排在第一个的页码
					num;//按钮的个数
				if(this.btnNum >= this.totalPage){//总页数太少
					n = 1;
					num = this.totalPage;
				}else {
					num = this.btnNum;
					if(this.btnNum % 2){//奇数个按钮
						if(this.currentPage <= Math.ceil(this.btnNum / 2)){//初始页码
							n = 1;
						}else if(this.btnNum / 2 + this.currentPage > this.totalPage){//最后几页
							n = this.totalPage - this.btnNum + 1;
						}else{
							n = this.currentPage - Math.floor(this.btnNum / 2);
						}
					}else{//偶数个按钮
						if(this.currentPage <= this.btnNum / 2){//初始页码
							n = 1;
						}else if(this.totalPage - this.currentPage <= this.btnNum / 2 + 1){//最后几页
							n = this.totalPage - this.btnNum + 1;  //开始页码
						}else{
							n = this.currentPage - this.btnNum / 2 + 1;
						}
					}
				}
				for(let i = 0; i < num; i++){
					aBtns.push(n + i);
				}
				this.btnArray = aBtns;
			},
			gotoTop(){
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}
		},
		created(){
			this.generate();
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/css/common';
	.paginations{
		margin: 10px 0 5px;
		p{
			display: inline-block;
			b{
				float: left;
				margin-right: 3px;
				font-weight: normal;
				span{
					cursor: pointer;
					float: left;
					border: 1px solid #ccc;
					padding: 5px 10px;
				}
			}
			>button{
				cursor: pointer;
				float: left;
				margin-right: 3px;
				border: 1px solid #ccc;
				padding: 5px 10px;
			}
			span.current{
				background-color: #e6e6e6;
				border-color: #adadad;
			}
		}

	}
</style>
