<template>
    <div class="wrapper">

        <mt-navbar v-model="formType">
            <a class="mint-tab-item" :class="{'is-selected':formType == '0'}"  @click="changeFormType('0')"><div class="mint-tab-item-label">基础信息</div></a>
            <a class="mint-tab-item" :class="{'is-selected':formType == '1'}"  @click="changeFormType('1')"><div class="mint-tab-item-label">照片</div></a>
            <!-- <mt-tab-item id="0" @click="changeFormType">基础信息</mt-tab-item>
            <mt-tab-item id="1">照片</mt-tab-item> -->
        </mt-navbar>
        <div class="mint-navContent">
            <mt-tab-container v-model="formType" class="mt-tab">
                <mt-tab-container-item id="0">
                    
                    <div class="main-content">
                        <form class="row-form" ref="postForm">
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>流程类型</div>
                                <div class="rvalue"><input placeholder="选择流程类型" type="text" class="ipt" readonly="" rule="required" error="选择流程类型" v-model="base.planningTypeName" @click="$refs.selectPicker.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>名称</div>
                                <div class="rvalue"><input placeholder="输入规划目标点名称" type="text" class="ipt" rule="required" error="输入规划目标点名称" maxlength="50" v-model="base.name"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">经纬度</div>
                                <div class="rvalue"><input @click="openSelectMap" placeholder="选择经纬度" type="text" class="ipt" readonly="" :value="coordinateStr"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>所在地区</div>
                                <div class="rvalue"><input placeholder="选择所在地区" type="text" class="ipt" readonly="" rule="required" error="选择所在地区" :value="cityAreaStr" @click="$refs.areaPicker.open(localtionCitys[2] ? localtionCitys : [base.provName, base.eparchyName, base.areaName ])"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">详细地址</div>
                                <div class="rvalue"><input placeholder="输入详细地址" type="text" class="ipt" v-model="base.address"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">规划内/外</div>
                                <div class="rvalue"><input placeholder="选择类型" type="text" class="ipt" readonly="" rule="required" error="选择规划类型" :value="inOrOutStr" @click="$refs.selectInOrOut.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">焦点范围</div>
                                <div class="rvalue"><input placeholder="输入焦点范围" type="text" class="ipt" v-model="base.focusArea"></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">千分点</div>
                                <div class="rvalue"><input placeholder="输入千分点" type="text" class="ipt" v-model="base.milliPoint" ></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>所属公司</div>
                                <div class="rvalue"><input placeholder="选择所属公司" type="text" class="ipt" readonly="" rule="required" error="选择所属公司" :value="base.level1Name" @click="$refs.selectLevel1.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>所属分公司</div>
                                <div class="rvalue"><input placeholder="选择所属分公司" type="text" class="ipt"  rule="required" error="选择所属分公司" :value="base.level2Name"  @click="$refs.selectLevel2.open()" readonly=""><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>所属开发部</div>
                                <div class="rvalue"><input placeholder="选择所属开发部" type="text" class="ipt" rule="required" error="选择所属开发部" :value="base.level3Name"  @click="$refs.selectLevel3.open()" readonly=""><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle"><i class="icon-must">*</i>开发专员</div>
                                <div class="rvalue"><input placeholder="选择开发专员" type="text" class="ipt" readonly="" rule="required" error="选择开发专员" :value="base.devStaffName"  @click="$refs.selectDevStaff.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <!-- <div class="row-item bdbtm">
                                <div class="rtitle">所属商圈</div>
                                <div class="rvalue"><input placeholder="选择所属商圈" type="text" class="ipt" readonly="" :value="base.tradingAreaName"  @click="$refs.selectTradingArea.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div> -->
                            <div class="row-item bdbtm" v-if="base.planningType == 1 || base.planningType == 2">
                                <div class="rtitle"><i class="icon-must">*</i>原店名称</div>
                                <div class="rvalue"><input placeholder="选择原店名称" type="text" class="ipt" readonly="" rule="required" error="选择原店名称" :value="base.oldShopName"  @click="$refs.selectOldShop.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">预计出店时间</div>
                                <div class="rvalue"><input placeholder="选择预计出店时间" type="text" class="ipt" readonly="" :value="formatDate(base.predictTime,'yyyy-MM-dd')" @click="$refs.predictTime.open()"><i class="iconfont icon-right-arrow"></i></div>
                            </div>
                            <div class="row-item bdbtm">
                                <div class="rtitle">备注</div>
                                <div class="rvalue"><textarea placeholder="输入备注" class="ipt" rule="remark2" error="备注字数不能超过50字" maxlength="50" v-model="base.remark"></textarea></div>
                            </div>
                        </form>
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
                                            <div v-if="img.nearList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="nearList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.nearList[0]" @click="openFileZoom('nearList')" alt="">
                                        </div>
                                        <div class="txt">近景</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.middleList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="middleList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.middleList[0]" @click="openFileZoom('middleList')" alt="">
                                        </div>
                                        <div class="txt">中景</div>
                                    </li>
                                    <li>

                                        <div class="pic">
                                            <div v-if="img.farList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="farList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.farList[0]" @click="openFileZoom('farList')" alt="">
                                        </div>
                                        <div class="txt">远景</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.leftList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="leftList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.leftList[0]" @click="openFileZoom('leftList')" alt="">
                                        </div>
                                        <div class="txt">左侧</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.rightList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="rightList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.rightList[0]" @click="openFileZoom('rightList')" alt="">
                                        </div>
                                        <div class="txt">右侧</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.oppositeList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="oppositeList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.oppositeList[0]" @click="openFileZoom('oppositeList')" alt="">
                                        </div>
                                        <div class="txt">目标点对面</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.planeList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="planeList" fileType="img" :maxLength="3" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else :src="img.planeList[0]" @click="openFileZoom('planeList')" alt="">
                                        </div>
                                        <div class="txt">手绘平面图</div>
                                    </li>
                                    <li>
                                        <div class="pic">
                                            <div v-if="img.videoList.length==0"><i class="iconfont icon-jia"></i><fileUpload fileTag="videoList" fileType="video" :maxLength="1" @success="fileUploadSuccess" @error="fileUploadError"  @complete="fileUploadComplete" @uploadProgress="fileUploadProgress" ></fileUpload></div>
                                            <img v-else src="../../assets/icon-video.png" @click="openFileZoom('videoList',1,'video')" alt="">
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
                                    <brandItem :attr="brand.ul1Attr" @click="setBrandAttr($event,'ul1Attr')" v-model="brand.upLeft1"></brandItem>
                                    <brandItem :attr="brand.ul2Attr" @click="setBrandAttr($event,'ul2Attr')" v-model="brand.upLeft2"></brandItem>
                                    <brandItem :attr="brand.ul3Attr" @click="setBrandAttr($event,'ul3Attr')" v-model="brand.upLeft3"></brandItem>
                                    <brandItem :attr="brand.ul4Attr" @click="setBrandAttr($event,'ul4Attr')" v-model="brand.upLeft4"></brandItem>
                                    <brandItem :attr="brand.ul5Attr" @click="setBrandAttr($event,'ul5Attr')" v-model="brand.upLeft5"></brandItem>
                                    <brandItem :attr="brand.ul6Attr" @click="setBrandAttr($event,'ul6Attr')" v-model="brand.upLeft6"></brandItem>
                                    <brandItem :attr="brand.ul7Attr" @click="setBrandAttr($event,'ul7Attr')" v-model="brand.upLeft7"></brandItem>
                                    <brandItem :attr="brand.ul8Attr" @click="setBrandAttr($event,'ul8Attr')" v-model="brand.upLeft8"></brandItem>
                                    <brandItem :attr="brand.ul9Attr" @click="setBrandAttr($event,'ul9Attr')" v-model="brand.upLeft9"></brandItem>
                                    <brandItem :attr="brand.ul10Attr" @click="setBrandAttr($event,'ul10Attr')" v-model="brand.upLeft10"></brandItem>
                                    <!-- 中心点 -->
                                    <li class="on"><div class="lab-ctrl"><input type="text" class="ipt" v-model="brand.middle"></div></li>

                                    <brandItem :attr="brand.ur1Attr" @click="setBrandAttr($event,'ur1Attr')" v-model="brand.upRight1"></brandItem>
                                    <brandItem :attr="brand.ur2Attr" @click="setBrandAttr($event,'ur2Attr')" v-model="brand.upRight2"></brandItem>
                                    <brandItem :attr="brand.ur3Attr" @click="setBrandAttr($event,'ur3Attr')" v-model="brand.upRight3"></brandItem>
                                    <brandItem :attr="brand.ur4Attr" @click="setBrandAttr($event,'ur4Attr')" v-model="brand.upRight4"></brandItem>
                                    <brandItem :attr="brand.ur5Attr" @click="setBrandAttr($event,'ur5Attr')" v-model="brand.upRight5"></brandItem>
                                    <brandItem :attr="brand.ur6Attr" @click="setBrandAttr($event,'ur6Attr')" v-model="brand.upRight6"></brandItem>
                                    <brandItem :attr="brand.ur7Attr" @click="setBrandAttr($event,'ur7Attr')" v-model="brand.upRight7"></brandItem>
                                    <brandItem :attr="brand.ur8Attr" @click="setBrandAttr($event,'ur8Attr')" v-model="brand.upRight8"></brandItem>
                                    <brandItem :attr="brand.ur9Attr" @click="setBrandAttr($event,'ur9Attr')" v-model="brand.upRight9"></brandItem>
                                    <brandItem :attr="brand.ur10Attr" @click="setBrandAttr($event,'ur10Attr')" v-model="brand.upRight10"></brandItem>

                                </ul>
                                <ul class="brand-list">
                                    <!-- 下层 --> 
                                    <brandItem :attr="brand.dl1Attr" @click="setBrandAttr($event,'dl1Attr')" v-model="brand.downLeft1"></brandItem>
                                    <brandItem :attr="brand.dl2Attr" @click="setBrandAttr($event,'dl2Attr')" v-model="brand.downLeft2"></brandItem>
                                    <brandItem :attr="brand.dl3Attr" @click="setBrandAttr($event,'dl3Attr')" v-model="brand.downLeft3"></brandItem>
                                    <brandItem :attr="brand.dl4Attr" @click="setBrandAttr($event,'dl4Attr')" v-model="brand.downLeft4"></brandItem>
                                    <brandItem :attr="brand.dl5Attr" @click="setBrandAttr($event,'dl5Attr')" v-model="brand.downLeft5"></brandItem>
                                    <brandItem :attr="brand.dl6Attr" @click="setBrandAttr($event,'dl6Attr')" v-model="brand.downLeft6"></brandItem>
                                    <brandItem :attr="brand.dl7Attr" @click="setBrandAttr($event,'dl7Attr')" v-model="brand.downLeft7"></brandItem>
                                    <brandItem :attr="brand.dl8Attr" @click="setBrandAttr($event,'dl8Attr')" v-model="brand.downLeft8"></brandItem>
                                    <brandItem :attr="brand.dl9Attr" @click="setBrandAttr($event,'dl9Attr')" v-model="brand.downLeft9"></brandItem>
                                    <brandItem :attr="brand.dl10Attr" @click="setBrandAttr($event,'dl10Attr')" v-model="brand.downLeft10"></brandItem>

                                    <brandItem :attr="brand.dmAttr" @click="setBrandAttr($event,'dmAttr')" v-model="brand.downMiddle"></brandItem>

                                    <brandItem :attr="brand.dr1Attr" @click="setBrandAttr($event,'dr1Attr')" v-model="brand.downRight1"></brandItem>
                                    <brandItem :attr="brand.dr2Attr" @click="setBrandAttr($event,'dr2Attr')" v-model="brand.downRight2"></brandItem>
                                    <brandItem :attr="brand.dr3Attr" @click="setBrandAttr($event,'dr3Attr')" v-model="brand.downRight3"></brandItem>
                                    <brandItem :attr="brand.dr4Attr" @click="setBrandAttr($event,'dr4Attr')" v-model="brand.downRight4"></brandItem>
                                    <brandItem :attr="brand.dr5Attr" @click="setBrandAttr($event,'dr5Attr')" v-model="brand.downRight5"></brandItem>
                                    <brandItem :attr="brand.dr6Attr" @click="setBrandAttr($event,'dr6Attr')" v-model="brand.downRight6"></brandItem>
                                    <brandItem :attr="brand.dr7Attr" @click="setBrandAttr($event,'dr7Attr')" v-model="brand.downRight7"></brandItem>
                                    <brandItem :attr="brand.dr8Attr" @click="setBrandAttr($event,'dr8Attr')" v-model="brand.downRight8"></brandItem>
                                    <brandItem :attr="brand.dr9Attr" @click="setBrandAttr($event,'dr9Attr')" v-model="brand.downRight9"></brandItem>
                                    <brandItem :attr="brand.dr10Attr" @click="setBrandAttr($event,'dr10Attr')" v-model="brand.downRight10"></brandItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="submitSaveData">保存</button>
            </div>
        </div>
        <fileUploadZoom ref="fileUploadZoom" :maxLength="activeFiles.maxLength" :fileType="activeFiles.fileType" :files="activeFiles.urls" @success="fileZoomSuccess" ></fileUploadZoom>
        <areaPicker ref="areaPicker" @confirm="selectArea"></areaPicker>

        <selectPicker ref="selectPicker" @confirm="selectPlanningType" :options="planningType" :defaultValue="base.planningTypeName">流程类型</selectPicker>
        <selectPicker ref="selectInOrOut" @confirm="selectInOrOut"  :count="3" :options="inOrOutOptions" :defaultValue="inOrOutStr">规划内/外</selectPicker>
        <selectPicker ref="selectLevel1" @confirm="selectLevel1" :count="7" :options="level1Options" :defaultValue="base.level1Name">总公司</selectPicker>
        <selectPicker ref="selectLevel2" @confirm="selectLevel2" :count="5" :options="level2Options" :defaultValue="base.level2Name">分公司</selectPicker>
        <selectPicker ref="selectLevel3" @confirm="selectLevel3" :count="5" :options="level3Options" :defaultValue="base.level3Name">开发部</selectPicker>
        <selectPicker ref="selectDevStaff" @confirm="selectDevStaff" :count="7" :options="devStaffOptions" :defaultValue="base.devStaffName">开发专员</selectPicker>
        <!-- <selectPicker ref="selectTradingArea" @confirm="selectTradingArea" :count="7" :options="tradingAreaOptions" :defaultValue="base.tradingAreaName">选择商圈</selectPicker> -->
        <selectPicker ref="selectOldShop" @confirm="selectOldShop" :count="7" :options="oldShopOptions" :defaultValue="base.oldShopName">选择原店</selectPicker>
        <mt-datetime-picker ref="predictTime" :startDate="new Date()" type="date" @confirm="select_predictTime"></mt-datetime-picker>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import { validForm } from '@/util/utils'
  import {base, postTokenData, gaode2baidu, baidu2gaode, compareObject,formatDate} from '@/util/common'
  import areaPicker from '@/components/areaPicker'
  import selectPicker from '@/components/selectPicker'
  import fileUpload from '@/components/fileUpload'
  import fileUploadZoom from '@/components/fileUploadZoom'
  import brandItem from '@/components/brandItem'
  export default {
    name: 'PlanControllerEdit',
    data() {
      return {
        formType:'0',

        planningType:[''],
        selectPoints:[''],
        inOrOutOptions:[{id:'IN',name:'内'},{id:'OUT',name:'外'}],
        backup_base:{},
        backup_img:{},
        backup_brand:{},
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
            "predictTime": "",
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
        oldShopOptions:[],
        localtionCitys:[],
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
      areaPicker,
      selectPicker,
      brandItem
    },
    created() {
        this.gid = this.$route.query.id;
        this.getDataInfo().then(()=>{
            const {base} = this;
            this.getLevel1(false);
            this.getLevel2(base.level1);
            this.getLevel3(base.level2);
            this.getDevStaff(base.level3);
            // this.getTradingArea(base.areaCode);
            this.getOldShop();
        })
        this.getDataInfo(1).then(()=>{
            this.countBrandAttr()
        })
        this.getPlanningType();
    },
    mounted() {
        
    },
    methods: {
        formatDate,
        // 选择预计出店时间
        select_predictTime(res){
            this.base.predictTime = new Date(res).getTime();
        },
        // 选择流程页面
        changeFormType(id){
            const {formType} = this;
            let editFlag = false;
            switch(formType){
                case '0':
                editFlag = !compareObject(this.base,this.backup_base)
                break;
                case '1':
                editFlag = !compareObject(this.img,this.backup_img) || !compareObject(this.brand,this.backup_brand)
                break;
            }
            if(editFlag){
                    MessageBox.confirm('是否保存当前页面？','提示',{
                      closeOnClickModal: false
                    }).then(action => {
                        this.submitSaveData().then(()=>{
                            this.formType = id;
                        })
                    }).catch(()=>{
                        this.formType = id;
                    })
            }else{
                this.formType = id;
            }
        },
        
        // 获取信息
        getDataInfo(tabType=0){
            return new Promise((rev,rej)=>{
                const gid = this.gid;
                postTokenData('/objPoint/planObj/detail',{id:gid,tabType},(res)=>{
                    if(res.code==='0000'){
                        if(tabType==0){
                            const baseData = {...this.base, ...res.data.base};
                            this.base = baseData
                            this.backup_base = {...baseData}
                        }else{
                            // if(res.data){
                            let resData = res.data || {}
                            const img = resData.img || {}, brand = img.brand;
                            const imgData = {...this.img,
                               farList: img.farList || [],
                               leftList: img.leftList || [],
                               middleList: img.middleList || [],
                               nearList: img.nearList || [],
                               oppositeList: img.oppositeList || [],
                               planeList: img.planeList || [],
                               rightList: img.rightList || [],
                               videoList: img.videoList || [],
                            }
                            const brandData = {...this.brand,...brand};
                            this.img = imgData;
                            this.brand = brandData;
                            console.log(imgData)
                            this.backup_img = {...imgData}
                            this.backup_brand = {...brandData}
                            // } 
                        }
                        
                        rev()
                    }
                })
            }).catch((err)=>{
            console.log(err)
          })
        },

        // 选择流程类型
        selectPlanningType(res){
            this.base.planningType = res.id;
            this.base.planningTypeName = res.name;
            if((this.base.planningType == 1 || this.base.planningType == 2) && this.oldShopOptions.length==0){
                this.getOldShop()
            }
        },
        // 选择规划内、外
        selectInOrOut(res){
            this.base.inOrOut = res.id;
        },
        // 选择省市区
        selectArea(res){
            this.base = {
                ...this.base,
                tradingArea:'',
                tradingAreaName:'',
                provId: res.prov.id,
                provName: res.prov.name,
                eparchyCode: res.city.id,
                eparchyName: res.city.name,
                areaCode: res.dist.id,
                areaName: res.dist.name,
            }
            // this.getTradingArea(res.dist.id)
        },
        // 选择商圈
        selectTradingArea(res){
            this.base = {
                ...this.base,
                tradingArea: res.id,
                tradingAreaName: res.name,
            }
        },
        // 选择原店
        selectOldShop(res){
            this.base = {
                ...this.base,
                oldShopId: res.id,
                oldShopName: res.name,
            }
        },
        // 选择总公司
        selectLevel1(res){
            this.base = {
                ...this.base,
                level1: res.id,
                level1Name: res.name,
                level2: '',
                level2Name: '',
                level3: '',
                level3Name: '',
                oldShopId:'',
                oldShopName:'',
                devStaffId: '',
                devStaffName: '',
            }
            this.getLevel2(res.id).then((rjson)=>{
                if(rjson.length == 1){
                  this.selectLevel2(rjson[0]);
                }
            });
        },
        // 选择分公司
        selectLevel2(res){
            this.base = {
                ...this.base,
                level2: res.id,
                level2Name: res.name,
                level3: '',
                level3Name: '',
                oldShopId:'',
                oldShopName:'',
                devStaffId: '',
                devStaffName: '',
            }
            this.getLevel3(res.id).then((rjson)=>{
                if(rjson.length == 1){
                  this.selectLevel3(rjson[0]);
                }
            });
            if(this.base.planningType == 1 || this.base.planningType == 2){
                this.getOldShop()
            }
            
        },
        // 选择开发部
        selectLevel3(res){
            this.base = {
                ...this.base,
                level3: res.id,
                level3Name: res.name,
                devStaffId: '',
                devStaffName: '',
            }
            this.base.level3 = res.id;
            this.base.level3Name = res.name;
            this.getDevStaff(res.id).then((rjson)=>{
                if(rjson.length == 1){
                  this.selectDevStaff(rjson[0]);
                }
            });
        },
        // 选择开发部
        selectDevStaff(res){
            this.base.devStaffId = res.id;
            this.base.devStaffName = res.name;
        },

        // 获取流程类型数据
        getPlanningType(){
            postTokenData('/static/selectData/getStaticList',{type:'planning_type'},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    this.planningType = rjson;
                }
            })
        },
        // 获取总公司数据
        getLevel1(autoNext=true){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getOfficeList',{type:1},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.level1Options = rjson;
                  if(rjson.length == 1 && autoNext){
                    this.selectLevel1(rjson[0])
                  }
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },

        // 获取分公司数据
        getLevel2(id){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getOfficeList',{type:2,id},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.level2Options = rjson;
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 获取开发部数据
        getLevel3(id){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getOfficeList',{type:32,id},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.level3Options = rjson;
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 获取开发专员数据
        getDevStaff(id){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getDevelopList',{id},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.devStaffOptions = rjson;
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 获取商圈数据
        getTradingArea(id){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getAreaList',{id,type:3},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.tradingAreaOptions = rjson;
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 获取原店数据
        getOldShop(){
          return new Promise((rev,rej)=>{
            const {level1 , level2} = this.base;
            postTokenData('/select/selectData/getShopList',{level1,level2},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.oldShopOptions = rjson;
                  rev(rjson);
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },



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
        // 保存数据
        submitSaveData(){
            return new Promise((resolve,rej)=>{
                const {gid, base, img, formType, brand} = this;
                let formdata = formType==0 ? {type:formType, base, id:gid} : {type:formType, id:gid, img:{...img,brand}}
                if(formType == 0){
                    const validResult = validForm(this.$refs.postForm);
                    if(!validResult.status){
                        Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                        return false;
                    }
                }
                postTokenData('/objPoint/planObj/save',formdata,(res)=>{
                    if(res.code==='0000'){
                        if(formType == 0){
                            this.backup_base = {...this.base}
                        }else{
                            this.backup_img = {...this.img}
                            this.backup_brand = {...this.brand}
                        }
                        Toast({message: res.message, iconClass: 'mintui mintui-field-success'})
                        resolve()
                    }else{
                        Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                })
            }).catch((err)=>{
              console.log(err)
            })
        },

        // 选择地图经纬度
        
        openSelectMap(){
            dd.ready(()=>{
                const {base} = this;
                const gd_coord = baidu2gaode(base.longitude,base.latitude);
                console.log(gd_coord)
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
                        this.localtionCitys = [poi.province, poi.city, poi.adName]
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

