<template>
    <!--CHECK1-->
    <div class="wrapper add-month" v-if="objData.taskDefinitionKey == 'check1'">
        <div class="row-list bdtb">
            <div class="row-list-item">
                <div class="cell-title">开始时间</div>
                <div class="cell-value is-select">
                    <input class="ipt-data" type="text" :value="formatDate(saveData.startDate,'yyyy-MM-dd')" placeholder="请选择" readonly>
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
            <div class="row-list-item" @click="selectItemData('selectLevel3')">
                <div class="cell-title">所属开发部</div>
                <div class="cell-value">
                    <input class="ipt-data" type="text" :value="saveData.level3Name" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预算</div>
                <div class="cell-value">{{saveData.budge}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预计</div>
                <div class="cell-value">{{saveData.predict}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当周跟进</div>
                <div class="cell-value">{{followUp}}</div>
            </div>
        </div>

        <form ref="postForm" class="post-form">
            <weekPlanItem ref="getMonthItem" :checkInfo="checkInfo" :pageParam="detailData" :followup.sync="followUp" :readonly="readonly" @itemData="getItemData"></weekPlanItem>
        </form>
        <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="btn" type="button" :disabled="submitDisbled" @click="saveWeekPlan">提交审核</button>
            </div>
        </div>

        <!--内容选择-->
        <selectCalendar ref="refCalendar" @confirm="changeCalendar"></selectCalendar>
        <SuperSelect ref="superSelect" @confirm="changeOption"></SuperSelect>
    </div>
    <!--CHECK2-->
    <div class="wrapper month-detail scroll-layout" v-else-if="objData.taskDefinitionKey == 'check2'">
        <scrollTab :options="tabList" :dataType="1" @changeMenu="selectTabContent" class="roll-head"></scrollTab>
        <weekPlanDetail ref="scrollContainer" :tabType="tabType" :pageParam="detailData" :noResult="noResult">
            <HistoryFlow slot="history-flow" v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>
        </weekPlanDetail>
        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="gray-btn bdtop" type="button"  @click="submitProcessData('no')">退回</button>
                <button class="sub-btn" type="submit" @click="submitProcessData('yes')">同意</button>
            </div>
        </div>
        <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,formatDate} from '@/util/common'
  import { validForm } from '@/util/utils'
  import {getSelectData,getPlanSelect} from '@/util/getData'
  import SuperSelect from '@/components/superSelect'
  import selectCalendar from '@/components/selectCalendar'
  import scrollTab from '@/components/scrollTab'
  import weekPlanDetail from '@/pages/plan/manager/children/weekPlanDetail'
  import weekPlanItem from '@/pages/plan/manager/children/weekPlanItem'
  import PopComment from '@/components/PopComment'
  import HistoryFlow from '../historyFlow'
  export default {
    name: 'TaskDetail2ManagerPlanWeek',
    data() {
      return {
        objData: {},
        readonly: false,
        level3Name: '',//开发部名称
        followUp: 0,//当月跟进
        saveData: {},
        detailData: {},
        selectLevel3: [],//开发部
        // CHECK2
        tabList: [{id:1,name:'目标跟进'},{id:3,name:'新店开业'},{id:4,name:'扩店开业'},{id:5,name:'续签门店'},{id:6,name:'闭店门店'},{id:7,name:'拜访品牌'},],
        tabIndex: 0,
        tabType: 1,
        noResult: false,
        checkInfo:{},
        submitDisbled: false,
      }
    },
    components:{
      scrollTab,
      selectCalendar,
      weekPlanItem,
      weekPlanDetail,
      SuperSelect,
      PopComment,
      HistoryFlow
    },
    created() {
      const query = this.$route.query;
      this.objData = query;
      console.log(JSON.stringify(query));
      this.readonly = !!query.readonly;
    },
    mounted(){
      let {yearAndMonth,level2} = this.saveData;
      //获取计划数据
      this.getPlanDetail().then(()=>{
        this.transPlanItem();
      });
      if(!level2){
          level2 = this.userBase.level2
      }
      //获取开发部
      getSelectData('officeList',{type:32,id:level2}).then((res)=>{
        this.selectLevel3 = [...res];
      })
    },
    methods: {
      formatDate,
      // 切换tab选择
      selectTabContent(param){
        const thisType = this.getSortType(param.id);
        this.tabType = param.id;//当前页面ID
        this.tabIndex = param.index;//当前页面TAB索引
        if (!this.detailData[thisType] || !this.detailData[thisType].length){
          this.noResult = true;
        } else {
          this.noResult = false;
        }
        this.$refs.scrollContainer.scrollTop = 0;
      },
      getPlanDetail(){
        const {businessId,procKey,taskDefinitionKey} = this.objData;
        const postParam = {
          businessId,
          procDefKey: procKey,
          taskDefinitionKey
        };
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/act/dealTask',postParam, (res)=>{
            if (res.success) {
              let resData = res.data || {};
              if (resData) resData = JSON.parse(resData);
              this.detailData = {...resData};
              this.saveData = {
                ...this.saveData,
                startDate: resData.startDate,
                endDate: resData.endDate,
                title: resData.title,
                budge: resData.budge,
                predict: resData.predict,
                level3: resData.level3,
                level3Name: resData.level3Name,
                title: resData.title,
              };
              var timeCheck = new Date(resData.startDate);
              this.checkInfo = {year:timeCheck.getFullYear(),month:timeCheck.getMonth()+1};
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          })
        });
      },

      //选择内容
      selectItemData(field){
          if(field === 'startDate'){
              this.$refs.refCalendar.open(field);
          }else{
              if(this.readonly)return;
              this.$refs.superSelect.open(this[field],'',field);
          }
      },
      //选择确认数据
      changeOption(val,type){
        if (type === 'selectLevel3'){
          this.level3Name = val.name;
          this.saveData.level3 = val.id
        }
      },
        getWeekOfMonth(times){
            var date = new Date(times);
            var dateStart = new Date(times); // 本月初
            var firstWeek = 1;
            if (dateStart.getDay() === 1) {
                firstWeek = 1;
            } else if (dateStart.getDay() === 0) {
                firstWeek = 8 - 7 + 1;
            } else {
                firstWeek = 8 - dateStart.getDay() + 1;
            }
            var weekIndex = 1;
            var c = date.getDate();
            if (date.getDay() === 1 && date.getDate() < 7) {
                weekIndex = 1;
            } else if (c < firstWeek ) {
                weekIndex = -1;
            } else {
                if (c < 7) {
                    weekIndex = Math.ceil(c/7);
                } else {
                    c = c - firstWeek + 1;
                    if (c%7 === 0) {
                        if (dateStart.getDay() !== 6) {
                            weekIndex = c/7;
                        } else {
                            weekIndex = c/7 + 1;
                        }
                    } else {
                        weekIndex = Math.ceil(c/7);
                    }
                }
            }
            return weekIndex;
        },
        changeCalendar(val,field){
            const selectTime = val.formatTime;
            const arrTime = val.arrayTime;
            const nowWeek = this.getWeekOfMonth(selectTime).toString();
            if (selectTime && field == 'startDate'){
                let weekNum = new Date(selectTime).getDay();
                console.log('weekNum '+weekNum);
                if (weekNum != 1) {
                    MessageBox('提示', '开始时间必须为周一！');
                    return false;
                }
                this.checkInfo = {year:arrTime[0],month:arrTime[1],week:nowWeek}
                this.checkExist({year:arrTime[0],month:arrTime[1],week:nowWeek}).then((res)=>{
                    if (!res){
                        this.saveData[field] = selectTime;
                        this.saveData.endDate = selectTime + 86400*7*1000;
                        this.saveData.week = nowWeek;
                        this.saveData.title = this.userBase.name + arrTime[0]+ '年'+arrTime[1]+'月第' +nowWeek + '周计划';
                        this.saveData.yearAndMonth = arrTime[0]+arrTime[1];
                        this.getBudgetAndPredictNum({
                            year:arrTime[0],
                            month:arrTime[1]

                        });//计算预算
                        // this.$refs.getWeekItem.selectTotal = [];//清空子组件选择统计
                    } else {
                        MessageBox.alert('本周计划是已存在！','提示');
                    }
                });
            }

        },
        //检查开发专员周计划是否存在
        checkExist(checkData){
            return new Promise((resolve, reject)=>{
                postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/checkExist',checkData, (res)=>{
                    if (res.success) {
                        resolve(res.data);
                    } else {
                        Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                })
            })
        },
      //内容数据渲染
      transPlanItem(){
        const {detailData} = this;
        let that = this;
        let updateData = (filedName,addArr)=>{
          addArr.map((item,key)=>{
            item.editFlag = true;
            item.isInMonth = item.inMonthFlag;
            let otherId = item.id;
            that.$refs.getMonthItem.selectTotal.push(otherId);
          });
          this.$refs.getMonthItem[filedName] = [...addArr];
          console.log(addArr);
        };
        for (let key in detailData){
          if (detailData[key].length){
            switch (key){
              case 'objTrace':
                updateData('reqObjPointTraceParams',detailData[key]);
                break;
              case 'newShopOpen':
                updateData('reqNewShopOpenParams',detailData[key]);
                break;
              case 'extendShopOpen':
                updateData('reqExtendShopOpenParams',detailData[key]);
                break;
              case 'reNewShop':
                updateData('reqReNewShopParams',detailData[key]);
                break;
              case 'closeShop':
                updateData('reqCloseShopParams',detailData[key]);
                break;
              case 'brand':
                updateData('reqBrandAddParams',detailData[key]);
                break;
            }
          }
        }
      },
      //获取分类名
      getSortType(id){
        let theType = '';
        switch (id){
          case 1: theType = 'objTrace'; break;
          case 3: theType = 'newShopOpen'; break;
          case 4: theType = 'extendShopOpen'; break;
          case 5: theType = 'reNewShop'; break;
          case 6: theType = 'closeShop'; break;
          case 7: theType = 'brand'; break;
          default: theType = 'objTrace';
        }
        return theType;
      },
      //获取子组件数据
      getItemData(data){
        this.saveData = {
          ...this.saveData,
          ...data
        };
      },
      //保存计划
        saveWeekPlan(){
        const {objData} = this;
        this.submitDisbled = true;
        this.$refs.getMonthItem.savePlanData();
        const postParam = this.saveData;
        postParam.processInsId= objData.processInstenceId;
        postParam.taskId= objData.taskId;
        postParam.id= objData.businessId;
        const validResult = validForm(this.$refs.postForm);
        if(!validResult.status){
          Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'});
          this.submitDisbled = false;
          return false;
        }
        postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/commitAudit',postParam, {
          success: (res)=> {
            if (res.success) {
                Toast({message: '操作成功...', iconClass: 'mintui mintui-field-success'})
                setTimeout(()=>{
                    this.$router.back(-1);
                },1500)
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
      },
      // 提交业务流程
      submitProcessData(actionType){
        let titles = {
          'yes':'请输入同意的意见',
          'no':'请输入退回的意见',
        };
        this.$refs.popComment.open(actionType,titles[actionType]);
      },
      // 确认意见提交表单内容
      confirmComment(comment,actionType){
        const {objData} = this;
        let sectionData = {
          actionType,
          comment,
          processInsId: objData.processInstenceId,
          taskId: objData.taskId,
          taskName: objData.taskDefinitionKey,
          verifyId: objData.businessId
        };
        postTokenData('/devPlan/devPlanWeek/manager/audit',sectionData,(res)=>{
          if(res.code==='0000'){
            Toast({message: '操作成功...', iconClass: 'mintui mintui-field-success'})
            setTimeout(()=>{
              this.$router.back(-1);
            },1500)
          }else{
            Toast({
              message: res.message,
              iconClass: 'mintui mintui-field-error'
            });
          }
        })
      },
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

</style>

