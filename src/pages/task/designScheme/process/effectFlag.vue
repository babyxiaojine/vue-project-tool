<template>
  <div class="row-item bdbtm">
      <div class="rtitle">是否需要效果图</div>
      <div class="rvalue">
          <div class="raido-type">
              <template v-if="formData.effectFlag">
                  <span class="active">{{formData.effectFlag === '0' ? '是' : '否'}}</span>
              </template>
              <template v-else>
                <template v-if="!readonly">
                    <span :class="{active: selfForm.effectFlag === '0'}" @click="handleEffectFlag('0')">是</span>
                    <span :class="{active: selfForm.effectFlag === '1'}" @click="handleEffectFlag('1')">否</span>
                    <input type="hidden" name="effectFlag" rule="required" error="请选择是否需要效果图" :value="selfForm.effectFlag">
                </template>
                <template v-else>
                    <span>-</span>
                </template>
              </template>
          </div>
      </div> 
  </div> 
</template>
<script>
  export default {
    name:'EffectFlag',
    components:{
    },
    data() {
      return {
        selfForm:{}
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
      this.selfForm = this.formData;
    },
    methods: {

      // 选择是否需要效果图
      handleEffectFlag(id){
        this.selfForm = {
          ...this.selfForm,
          effectFlag: id
        }
        // this.$emit("update:formData", {
        //   ...this.formData,
        //   effectFlag : id
        // });
      },
    },

  }
</script>
