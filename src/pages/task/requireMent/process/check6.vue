<template>
    <div>
      <div class="row-form">
        <div class="row-item bdbtm">
            <div class="rtitle"><i class="icon-must">*</i>测量公司</div>
            <div class="rvalue"><input placeholder="选择测量公司" type="text" class="ipt" readonly="" :value="formData.measuringCompanyName" @click="!readonly && $refs.selectMeaCompany.open()"><i v-if="!readonly" class="iconfont icon-right-arrow"></i></div>
        </div>
      </div>
        <selectPicker ref="selectMeaCompany" @confirm="selectMeaCompany" :options="meaCompanyList">测量公司</selectPicker>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import {postTokenData} from '@/util/common'
  import selectPicker from '@/components/selectPicker'
  export default {
    name:'Check6',
    components:{
        selectPicker,
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
          measuringCompanyName:'',
          measuringCompany:''
        },
        meaCompanyList: []
      }
    },
    created() {
     this.formData = {...this.formData, ...this.initData};
     this.getMeaCompanyList()   
    },

    mounted() {

    },
    methods: {
       // todoInit(){

       // },
       // 选择测量公司
       selectMeaCompany(res){
           this.formData = {
               ...this.formData,
               measuringCompany: res.id,
               measuringCompanyName: res.name
           }
       },
       // 获取测量公司
       getMeaCompanyList(){
           postTokenData('/requireMent/design/meaCompanyList',{},(res)=>{
               if(res.code==='0000'){
                   let rjson = res.data || [];
                   this.meaCompanyList = rjson
               }
           })
       },
        postData(){
         const {formData} = this;
         if(!formData.measuringCompanyName.trim()){
             Toast({message: '请选择测量公司', iconClass: 'mintui mintui-field-error'})
             return false;
         }
         const procData = {
           measuringCompany: formData.measuringCompany,
         }
         console.log(procData)
         return procData;
        }
    },
    watch:{

    },

  }
</script>

