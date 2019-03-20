<template>
    <div class="wrapper">
        <div class="main-content">
            <div class="row-form">
                <div class="row-item bdbtm" v-if="pageAuth.new && pageAuth.heavy">
                    <div class="rtitle"><i class="icon-must">*</i>新老店</div>
                    <div class="rvalue">
                        <div class="raido-type">
                            <span class="point" :class="{'active': formData.objectType == 1}" @click="selectObjectType('1')">新店</span>
                            <span class="store" :class="{'active': formData.objectType == 0}" @click="selectObjectType('0')">老店</span>
                        </div>
                    </div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>{{formData.objectType==0 ? '门店' : '目标点'}}名称</div>
                    <div class="rvalue"><input :placeholder="'选择'+(formData.objectType==0 ? '门店' : '目标点')" type="text" class="ipt" readonly="" :value="formData.tObjName"  @click="$refs.selectShopTag.open()"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <form action="" ref="tempForm">
                    <ul class="row-tempUl" v-html="dataHtml">
                        <!-- 需求设计模板 -->
                    </ul>
                </form>
                <div class="row-item bdbtm">
                    <div class="rtitle">开发人员</div>
                    <div class="rvalue"><input :placeholder="'自动显示'+(formData.objectType==0 ? '门店' : '目标点')+'开发人员'" type="text" class="ipt" :value="formData.devPeopleName" readonly=""></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle">联系电话</div>
                    <div class="rvalue"><input placeholder="'自动显示'+(formData.objectType==0 ? '门店' : '目标点')+'开发人员的联系电话'" type="text" class="ipt" :value="formData.devPeoplePhone" readonly=""></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>通知测量时间</div>
                    <div class="rvalue"><input placeholder="选择通知测量时间" type="text" class="ipt" readonly="" :value="formatDate(formData.notifyMeasureDate,'yyyy-MM-dd')"  @click="$refs.notifyMeasureDate.open()"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>预计进场时间</div>
                    <div class="rvalue"><input placeholder="选择预计进场时间" type="text" class="ipt" readonly="" :value="formatDate(formData.preApproachDate,'yyyy-MM-dd')" @click="$refs.preApproachDate.open()"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>业主意见</div>
                    <div class="rvalue"><input placeholder="输入业主意见" type="text" class="ipt" v-model="formData.developRemark"></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>业主签字</div>
                    <div class="rvalue"><input placeholder="业主签字" type="text" class="ipt" readonly="" :value="formData.ownerSign ? '已签字，点击查看' : ''"  @click="openSignCanvas('ownerSign')"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>开发意见</div>
                    <div class="rvalue"><input placeholder="输入开发意见" type="text" class="ipt" v-model="formData.ownerRemark"></div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>开发签字</div>
                    <div class="rvalue"><input placeholder="开发签字" type="text" class="ipt" readonly="" :value="formData.devPeopleSign ? '已签字，点击查看' : ''"  @click="openSignCanvas('devPeopleSign')"><i class="iconfont icon-right-arrow"></i></div>
                </div>
            </div>
        </div>
        <div class="foot-submit">
            <div class="fix-area">
                <button class="gray-btn" type="button" @click="submitSaveData(0)">保存</button>
                <button class="btn" type="button" @click="submitSaveData(1)">提交审核</button>
            </div>
        </div>
        <selectPicker ref="selectShopTag" @confirm="selectShopTag" :options="shopOptions">流程类型</selectPicker>
        <DrawSign @success="signSuccess" ref="drawSignCanvas"></DrawSign>
        <mt-datetime-picker ref="notifyMeasureDate" :startDate="new Date()" type="date" @confirm="select_notifyMeasureDate"></mt-datetime-picker>
        <mt-datetime-picker ref="preApproachDate" :startDate="formData.notifyMeasureDate ? new Date(formData.notifyMeasureDate) : new Date()" type="date" @confirm="select_preApproachDate"></mt-datetime-picker>
        <selectPicker ref="selectPicker" @confirm="selectPlanningType" :options="planningType">流程类型</selectPicker> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    import store from '@/store/index'
    import { Toast,MessageBox } from 'mint-ui'
    import {formatForm, clearForm} from '@/util/utils'
    import {base,postTokenData, formatDate, objectParams} from '@/util/common'
    import selectPicker from '@/components/selectPicker'
    import DrawSign from '@/components/drawSign'
  export default {
    name: 'planControllerEdit',
    data() {
      return {
            shopOptions: [''],
            selectPoints:[''],
            dataHtml: '',
            formData:{
                "devPeopleSign": "",
                "developRemark": "",
                "notifyMeasureDate": "",
                "objectType": "1",
                "ownerRemark": "",
                "ownerSign": "",
                "preApproachDate": "",
                "tObjId": "",
                "tObjName": "",
                "devPeopleName": "",
                "devPeoplePhone": "",
            },
            activeSign: '',
            pageAuth:{
                new:false,
                heavy:false,
                light:false,
            },
        }
    },    
    components: {
      selectPicker,
      DrawSign
    },
    created() {
        // this.getPlanningType();
        // this.getLevel1();
        let baseUser = store.getters['userInfo/getBaseInfo'] || {};
        this.formData.devPeopleName = baseUser.name;
        this.formData.devPeoplePhone = baseUser.mobile;
        this.setAuthUser();
        this.getApplyTemp()
        this.getOfficialTarger()
    },
    mounted() {
        
    },
    methods: {
        setAuthUser(){
            let { AuthorityInfo = [] } = (store.getters['userInfo/getAuthInfo'] || {});
            let pageAuth = this.pageAuth;
            if(AuthorityInfo.indexOf('requirementApply:new')>-1){
                pageAuth.new = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:heavy')>-1){
                pageAuth.heavy = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:light')>-1){
                pageAuth.light = true;
            }
            if(!pageAuth.new){
                this.formData.objectType = '0';
            }
            this.pageAuth = pageAuth;
        },
        // 选择新老店
        selectObjectType(id){
            this.formData.objectType = id;
            this.formData.tObjId = '';
            this.formData.tObjName  = '';
            clearForm()
            this.getOfficialTarger()
        },
        // 选择通知测量时间
        select_notifyMeasureDate(res){
            this.formData.notifyMeasureDate = new Date(res).getTime();
        },
        // 选择预计进场时间
        select_preApproachDate(res){
            this.formData.preApproachDate = new Date(res).getTime();
        },
        // 打开签名
        openSignCanvas(s){
            this.activeSign = s;
            this.$refs.drawSignCanvas.open(this.formData[s])
        },
        // 签名完成回调
        signSuccess(res){
            const tag = this.activeSign;
            this.formData[tag] = res;
        },
        // 选择门店or目标点
        selectShopTag(res){
            this.formData.tObjId = res.id;
            this.formData.tObjName  = res.name
            this.getShopInfo(res.id);
        },
        // 获取门店模板
        getApplyTemp(){
            postTokenData('/requireMent/design/apply',{},(res)=>{
                if(res.code==='0000'){
                    let reString = res.data;
                    reString = reString.replace(/[;]/gm,'&nbsp;')
                    this.dataHtml = reString;
                }
            })
        },       
        // 获取目标点、门店列表
        getOfficialTarger(){
            return new Promise((reslove,rej)=>{
                const objectType = this.formData.objectType
                postTokenData('/requireMent/design/objList',{objectType},(res)=>{
                    if(res.code==='0000'){
                        this.shopOptions = res.data || [''];
                    }
                })
            })
        },
        // 获取目标点、门店详细信息
        getShopInfo(id){
            postTokenData('/requireMent/design/getShopInfo',{objId:id},(res)=>{
                if(res.code==='0000'){
                    const rjson = res.data;
                    if(rjson){
                        for(let i in rjson){
                            document.getElementsByName(i)[0].value = rjson[i];
                        }
                    }
                }
            })
        },
        submitSaveData(type){
            const {formData} = this;
            const tempForm = this.$refs.tempForm
            const tempData = formatForm(tempForm)
            formData.notifyMeasureDate += '';
            formData.preApproachDate += '';
            console.log(tempData)
            const url = type==0 ? '/requireMent/design/save' : '/requireMent/design/saveAndCommit';
            console.log(JSON.stringify({...formData, ...tempData}))
            postTokenData(url+'?'+objectParams(tempData),formData,(res)=>{
                if(res.code==='0000'){

                    Toast({message: res.message, iconClass: 'mintui mintui-field-success'})
                    setTimeout(()=>{
                        this.$router.back(-1)
                    },1500)
                }else{
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
            })

        },
        formatDate
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
<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .row-tempUl{
        /deep/ li{@include flexbox; height: p2r(50px); padding:p2r(0 15px 0 0); line-height: p2r(20px); margin-left: p2r(15px); border-bottom: 1px solid #d9d9d9;
            div:first-child{background: none!important; display: none;}
            div:nth-child(2){float: left; max-width:p2r(100px);}
            div:nth-child(3){flex:1; @include flexbox(flex-end);}
            input[type=text]{font-size:p2r(16px); text-align: right;}
            input[type=radio]{width:p2r(18px); height:p2r(18px);}
            sup{font-size:smaller;}
        }
    }

</style>