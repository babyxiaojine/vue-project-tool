<template>
    <div>
        <div class="plan-photos">
            <div class="form2-title bdbtm">内部照片</div>
            <div class="loading-bar" :class="{isShow:progressBar[0].show}">
                <div class="bgbar"><i :style="{width:progressBar[0].value+'%'}"></i></div>
                <div class="status">{{uploadProgressTip}}</div>
            </div>
            <div class="photos-box">
                <ul class="photos-list">
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleOne" fileTag="iAngleOne" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度1</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleTwo" fileTag="iAngleTwo" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度2</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleThree" fileTag="iAngleThree" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度3</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleFour" fileTag="iAngleFour" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度4</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleFive" fileTag="iAngleFive" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度5</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleSix" fileTag="iAngleSix" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度6</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleSeven" fileTag="iAngleSeven" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度7</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.iAngleEight" fileTag="iAngleEight" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,0)" @fileUploadProgress="fileUploadProgress($event,0)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度8</div>
                    </li>

                </ul>
            </div>

        </div>

        <div class="plan-photos">
            <div class="form2-title bdbtm">外部照片</div>
            <div class="loading-bar" :class="{isShow:progressBar[1].show}">
                <div class="bgbar"><i :style="{width:progressBar[1].value+'%'}"></i></div>
                <div class="status">{{uploadProgressTip}}</div>
            </div>
            <div class="photos-box">
                <ul class="photos-list">
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.oLeftRight" fileTag="oLeftRight" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,1)" @fileUploadProgress="fileUploadProgress($event,1)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">门口-从左到右 </div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.oMiddle" fileTag="oMiddle" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,1)" @fileUploadProgress="fileUploadProgress($event,1)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">门口-正对</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.oRightLeft" fileTag="oRightLeft" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,1)" @fileUploadProgress="fileUploadProgress($event,1)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">门口-从右到左</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.handPainting" fileTag="handPainting" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,1)" @fileUploadProgress="fileUploadProgress($event,1)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">手绘平面图</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="plan-photos">
            <div class="form2-title bdbtm">局部照片</div>
            <div class="loading-bar" :class="{isShow:progressBar[2].show}">
                <div class="bgbar"><i :style="{width:progressBar[2].value+'%'}"></i></div>
                <div class="status">{{uploadProgressTip}}</div>
            </div>
            <div class="photos-box">
                <ul class="photos-list">
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.pAngleOne" fileTag="pAngleOne" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,2)" @fileUploadProgress="fileUploadProgress($event,2)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度1</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.pAngleTwo" fileTag="pAngleTwo" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,2)" @fileUploadProgress="fileUploadProgress($event,2)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度2</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.pAngleThree" fileTag="pAngleThree" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,2)" @fileUploadProgress="fileUploadProgress($event,2)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度3</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.pAngleFour" fileTag="pAngleFour" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,2)" @fileUploadProgress="fileUploadProgress($event,2)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度4</div>
                    </li>
                    <li>
                        <ImgItem :readonly="readonly" :filePath="imgParam.pAngleFive" fileTag="pAngleFive" @fileUploadSuccess="fileUploadSuccess" @fileUploadError="fileUploadError"  @fileUploadComplete="fileUploadComplete($event,2)" @fileUploadProgress="fileUploadProgress($event,2)" @delItemImg="delItemImg" @openFileZoom="openFileZoom"></ImgItem>
                        <div class="txt">角度5</div>
                    </li>
                </ul>
            </div>
        </div>


        <div class="plan-photos">
            <div class="form2-title bdbtm">附件上传</div>
            <div class="loading-bar" :class="{isShow:progressBar[3].show}">
                <div class="bgbar"><i :style="{width:progressBar[3].value+'%'}"></i></div>
                <div class="status">{{uploadProgressTip}}</div>
            </div>
            <div class="photos-box">
                <ul class="photos-list">
                    <li>
                        <div class="pic">
                            <template v-if="!readonly">
                                <div v-if="!imgParam.measuringFilePath"><i class="iconfont icon-jia"></i><fileUpload fileTag="measuringFilePath" fileType="files" :maxLength="1" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete($event,3)" @uploadProgress="fileUploadProgress($event,3)" ></fileUpload></div>
                                <a :href="imgParam.measuringFilePath" download v-else><img src="../../../../assets/icon_file.png" @click="openFileZoom('measuringFilePath')" alt=""></a>
                                <div v-if="imgParam.measuringFilePath" class="del-img" @click="delItemImg('measuringFilePath','文件')"></div>
                            </template>
                            <template v-else>
                                <a  v-if="imgParam.measuringFilePath" :href="imgParam.measuringFilePath" download><img src="../../../../assets/icon_file.png" @click="openFileZoom('measuringFilePath')" alt=""></a>
                            </template>
                        </div>
                        <div class="txt" v-if="measure.measuringFilePath">{{splitFileName(measure.measuringFilePath) +'文件'}}</div>
                    </li>
                </ul>
            </div>
        </div>

    </div>

</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import { splitFileName,openPreviewImage } from '@/util/utils'
  import {base,postTokenData} from '@/util/common'
  import fileUpload from '@/components/fileUpload'
  import ImgItem from './imgItem'
  export default {
    name: 'imgPart',
    data () {
      return {
        progressBar: [
          {show:false,value:0},
          {show:false,value:0},
          {show:false,value:0},
          {show:false,value:0},
        ],
        uploadProgressTip:'正在上传',
        img:{
          iAngleOne: '',
          iAngleTwo: '',
          iAngleThree: '',
          iAngleFour: '',
          iAngleFive: '',
          iAngleSix: '',
          iAngleSeven: '',
          iAngleEight: '',
          oLeftRight: '',
          oMiddle: '',
          oRightLeft: '',
          pAngleOne: '',
          pAngleTwo: '',
          pAngleThree: '',
          pAngleFour: '',
          pAngleFive: '',
        },
        measure: {},
      }
    },
    props: {
      readonly:{
        default: false,
        type: Boolean || Number,
      },
      imgParam:{
        type: Object,
        default: ()=> {
          return {};
        }
      },
      filePath:{
        default: '',
        type: String,
      }
    },
    components: {
      fileUpload,
      ImgItem
    },
    created() {

    },
    mounted() {
    },
    methods: {

      // 上传文件进度条
      fileUploadProgress(res,type){
        let pbar = Math.round(res.loaded/res.total*100);
        this.uploadProgressTip = '正在上传';
        if(!this.progressBar[type].show){
          this.progressBar[type].show = true;
        }
        this.progressBar[type].value = pbar;
      },

      // 上传成功回调
      fileUploadSuccess(res,tag){
        this.uploadProgressTip = '上传成功';
        this.imgParam[tag] = res.showPath[0];

      },
      // 上传失败回调
      fileUploadError(res,tag){
        this.uploadProgressTip = '上传失败';
      },
      // 上传完成回调
      fileUploadComplete(res,type){
        setTimeout(()=>{
          this.progressBar[type].show = false;
        },1500)
      },

      // 打开相册编辑
      openFileZoom(tag){
        let imgArr = [];
        imgArr = [this.imgParam[tag]];
        openPreviewImage(imgArr,imgArr[0])
      },
      //删除图片
      delItemImg(tag,type='图片'){
        MessageBox.confirm('确定删除'+type+'？').then(action => {
          this.imgParam[tag] = '';
        }).catch(data=>{
          console.log(data)
        })
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