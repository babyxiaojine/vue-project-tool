<template>
    <div class="wrapper scroll-layout">

        <scrollTab :options="tabList" :refresh="initTab" @changeMenu="selectTabContent" class="roll-head"></scrollTab>

        <ApproachDetailItem ref="getWeekItem" :readonly="readonly" :class="!objData.readonly && 'approach-'+objData.taskDefinitionKey" :tabIndex="tabIndex" :apprDetail="apprDetail" @itemData="getItemData">
            <!--流转信息-->
            <HistoryFlow slot="history-flow" v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>
        </ApproachDetailItem>

        <div class="foot-submit roll-foot"  v-if="objData.taskDefinitionKey == 'check1' && !objData.readonly">
            <div class="foot-submit">
                <div class="fix-area">
                    <button class="sub-btn" type="submit" @click="submitApplyData">提交审核</button>
                </div>
            </div>
        </div>
        <div class="foot-submit"  v-if="objData.taskDefinitionKey == 'finish' && !objData.readonly">
            <div class="fix-area">
                <button class="gray-btn bdtop" type="button"  @click="submitProcessData('no')">退回</button>
                <button class="gray-btn bdtop" type="reset" @click="submitProcessData('reject')">驳回</button>
                <button class="sub-btn" type="submit" @click="submitProcessData('yes')">同意</button>
            </div>
        </div>

        <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>

    </div>
</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,objectParams} from '@/util/common'
  import {getSession,formatForm} from '@/util/utils'
  import ApproachDetailItem from '@/pages/approach/DetailItem'
  import scrollTab from '@/components/scrollTab'
  import PopComment from '@/components/PopComment'
  import HistoryFlow from '../historyFlow'
  export default {
    name: 'taskApproachDetail',
    data() {
      return {
        shopId: '',
        objData: {},
        readonly: true,
        initTab: false,
        tabList: ['门店信息','联系人'],
        tabIndex: 0,
        apprDetail: {},
        activeSign: '',//签名
        shopOpenList: [],
        templateHtml: [],
      }
    },
    components: {
      scrollTab,
      HistoryFlow,
      PopComment,
      ApproachDetailItem
    },
    created() {
      const query = this.$route.query;
      this.objData = query;
      if (query.taskDefinitionKey == 'finish'){
        this.readonly = true;
      } else {
        this.readonly = !!query.readonly;
      }
    },
    mounted() {
      this.getApproachDetail(this.shopId).then(()=>{
        this.initTab = true;
      });

    },
    methods: {
      formatDate,
      //获取详情数据
      //获取计划详情
      getApproachDetail(){
        const {readonly} = this;
        const {businessId,procKey,taskDefinitionKey} = this.objData;
        const postParam = {
          businessId,
          procDefKey: procKey,
          taskDefinitionKey
        };
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/act/dealTask',postParam, (res)=>{
            if (res.success) {
              let {tabList} = this;
              let resData = res.data || {};

              if (resData) resData = JSON.parse(resData);
              // console.log(resData,'resData');
              this.apprDetail = {...resData};

              if(resData.templateHtml) {//TAB分类
                let otherTab = resData.templateHtml;
                for (let i = 0; i < otherTab.length; i++){
                  tabList.push(otherTab[i].tabName);
                  if(readonly){
                    otherTab[i].tabValue = otherTab[i].tabValue.replace(new RegExp('input','gm'),'input disabled="disabled"');
                  }
                }
                this.tabList = tabList;
              }
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          });
        })

      },
      // 切换tab选择
      selectTabContent(param){
        this.tabIndex = param.index;//当前页面TAB索引
      },
      // 打开签名
      openSignCanvas(s,readonly){
        this.activeSign = s;
        this.$refs.drawSignCanvas.open(this.apprDetail[s],readonly)
      },
      // 签名完成回调
      signSuccess(res){
        const tag = this.activeSign;
        this.apprDetail[tag] = res;
      },
      //装修类型
      decorationType(type){
        let typeText = '';
        if (type && typeof type !== 'string') type = type.toString();
        switch (type){
          case '0': typeText = '标准'; break;
          case '1': typeText = '旗舰'; break;
          case '2': typeText = '主题'; break;
          default:  typeText = '-';
        }
        return typeText;
      },
      //获取子组件数据
      getItemData(detail,tempData){
        this.apprDetail = {
          ...this.apprDetail,
          ...detail
        };
        this.tempData = tempData;
      },
      // 提交
      submitApplyData(){
        this.$refs.getWeekItem.getSaveData();
        const {apprDetail,tempData} = this;
        let postParam = apprDetail || {};
        if (postParam.templateHtml) delete postParam.templateHtml;
        // console.log(JSON.stringify(postParam),postParam,'保存');
        postTokenData('/approach/apply/saveAndCommit?' + tempData,postParam,(res)=>{
          if(res.success){
            Toast({message: res.message, iconClass: 'mintui mintui-field-success'});
            setTimeout(()=>{
              this.$router.back(-1)
            },1500)
          }else{
            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
          }
        })
      },
      // 提交业务流程
      submitProcessData(actionType){
        let titles = {
          'yes':'请输入同意的意见',
          'no':'请输入退回的意见',
          'reject':'请输入驳回的意见',
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
        // console.log(sectionData,'审核提交数据');
        postTokenData('/approach/apply/audit',sectionData,(res)=>{
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

    },
    computed: {
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .approach-check1,
    .approach-finish {
        bottom: p2r(48px);
    }

    .row-list-item {
        .appr-lab {
            width: p2r(160px);
        }
    }

</style>
