<template>
    <div class="wrapper">
        <weekPlanDetail :detailData="detailData">
            <!--流转信息-->
            <HistoryFlow slot="history-flow" v-if="pageParam.processInsId" :processInstenceId="pageParam.processInsId"></HistoryFlow>
        </weekPlanDetail>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import {getSession} from '@/util/utils'
  import weekPlanDetail from './children/weekPlanDetail'
  import HistoryFlow from '@/pages/task/historyFlow'
  export default {
    name: 'StaffWeekDetail',
    data() {
      return {
        pageParam:{},//页面传参
        detailData: {}
      }
    },
    components: {
      weekPlanDetail,
      HistoryFlow
    },
    created() {
      const routeParams = this.$route.params;
      const sessionParam = getSession('StaffWeekDetail');
      if (routeParams.id){
        this.pageParam = routeParams;
      } else if (sessionParam.id){
        this.pageParam = sessionParam;
      }
    },
    mounted() {
      this.getPlanDetail();
    },
    methods: {
      //获取计划详情
      getPlanDetail(){
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/expandshop/devPlan/devPlanWeek/devAttache/detail',{id: this.pageParam.id}, (res)=>{
            if (res.success) {
              let resData = res.data || {};
              this.detailData = {...resData};
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          });
        })
      },
    },
    watch:{
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    /*@import '~@/assets/css/base';*/
</style>
