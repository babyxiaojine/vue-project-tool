<template>
    <div class="pack">
        <div class="row-list">
            <div class="plan-photos">
                <div class="form2-title bdbtm">照片</div>
                <div class="loading-bar" :class="{isShow:progressBarVisible}">
                    <div class="bgbar"><i :style="{width:uploadProgressBar+'%'}"></i></div>
                    <div class="status">{{uploadProgressTip}}</div>
                </div>
                <div class="photos-box">
                    <ul class="photos-list">
                        <li>
                            <div class="pic">
                                <template v-if="!editable">
                                  <div v-if="img.nearList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="nearList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                  <img v-else :src="img.nearList[0]" @click="openFileZoom('nearList')" alt="">
                                </template>
                                <template v-else>
                                  <img v-if="img.nearList.length" :src="img.nearList[0]" @click="openFileZoom('nearList')" alt="">
                                </template>
                            </div>
                            <div class="txt">近景</div>
                        </li>
                        <li>
                            <div class="pic">
                                <template v-if="!editable">
                                  <div v-if="img.middleList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="middleList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                  <img v-else :src="img.middleList[0]" @click="openFileZoom('middleList')" alt="">
                                </template>
                                <template v-else>
                                  <img  v-if="img.middleList.length" :src="img.middleList[0]" @click="openFileZoom('middleList')" alt="">
                                </template>
                            </div>
                            <div class="txt">中景</div>
                        </li>
                        <li>

                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.farList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="farList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else :src="img.farList[0]" @click="openFileZoom('farList')" alt="">
                              </template>
                              <template v-else>
                                <img  v-if="img.farList.length" :src="img.farList[0]" @click="openFileZoom('farList')" alt="">
                              </template>
                            </div>
                            <div class="txt">远景</div>
                        </li>
                        <li>
                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.leftList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="leftList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else :src="img.leftList[0]" @click="openFileZoom('leftList')" alt="">
                              </template>
                              <template v-else>
                                <img v-if="img.rightList.length" :src="img.leftList[0]" @click="openFileZoom('leftList')" alt="">
                              </template>
                            </div>
                            <div class="txt">左侧</div>
                        </li>
                        <li>
                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.rightList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="rightList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else :src="img.rightList[0]" @click="openFileZoom('rightList')" alt="">
                              </template>
                              <template v-else>
                                <img v-if="img.rightList.length" :src="img.rightList[0]" @click="openFileZoom('rightList')" alt="">
                              </template>
                            </div>
                            <div class="txt">右侧</div>
                        </li>
                        <li>
                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.oppositeList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="oppositeList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else :src="img.oppositeList[0]" @click="openFileZoom('oppositeList')" alt="">
                              </template>
                              <template v-else>
                                <img v-if="img.oppositeList.length" :src="img.oppositeList[0]" @click="openFileZoom('oppositeList')" alt="">
                              </template>
                            </div>
                            <div class="txt">目标点对面</div>
                        </li>
                        <li>
                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.planeList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="planeList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else :src="img.planeList[0]" @click="openFileZoom('planeList')" alt="">
                              </template>
                              <template v-else>
                                <img v-if="img.planeList.length" :src="img.planeList[0]" @click="openFileZoom('planeList')" alt="">
                              </template>
                            </div>
                            <div class="txt">手绘平面图</div>
                        </li>
                        <li>
                            <div class="pic">
                              <template v-if="!editable">
                                <div v-if="img.videoList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="videoList" fileType="video" :maxLength="1" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                <img v-else src="../../../assets/icon-video.png" @click="openFileZoom('videoList',1,'video')" alt="">
                              </template>
                              <template v-else>
                                <img v-if="img.videoList.length" :src="img.videoList[0]" @click="openFileZoom('videoList',1,'video')" alt="">
                              </template>
                            </div>
                            <div class="txt">视频</div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="plan-brands">
                <div class="form2-title bdbtm">品牌</div>
                <ul class="brand-nav">
                    <li>A类（{{brandCount.a}}）</li>
                    <li>B类（{{brandCount.b}}）</li>
                    <li>C类（{{brandCount.c}}）</li>
                </ul>
                <div class="brand-group">
                    <ul class="brand-list">
                        <!-- 上层 -->
                        <brandItem :readonly="editable" :attr="brand.ul1Attr" @click="setBrandAttr($event,'ul1Attr')" v-model="brand.upLeft1"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul2Attr" @click="setBrandAttr($event,'ul2Attr')" v-model="brand.upLeft2"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul3Attr" @click="setBrandAttr($event,'ul3Attr')" v-model="brand.upLeft3"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul4Attr" @click="setBrandAttr($event,'ul4Attr')" v-model="brand.upLeft4"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul5Attr" @click="setBrandAttr($event,'ul5Attr')" v-model="brand.upLeft5"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul6Attr" @click="setBrandAttr($event,'ul6Attr')" v-model="brand.upLeft6"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul7Attr" @click="setBrandAttr($event,'ul7Attr')" v-model="brand.upLeft7"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul8Attr" @click="setBrandAttr($event,'ul8Attr')" v-model="brand.upLeft8"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul9Attr" @click="setBrandAttr($event,'ul9Attr')" v-model="brand.upLeft9"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ul10Attr" @click="setBrandAttr($event,'ul10Attr')" v-model="brand.upLeft10"></brandItem>
                        <!-- 中心点 -->
                        <li class="on"><div class="lab-ctrl"><input type="text" class="ipt" v-model="brand.middle"></div></li>

                        <brandItem :readonly="editable" :attr="brand.ur1Attr" @click="setBrandAttr($event,'ur1Attr')" v-model="brand.upRight1"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur2Attr" @click="setBrandAttr($event,'ur2Attr')" v-model="brand.upRight2"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur3Attr" @click="setBrandAttr($event,'ur3Attr')" v-model="brand.upRight3"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur4Attr" @click="setBrandAttr($event,'ur4Attr')" v-model="brand.upRight4"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur5Attr" @click="setBrandAttr($event,'ur5Attr')" v-model="brand.upRight5"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur6Attr" @click="setBrandAttr($event,'ur6Attr')" v-model="brand.upRight6"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur7Attr" @click="setBrandAttr($event,'ur7Attr')" v-model="brand.upRight7"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur8Attr" @click="setBrandAttr($event,'ur8Attr')" v-model="brand.upRight8"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur9Attr" @click="setBrandAttr($event,'ur9Attr')" v-model="brand.upRight9"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.ur10Attr" @click="setBrandAttr($event,'ur10Attr')" v-model="brand.upRight10"></brandItem>

                    </ul>
                    <ul class="brand-list">
                        <!-- 下层 -->
                        <brandItem :readonly="editable" :attr="brand.dl1Attr" @click="setBrandAttr($event,'dl1Attr')" v-model="brand.downLeft1"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl2Attr" @click="setBrandAttr($event,'dl2Attr')" v-model="brand.downLeft2"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl3Attr" @click="setBrandAttr($event,'dl3Attr')" v-model="brand.downLeft3"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl4Attr" @click="setBrandAttr($event,'dl4Attr')" v-model="brand.downLeft4"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl5Attr" @click="setBrandAttr($event,'dl5Attr')" v-model="brand.downLeft5"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl6Attr" @click="setBrandAttr($event,'dl6Attr')" v-model="brand.downLeft6"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl7Attr" @click="setBrandAttr($event,'dl7Attr')" v-model="brand.downLeft7"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl8Attr" @click="setBrandAttr($event,'dl8Attr')" v-model="brand.downLeft8"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl9Attr" @click="setBrandAttr($event,'dl9Attr')" v-model="brand.downLeft9"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dl10Attr" @click="setBrandAttr($event,'dl10Attr')" v-model="brand.downLeft10"></brandItem>

                        <brandItem :readonly="editable" :attr="brand.dmAttr" @click="setBrandAttr($event,'dmAttr')" v-model="brand.downMiddle"></brandItem>

                        <brandItem :readonly="editable" :attr="brand.dr1Attr" @click="setBrandAttr($event,'dr1Attr')" v-model="brand.downRight1"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr2Attr" @click="setBrandAttr($event,'dr2Attr')" v-model="brand.downRight2"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr3Attr" @click="setBrandAttr($event,'dr3Attr')" v-model="brand.downRight3"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr4Attr" @click="setBrandAttr($event,'dr4Attr')" v-model="brand.downRight4"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr5Attr" @click="setBrandAttr($event,'dr5Attr')" v-model="brand.downRight5"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr6Attr" @click="setBrandAttr($event,'dr6Attr')" v-model="brand.downRight6"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr7Attr" @click="setBrandAttr($event,'dr7Attr')" v-model="brand.downRight7"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr8Attr" @click="setBrandAttr($event,'dr8Attr')" v-model="brand.downRight8"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr9Attr" @click="setBrandAttr($event,'dr9Attr')" v-model="brand.downRight9"></brandItem>
                        <brandItem :readonly="editable" :attr="brand.dr10Attr" @click="setBrandAttr($event,'dr10Attr')" v-model="brand.downRight10"></brandItem>
                    </ul>
                </div>
            </div>

        </div>
        <fileUploadZoom ref="fileUploadZoom" :maxLength="activeFiles.maxLength" :fileType="activeFiles.fileType" :files="activeFiles.urls" @success="fileZoomSuccess" :readonly="editable"></fileUploadZoom>

        <div class="foot-submit" v-if="!editable">
            <div class="fix-area">
                <button class="btn" type="button" @click="editParamSubmit">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import {getOfficialDetail} from '@/util/getData'
  import fileUpload from '@/components/fileUpload'
  import fileUploadZoom from '@/components/fileUploadZoom'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import brandItem from '@/components/brandItem'
  export default {
    name: 'imgPart',
    data () {
      return {
        progressBarVisible:false,
        uploadProgressBar:0,
        uploadProgressTip:'正在上传',
        activeFiles:{
          urls:[],
          tag:'',
          maxLength:3,
          fileType:'img'
        },
        photoZoomIndex:0,
        imgDetail: {},
        img:{
          farList: [],
          leftList: [],
          middleList: [],
          nearList: [],
          oppositeList: [],
          planeList: [],
          rightList: [],
          videoList: []
        },
        brandCount:{
          a:0,b:0,c:0
        },
        brand: {
          "dl10Attr": "",
          "dl1Attr": "",
          "dl2Attr": "",
          "dl3Attr": "",
          "dl4Attr": "",
          "dl5Attr": "",
          "dl6Attr": "",
          "dl7Attr": "",
          "dl8Attr": "",
          "dl9Attr": "",
          "dmAttr": "",
          "downLeft1": "",
          "downLeft10": "",
          "downLeft10At": "",
          "downLeft1At": "",
          "downLeft2": "",
          "downLeft2At": "",
          "downLeft3": "",
          "downLeft3At": "",
          "downLeft4": "",
          "downLeft4At": "",
          "downLeft5": "",
          "downLeft5At": "",
          "downLeft6": "",
          "downLeft6At": "",
          "downLeft7": "",
          "downLeft7At": "",
          "downLeft8": "",
          "downLeft8At": "",
          "downLeft9": "",
          "downLeft9At": "",
          "downMiddle": "",
          "downMiddleAt": "",
          "downRight1": "",
          "downRight10": "",
          "downRight10At": "",
          "downRight1At": "",
          "downRight2": "",
          "downRight2At": "",
          "downRight3": "",
          "downRight3At": "",
          "downRight4": "",
          "downRight4At": "",
          "downRight5": "",
          "downRight5At": "",
          "downRight6": "",
          "downRight6At": "",
          "downRight7": "",
          "downRight7At": "",
          "downRight8": "",
          "downRight8At": "",
          "downRight9": "",
          "downRight9At": "",
          "dr10Attr": "",
          "dr1Attr": "",
          "dr2Attr": "",
          "dr3Attr": "",
          "dr4Attr": "",
          "dr5Attr": "",
          "dr6Attr": "",
          "dr7Attr": "",
          "dr8Attr": "",
          "dr9Attr": "",
          "middle": "",
          "middleAt": "",
          "roadName": "",
          "ul10Attr": "",
          "ul1Attr": "",
          "ul2Attr": "",
          "ul3Attr": "",
          "ul4Attr": "",
          "ul5Attr": "",
          "ul6Attr": "",
          "ul7Attr": "",
          "ul8Attr": "",
          "ul9Attr": "",
          "upLeft1": "",
          "upLeft10": "",
          "upLeft10At": "",
          "upLeft1At": "",
          "upLeft2": "",
          "upLeft2At": "",
          "upLeft3": "",
          "upLeft3At": "",
          "upLeft4": "",
          "upLeft4At": "",
          "upLeft5": "",
          "upLeft5At": "",
          "upLeft6": "",
          "upLeft6At": "",
          "upLeft7": "",
          "upLeft7At": "",
          "upLeft8": "",
          "upLeft8At": "",
          "upLeft9": "",
          "upLeft9At": "",
          "upRight1": "",
          "upRight10": "",
          "upRight10At": "",
          "upRight1At": "",
          "upRight2": "",
          "upRight2At": "",
          "upRight3": "",
          "upRight3At": "",
          "upRight4": "",
          "upRight4At": "",
          "upRight5": "",
          "upRight5At": "",
          "upRight6": "",
          "upRight6At": "",
          "upRight7": "",
          "upRight7At": "",
          "upRight8": "",
          "upRight8At": "",
          "upRight9": "",
          "upRight9At": "",
          "ur10Attr": "",
          "ur1Attr": "",
          "ur2Attr": "",
          "ur3Attr": "",
          "ur4Attr": "",
          "ur5Attr": "",
          "ur6Attr": "",
          "ur7Attr": "",
          "ur8Attr": "",
          "ur9Attr": ""
        },
        // objId:''
      }
    },
    props: {
      editable:{
        default: 'false',
        type: Boolean,
      },
      objId:{
        default: '',
        type: String,
      }
    },
    components: {
      fileUpload,
      fileUploadZoom,
      brandItem
    },
    created() {

    },
    mounted() {
      getOfficialDetail(this.objId,1).then((res)=>{
        let resImg = res.img || {};
        let resBrand = resImg.brand;
        this.imgDetail = {...this.imgDetail,...resImg};
        this.img = {...this.img,...resImg};
        this.brand = {...this.brand,...resBrand}

        this.countBrandAttr();//计算品牌数量
      }).catch((err)=>{
        console.log(err)
      });
    },
    methods: {
      // 上传文件进度条
      fileUploadProgress(res){
        let pbar = Math.round(res.loaded/res.total*100);
        this.uploadProgressTip = '正在上传';
        if(!this.progressBarVisible){
          this.progressBarVisible = true;
        }
        this.uploadProgressBar = pbar;
        // if(pbar === 100){
        //     setTimeout(()=>{
        //         this.progressBarVisible = false;
        //     },1500)
        // }
      },
      // 上传成功回调
      fileUploadSuccess(res,tag){
        this.uploadProgressTip = '上传成功';
        console.log(res)
        this.img[tag] = res.showPath;
      },
      fileUploadError(res,tag){
        this.uploadProgressTip = '上传失败';
      },
      fileUploadComplete(res,tag){
        setTimeout(()=>{
          this.progressBarVisible = false;
        },1500)
      },

      // 打开相册编辑
      openFileZoom(tag,maxLength=3,fileType='img'){
        console.log(maxLength)
        this.activeFiles = {
          urls : [...this.img[tag]],
          tag: tag,
          maxLength,
          fileType,
        }
        this.$refs.fileUploadZoom.open()
      },
      // 相册保存
      fileZoomSuccess(res){
        this.img[this.activeFiles.tag] = res;
      },
      // 计算品牌属性统计值
      countBrandAttr(){
        const {brand} = this;
        let brandCount= {
          a : 0,
          b : 0,
          c : 0
        }
        for(let i in brand){
          if(/Attr$/.test(i)){
            if(brand[i]==='A'){
              brandCount.a += 1;
            }else if(brand[i]==='B'){
              brandCount.b += 1;
            }else if(brand[i]==='C'){
              brandCount.c += 1;
            }
          }
        }
        this.brandCount = brandCount;
      },
      //设置品牌修改属性
      setBrandAttr(s,t){
        const {brand} = this;
        brand[t] = s;
        this.countBrandAttr()
      },
      /*
        *正式目标点编辑保存
        * 0 baseParam 基本信息
        * 1 imgParam 图片信息
        * 3 rentParam 租赁信息
        * 4 projectParam 工程信息
        * 5 landlordParam 房东信息
        * 7 siteInfoParams 选址分析
      */
      editParamSubmit(){
        let {img,brand,objId} = this;
        let postParam = {};
        postParam.objId = objId;
        postParam.type = 1;
        postParam.imgParam = {...img,brand};
        console.log(postParam,'保存请求参数');
        // return false;
        postTokenData(base.basePath + '/objPoint/formalObj/edit',postParam, {
          success: (res)=> {
            if (res.success && res.code == '0000') {
              Toast({message: '保存成功！', iconClass: 'mintui mintui-field-success'})
              getOfficialDetail(objId, 1);//刷新数据
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('Error : ' + JSON.stringify(data))
          }
        });
      }

    }
  }
</script>
<style lang="scss" scoped>
    /*@import '~@/assets/css/base';*/
</style>