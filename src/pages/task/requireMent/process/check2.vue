<template>
    <div>
      <form ref="postForm" class="row-form">

        <div class="row-item bdbtm">
            <div class="rtitle"><i class="icon-must">*</i>设计公司</div>
            <div class="rvalue"><input  rule="required" error="选择设计公司" placeholder="选择设计公司" type="text" class="ipt" readonly="" :value="formData.designCompanyName" @click="!readonly && $refs.selectDesCompany.open(desCompanyList, formData.designCompanyName || '武汉大木右上装饰工程有限公司（设计）')"><i v-if="!readonly" class="iconfont icon-right-arrow"></i></div>
        </div>
        <div class="row-item bdbtm">
            <div class="rtitle"><i class="icon-must">*</i>短信接收号码</div>
            <div class="rvalue"><input  rule="mobile" error="输入正确的短信接收号码" maxlength="11" placeholder="输入短信接收号码" type="text" :readonly="readonly" class="ipt" v-model="formData.messagePhone"></div>
        </div>
      </form>
      <SuperSelect ref="selectDesCompany" @confirm="selectDesCompany">设计公司</SuperSelect>
    </div>
</template>

<script>
  import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import {validForm ,formatForm, clearForm, getSession} from '@/util/utils'
  import {postTokenData} from '@/util/common'
  import SuperSelect from '@/components/superSelect'
  export default {
    name:'Check2',
    components:{
        SuperSelect,
    },
    props:{
      readonly:{
        type: Boolean,
        default: false
      },
      initData:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        formData:{
        },
        desCompanyList: [],
      }
    },
    created() {
        this.initData
        this.formData = this.initData;
        this.getDesCompanyList()
    },

    mounted() {

    },
    methods: {
       todoInit(){
         // this.formData = this.initData;
         // this.getDesCompanyList()
       },
       // 选择设计公司
       selectDesCompany(res){
           this.formData = {
               ...this.formData,
               designCompany: res.id,
               designCompanyName: res.name,
               messagePhone: res.messagePhone
           }
       },
       // 获取设计公司
       getDesCompanyList(){
           postTokenData('/requireMent/design/desCompanyList',{},(res)=>{
               if(res.code==='0000'){
                   let rjson = res.data || [];
                   this.desCompanyList = rjson
               }
           })
       },
       postData(){
        const validResult = validForm(this.$refs.postForm);
        if(!validResult.status){
            Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
            return false;
        }
        const {formData} = this;
        const procData = {
          designCompany: formData.designCompany,
          messagePhone: formData.messagePhone
        }
        return procData;
       }
    },
    watch:{

    },

  }
</script>

