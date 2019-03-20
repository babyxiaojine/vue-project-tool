<template>
    <div class="textField">
      <textarea ref="textField" class="ipt textField" @input="autoHeight" name="" id="" cols="30" rows="10"></textarea>
    </div>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui'
  import { validRules } from '@/util/utils'
  export default {
    name:'TextField',
    data(){
      return{

      }
    },
    props:{
      placeholder:{
        type: String,
        default: '输入您的意见'
      },
      maxlength:{
        default:'50',
        type: String || Number,
      },
    },
    created(){
    },
    mounted(){
    },
    computed: {

    },
    methods: {
      autoHeight(){
        let textField = this.$refs.textField;
        textField.style.height = textField.scrollHeight + 'px'
      }
    },
    watch:{
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';

</style>