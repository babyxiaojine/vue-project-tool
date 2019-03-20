<template>
    <div class="design">
      <div class="form3-title bdbtm">{{title}}</div>
      <ul class="photos-list mt10">
          <li v-for="item in imgs">
              <div class="pic" v-if="fileIsImg(item)"><img :src="item" alt="" @click="openPreviewImage([item])"></div>
              <a :href="item" download class="static-file" v-else><div class="fname">{{splitFileName(item)}}类型文件</div></a>
              <!-- <a @click="downloadFile(item)" class="static-file" v-else><div class="fname">{{splitFileName(item)}}类型文件</div></a> -->
          </li>
      </ul>
      <div class="row-item bdbtm">
          <div class="rtitle">备注</div>
          <div class="rvalue"><div class="rChar">{{remark || '-'}}</div></div>
      </div>

    </div>
</template>
<script>
  import {openPreviewImage,fileIsImg,splitFileName,downloadFile} from '@/util/utils'
  export default {
    name:'DesignPhoto',
    components:{
    },
    props:{
      title:{
        type: String,
        default: '平面图'
      },
      imgs:{
        type:Array,
        default:[]
      },
      remark:{
        type:String,
        default:''
      },
    },
    data() {
      return {
      }
    },
    created() {
        
    },

    mounted() {
    },
    methods: {
      fileIsImg,
      openPreviewImage,
      splitFileName,
      downloadFile
    },

  }
</script>
<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .photos-list{margin-left: p2r(15px); padding-left: 0; border-bottom: 1px solid #ddd;
      li:first-child{margin-left: 0;}
    }
    .design{border-top: p2r(10px) solid #f5f5f5;}
</style>

