<template>
	<div class="new-article container">
		<div class="form-group">
			<label for="title" class="col-sm-2 col-md-2 control-label text-left">标题:</label>
			<input type="text" id="title" class="ml15 title form-control" v-model="title" />
		</div>
		<div class="form-group clearfix">
			<label for="topic" class="col-sm-2 col-md-2 control-label text-left" style="bottom: -10px;">话题:</label>
			<div class="col-sm-5 col-md-3">
				<div id="topic" class="col-sm-5 col-md-3 select-btns form-control" @click.self="selecting = !selecting">
					{{topic.name}} <span class="caret"></span>
					<div class="select-list" v-show="selecting">
						<ul class="select">
							<li class="select-option btn form-control" v-for="topic in topicList" @click="selectBtn(topic)">{{topic.name}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="content" class="col-sm-2 col-md-2 control-label text-left">内容:</label>
			<textarea id="content" class="ml15 form-control" v-model="content"></textarea>
		</div>
		<div class="pt20 pull-right">
			<a href="javascript:;" class="btn btn-info" @click="publish(2)">存草稿</a>
			<a href="javascript:;" class="btn btn-primary" @click="publish(1)">提交</a>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios';
	import {toast} from '../assets/js/common';
    export default {
        data(){
            return {
                user: {
                    sid: 100017
				},
                title: '',
				content: '',
				topicSid: '',
				topicName: '',
				topicList: [],
				selecting: false,
				topic: {},
				//api
				publishUrl: '/api/article/publish',
				topicListUrl: '/api/topic/list',
			}
		},
		created(){
            this.$http.get(this.topicListUrl).then(res => {
                if(res.body.code === 0){
                    this.topicList = res.body.result;
				}else{
                    toast('获取话题列表失败');
				}
			}, err => {
                toast('获取话题列表错误');
			});
		},
		methods: {
            publish(status){
                let data = {
                    title: this.title,
					content: this.content,
					topicSid: this.topic.sid,
					authorSid: this.user.sid,
					isPublish: status
				};
                let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NTVjNjAyZmQwZGIxY2NhMTcwYTAwOCIsImFjY291bnQiOiI3NTI2NTY1MjBAcXEuY29tIiwiaWF0IjoxNDk5NjcxMDg3LCJleHAiOjE1MDAyNzU4ODd9.tYP6pko7Wgr9eDkIp8arbU4g34WNFubQqfGbF3l4QB0";
//                this.$http.post(this.publishUrl, data).then(res => console.log(res), err => console.log(err));
				axios.defaults.headers.common["Authorization"] =  'token ' + token;
				axios.post(this.publishUrl, data).then(res => {
					console.log(res);
				}).catch(err => console.log(err));
			},
			selectBtn(topic){
                this.topic = topic;
                this.selecting = false;
			},
		}
	}
</script>
<style lang="scss">
	@import "../assets/css/common";
	.select-btns{
		position: relative;
		.caret{
			position: absolute;
			right: 10px;
			top: 15px;
		}
		.select-list{
			position: absolute;
			top: 100%;
			left: 0;
			.select{
				padding: 0;
				li{
					list-style: none;
				}
			}
		}
	}
</style>
