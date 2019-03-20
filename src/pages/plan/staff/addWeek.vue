<template>
    <div class="wrapper add-week">
        <div class="row-list bdtb">
            <div class="row-list-item" @click="selectItemData('startDate')">
                <div class="cell-title">开始时间</div>
                <div class="cell-value is-select">
                    <input class="ipt-data" type="text" :value="formatDate(saveData.startDate,'yyyy-MM-dd')" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">结束时间</div>
                <div class="cell-value is-select">{{formatDate(saveData.endDate,'yyyy-MM-dd')}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">标题</div>
                <div class="cell-value">{{saveData.title}}</div>
            </div>
        </div>

        <weekPlanItem ref="getWeekItem" :pageParam="saveData" :readonly="readonly" @itemData="getItemData"></weekPlanItem>

        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" :disabled="submitDisbled" @click="saveMonthPlan">提交审核</button>
            </div>
        </div>

        <selectCalendar ref="refCalendar" @confirm="changeCalendar"></selectCalendar>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,formatDate} from '@/util/common'
  import selectCalendar from '@/components/selectCalendar'
  import SuperSelect from '@/components/superSelect'
  import weekPlanItem from './children/weekPlanItem'
  export default {
    name: 'StaffAddWeek',
    data() {
      return {
        readonly: false,
        submitDisbled: false,
        saveData: {
          startDate: "",
          endDate: "",
          title: "",
          weekOfYear: ""
        },
        selectedFormal:[]
      }
    },
    components: {
      SuperSelect,
      selectCalendar,
      weekPlanItem
    },
    created() {
    },
    methods: {
      formatDate,
      //开始日期
      selectItemData(field){
        this.$refs.refCalendar.open(field);
      },
      changeCalendar(val,field){
        const {startDate} = this.saveData;
        const selectTime = val.formatTime;
        const arrTime = val.arrayTime;
        if (selectTime && field == 'startDate'){
          let weekNum = new Date(selectTime).getDay();
          if (weekNum != 1) {
            MessageBox('提示', '开始时间必须为周一！');
            return false;
          }
          this.checkExist(selectTime).then((res)=>{
            if (!res){
              let setBase = ()=>{
                let nowWeek = this.getWeekOfYear(selectTime).toString();
                this.saveData[field] = selectTime;
                this.saveData.endDate = selectTime + 86400*7*1000;
                this.saveData.weekOfYear = nowWeek;
                this.saveData.title = this.userBase.name + arrTime[0]+ '年第' +nowWeek + '周计划';
              };
              if (startDate && startDate != selectTime){
                MessageBox.confirm('确定更换开始时间，已选数据将被删除！','提示',{
                  closeOnClickModal:false
                }).then(({ value, action }) => {
                  this.$refs.getWeekItem.clearAddData();//清空组件选择数据
                  setBase();
                }).catch((data)=>{});
              } else {
                setBase();
              }

            } else {
              MessageBox.alert('本周计划是已存在！','提示');
            }
          });
        }

      },
      //检查开发专员周计划是否存在
      checkExist(startDate){
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/expandshop/devPlan/devPlanWeek/devAttache/checkExist',{startDate}, (res)=>{
            if (res.success) {
              resolve(res.data);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          })
        })
      },
      getWeekOfYear(times){
        let today = new Date(times);
        let firstDay = new Date(today.getFullYear(),0, 1);
        let dayOfWeek = firstDay.getDay();
        let spendDay= 1;
        if (dayOfWeek !=0) {
          spendDay=7-dayOfWeek+1;
        }
        firstDay = new Date(today.getFullYear(),0, 1+spendDay);
        let d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
        let result =Math.ceil(d/7);
        return result+1;
      },
      //获取子组件数据
      getItemData(data,select){
        this.saveData = {
          ...this.saveData,
          ...data
        };
        this.selectedFormal = [...select];
      },
      //保存计划
      saveMonthPlan(){
        this.$refs.getWeekItem.savePlanData();
        const postParam = this.saveData;
        if (!this.selectedFormal.length) {
          Toast({message: '计划列表不能为空！', iconClass: 'mintui mintui-field-error'});
          return false;
        }
        console.log(postParam,JSON.stringify(postParam),'保存数据');
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanWeek/devAttache/add',postParam, {
          success: (res)=> {
            if (res.success) {
              this.$router.back(-1);
            } else {
              this.submitDisbled = false;
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            this.submitDisbled = false;
            console.log('Error:' + JSON.stringify(data));
          }
        });
      }
    },
    computed: {
      ...mapState({
        userBase: state => state.userInfo.base
      })
    },
    destroyed(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .add-week {
        touch-action: none;
        padding-top: p2r(10px);
        .row-list-item {
            background-color: #ffffff;
        }
    }



</style>
