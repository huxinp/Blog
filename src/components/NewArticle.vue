<style lang="scss">
	@import "../assets/css/common";
	.new-article{
		width: 600px;
		padding: 20px 10px 0;
	}
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
			z-index: 10;
			.select{
				padding: 0;
				li{
					list-style: none;
					border-color: #ccc;
				}
			}
		}
	}
	.upload-img{
		max-width: 100%;
		max-height: 100%;
	}
</style>
<template>
	<div class="new-article">
		<div class="form-group clearfix">
			<label for="title" class="col-sm-2 col-md-2 control-label" style="bottom: -10px;">标题:</label>
			<div class="col-sm-10 col-md-10">
				<input type="text" id="title" class="title form-control" v-model="title" />
			</div>
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
		<div class="form-group clearfix">
			<label for="content" class="col-sm-2 col-md-2 control-label">内容:</label>
			<div class="col-sm-10 col-md-10">
				<textarea id="content" class="form-control" rows="6" v-model="content"></textarea>
			</div>
		</div>
		<div class="form-group clearfix">
			<label for="img-upload" class="col-sm-2 col-md-2 control-label">配图:</label>
			<div class="col-sm-10 col-md-10">
				<label for="img-upload" class="col-sm-5 col-md-3 btn btn-default">上传</label>
				<input v-show="false" type="file" ref="fileImporter" name="file" id="img-upload" v-on:change="uploadImg"
					   accept="image/*" />
			</div>
		</div>
		<div class="form-group clearfix">
			<div class="col-sm-offset-2 col-sm-5 col-md-offset-2 col-md-5">
				<img class="upload-img" v-if="this.picture" :src="this.picture" alt="" />
			</div>
		</div>
		<div class="form-group clearfix">
			<div class="pt20 pull-right">
				<a href="javascript:;" class="btn btn-info" @click="publish(2)">存草稿</a>
				<a href="javascript:;" class="btn btn-primary" @click="publish(1)">提交</a>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios';
	import {toast} from '../assets/js/common';
	import {mapActions, mapGetters} from 'vuex';
    export default {
        data(){
            return {
                title: '',
				content: '',
				topicSid: '',
				topicName: '',
				selecting: false,
				topic: {},
				picture: '',
				file: '',
				//api
				uploadImgUrl: '/api/image/upload'
			}
		},
		created(){
            this.getTopicList();
            /*this.$http.get(this.topicListUrl).then(res => {
                if(res.body.code === 0){
                    this.topicList = res.body.result;
				}else{
                    toast('获取话题列表失败');
				}
			}, err => {
                toast('获取话题列表错误');
			});*/
		},
		methods: {
			...mapActions([
				'publishArticle',
				'getTopicList'
			]),
            publish(status){
                let data = {
                    title: this.title,
					content: this.content,
					topicId: this.topic._id,
					authorId: this.user._id,
					picture: this.picture,
					isPublish: status
				};
//				axios.defaults.headers.common["Authorization"] =  'token ' + this.token;
                this.publishArticle(data);
			},
			selectBtn(topic){
                this.topic = topic;
                this.selecting = false;
			},
			uploadImg(e){
				let inputDom = this.$refs.fileImporter;
				if(!inputDom.value){
				    return;
				}
				let fileFormData = new FormData();
				//通过DOM取文件数据
				this.file = inputDom.files[0];
				fileFormData.append('file', this.file, this.file.name);
				axios.post(this.uploadImgUrl, fileFormData).then(res => {
				    if(res.data.code === 0){
				        this.picture = '../../static/img/' + res.data.result;
					}
				}).catch(err => {
				    console.log(err);
				});
			}
		},
		computed: {
			...mapGetters([
			    'user',
				'token',
				'topicList'
			])
		}
	}
</script>

