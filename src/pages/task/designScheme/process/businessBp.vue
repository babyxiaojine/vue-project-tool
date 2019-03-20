<template>
  <div class="row-item bdbtm">
      <div class="rtitle">是否已报批物业</div>
      <div class="rvalue">
          <div class="raido-type">
                <template v-if="readonly">
                  <span class="active">{{formData.businessBp === '0' ? '是' : '否'}}</span>
                </template>
                <template v-else>
                  <span :class="{active: selfForm.businessBp === '0'}" @click="handleEffectFlag('0')">是</span>
                  <span :class="{active: selfForm.businessBp === '1'}" @click="handleEffectFlag('1')">否</span>
                  <input type="hidden" name="businessBp" rule="required" error="请选择是否报批" :value="selfForm.businessBp">
                </template>
          </div>
      </div> 
  </div> 
</template>
<script>
  export default {
    name:'BusinessBp',
    components:{
    },
    data() {
      return {
        selfForm:{
          businessBp:''
        }
      }
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
    created() {
    },

    mounted() {
      if(this.readonly){
        this.selfForm = this.formData;
      }
      
    },
    methods: {

      // 选择是否需要效果图
      handleEffectFlag(id){
        this.selfForm = {
          ...this.selfForm,
          businessBp: id
        }
      },
    },

  }
</script>
