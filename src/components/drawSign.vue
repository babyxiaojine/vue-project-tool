<template>
    <div class="upload-page" :class="{readonly:readonly, isShow:visible}">
      <div class="upload-title"><span>签字</span><i class="iconfont icon-jia" @click="close"></i></div>
      <div class="signCbox" ref="signCbox">
        <canvas ref="signCanvas" class="signCanvas"></canvas>
        <img :src="img" v-if="img" alt="" width="100%">
      </div>
      
      <div class="foot-submit" v-if="!readonly">
          <div class="fix-area">
            <button class="gray-btn" type="button" @click="clearCanvas">清除</button>
            <button class="btn" type="button" @click="saveFiles">保存</button>
          </div>
      </div>           
    </div>
</template>

<script>
  import { Toast,MessageBox,Indicator } from 'mint-ui'
  import {postTokenData,dataURLtoBlob} from '@/util/common'
  import fileUpload from '@/components/fileUpload'
  import SignaturePad from 'signature_pad'
  export default {
    name:'DrawSign',
    data(){
      return{
        visible:false, 
        signObj:null,
        img:'',
        readonly:false
      }
    },
    components: {
      fileUpload,
    },
    props:{
      defaultUrl:{
        default:'',
        type:String,
      }
    },
    created(){
      
    },
    mounted(){
      let signCanvas = this.$refs.signCanvas;
      if(signCanvas){
        signCanvas.width = signCanvas.offsetWidth;
        signCanvas.height  = signCanvas.offsetHeight;
        let signaturePad = new SignaturePad(signCanvas);
        this.signObj = signaturePad;
      }

    },
    watch: {
      defaultUrl(){
        
      }
    },
    methods: {
      open(url,isReadonly=false){
        this.img = url;
        this.visible = true;
        this.readonly = isReadonly;

      },
      close(){
        this.visible = false
      },
      // 上传签字
      uploadFile(file){
        if(file.size>104857600){
          Toast({message: '上传失败，文件不能超过100M..', iconClass: 'mintui mintui-field-error'})
          return false;
        }
        let formData = new FormData();
        formData.append('file',file,'签字.png');
        postTokenData('/file/upload?fileType=img',formData,{
            success:(res)=>{
              if(res.code == '0000'){
                this.success(res.data.showPath[0])
              }else{
                Toast({message: '上传失败', iconClass: 'mintui mintui-field-error'})
              }
              
            },
            error:(err)=>{
              Toast({message: '上传失败', iconClass: 'mintui mintui-field-error'})
            }
        })
      },
      // 保存生成签字
      saveFiles(){
        if(this.img){
          this.close();
          return false;
        }
        const isEmpty = this.signObj.isEmpty()
        if(isEmpty){
          Toast({message: '请手写签字...', iconClass: 'mintui mintui-field-error'})
          return false;
        }
        let signFile = this.signObj.toDataURL();
        let sign_formData = dataURLtoBlob(signFile);
        this.uploadFile(sign_formData);
        
      },
      // 清除签字
      clearCanvas(){
        if(this.img){
          this.img = ''
        }
        this.signObj.clear()
      },
      // 回调父组件
      success(path){
        Indicator.open('加载中...');
        setTimeout(()=>{
          Indicator.close();
          this.$emit('success',path);
          this.signObj.clear()
          this.close();
        },3000)
      },
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .upload-page{background: #fff; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; visibility: hidden; pointer-events:none;
      .signCbox{width:100%; height: calc(100vh - #{p2r(99px)} );  background: #f0f0f0; position: relative;
        img,canvas{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
      }
      &.readonly{
        .signCbox{height: calc(100vh - #{p2r(55px)} );}
      }
      &.isShow{visibility: visible; pointer-events:auto;}
    }

    .upload-hand{padding:p2r(20px 0);}
</style>