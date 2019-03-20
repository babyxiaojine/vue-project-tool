<template>
  <div>
    <div class="row-item bdbtm">
        <div class="rtitle">施工单位 </div>
        <div class="rvalue">
            <input name="constructionUnitName" rule="required" placeholder="选择施工单位" type="text" class="ipt" readonly="" :value="formData.constructionUnitName" @click="!readonly && $refs.constructionUnit.open(buildUnitOptions, formData.constructionUnitName)">
            <i v-if="!readonly" class="iconfont icon-right-arrow"></i>
        </div>
        <input type="hidden" name="constructionUnit" :value="formData.constructionUnit">
    </div>
    <SuperSelect ref="constructionUnit" @confirm="selectBuildCompany">施工单位</SuperSelect>
  </div>
</template>
<script>
  import {postTokenData} from '@/util/common'
  import SuperSelect from '@/components/superSelect'
  export default {
    name:'BuildUnit',
    components:{
      SuperSelect
    },
    props:{
      formData:{
        type: Object,
        default: {}
      },
      readonly:{
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        buildUnitOptions:[]
      }
    },
    created() {
        this.getBuildCompany()
    },

    mounted() {
    },
    methods: {
      // 选择施工单位
      selectBuildCompany(res){
        this.$emit("update:formData", {
            ...this.formData,
            constructionUnit: res.id,
            constructionUnitName: res.name
        });
      },
       // 获取施工单位
       getBuildCompany(){
           postTokenData('/expandshop/designScheme/turnkeyCompanies',{},(res)=>{
               if(res.code==='0000'){
                   let rjson = res.data || [];
                   this.buildUnitOptions = rjson
               }
           })
       },
    },

  }
</script>

