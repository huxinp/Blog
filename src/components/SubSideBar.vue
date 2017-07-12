<template>
    <div class="sub-side-bar">
		<div class="title">猜你喜欢</div>
		<ul>
			<li><a href="javascript:;">文章列表</a></li>
		</ul>
    </div>
</template>
<script type="text/ecmascript-6">
	export default{
	    data(){
	        return {

			}
		}
	}
</script>
<style lang="scss" scoped>
	.sub-side-bar{
		width: 200px;
		padding: 10px;
		.title{
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			font-weight: bold;
			color: #fff;
		}
		ul{
			margin: 0;
			padding: 0;
			height: 20px;
			/*font-size: 16px;*/
			line-height: 20px;
			color: #e4e4e4;
			li{
				list-style: none;
				a{
					color: #fff;
				}
			}
		}
	}
</style>
