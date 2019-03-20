<template>
    <div class="wrapper">
        <div class="main-content">
            <div class="row-form">
                <div class="row-item bdbtm" v-if="pageAuth.new && (pageAuth.heavy || pageAuth.light)">
                    <div class="rtitle"><i class="icon-must">*</i>新老店</div>
                    <div class="rvalue">
                        <div class="raido-type">
                            <span :class="{'active': formData.objectType == 1}" @click="selectObjectType('1')">新店</span>
                            <span :class="{'active': formData.objectType == 0}" @click="selectObjectType('0')">老店</span>
                        </div>
                    </div>
                </div>
                <div class="row-item bdbtm">
                    <div class="rtitle"><i class="icon-must">*</i>{{formData.objectType==0 ? '门店' : '目标点'}}名称</div>
                    <div class="rvalue"><input :placeholder="'选择'+(formData.objectType==0 ? '门店' : '目标点')" type="text" class="ipt" readonly="" :value="formData.objectName"  @click="$refs.selectShopTag.open(shopOptions, formData.objectName)"><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <form action="" ref="tempForm">
                    <ul class="template-html" v-html="dataHtml">
                        <!-- 需求设计模板 -->
                    </ul>
                </form>
                <form ref="mustForm">
                    <div class="row-item bdbtm">
                        <div class="rtitle">开发人员</div>
                        <div class="rvalue"><input :placeholder="(formData.objectType==0 ? '门店' : '目标点')+'开发人员'" type="text" class="ipt" :value="formData.developName" readonly=""></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle">联系电话</div>
                        <div class="rvalue"><input :placeholder="(formData.objectType==0 ? '门店' : '目标点')+'开发人员的联系电话'" type="text" class="ipt" :value="formData.developPhone" readonly=""></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>通知测量时间</div>
                        <div class="rvalue"><input rule="required" placeholder="选择通知测量时间" type="text" class="ipt" readonly="" :value="formatDate(formData.notificatsurveyDate,'yyyy-MM-dd')"  @click="$refs.notificatsurveyDate.open()"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>预计进场时间</div>
                        <div class="rvalue"><input rule="required" placeholder="选择预计进场时间" type="text" class="ipt" readonly="" :value="formatDate(formData.expectedDate,'yyyy-MM-dd')" @click="$refs.expectedDate.open()"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>业主意见</div>
                        <div class="rvalue"><input rule="*10-50" error="输入业主意见,字数限制10-50字" placeholder="输入业主意见" type="text" class="ipt" v-model="formData.owersRemark"></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>业主签字</div>
                        <div class="rvalue"><input rule="required" error="请填写业主签字" placeholder="业主签字" type="text" class="ipt" readonly="" :value="formData.ownersOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('ownersOption')"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-item bdbtm" v-if="showFran">
                        <div class="rtitle"><i class="icon-must">*</i>加盟商意见</div>
                        <div class="rvalue"><input rule="*10-50" error="输入加盟商意见,字数限制10-50字" placeholder="输入加盟商意见" type="text" class="ipt" v-model="formData.franRemark"></div>
                    </div>
                    <div class="row-item bdbtm" v-if="showFran">
                        <div class="rtitle"><i class="icon-must">*</i>加盟商签字</div>
                        <div class="rvalue"><input rule="required" error="请填写加盟商签字" placeholder="加盟商签字" type="text" class="ipt" readonly="" :value="formData.franOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('franOption')"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>开发意见</div>
                        <div class="rvalue"><input rule="*10-50" error="输入开发意见,字数限制10-50字" placeholder="输入开发意见" type="text" class="ipt" v-model="formData.developRemark"></div>
                    </div>
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>开发签字</div>
                        <div class="rvalue"><input rule="required" error="请填写开发签字" placeholder="开发签字" type="text" class="ipt" readonly="" :value="formData.developOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('developOption')"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="foot-submit">
            <div class="fix-area">
                <button class="gray-btn" type="button" @click="submitSaveData(0)">保存</button>
                <button class="btn" type="button" @click="submitSaveData(1)">提交审核</button>
            </div>
        </div>
        <SuperSelect ref="selectShopTag" @confirm="selectShopTag">选择门店</SuperSelect>
        <DrawSign @success="signSuccess" ref="drawSignCanvas"></DrawSign>
        <mt-datetime-picker ref="notificatsurveyDate" :startDate="new Date()" type="date" @confirm="select_notificatsurveyDate"></mt-datetime-picker>
        <mt-datetime-picker ref="expectedDate" :startDate="formData.notificatsurveyDate ? new Date(formData.notificatsurveyDate) : new Date()" type="date" @confirm="select_expectedDate"></mt-datetime-picker>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    import store from '@/store/index'
    import { Toast,MessageBox } from 'mint-ui'
    import {formatForm, clearForm, validForm} from '@/util/utils'
    import {base,postTokenData, formatDate, objectParams} from '@/util/common'
    import SuperSelect from '@/components/superSelect'
    import DrawSign from '@/components/drawSign'
  export default {
    name: 'planControllerAdd',
    data() {
      return {
            shopOptions: [''],
            dataHtml: '',
            formData:{
                "developOption": "",
                "developRemark": "",
                "notificatsurveyDate": "",
                "objectType": "1",
                "owersRemark": "",
                "ownersOption": "",
                "expectedDate": "",
                "objectId": "",
                "objectName": "",
                "developName": "",
                "developPhone": "",
                "franRemark": "",
                "franOption": "",
                "longitude": "",
                "latitude": "",
                "distance": "",
            },
            activeSign: '',
            pageAuth:{
                new:false, //新店
                heavy:false, //老店重改
                light:false, //老店轻改
            },
            showFran:false,
        }
    },    
    components: {
      SuperSelect,
      DrawSign
    },
    created() {
        // this.getPlanningType();
        // this.getLevel1();
        let baseUser = store.getters['userInfo/getBaseInfo'] || {};
        this.formData.developName = baseUser.name;
        this.formData.developPhone = baseUser.mobile;
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
            this.formData ={
                ...this.formData,
                objectType: id,
                objectId: '',
                objectName: ''
            }
            // 强制禁用设计类型
            let mdxx4 =  document.getElementsByName('mdxx4');
            let mdxx_id = id == 0 ? 1 : 0;
            for(var i = 0; i < mdxx4.length; i++) {
                if(mdxx4[i].value == mdxx_id){
                    mdxx4[i].checked = true
                    mdxx4[i].disabled = false
                }else{
                    mdxx4[i].checked = false
                    mdxx4[i].disabled = true
                }
               
            }
            this.getOfficialTarger()
        },
        // 选择通知测量时间
        select_notificatsurveyDate(res){
            this.formData.notificatsurveyDate = new Date(res).getTime();
        },
        // 选择预计进场时间
        select_expectedDate(res){
            this.formData.expectedDate = new Date(res).getTime();
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
        // 选择门店
        selectShopTag(res){
            this.formData ={
                ...this.formData,
                objectId: res.id,
                objectName: res.name
            }
            this.getShopInfo(res.id);
        },
        // 获取门店模板
        getApplyTemp(){
            postTokenData('/requireMent/design/apply',{},(res)=>{
                if(res.code==='0000'){
                    let reString = res.data;
                    reString = reString.replace(/[;]/gm,'&nbsp;')
                    this.dataHtml = reString;
                    this.$nextTick(()=>{
                        let mdxx2 =  document.getElementsByName('mdxx2');
                        let that = this;
                         for(var i = 0; i < mdxx2.length; i++) {
                            mdxx2[i].onchange =  function() {
                                let val = 0;
                                for(var i = 0; i < mdxx2.length; i++) {
                                    if(mdxx2[i].checked){
                                        val = this.value;
                                        break;
                                    }
                                }
                                if(val == 1){
                                    that.showFran = true
                                }else{
                                    that.showFran = false
                                }
                            };
                         }
                         // 强制禁用设计类型
                         let mdxx4 =  document.getElementsByName('mdxx4');
                         let pageAuth = this.pageAuth
                         let authData = [pageAuth.new, pageAuth.heavy, pageAuth.light ];
                         const objectType = this.formData.objectType
                         let mdxx_id = objectType == 0 ? 1 : 0;
                            mdxx_id = pageAuth.light ? 2 : mdxx_id;
                         for(var i = 0; i < mdxx4.length; i++) {
                            mdxx4[i].disabled = !authData[i]

                            if(mdxx4[i].value == mdxx_id){
                                mdxx4[i].checked = true
                                mdxx4[i].disabled = false
                            }else{
                                mdxx4[i].checked = false
                                mdxx4[i].disabled = true
                            }
                         }
                    },100)
                    // console.log(mdxx2.length)
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
                            let obj = document.getElementsByName(i)[0];
                            if(obj && obj.getAttribute('type')=='text'){
                                obj.value = rjson[i];
                            }
                            
                        }
                    }
                }
            })
        },
        // 保存or提交审核
        submitSaveData(type){
            const formData = {...this.formData};
            const tempForm = this.$refs.tempForm
            const tempData = formatForm(tempForm)
            formData.notificatsurveyDate += '';
            formData.expectedDate += '';
            // 提交表单验证
            if(!formData.objectId){
                Toast({message: '请选择'+(formData.objectType==1 ? '目标点' : '门店'), iconClass: 'mintui mintui-field-error'})
                return false;
            }
            if(!tempData.mdmj || tempData.mdmj == 0){
                Toast({message: '门店面积不能为空', iconClass: 'mintui mintui-field-error'})
                return false;
            }
            if(!tempData.mdxx2){
                Toast({message: '请选择直营店，加盟店', iconClass: 'mintui mintui-field-error'})
                return false;
            }
            if(!tempData.mdxx3){
                Toast({message: '请选择标准店，旗舰店，主题店', iconClass: 'mintui mintui-field-error'})
                return false;
            }
            const validResult = validForm(this.$refs.mustForm);
            if(!validResult.status){
                Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                return false;
            }

            const url = type==0 ? '/requireMent/design/save' : '/requireMent/design/saveAndCommit';
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
        ...mapState({
          locationInfo: state => state.location.data
        })
    },

    watch:{
        formData(to,from){
            if(from.objectId != to.objectId){
                clearForm(this.$refs.tempForm,'text')
            }
        },
        showFran(to,from){
            if(!to){
                this.formData.franRemark = "";
                this.formData.franOption = "";
            }
        }
    },
  }
</script>
