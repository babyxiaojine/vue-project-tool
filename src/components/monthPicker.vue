<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom">
      <div class="month-picker">
        <div class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="close">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="close">确定</span></div>
        <mt-picker ref="picker" :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
</template>

<script>
  export default {
    data(){
      return{
        visible:false, 
        slots: [{
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }, {
              flex: 1,
              values: [],
              className: 'slot2',
              textAlign: 'center'
            }
          ]
      }
    },
    props:{
        startYear:{
          default:2015
        },
        endYear:{
          default:new Date().getFullYear()+5
        },
        defaultYear:{
          default:new Date().getFullYear()
        },
        defaultMonth:{
          default:new Date().getMonth()+1
        }
    },
    created(){
        this.renderMonth();
    },
    mounted(){
        this.setDefaultValue()
    },
    computed: {

    },
    methods: {
      open(){
        this.visible = true
      },
      close(){
        this.visible = false
      },
      renderMonth(){
        const toyear = this.endYear - this.startYear;
        const {startYear} = this;
        let years = [],months=[];
        for(let i=0; i<=toyear;i++){
            years.push(startYear+i+'年')
        }
        for(let i=1; i<13;i++){
            months.push(i+'月')
        }
        this.slots[0].values = years;
        this.slots[1].values = months;
      },
      setDefaultValue(){
        let toMonth = this.defaultMonth;
        let toYear = this.defaultYear;
        if(toMonth > 12){
          toYear = toYear + Math.floor(toMonth/12)
          toMonth = toMonth%12;
        }
        this.$refs.picker.setSlotValue(0, toYear+'年');
        this.$refs.picker.setSlotValue(1, toMonth+'月');
      },
      onValuesChange(picker, values) {
        this.$emit('changeValue',values);
      }
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .month-picker{
      .picker-items{width: 100vw;}
      .picker-toolbar{border-bottom: 1px solid #eaeaea;}
    }

</style>