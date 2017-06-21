<template>
    <div>
        <!-- 略缩图 -->
        <div v-if="pictures.length > 1">
            <a v-for="(img, index) in pictures" v-if="img.type == 'picture'" @click="scrollView(index)" class="little-owner" :class="littleClassName">
                <span class="little-pic-warper">
                    <img class="little-pic" :src="'http://i1.sit.com/img2' + img.uri" alt="">
                </span>
            </a>
        </div>
        <div v-else  @click="scrollView(0)">
            <img class="alone-pic" :src="'http://i1.sit.com/img2' + pictures[0].uri" alt="">
        </div>
        <!-- 大图 -->
        <div class="scroll-view" v-show="scrollViewShow" @click="scrollView()">
            <div class="scroll-view-head">{{showIndex + 1}} / {{pictures.length}}</div>
            <div class="big-container" ref="pictureContainer">
                <transition-group name="slideInLeft" mode="in-out">
                    <div class="big-owner" v-for="(img, index) in pictures" v-show="showIndex === index" :class="{'actived': showIndex === index}" :ref="`picture${index}`" :key="`picture${index}`">
                        <img :src="'http://i1.sit.com/img2' + img.uri" alt="">
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    data(){
        return {
            scrollViewShow: false,
            showIndex: 0,
            start: {//开始位置
                clientX: 0,
                clientY: 0
            },
            end: {//结束位置
                clientX: 0,
                clientY: 0
            },
            offset: {//偏移量
                x: 0,
                y: 0,
            }
        }
    },
    props: {
        imgs: Array,
        littleClassName: String, //略缩图宽高间距    类名
    },
    created(){},
    computed: {
        pictures(){
            let pictures = [];
            for(let i = 0; i < this.imgs.length; i++){
                if(this.imgs[i].type === 'picture'){
                    pictures.push(this.imgs[i]);
                }
            }
            return pictures;
        }
    },
    mounted(){
        const pictureContainer = this.$refs.pictureContainer;
        console.log(pictureContainer);
        pictureContainer.addEventListener('touchstart', e => {
            this.start.clientX = e.changedTouches[0].clientX;
            this.start.clientY = e.changedTouches[0].clientY;
        });
        pictureContainer.addEventListener('touchmove', e => {
            this.offset.x = e.changedTouches[e.changedTouches.length - 1].clientX - this.start.clientX;
            this.offset.y = e.changedTouches[e.changedTouches.length - 1].clientY - this.start.clientY;
        });
        pictureContainer.addEventListener('touchend', e => {
            this.end.clientX = e.changedTouches[0].clientX;
            this.end.clientY = e.changedTouches[0].clientY;
            this.offset.x = e.changedTouches[0].clientX - this.start.clientX;
            this.offset.y = e.changedTouches[0].clientY - this.start.clientY;
            if(this.offset.x > 50){
                //向右划
                this.showIndex--;
                if(this.showIndex <= 0){
                    this.showIndex = 0;
                }
            }else if(this.offset.x < -50){
                //向左划
                this.showIndex++;
                if(this.showIndex >= this.pictures.length){
                    this.showIndex = this.pictures.length - 1
                }
            }
            this.offset = {x: 0, y: 0};
        })
    },
    methods: {
        scrollView(index){
            if(index || index === 0){
                document.body.style.overflow = 'hidden';
                this.scrollViewShow = true;
                this.showIndex = index;
            }else{
                this.scrollViewShow = false;
                this.showIndex = 0;
            }
        }
    }
}
</script>
<style lang="scss">
    @import '../../assets/css/common.scss';
    .little-owner{
        display: inline-block;
        position: relative;
        overflow: hidden;
        .little-pic-warper{
            width: 200%;
            height: 200%;
            display: block;
            position: absolute;
            transform: translate(-25%, -25%);
            text-align: center;
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
    }
    .scroll-view{
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .scroll-view-head{
            position: absolute;
            width: 100%;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(26);
            top: 0;
            left: 0;
            text-align: center;
            padding: rem(20) 0;
            color: #fff;
            z-index: 100;
        }
        .big-container{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            .big-owner{
                margin: 0;
                padding: 0;
                list-style: none;
                position: absolute;
                float: left;
                width: rem(375);
                height: 100%;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.8);
                img{
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
            li.actived{
                z-index: 20;
            }
        }
    }
    .alone-pic{
        max-width: 100%;
        max-height: 100%;
    }
</style>
