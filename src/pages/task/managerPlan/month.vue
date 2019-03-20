<template>
    <!--CHECK1-->
    <div class="wrapper add-month" v-if="objData.taskDefinitionKey == 'check1'">
        <div class="row-list bdtb">
            <div class="row-list-item">
                <div class="cell-title">月份</div>
                <div class="cell-value">{{saveData.yearAndMonth}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">标题</div>
                <div class="cell-value">{{saveData.title}}</div>
            </div>
            <div class="row-list-item" @click="!readonly && selectItemData('selectLevel3')">
                <div class="cell-title">所属开发部</div>
                <div class="cell-value">
                    <input class="ipt-data" type="text" :value="saveData.level3Name" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预算</div>
                <div class="cell-value">{{saveData.budgeNum}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月跟进</div>
                <div class="cell-value">{{followUp}}</div>
            </div>
        </div>

        <form ref="postForm" class="post-form">
            <monthPlanItem ref="getMonthItem" :pageParam="saveData" :followup.sync="followUp" :readonly="readonly" @itemData="getItemData"></monthPlanItem>
        </form>

        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="btn" type="button" @click="saveMonthPlan()" :disabled="submitDisbled">提交审核</button>
            </div>
        </div>
        <!--内容选择-->
        <SuperSelect ref="superSelect" @confirm="changeOption"></SuperSelect>
        <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>
    </div>
    <!--CHECK2-->
    <div class="wrapper month-detail scroll-layout" v-else-if="objData.taskDefinitionKey == 'check2'">
        <scrollTab :options="tabList" :dataType="1" @changeMenu="selectTabContent" class="roll-head"></scrollTab>
        <monthPlanDetail ref="scrollContainer" :tabType="tabType" :pageParam="detailData" :noResult="noResult">
            <HistoryFlow slot="history-flow" v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>
        </monthPlanDetail>
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
  import {base,postTokenData} from '@/util/common'
  import { validForm } from '@/util/utils'
  import {getSelectData,getPlanSelect} from '@/util/getData'
  import SuperSelect from '@/components/superSelect'
  import scrollTab from '@/components/scrollTab'
  import monthPlanDetail from '@/pages/plan/manager/children/monthPlanDetail'
  import monthPlanItem from '@/pages/plan/manager/children/monthPlanItem'
  import PopComment from '@/components/PopComment'
  import HistoryFlow from '../historyFlow'
  export default {
    name: 'TaskDetail2ManagerPlanMonth',
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
        submitDisbled: false,
      }
    },
    components:{
      scrollTab,
      SuperSelect,
      monthPlanItem,
      monthPlanDetail,
      PopComment,
      HistoryFlow
    },
    created() {
      const query = this.$route.query;
      this.objData = query;
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
                budgeNum: resData.budgeNum,
                level3: resData.level3,
                level3Name: resData.level3Name,
                title: resData.title,
                yearAndMonth: resData.yearAndMonth,
              };
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          })
        });
      },

      //选择内容
      selectItemData(typeName){
        this.$refs.superSelect.open(this[typeName],'',typeName);
      },
      //选择确认数据
      changeOption(val,type){
        if (type === 'selectLevel3'){
          this.level3Name = val.name;
          this.saveData.level3 = val.id
        }
      },
      //内容数据渲染
      transPlanItem(){
        const {detailData} = this;
        let that = this;
        let updateData = (filedName,addArr)=>{
          addArr.map((item,key)=>{
            let otherId = item.id;
              that.$refs.getMonthItem.selectTotal.push(otherId);
          });
          this.$refs.getMonthItem[filedName] = [...addArr];
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
      saveMonthPlan(){
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
        console.log(this.saveData,JSON.stringify(this.saveData),'保存数据');
        postTokenData(base.basePath + '/devPlan/commitAudit',postParam, {
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
        postTokenData('/devPlan/audit',sectionData,(res)=>{
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

