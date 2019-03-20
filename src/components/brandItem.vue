
<template>
    <li :class="'on-'+attr"><div class="lab-nav" @click="changeBrandAttr(attr)">{{this.attr ? this.attr : '选择'}}</div><div class="lab-ctrl"><input :readonly="readonly" type="text" class="ipt" :value="value" @input="$emit('input', $event.target.value)"></div></li>
</template>

<script>
  export default {
    name:'brandItem',
    data(){
      return{
        visible:false, 
      }
    },
    props:{
        attr:{
          default:'',
          type:String
        },
        value:{
          default:'',
          type:String
        },
        readonly:{
          default:false,
          type:Boolean
        }
    },
    created(){
        // this.renderMonth();
    },
    mounted(){
        // this.setDefaultValue()
    },
    computed: {

    },
    methods: {
      changeBrandAttr(res){
        let newAttr = this.writeBrandType()
        this.$emit('changeAttr',newAttr);
      },
      writeBrandType(s){
        if(this.readonly){
          return false;
        }
        let {attr} = this;
        if(attr==='' ||attr === 'C'){
            attr = 'A'
        }else if(attr === 'A'){
            attr = 'B'
        }else if(attr === 'B'){
            attr = 'C'
        }
        this.$emit('click',attr);
      },
      changeBrandValue(res){
        if(this.readonly){
          return false;
        }
        this.$emit('input',res);
      },
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .brand-group{
      li{height: p2r(44px); line-height:p2r(44px); font-size:p2r(14px); text-align: center; @include flexbox; margin-bottom: p2r(10px);}
      .lab-nav{width: p2r(44px); height: p2r(44px); background: #f0f0f0; border-radius: p2r(4px); margin-right: p2r(10px);}
      .lab-ctrl{flex:1; height: p2r(44px); background: #f0f0f0; border-radius: p2r(4px); overflow: hidden;
          .ipt{background: none; display: block; width: 100%; height: 100%; text-align: center; font-size:inherit; color:inherit; @include ellipsis;}
      }
      .on-A {color:#F5A623;
          .lab-nav{background: #FDEDD3; }
          .lab-ctrl{background: #FDEDD3; }
      }
      .on-B {color:$blue;
          .lab-nav{background: rgba(65,150,247,0.20); }
          .lab-ctrl{background: rgba(65,150,247,0.20); }
      }
      .on-C {color:#7ED321;
          .lab-nav{background: #E5F6D3; }
          .lab-ctrl{background: #E5F6D3; }
      }
    }
    

</style>