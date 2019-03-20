<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom">
      <div class="select-picker">
        <div class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="close">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span></div>
        <mt-picker ref="picker" :slots="slots" :visibleItemCount="count" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
</template>

<script>
  export default {
    name:'superSelect',
    data(){
      return{
        visible:false, 
        listData:[],
        activeValue:'',
        slots: [{
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
        options:[],
        backData:null
      }
    },
    props:{
      defaultValue:{
        default:'',
        type: String || Number,
      },
      count:{
        default: 5,
        type: Number,
      }
    },
    created(){
    },
    mounted(){
      
    },
    computed: {

    },
    methods: {
      open(options,defaultValue='',backData){
        this.options = options;
        this.backData = backData;
        this.renderData(options);
        this.setDefaultValue(options,defaultValue)
        this.visible = true
      },
      close(){
        this.visible = false
      },
      confirm(){
        this.$emit('confirm',this.activeValue,this.backData);
        this.close()
      },
      // 输出选项
      renderData(options){
        // const {options} = this;
        if(options.length){
          if(typeof options[0] == 'string' || typeof options[0] == 'number'){
            this.slots[0].values = options;
          }else if(typeof options[0] == 'object'){
            const avalues = [];
            options.map(item=>{
              avalues.push(item.name);
            })
            this.listData = avalues;
            this.slots[0].values = avalues;
          }else{
            console.error('type error')
          }
          
        }else{
          this.slots[0].values = [''];
        }
      },
      // 设置默认值
      setDefaultValue(options,defaultValue){
        if(!defaultValue){
          return false;
        } 
        let flag = false;
        if(options.length) {
          if (typeof options[0] == 'string' || typeof options[0] == 'number') {
            if (options.indexOf(defaultValue) > -1) {
              this.activeValue = defaultValue;
              flag = true;
            }
          } else {
            let sobj = this.selectItem(options, defaultValue);
            console.log(sobj)
            if (sobj) {
              this.activeValue = sobj;
              flag = true;
            }
          }
        }
        if(flag){
          this.$refs.picker.setSlotValue(0, defaultValue);
        }
      },
      // 获取当前选中的值的对象
      selectItem(arr,str){
        let k = null;
        for(let i=0; i<arr.length;i++){
          if(arr[i].name == str){
            k = arr[i];
            break;
          }
        }
        return k;
      },
      onValuesChange(picker, values) {
        const {options} = this;
        if(options.length) {
          if (typeof options[0] == 'string' || typeof options[0] == 'number') {
            this.$emit('changeValue', values[0]);
            this.activeValue = values[0];
          } else if (typeof options[0] == 'object') {
            const aid = this.listData.indexOf(values[0]);
            this.$emit('changeValue', options[aid]);
            this.activeValue = options[aid];
          } else {
            console.error('type error')
          }
        }
      }
    },
    watch:{
      // options(){
      //   this.renderData()
      //   this.setDefaultValue()
      // },
      // defaultValue(){
      //   this.setDefaultValue()
      // },
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .select-picker{
      .picker-items{width: 100vw;}
      .picker-toolbar{border-bottom: 1px solid #eaeaea;}
    }

</style>