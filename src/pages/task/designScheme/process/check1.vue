<template>
    <div>
      <div class="row-form">          
          <div class="row-item bdbtm">
              <div class="rtitle">归属公司</div>
              <div class="rvalue"><div class="rChar">{{formData.level1Name}}</div></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">归属分公司</div>
              <div class="rvalue"><div class="rChar">{{formData.level2Name}}</div></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">店号</div>
              <div class="rvalue"><div class="rChar">{{formData.code}}</div></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">门店名称</div>
              <div class="rvalue"><div class="rChar">{{formData.shopFormalName}}</div></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">标题</div>
              <div class="rvalue"><div class="rChar">{{formData.designTitle}}</div></div>
          </div>
          <div class="row-item bdbtm">
              <div class="rtitle">设计师</div>
              <div class="rvalue"><div class="rChar">{{formData.contractorName}}</div></div>
          </div>
      </div>


    </div>
</template>

<script>
  import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import {formatForm, clearForm, getSession} from '@/util/utils'
  import {base,postTokenData, getSelectYear ,formatDate,objectParams} from '@/util/common'
  import DrawSign from '@/components/drawSign'
  export default {
    name:'Check1',
    components:{
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
        // this.tabBtnHandler()
    },
    methods: {
        // todoInit(){

        //   this.setInitTemp(this.initData)
        //   this.getOfficialTarger()
        // },

        // 选择通知测量时间
        select_notificatsurveyDate(res){
            this.formData.notificatsurveyDate = new Date(res).getTime();
        },
        // 选择预计进场时间
        select_expectedDate(res){
            this.formData.expectedDate = new Date(res).getTime();
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
            const {formData} = this;
            const tempForm = this.$refs.tempForm
            const tempData = formatForm(tempForm)
            formData.notificatsurveyDate += '';
            formData.expectedDate += '';
            if(!tempData.mdmj || tempData.mdmj == 0){
                Toast({message: '门店面积不能为空', iconClass: 'mintui mintui-field-error'})
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

<style type="text/css" lang="scss">
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