<template>
  <div>
    <div class="row-item bdbtm">
        <div class="rtitle">预计进场时间</div>
        <div class="rvalue">
            <input placeholder="选择预计进场时间" type="text" class="ipt" readonly="" :value="formatDate(formData.expectedDate,'yyyy-MM-dd')" @click="!readonly && $refs.expectedDate.open()">
            <i v-if="!readonly" class="iconfont icon-right-arrow"></i>
        </div>
        <input v-if="!readonly" rule="required" error="选择预计进场时间" name="expectedDate" type="hidden" :value="formData.expectedDate">
    </div>
    <mt-datetime-picker ref="expectedDate" :startDate="formData.designschemeDate ? new Date(formData.designschemeDate) : new Date()" type="date" @confirm="select_expectedDate"></mt-datetime-picker>
  </div>
</template>
<script>
  import {postTokenData ,formatDate} from '@/util/common'
  export default {
    name:'ExpectedDate',
    components:{
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
    },

    mounted() {
    },
    methods: {
      // 选择预计进场时间
      select_expectedDate(res){
        this.$emit("update:formData", {
          ...this.formData,
          expectedDate : new Date(res).getTime()
        });
      },
       formatDate
    },

  }
</script>

