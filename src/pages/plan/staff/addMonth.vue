<template>
    <div class="wrapper add-month">

        <div class="row-list bdtb">
            <div class="row-list-item" @click="selectItemData('selectMonth')">
                <div class="cell-title">月份</div>
                <div class="cell-value">
                    <input class="ipt-data" type="text" :value="saveData.yearAndMonth" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">标题</div>
                <div class="cell-value">{{saveData.title}}</div>
            </div>
            <div class="row-list-item" @click="selectItemData('selectLevel3')">
                <div class="cell-title">所属开发部</div>
                <div class="cell-value">
                    <input class="ipt-data" type="text" :value="level3Name" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预算</div>
                <div class="cell-value">{{budgeNumber}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月跟进</div>
                <div class="cell-value">{{followUp}}</div>
            </div>
        </div>

        <form ref="postForm" class="post-form">
        <monthPlanItem ref="getMonthItem" :pageParam="saveData" :followup.sync="followUp" :readonly="readonly" @itemData="getItemData"></monthPlanItem>
        </form>

        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="saveMonthPlan">保存</button>
            </div>
        </div>
        <!--内容选择-->
        <SuperSelect ref="superSelect" @confirm="changeMonth"></SuperSelect>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import { validForm } from '@/util/utils'
  import {getSelectData,getPlanSelect} from '@/util/getData'
  import SuperSelect from '@/components/superSelect'
  import monthPlanItem from './children/monthPlanItem'

  export default {
    name: 'StaffAddMonth',
    data() {
      return {
        readonly: false,
        budgeNumber: '',//预算数
        level3Name: '',//开发部名称
        followUp: 0,//当月跟进
        itemTotal: 0,//添加总数
        saveData: {
          // id: "",
          level3: "",
          title: "",
          yearAndMonth: ""
        },

        selectMonth: [],//选择月份
        selectLevel3: [],//开发部
        submitDisbled: false
      }
    },
    components:{
      SuperSelect,
      monthPlanItem
    },
    created() {

    },
    mounted(){
      this.getMonthArr();//获取选择月份
      //获取开发部
      if (this.userBase.level2){
        getSelectData('officeList',{type:32,id:this.userBase.level2}).then((res)=>{
          this.selectLevel3 = [...res];
        })
      }
    },
    methods: {
      selectItemData(typeName){
        this.$refs.superSelect.open(this[typeName],'',typeName);
      },
      //选择月份
      changeMonth(val,type){
        if (type === 'selectMonth'){
          let theValue = val.values;
          let theName = val.name;
          this.checkExist(theName,theValue);
        }
        if (type === 'selectLevel3'){
          this.level3Name = val.name;
          this.saveData.level3 = val.id
        }
      },
      //检查开发专员月计划是否存在
      checkExist(theName,theValue){
        const {yearAndMonth} = this.saveData;
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanMonth/devAttache/checkExist',{yearAndMonth:theValue}, (res)=>{
          if (res.success) {
            if (!res.data){
              let setBase = ()=>{
                this.saveData.title = this.userBase.name + theName + '月计划';
                this.saveData.yearAndMonth = theValue;
                this.getBudgeNumber(theValue);//计算预算
                this.getDevManagePlan(theValue);//开发经理指定计划
              };
              //切换月份提示
              if (yearAndMonth && yearAndMonth != theValue){
                MessageBox.confirm('确定更换计划时间，已选数据将被删除！','提示',{
                  closeOnClickModal:false
                }).then(({ value, action }) => {
                  this.$refs.getMonthItem.clearAddData();//清空组件选择数据
                  setBase();
                }).catch((data)=>{});
              } else {
                setBase();
              }
            } else {
              MessageBox.alert('本月计划是已存在！','提示');
            }
          } else {
            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
          }
        })
      },
      //获取预算数
      getBudgeNumber(ymData){
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanMonth/devAttache/getBudgeNumber',{yearAndMonth:ymData}, (res)=>{
            if (res.success) {
                this.budgeNumber = res.data;
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
        });
      },
      //获取开发经理指定计划
      getDevManagePlan(ymData){
        let updateData = (filedName,addArr)=>{
          addArr.map((item,key)=>{
            let otherId = item.id;
            item.otherId = item.id;
            item.objName = item.shopName;
            item.id = '';
            this.$refs.getMonthItem.selectTotal.push(otherId);
          });
          // this.saveData[filedName] = [...addArr];
          this.$refs.getMonthItem[filedName] = [...addArr];
        };
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanMonth/devAttache/getDevManagePlanInfo',{yearAndMonth:ymData}, (res)=>{
          if (res.success) {
            let {saveData} = this;
            let managePlan = {...res.data};
            for (let key in managePlan){
              // let itemKey = key.toLowerCase();
              if (managePlan[key].length){
                  switch (key){
                    case 'objTrace':
                      updateData('reqObjPointTraceParams',managePlan[key]);
                      break;
                    case 'newShopOpen':
                      updateData('reqNewShopOpenParams',managePlan[key]);
                      break;
                    case 'extendShopOpen':
                      updateData('reqExtendShopOpenParams',managePlan[key]);
                      break;
                    case 'reNewShop':
                      updateData('reqReNewShopParams',managePlan[key]);
                      break;
                    case 'closeShop':
                      updateData('reqCloseShopParams',managePlan[key]);
                      break;
                  }
              }
            }
            console.log(res,'指定')
          } else {
            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
          }
        });
      },
      //获取月份
      getMonthArr(){
        let dataArr = [];
        let data = new Date();
        let year = data.getFullYear();
        data.setMonth(data.getMonth()-1, 1);//设置月份
        for (let i = 0; i < 12; i++) {
          data.setMonth(data.getMonth() + 1);
          let mon = data.getMonth() + 1;
          mon = mon < 10 ? "0" + mon : mon;
          let mItem = {values:data.getFullYear() + mon.toString(),name:data.getFullYear() +'年'+ mon+'月'};
          dataArr.push(mItem)
        }
        // console.log(dataArr);
        this.selectMonth = dataArr;
      },
      //获取子组件数据
      getItemData(data){
        let allNum = 0;
        for (let key in data){
          allNum += data[key].length;
        }
        this.itemTotal = allNum;
        this.saveData = {
          ...this.saveData,
          ...data
        };
      },
      //保存计划
      saveMonthPlan(){
        // this.getItemData();
        this.$refs.getMonthItem.savePlanData();
        const postParam = this.saveData;
        const validResult = validForm(this.$refs.postForm);
        if (this.itemTotal <= 0) {
          Toast({message: '计划列表不能为空！', iconClass: 'mintui mintui-field-error'});
          return false;
        }
        if(!validResult.status){
          Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'});
          this.submitDisbled = false;
          return false;
        }
        // console.log(this.saveData,JSON.stringify(this.saveData),'保存数据');
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanMonth/devAttache/add',postParam, {
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
    .add-month {
        padding-top: p2r(10px);
    }
</style>
