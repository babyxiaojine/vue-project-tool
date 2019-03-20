<template>
    <input :accept="accept[fileType]" multiple="multiple" @change="uploadFile($event)" type="file" class="ipt fileIpt">
</template>

<script>
  import {postTokenData} from '@/util/common'
  import { Toast, MessageBox, Indicator} from 'mint-ui'
  export default {
    name:'fileUpload',
    data(){
      return{
        accept:{
          'img':'image/png,image/jpeg,image/gif',
          'video': 'video/*',
          'files':'*'
        }
      }
    },
    props:{
      fileType:{
        type: String,
        default: 'img'
      },
      fileTag:{
        type:String,
        default:''
      },
      maxLength:{
        type:Number,
        default:10
      }
    },
    created(){
      
    },
    mounted(){
        
    },
    computed: {

    },
    methods: {
      beforeUpload(file){
        this.$emit('beforeUpload',file, this.fileTag);
      },
      uploaded(res){
        this.complete(res);
        this.$emit('success', res, this.fileTag);
      },
      error(err){
        Toast({message: '上传失败', iconClass: 'mintui mintui-field-error'})
        this.complete(err);
        this.$emit('error', err, this.fileTag);
      },
      complete(res){
        this.$emit('complete', res, this.fileTag);
      },
      uploadProgress(res){
        this.$emit('uploadProgress', res, this.fileTag);
      },
      uploadFile(e){
        let fileType = this.fileType;
        let fileData = e.target.files;
        let formData = new FormData();
        let fileLength = fileData.length;
        if(fileLength>this.maxLength){
          Toast({message: '上传失败,文件数量不能超过'+this.maxLength+'个', iconClass: 'mintui mintui-field-error'})
          return false;
        }
        let sizeFlag = false;
        for(var i=0; i<fileData.length; i++){
          let sz = fileData[i].size;
          if(sz >= 104857600){
            sizeFlag = true;
            break;
          }
          formData.append('file',fileData[i],fileData[i].name);
        }
        
        if(sizeFlag){
          Toast({message: '上传失败，文件不能超过100M..', iconClass: 'mintui mintui-field-error'})
          return false;
        }
        // formData.append('file',fileData,fileData.name);
        this.beforeUpload(fileData)
        postTokenData('/file/upload?fileType='+fileType,formData,{
            success:(res)=>{
              if(res.code == '0000'){
                Indicator.open('加载中...');
                setTimeout(()=>{
                  Indicator.close();
                  this.uploaded(res.data);
                },3000)
              }else{
                
                this.error(res.data);
              }
              
            },
            error:(err)=>{
              this.error(err.data);
            },
            onUploadProgress:(res)=>{
              this.uploadProgress(res);
            }
        })
      },
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .select-picker{
      .picker-items{width: 100vw;}
      .picker-toolbar{border-bottom: 1px solid #eaeaea;}
    }

</style>