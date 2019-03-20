<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom">
      <div class="upload-title"><span>{{title}}</span><i class="iconfont icon-jia" @click="close"></i></div>
      <div class="select-picker" :class="{inputError:inputError}">
        <textarea class="picker-comment" :placeholder="placeholder" name="" ref="textarea" id="" maxlength="50" v-model="activeValue"></textarea>
        <div class="errormsg">{{inputError ? '输入意见字数限制5-50字' :''}}</div>
      </div>
      <div class="foot-submit">
          <div class="fix-area">
              <button class="btn" :class="{disabled:inputError}" type="button" @click="confirm">确定</button>
          </div>
      </div> 
    </mt-popup>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui'
  import { validRules } from '@/util/utils'
  export default {
    name:'PopComment',
    data(){
      return{
        visible:false, 
        activeValue:'',
        inputError:true,
        title:'',
        actionType:''
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
      // 打开
      open(actionType='yes',title='请输入同意的意见'){
        this.visible = true;
        this.actionType = actionType;
        this.title = title;
        this.$nextTick(()=>{
          this.$refs.textarea.focus();
        })
      },
      close(){
        this.visible = false
      },
      // 确定
      confirm(){
        let comment = this.activeValue
        let actionType = this.actionType
        if(!validRules.remark.test(comment)){
            return false;
        }
        this.activeValue = '';
        this.close()

        this.$emit('confirm',comment,actionType);
      },
    },
    watch:{
      activeValue(a){
        if(!validRules.remark.test(a)){
          this.inputError = true;
        }else{
          this.inputError = false;
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .picker-comment{width: 100vw; box-sizing: border-box; padding:p2r(10px); font-size:p2r(16px); height: p2r(120px);}

    .select-picker{position: relative;
      .errormsg{height: p2r(20px); font-size:p2r(10px); padding:p2r(0 10px); position: absolute; bottom: 0; color:$red;}
    }
    .disabled{pointer-events:none;}
</style>