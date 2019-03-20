<template>
    <div class="wrapper">
        <div class="main-content">
            <form class="row-form" ref="postForm">
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>流程类型</div>
                    <div class="rvalue"><input placeholder="选择流程类型" type="text" class="ipt" rule="required" error="选择流程类型" readonly="" v-model="base.planningTypeName" @click="$refs.selectPicker.open()"><i class="iconfont icon-right-arrow"></i></div>
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
                    <div class="rvalue"><input placeholder="输入详细地址" type="text" class="ipt" autofocus="autofocus" v-model="base.address"></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>规划内/外</div>
                    <div class="rvalue"><input placeholder="选择规划类型" type="text" class="ipt" readonly="" rule="required" error="选择规划类型" :value="inOrOutStr" @click="$refs.selectInOrOut.open()"><i class="iconfont icon-right-arrow"></i></div>
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
                    <div class="rvalue"><input placeholder="选择所属分公司" type="text" class="ipt"  rule="required" error="选择所属分公司" :value="base.level2Name" @click="$refs.selectLevel2.open()" readonly=""><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>所属开发部</div>
                    <div class="rvalue"><input placeholder="选择所属开发部" type="text" class="ipt"  rule="required" error="选择所属开发部" :value="base.level3Name" @click="$refs.selectLevel3.open()" readonly=""><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>开发专员</div>
                    <div class="rvalue"><input placeholder="选择开发专员" type="text" class="ipt" readonly=""  rule="required" error="选择开发专员" :value="base.devStaffName" @click="$refs.selectDevStaff.open()"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <!-- <div class="row-item bdbtm">
                    <div class="rtitle">所属商圈</div>
                    <div class="rvalue"><input placeholder="选择所属商圈" type="text" class="ipt" readonly="" :value="base.tradingAreaName" @click="$refs.selectTradingArea.open()"><i class="iconfont icon-right-arrow"></i></div>
                </div> -->
                <div class="row-item bdbtm" v-if="base.planningType == 1 || base.planningType == 2">
                    <div class="rtitle"><i class="icon-must">*</i>原店名称</div>
                    <div class="rvalue"><input placeholder="选择原店名称" type="text" class="ipt" readonly=""  rule="required" error="选择原店名称" :value="base.oldShopName" @click="$refs.selectOldShop.open()"><i class="iconfont icon-right-arrow"></i></div>
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
        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="submitSaveData">保存</button>
            </div>
        </div>
        <areaPicker ref="areaPicker" @confirm="selectArea"></areaPicker>
        <selectPicker ref="selectPicker" @confirm="selectPlanningType" :options="planningType">流程类型</selectPicker>
        <selectPicker ref="selectInOrOut" @confirm="selectInOrOut"  :count="3" :options="inOrOutOptions">规划内/外</selectPicker>
        <selectPicker ref="selectLevel1" @confirm="selectLevel1" :count="7" :options="level1Options">总公司</selectPicker>
        <selectPicker ref="selectLevel2" @confirm="selectLevel2" :count="5" :options="level2Options">分公司</selectPicker>
        <selectPicker ref="selectLevel3" @confirm="selectLevel3" :count="5" :options="level3Options">开发部</selectPicker>
        <selectPicker ref="selectDevStaff" @confirm="selectDevStaff" :count="7" :options="devStaffOptions">开发专员</selectPicker>
        <!-- <selectPicker ref="selectTradingArea" @confirm="selectTradingArea" :count="5" :options="tradingAreaOptions">选择商圈</selectPicker> -->
        <selectPicker ref="selectOldShop" @confirm="selectOldShop" :count="7" :options="oldShopOptions">选择原店</selectPicker>
        <mt-datetime-picker ref="predictTime" :startDate="new Date()" type="date" @confirm="select_predictTime"></mt-datetime-picker>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import { validForm } from '@/util/utils'
  import {base,postTokenData,geoLocation,gaode2baidu,formatDate} from '@/util/common'
  import areaPicker from '@/components/areaPicker'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'PlanControllerAdd',
    data() {
      return {
        listType:"0",
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
            "predictTime": "",
            "region": "",
            "remark": "",
            "shopNature": "",
            "status": "",
            "tradingArea": "",
            "tradingAreaName": ""
        },
        img:{

        },
        level1Options:[''],
        level2Options:[''],
        level3Options:[''],
        devStaffOptions:[''],
        tradingAreaOptions:[''],
        oldShopOptions:[''],
        localtionCitys:[],
      }
    },    
    components: {
      areaPicker,
      selectPicker
    },
    created() {
        this.getPlanningType();
        this.getLevel1();
        
    },
    mounted() {
        
    },
    methods: {
        formatDate,
        // 选择预计出店时间
        select_predictTime(res){
            this.base.predictTime = new Date(res).getTime();
        },

        // 选择流程类型
        selectPlanningType(res){
            this.base.planningType = res.id;
            this.base.planningTypeName = res.name;
            console.log(res.id)
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
            this.getOldShop()
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
        getLevel1(){
          return new Promise((rev,rej)=>{
            postTokenData('/select/selectData/getOfficeList',{type:1},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.level1Options = rjson;
                  if(rjson.length == 1){
                    this.selectLevel1(rjson[0])
                  }
                  rev(rjson)
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
                  rev(rjson)
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
                  rev(rjson)
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
                  rev(rjson)
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
                  rev(rjson)
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 获取原店数据
        getOldShop(id){
          return new Promise((rev,rej)=>{
            const {level1 , level2} = this.base;
            postTokenData('/select/selectData/getShopList',{level1,level2},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  this.oldShopOptions = rjson;
                  rev(rjson)
                }
            })
          }).catch((err)=>{
            console.log(err)
          })
        },




        submitSaveData(){
            const {base} = this;
            const validResult = validForm(this.$refs.postForm);
            if(!validResult.status){
                Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                return false;
            }
            postTokenData('/objPoint/planObj/save',{base},(res)=>{
                if(res.code==='0000'){
                    Toast({message: res.message, iconClass: 'mintui mintui-field-success'})
                    setTimeout(()=>{
                        this.$router.back(-1)
                    },1500)
                    // this.planningType = rjson;
                }else{
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
            })

        },
        // 选择地图经纬度
        openSelectMap(){
            dd.ready(()=>{
                dd.biz.map.locate({
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
                        console.log(poi)
                    },
                    onFail: (err)=> {
                        console.log(err)
                    }
                });
            })
        }
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
        ...mapState({
          locationInfo: state => state.location.data
        })
    },

    watch:{

    },
  }
</script>
