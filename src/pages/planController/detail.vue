<template>
    <div class="wrapper">

        <mt-navbar v-model="formType">
            <mt-tab-item id="0">基础信息</mt-tab-item>
            <mt-tab-item id="1">照片</mt-tab-item>
        </mt-navbar>
        <div class="mint-navContent">
            <mt-tab-container v-model="formType" class="mt-tab">
                <mt-tab-container-item id="0">
                    
                    <div class="main-content">
                        <div class="row-form">
                            <div class="row-item bdbtm">
                                <div class="rtitle">流程类型</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" v-model="base.planningTypeName"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">名称</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" v-model="base.name"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">经纬度</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="coordinateStr"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">所在地区</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="cityAreaStr"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">详细地址</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" v-model="base.address"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">规划内/外</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="inOrOutStr"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">焦点范围</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" v-model="base.focusArea"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">千分点</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" v-model="base.milliPoint" ></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">所属公司</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="base.level1Name"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">所属分公司</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" :value="base.level2Name" readonly=""></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">所属开发部</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" :value="base.level3Name" readonly=""></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">开发专员</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="base.devStaffName"></div>
                            </div>
                            <!-- <div class="row-item bdbtm">
                                <div class="rtitle">所属商圈</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="base.tradingAreaName"></div>
                            </div> -->
                            <div class="row-item bdbtm" v-if="base.planningType == 1 || base.planningType == 2">
                                <div class="rtitle">原店名称</div>
                                <div class="rvalue"><input placeholder="-" type="text" class="ipt" readonly="" :value="base.oldShopName"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">预计出店时间</div>
                                <div class="rvalue"><input placeholder="选择预计出店时间" type="text" class="ipt" readonly="" :value="formatDate(base.predictTime,'yyyy-MM-dd') || '-'" @click="$refs.predictTime.open()"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">备注</div>
                                <div class="rvalue"><textarea placeholder="" class="ipt" readonly="" v-model="base.remark"></textarea></div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>

                <mt-tab-container-item id="1">
                    <div class="main-content">
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
                                            <img v-if="img.nearList.length>0" :src="img.nearList[0]" @click="openFileZoom('nearList')" alt="">
                                        </div>
                                        <div class="txt">近景</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.middleList.length>0" :src="img.middleList[0]" @click="openFileZoom('middleList')" alt="">
                                        </div>
                                        <div class="txt">中景</div>
                                    </li>
                                    <li>

                                        <div class="pic">
                                            <img v-if="img.farList.length>0" :src="img.farList[0]" @click="openFileZoom('farList')" alt="">
                                        </div>
                                        <div class="txt">远景</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.leftList.length>0" :src="img.leftList[0]" @click="openFileZoom('leftList')" alt="">
                                        </div>
                                        <div class="txt">左侧</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.rightList.length>0" :src="img.rightList[0]" @click="openFileZoom('rightList')" alt="">
                                        </div>
                                        <div class="txt">右侧</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.oppositeList.length>0" :src="img.oppositeList[0]" @click="openFileZoom('oppositeList')" alt="">
                                        </div>
                                        <div class="txt">目标点对面</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.planeList.length>0" :src="img.planeList[0]" @click="openFileZoom('planeList')" alt="">
                                        </div>
                                        <div class="txt">手绘平面图</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <img v-if="img.videoList.length>0" src="../../assets/icon-video.png" @click="openFileZoom('videoList',1,'video')" alt="">
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
                                    <brandItem :readonly="true" :attr="brand.ul1Attr"  v-model="brand.upLeft1"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul2Attr"  v-model="brand.upLeft2"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul3Attr"  v-model="brand.upLeft3"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul4Attr"  v-model="brand.upLeft4"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul5Attr"  v-model="brand.upLeft5"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul6Attr"  v-model="brand.upLeft6"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul7Attr"  v-model="brand.upLeft7"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul8Attr"  v-model="brand.upLeft8"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul9Attr"  v-model="brand.upLeft9"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ul10Attr" v-model="brand.upLeft10"></brandItem>
                                    <!-- 中心点 -->
                                    <li class="on"><div class="lab-ctrl"><input type="text" class="ipt" v-model="brand.middle"></div></li>

                                    <brandItem :readonly="true" :attr="brand.ur1Attr"  v-model="brand.upRight1"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur2Attr"  v-model="brand.upRight2"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur3Attr"  v-model="brand.upRight3"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur4Attr"  v-model="brand.upRight4"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur5Attr"  v-model="brand.upRight5"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur6Attr"  v-model="brand.upRight6"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur7Attr"  v-model="brand.upRight7"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur8Attr"  v-model="brand.upRight8"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur9Attr"  v-model="brand.upRight9"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.ur10Attr"  v-model="brand.upRight10"></brandItem>

                                </ul>
                                <ul class="brand-list">
                                    <!-- 下层 --> 
                                    <brandItem :readonly="true" :attr="brand.dl1Attr"  v-model="brand.downLeft1"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl2Attr"  v-model="brand.downLeft2"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl3Attr"  v-model="brand.downLeft3"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl4Attr"  v-model="brand.downLeft4"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl5Attr"  v-model="brand.downLeft5"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl6Attr"  v-model="brand.downLeft6"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl7Attr"  v-model="brand.downLeft7"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl8Attr"  v-model="brand.downLeft8"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl9Attr"  v-model="brand.downLeft9"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dl10Attr" v-model="brand.downLeft10"></brandItem>

                                    <brandItem :readonly="true" :attr="brand.dmAttr" v-model="brand.downMiddle"></brandItem>

                                    <brandItem :readonly="true" :attr="brand.dr1Attr"  v-model="brand.downRight1"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr2Attr"  v-model="brand.downRight2"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr3Attr"  v-model="brand.downRight3"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr4Attr"  v-model="brand.downRight4"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr5Attr"  v-model="brand.downRight5"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr6Attr"  v-model="brand.downRight6"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr7Attr"  v-model="brand.downRight7"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr8Attr"  v-model="brand.downRight8"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr9Attr"  v-model="brand.downRight9"></brandItem>
                                    <brandItem :readonly="true" :attr="brand.dr10Attr" v-model="brand.downRight10"></brandItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <fileUploadZoom ref="fileUploadZoom" title="查看照片" :maxLength="activeFiles.maxLength" :fileType="activeFiles.fileType" :files="activeFiles.urls" @success="fileZoomSuccess" :readonly="true"></fileUploadZoom>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,gaode2baidu,baidu2gaode,formatDate} from '@/util/common'
  import selectPicker from '@/components/selectPicker'
  import fileUpload from '@/components/fileUpload'
  import fileUploadZoom from '@/components/fileUploadZoom'
  import brandItem from '@/components/brandItem'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'PlanControllerDetail',
    data() {
      return {
        formType:'0',
        planningType:[''],
        selectPoints:[''],
        inOrOutOptions:[{id:'IN',name:'内'},{id:'OUT',name:'外'}],
        base: {
            "address": "",
            "devStaffId": "",
            "devStaffName": "",
            "provId": "",
            "provName": "",
            "eparchyCode": "",
            "eparchyName": "",
            "areaCode": "",
            "areaName": "",
            "figureLevel": "",
            "figureLevelName": "",
            "flour": "",
            "flourData": "",
            "focusArea": "",
            "formalCode": "",
            "franId": "",
            "franName": "",
            "inOrOut": "",
            "inoutDistrict": "",
            "inoutDistrictData": "",
            "latitude": "",
            "level1": "",
            "level1Name": "",
            "level2": "",
            "level2Name": "",
            "level3": "",
            "level3Name": "",
            "longitude": "",
            "milliPoint": "",
            "name": "",
            "oldShopId": "",
            "oldShopName": "",
            "peopleCount": "",
            "peopleCountData": "",
            "planningType": "",
            "planningTypeName": "",
            "positionLevel": "",
            "positionLevelName": "",
            "predictTime": "2018-12-13T06:38:21.246Z",
            "region": "",
            "remark": "",
            "shopNature": "",
            "status": "",
            "tradingArea": "",
            "tradingAreaName": ""
        },
        level1Options:[''],
        level2Options:[''],
        level3Options:[''],
        devStaffOptions:[''],
        tradingAreaOptions:[''],
        oldShopOptions:[''],

        progressBarVisible:false,
        uploadProgressBar:0,
        uploadProgressTip:'正在上传',
        activeFiles:{
            urls:['http://wst.dumplingss.com/upload/admin/20181213/b35ac6ea5f66223436c7650f5c8eef73.jpg','http://wst.dumplingss.com/upload/portal/20180924/b4647e588bd93c7f4e79d694b3bb1964.jpg','http://wst.dumplingss.com/upload/portal/20180924/b4647e588bd93c7f4e79d694b3bb1964.jpg'],
            tag:'',
            maxLength:3,
            fileType:'img'
        },
        photoZoomIndex:0,
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
        gid:''
      }
    },    
    components: {
      fileUpload,
      fileUploadZoom,
      selectPicker,
      brandItem
    },
    created() {
        this.gid = this.$route.query.id;
        this.getDataInfo()
        this.getDataInfo(1).then(()=>{
            this.countBrandAttr()
        })
    },
    mounted() {
        
    },
    methods: {
        formatDate,
        // 获取信息
        getDataInfo(tabType=0){
            return new Promise((rev,rej)=>{
                const gid = this.gid;
                postTokenData('/objPoint/planObj/detail',{id:gid,tabType},(res)=>{
                    if(res.code==='0000'){
                        if(tabType==0){
                            this.base = {...this.base, ...res.data.base}
                        }else{
                            if(res.data){
                                const img = res.data.img || {}, brand = res.data.img.brand;
                                this.img = {...this.img, 
                                   farList: img.farList || [],
                                   leftList: img.leftList || [],
                                   middleList: img.middleList || [],
                                   nearList: img.nearList || [],
                                   oppositeList: img.oppositeList || [],
                                   planeList: img.planeList || [],
                                   rightList: img.rightList || [],
                                   videoList: img.videoList || [],
                                }
                                this.brand = {...this.brand,...brand}
                            } 
                        }
                        
                        rev()
                    }
                })
            }).catch((err)=>{
            console.log(err)
          })
        },

        // 打开相册编辑
        openFileZoom(tag,maxLength=3,fileType='img'){
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

        // 选择地图经纬度
        openSelectMap(){
            dd.ready(()=>{
                const {base} = this;
                const gd_coord = baidu2gaode(base.longitude,base.latitude);
                dd.biz.map.locate({
                    latitude: gd_coord.lat,
                    longitude: gd_coord.lng,
                    scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
                    onSuccess: (poi)=> {
                        let coord = gaode2baidu(poi.longitude,poi.latitude)
                        console.log(coord)
                        this.base = {
                            ...this.base,
                            longitude: coord.lng,
                            latitude: coord.lat,
                            address: poi.snippet
                        }
                        console.log(poi)
                    },
                    onFail: (err)=> {
                        console.log(err)
                    }
                });
            })
        },
    },
    computed: {
        cityAreaStr(){
            const {base} = this;
            if(base.provName){
                return base.provName+' '+base.eparchyName+' '+ base.areaName 
            }else{
                return ''
            }
        },
        coordinateStr(){
            const {base} = this;
            if(base.longitude && base.latitude){
                return base.longitude+','+base.latitude
            }else{
                return ''
            }
        },
        inOrOutStr(){
            const {base} = this;
            let str = ''
            if(base.inOrOut == 'IN') str = '内'
            if(base.inOrOut == 'OUT') str = '外'
            return str;
        },

    },


    watch:{
        // 切换tab类型
        formType(val){

            // this.getDataInfo()
        }
    },
  }
</script>

