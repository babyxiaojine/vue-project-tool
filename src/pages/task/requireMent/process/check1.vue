<template>
    <div>
      <div class="row-form">
          <div class="row-item bdbtm">
              <div class="rtitle"><i class="icon-must">*</i>新老店</div>
              <div class="rvalue">
                  <div class="raido-type">
                      <span class="active">{{ formData.objectType==0 ? '老店' : '新店'}}</span>
                  </div>
              </div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle"><i class="icon-must">*</i>{{formData.objectType==0 ? '门店' : '目标点'}}名称</div>
              <div class="rvalue"><input :placeholder="'选择'+(formData.objectType==0 ? '门店' : '目标点')" type="text" class="ipt" readonly="" :value="formData.objectName"></div>
          </div>
          <form action="" ref="tempForm">
              <ul class="template-html" v-html="templateHtml">
                  <!-- 需求设计模板 -->
              </ul>
          </form>
          <div class="row-item bdbtm">
              <div class="rtitle">开发人员</div>
              <div class="rvalue"><input :placeholder="(formData.objectType==0 ? '门店' : '目标点')+'开发人员'" type="text" class="ipt" :value="formData.developName" readonly=""></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">联系电话</div>
              <div class="rvalue"><input :placeholder="(formData.objectType==0 ? '门店' : '目标点')+'开发人员的联系电话'" type="text" class="ipt" :value="formData.developPhone" readonly=""></div>
          </div>
          <form ref="mustForm">
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>通知测量时间</div>
                <div class="rvalue"><input rule="required" placeholder="选择通知测量时间" type="text" class="ipt" readonly="" :value="formatDate(formData.notificatsurveyDate,'yyyy-MM-dd')"  @click="!readonly && $refs.notificatsurveyDate.open()"><i v-if="!readonly" class="iconfont icon-right-arrow"></i></div>
            </div>
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>预计进场时间</div>
                <div class="rvalue"><input rule="required" placeholder="选择预计进场时间" type="text" class="ipt" readonly="" :value="formatDate(formData.expectedDate,'yyyy-MM-dd')" @click="!readonly && $refs.expectedDate.open()"><i v-if="!readonly" class="iconfont icon-right-arrow"></i></div>
            </div>
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>业主意见</div>
                <div class="rvalue"><input rule="*10-50" error="输入业主意见,字数限制10-50字" placeholder="输入业主意见" type="text" class="ipt"  :readonly="readonly" v-model="formData.owersRemark"></div>
            </div>
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>业主签字</div>
                <div class="rvalue"><input rule="required" error="请填写业主签字" placeholder="业主签字" type="text" class="ipt" readonly="" :value="formData.ownersOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('ownersOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
            </div>
            <template v-if="readonly">
                <div class="row-item bdbtm" v-if="showFran">
                    <div class="rtitle"><i class="icon-must">*</i>加盟商意见</div>
                    <div class="rvalue"><input placeholder="输入加盟商意见" type="text" class="ipt" v-model="formData.franRemark"></div>
                </div>
                <div class="row-item bdbtm" v-if="showFran">
                    <div class="rtitle"><i class="icon-must">*</i>加盟商签字</div>
                    <div class="rvalue"><input rule="required" error="请填写开发签字" placeholder="加盟商签字" type="text" class="ipt" readonly="" :value="formData.franOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('franOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                </div>
            </template>
            <template v-else>
                <div class="row-item bdbtm" v-if="showFran">
                    <div class="rtitle"><i class="icon-must">*</i>加盟商意见</div>
                    <div class="rvalue"><input rule="*10-50" error="输入加盟商意见,字数限制10-50字" placeholder="输入加盟商意见" type="text" class="ipt" v-model="formData.franRemark"></div>
                </div>
                <div class="row-item bdbtm" v-if="showFran">
                    <div class="rtitle"><i class="icon-must">*</i>加盟商签字</div>
                    <div class="rvalue"><input rule="required" error="请填写加盟商签字" placeholder="加盟商签字" type="text" class="ipt" readonly="" :value="formData.franOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('franOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                </div>
            </template>
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>开发意见</div>
                <div class="rvalue"><input rule="*10-50" error="输入开发意见,字数限制10-50字" placeholder="输入开发意见" type="text" class="ipt" :readonly="readonly" v-model="formData.developRemark"></div>
            </div>
            <div class="row-item bdbtm">
                <div class="rtitle"><i class="icon-must">*</i>开发签字</div>
                <div class="rvalue"><input placeholder="开发签字" type="text" class="ipt" readonly="" :value="formData.developOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('developOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
            </div>
          </form>
      </div>

      <DrawSign @success="signSuccess" ref="drawSignCanvas"></DrawSign>
      <mt-datetime-picker ref="notificatsurveyDate" :startDate="new Date()" type="date" @confirm="select_notificatsurveyDate"></mt-datetime-picker>
      <mt-datetime-picker ref="expectedDate" :startDate="formData.notificatsurveyDate ? new Date(formData.notificatsurveyDate) : new Date()" type="date" @confirm="select_expectedDate"></mt-datetime-picker> 
    </div>
</template>

<script>
  import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import {formatForm, clearForm, getSession,validForm} from '@/util/utils'
  import {base,postTokenData, getSelectYear ,formatDate,objectParams} from '@/util/common'
  import DrawSign from '@/components/drawSign'
  export default {
    name:'Check1',
    components:{
        DrawSign
    },
    props:{
      readonly:{
        type: Boolean,
        default: false
      },
      initData:{
        type:Object,
        default:{}
      },
      pageAuth:{
        type:Object,
        default:{
            new:false,
            heavy:false,
            light:false,
        }
      }
    },
    data() {
      return {
        formData:{
        },
        comment: '',
        templateHtml: '',
        activeSign: '',
        showFran:false,
      }
    },
    created() {
        
    },

    mounted() {
      this.formData = this.initData;
      this.setInitTemp(this.initData)
        // this.tabBtnHandler()
    },
    methods: {
        // todoInit(){

        //   this.setInitTemp(this.initData)
        //   this.getOfficialTarger()
        // },

        // 选择通知测量时间
        select_notificatsurveyDate(res){
            this.formData = {
              ...this.formData,
              notificatsurveyDate : new Date(res).getTime()
            }
        },
        // 选择预计进场时间
        select_expectedDate(res){
            this.formData = {
              ...this.formData,
              expectedDate : new Date(res).getTime()
            }
        },
        // 打开签名
        openSignCanvas(s,isReadonly){
            this.activeSign = s;
            this.$refs.drawSignCanvas.open(this.formData[s],isReadonly)
        },
        // 签名完成回调
        signSuccess(res){
            const tag = this.activeSign;
            this.formData[tag] = res;
        },

        // 操作流程
        handleProcess(actionType){
            if(actionType === 'yes'){
                this.submitProcessData('yes');
            }else if(actionType === 'no'){
                MessageBox.confirm('您退回此项任务?').then(action => {
                    this.submitProcessData(actionType);
                })
            }else if(actionType === 'reject'){
                MessageBox.confirm('您驳回此项任务?').then(action => {
                    this.submitProcessData(actionType);
                })
            }
        },
        // 提交流程
        submitSaveData(){
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
            postTokenData('/requireMent/design/saveAndCommit?'+objectParams(tempData),formData,(res)=>{
                if(res.code==='0000'){
                    console.log(JSON.stringify(res.data))
                    Toast({message: res.message, iconClass: 'mintui mintui-field-success'})
                    setTimeout(()=>{
                        this.$router.back(-1)
                    },1500)
                }else{
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
            })
        },


        // 渲染数据
        setInitTemp(rjson){
            const {readonly} = this;
            this.formData = rjson;
            let rhtml = (rjson.templateHtml && rjson.templateHtml[0] && rjson.templateHtml[0].tabValue) || '';
            if(readonly){
                rhtml = rhtml.replace(new RegExp('radio"','g'),'radio" disabled=""');
            }
            rhtml = rhtml.replace(/[;]/gm,'&nbsp;')
            this.templateHtml = rhtml;
            this.$nextTick(()=>{
                let mdxx2 =  document.getElementsByName('mdxx2');
                let that = this;
                 for(var i = 0; i < mdxx2.length; i++) {
                    mdxx2[i].onchange =  function() {
                        let val = that.changeFran()
                        if(val == 1){
                          that.formData = {
                            ...that.formData,
                            franRemark: '',
                            franOption: ''
                          }
                        }
                    };
                 }
                  // 强制禁用设计类型
                  let mdxx4 =  document.getElementsByName('mdxx4');
                  for(var i = 0; i < mdxx4.length; i++) {
                     mdxx4[i].disabled = true
                  }
                  that.changeFran()
            },100)
        },
        // 是否显示加盟商信息
        changeFran(){
          let mdxx2 =  document.getElementsByName('mdxx2');
          let val = 0;
          for(var i = 0; i < mdxx2.length; i++) {
              if(mdxx2[i].checked){
                  val = mdxx2[i].value;
                  break;
              }
          }
          if(val == 1){
              this.showFran = true
          }else{
              this.showFran = false
          }
          return val;
        },
        // 
        formatDate
    },
    watch:{
        formData(to,from){
            if(from.objectId && from.objectId != to.objectId){
                clearForm(this.$refs.tempForm)
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

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .template-html{
      li:nth-child(n+6){display: none;}
    }

</style>