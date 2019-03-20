<template>
    <!--CHECK2-->
    <div class="wrapper add-week" v-if="objData.taskDefinitionKey == 'check1'">
        <div class="row-list bdtb">
            <div class="row-list-item">
                <div class="cell-title">开始时间</div>
                <div class="cell-value is-select">{{formatDate(saveData.startDate,'yyyy-MM-dd')}}</div>
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

        <weekPlanItem ref="getWeekItem" :pageParam="detailData" :readonly="readonly" @itemData="getItemData"></weekPlanItem>
        <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="btn" type="button" :disabled="submitDisbled" @click="saveMonthPlan">提交审核</button>
            </div>
        </div>
    </div>
    <div class="wrapper" v-else-if="objData.taskDefinitionKey == 'check2'">
        <weekPlanDetail ref="weekDetail" :detailData="detailData.businessInfo"></weekPlanDetail>
        <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

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
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,formatDate} from '@/util/common'
  import {getSession} from '@/util/utils'
  import weekPlanDetail from '@/pages/plan/staff/children/weekPlanDetail'
  import PopComment from '@/components/PopComment'
  import weekPlanItem from '@/pages/plan/staff/children/weekPlanItem'
  import HistoryFlow from '../historyFlow'
  export default {
    name: 'taskStaffWeek',
    data() {
      return {
        planId: '',
        objData: {},
        saveData: {},
        detailData: {},
        submitDisbled: false,
        selectedFormal:[]
      }
    },
    components: {
      weekPlanDetail,
      weekPlanItem,
      PopComment,
      HistoryFlow
    },
    created() {
      const query = this.$route.query;
      this.objData = query;
      this.readonly = !!query.readonly;
    },
    mounted() {
        this.getPlanDetail();
    },
    methods: {
      formatDate,
      //获取计划详情
      getPlanDetail(){
        const {businessId,procKey,taskDefinitionKey} = this.objData;
        const postParam = {
          businessId,
          procDefKey: procKey,
          taskDefinitionKey
        };
        postTokenData(base.basePath + '/act/dealTask',postParam, (res)=>{
          if (res.success) {
            let resData = res.data || {};
            if (resData) resData = JSON.parse(resData);
            this.detailData = {...resData};
            this.saveData = {
              startDate: resData.startDate,
              endDate: resData.endDate,
              title: resData.title
            };
          } else {
            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
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
        postTokenData('/expandshop/devPlan/devPlanWeek/devAttache/audit',sectionData,(res)=>{
          if(res.code==='0000'){
            Toast({message: '操作成功!', iconClass: 'mintui mintui-field-success'});
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
      //获取子组件数据
      getItemData(data,select){
        this.saveData = {
          ...this.saveData,
          ...data
        };
        this.selectedFormal = [...select];
      },
      //保存提交
      saveMonthPlan(){
        const {objData} = this;
        this.$refs.getWeekItem.savePlanData();
        const postParam = this.saveData;
        postParam.processInsId= objData.processInstenceId;
        postParam.taskId= objData.taskId;
        postParam.verifyId= objData.businessId;
        if (!this.selectedFormal.length) {
          Toast({message: '计划列表不能为空！', iconClass: 'mintui mintui-field-error'});
          return false;
        }
        console.log(postParam,JSON.stringify(postParam),'保存数据');
        postTokenData(base.basePath + '/expandshop/devPlan/devPlanWeek/devAttache/auditCommit',postParam, {
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
    watch:{
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    /*@import '~@/assets/css/base';*/
</style>
