<template>
    
    <div class="upload-page" v-show="visible">
      <div class="upload-title"><span>{{title}}</span><i class="iconfont icon-jia" @click="close"></i></div>

        <swiper v-if="fileType == 'img' " ref="mySwiper" class="upload-swipe">
            <swiper-slide v-for="(item, index) in fileList" :key="index"><div class="swiper-pic" @click="openPreviewImage(fileList,item)"><img :src="item" alt=""></div></swiper-slide>
        </swiper>
        <div v-else-if="fileType == 'video'" class="upload-swipe">
            <video v-if="fileList[0]" :src="fileList[0]" width="100%" controls="controls"></video>
        </div>
        <div v-else>
          
        </div>
        <ul class="upload-hand">
            <li class="upfile-item" v-for="(item, index) in fileList" :key="index">
                <div class="pic">
                  <img v-if="fileType == 'img'" :src="item" @click="tapSwiperMove(index)" alt="">
                  <div v-else-if="fileType == 'video'" class="static-video"></div>
                  <div v-else="fileType == 'file'" class="static-file"><div class="fname">{{splitFileName(item)}}类型文件</div></div>
                  <i v-if="!readonly" class="del" @click="delFile(index)"></i>
                </div>
            </li>
            <li class="upfile-item" v-if="fileList.length<maxLength && !readonly">
                <div class="pic ">
                  <i class="iconfont icon-jia"></i>
                  <fileUpload ref="monthpick" fileTag="" :maxLength="maxLength - fileList.length" :fileType="fileType" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" ></fileUpload>
                </div>
            </li>
        </ul> 

        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="btn" type="button" @click="saveFiles">保存</button>
            </div>
        </div>           
    </div>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui'
  import fileUpload from '@/components/fileUpload'
  import {openPreviewImage, splitFileName} from '@/util/utils'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name:'fileUploadZoom',
    data(){
      return{
        visible:false, 
        fileList:[]
      }
    },
    components: {
      fileUpload,
      swiper,
      swiperSlide
    },
    props:{
      files:{//文件数组
        type: Array,
        default: []
      },
      title:{//标题
        type: String,
        default: '上传照片'
      },
      fileType:{//上传类型
        type: String,
        default: 'img'
      },
      maxLength:{//最大数量
        type: Number,
        default: 3
      },   
      readonly:{//是否只读
        default:false,
        type:Boolean
      }
    },
    created(){
      this.fileList = this.files;
    },
    mounted(){
        
    },
    watch: {
      files(val){
        this.fileList = [...val];
      }
    },
    methods: {
      // 打开
      open(){
        this.visible = true
      },
      // 关闭
      close(){
        this.visible = false
      },
      // 上传成功回调
      fileUploadSuccess(res,tag){
          this.fileList = [...this.fileList,...res.showPath];
      },
      // 上传失败回调
      fileUploadError(res,tag){
      },
      // 上传完成回调
      fileUploadComplete(res,tag){
      },
      // 保存文件
      saveFiles(){
        this.$emit('success',this.fileList)
        this.close();
      },
      // 删除文件
      delFile(id){
        console.log(id)
        this.fileList.splice(id,1);
      },
      // 上传编辑page
      tapSwiperMove(id){
          this.$refs.mySwiper.swiper.slideTo(id,500, false)
      },
      // 打开相册
      openPreviewImage,
      // 截取文件名
      splitFileName
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .upload-page{background: #fff; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100;
        .upload-swipe{height: calc(100vh - #{p2r(220px)} );  background: #f0f0f0;
            .swiper-pic{height: 100%; @include flexbox;}
            img{width: 100%;}
            video{height:100%;}
        }
    }
    .del{position: absolute; top: p2r(5px); right:p2r(5px); width:p2r(18px); height: p2r(18px); text-align: center; line-height: p2r(18px); background: #E8380D; color:#fff; border-radius:50%; @include flexbox;
      &:before{height: p2r(2px); width: p2r(9px); content:""; background: #fff; }
    }
    .upload-hand{padding:p2r(20px 0);overflow: hidden;
        li{float: left;}
    }

</style>