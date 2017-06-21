<template>
    <div>
        <div class="share-box">
            <div class="share-head">
                <h3 class="share-title">{{shareTitle}}</h3>
                <em class="share-time">{{shareTime}}</em>
                <div v-if="userInfo" class="user-info">
                    <img v-if="userInfo.icon" class="user-avatar" :src="'http://i1.sit.com/img2' + userInfo.icon" />
                    <img v-else class="user-avatar" src="http://i1.sit.com/img2/997898339c3f490cc86d89e59d772a77/4905c4aad159487519d98d1b09ff4bdf/f1d8d0666c0941e8bf05ff2788b2a191.png" alt="">
                    <p class="user-name">{{userInfo.nickName}}</p>
                </div>
            </div>
            <div v-if="shareInfo.detailURL" class="share-content" v-html="shareInfo.detailURL"></div>
            <div v-else>
                <div class="share-content">
                    {{shareInfo.content}}
                </div>
                <div v-if="shareInfo.refs && shareInfo.refs.length > 0">
                    <scroll-view :imgs="shareInfo.refs" :littleClassName="'pic-warp'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import ScrollView from './scrollView.vue';
    export default {
        data: function(){
            return {
                shareTitle:'淘智汇分享',//文章标题
                shareTime:'',//文章时间
                userInfo:'',//用户信息
                pageInfoUrl:'/mobile/content/shared/detail',//请求文章数据地址
                pageHtmlUrl:'/mobile/content/full',//请求富文本地址
                contentSid:'12345',//1123
                contentText:'',
                defaultIcon:'../../assets/image/icon.jpg',
                shareInfo: {},
            };
        },
        created(){
            this.contentSid = this.getQueryString('sid');
            this.pageInfoInit();
        },
        methods: {
            //初始化请求
            pageInfoInit:function(){

                this.$http.get(this.pageInfoUrl+'?sid='+this.contentSid).then(function(data){

                    if(data.body.code == 0){
                        this.userInfo = data.body.result[0].author;//获取用户信息
                        this.shareTime = this.dateFormat(data.body.result[0].createdTimestamp);//获取分享时间
                        this.shareInfo = data.body.result[0]
                    }else if(data.body.code == 1){
                        Toast(data.body.message);
                    }
                },function(err){
                    Toast(err);
                });

            },
            //获取HTML元素
            getHtmlFun:function(){

                this.$http.get(this.pageHtmlUrl+'?sid='+this.contentSid).then(function(data){

                    let htmlText = (new DOMParser()).parseFromString(data.body.result.value,"text/html");

                    this.contentText = htmlText.getElementsByTagName('body')[0].innerHTML;

                },function(err){

                });
            },
            //时间换算
            dateFormat:function(date){
                let formatDate = new Date(date);
                return formatDate.getFullYear() + '-' + formatDate.getMonth() + '-' + formatDate.getDate();
            },
            //获取url上的参数
            getQueryString(name){
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            },
        },
        components: {
            ScrollView
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/common.scss';
    $fontSize12: rem(12);
    $fontSize16: rem(16);
    $fontSize18: rem(18);
    body{
        background-color:#fff;
    }
    .share-box{
        padding:rem(25) rem(21.5);
    }
    .share-head{
        .share-title{
            font-size:$fontSize18;
            margin-bottom:rem(12);
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .share-time{
            font-size:$fontSize12;
            color:#9b9b9b;
            margin-bottom:rem(9);
            display:block;
        }
        .user-info{
            margin-bottom:rem(14);
            .user-avatar{
                width:rem(25);
                height:rem(25);
                display:inline-block;
                border-radius:100%;
                border:1px solid #ddd;
                vertical-align: middle;
                margin-right:rem(8);
            }
            .user-name{
                color:#9b9b9b;
                font-size: $fontSize12;
                display:inline-block;
                vertical-align: middle;
            }
        }
    }
    .share-content{
        font-size:$fontSize16;
    }
    .little-owner{
         display: inline-block;
         position: relative;
         width: rem(109);
         height: rem(105);
         margin: 0 rem(1) rem(1) 0;
         .little-pic{
             position: absolute;
             max-width: 100%;
             max-height: 100%;
             left: 0;
             top: 0;
             right: 0;
             bottom: 0;
             margin: auto;
         }
     }
    .pic-warp{
        width: rem(109);
        height: rem(105);
        margin: 0 rem(1.5) rem(2) 0;
    }
</style>
