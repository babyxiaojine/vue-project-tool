<template>
    <div class="pic">
        <template v-if="!readonly">
            <div v-if="!filePath"><i class="iconfont icon-jia"></i><fileUpload :fileTag="fileTag" fileType="img" :maxLength="1" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete($event,0)" @uploadProgress="fileUploadProgress($event,0)" ></fileUpload></div>
            <img v-else :src="filePath" @click="openFileZoom(fileTag)" alt="">
            <div v-if="filePath" class="del-img" @click="delItemImg(fileTag)"></div>
        </template>
        <template v-else>
          <img v-if="filePath" :src="filePath" @click="openFileZoom(fileTag)" alt="">
        </template>
    </div>
                      

</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import { splitFileName } from '@/util/utils'
  import {base,postTokenData} from '@/util/common'
  import fileUpload from '@/components/fileUpload'
  export default {
    name: 'ImgItem',
    data () {
      return {
      }
    },
    props: {
      readonly:{
        default: false,
        type: Boolean,
      },
      fileTag:{
        type: Object,
        type: String,
      },
      filePath:{
        default: '',
        type: String,
      }
    },
    components: {
      fileUpload,
    },
    created() {

    },
    mounted() {
    },
    methods: {

      // 上传文件进度条
      fileUploadProgress(res,type){
        this.$emit('fileUploadProgress',res)
      },

      // 上传成功回调
      fileUploadSuccess(res,tag){
        console.log(res)
        this.$emit('fileUploadSuccess',res,tag)

      },
      // 上传失败回调
      fileUploadError(res,tag){
        this.$emit('fileUploadError',res,tag)
      },
      // 上传完成回调
      fileUploadComplete(res,type){
        this.$emit('fileUploadComplete',res)
      },

      // 打开相册编辑
      openFileZoom(tag){
        this.$emit('openFileZoom',tag)
      },
      //删除图片
      delItemImg(tag,type='图片'){
        this.$emit('delItemImg',tag,type)
      },

        splitFileName,
    },
    watch : {
      imgParam(newVal, oldVal) {
        this.measure = newVal;
      },
      measure(newVal, oldVal) {
        this.$emit("update:measure", newVal);
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .photos-list {
        align-items: normal;
        li {
            position: relative;
            .del-img {
                position: absolute;
                right: p2r(5px);
                top: p2r(5px);
                @include wh(18px,18px);
                border-radius: 50%;
                background: #E8380D;
                &:after {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    content: '';
                    display: block;
                    @include wh(10px,2px);
                    transform: translate(-50%,-50%);
                    background: #ffffff;
                }
            }
        }
    }
</style>