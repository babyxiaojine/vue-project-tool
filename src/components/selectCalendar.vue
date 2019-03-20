<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom" class="select-calendar">
      <div class="select-picker">
        <div class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="close">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span></div>
          <CalendarTouch ref="calendar" @select="onValuesChange" @toDay="getToday"></CalendarTouch>
      </div>
    </mt-popup>
</template>

<script>
  import CalendarTouch from './CalendarTouch'
  export default {
    name:'selectCalendar',
    data(){
      return{
        visible:false,
        activeValue:'',
        selectField: ''
      }
    },
    components: {
      CalendarTouch
    },
    props:{
      defaultDate:{
        default:'',
        type: String || Number,
      }
    },
    mounted(){
        var date = new Date();
        this.activeValue = {
            formatTime:date.setHours(0,0,0,0),
            arrayTime:[date.getFullYear(),date.getMonth()+1,date.getDate()]
        }
    },
    methods: {
      open(field){
        this.visible = true;
        this.selectField = field || '';
      },
      close(){
        this.visible = false
      },
      confirm(){
        const {activeValue,selectField} = this;
        /* activeValue:
        ** formatTime:必须是格式化后的日期时间戳，日期时间尾部为0H 0M 0S 0MS
        **/ 
        this.$emit('confirm',activeValue,selectField);
        this.close()
      },
      onValuesChange(values) {
        this.activeValue = values || {};
      },
      getToday(){
      }
    },
    watch:{

    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .select-calendar {width: 100%;}
    .select-picker{
      .picker-items{width: 100vw;}
      .picker-toolbar{border-bottom: 1px solid #eaeaea;}
    }
</style>