<template>
    <div class="wrapper scroll-layout">

        <scrollTab :options="tabList" :refresh="initTab" @changeMenu="selectTabContent" class="roll-head"></scrollTab>

        <ApproachDetailItem ref="getWeekItem" :readonly="readonly" :tabIndex="tabIndex" :apprDetail="apprDetail">
            <!--流转信息-->
            <HistoryFlow slot="history-flow" v-if="apprDetail.processInsId" :processInstenceId="apprDetail.processInsId"></HistoryFlow>
        </ApproachDetailItem>

    </div>
</template>
<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,objectParams} from '@/util/common'
  import {getSession,formatForm} from '@/util/utils'
  import scrollTab from '@/components/scrollTab'
  import ApproachDetailItem from './DetailItem'
  import HistoryFlow from '@/pages/task/historyFlow'
  export default {
    name: 'ApproachDetail',
    data() {
      return {
        shopId: '',
        readonly: true,
        initTab: false,
        tabList: ['门店信息','联系人'],
        tabIndex: 0,
        apprDetail: {},
        templateHtml: [],
      }
    },
    components: {
      scrollTab,
      HistoryFlow,
      ApproachDetailItem
    },
    created() {
        const routeParams = this.$route.params;
        const sessionParam = getSession('ApproachDetail');
        if (routeParams.shopId){
          this.shopId = routeParams.shopId;
        } else if (sessionParam.shopId){
          this.shopId = sessionParam.shopId;
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
      getApproachDetail(shopId){
        const {readonly} = this;
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/approach/apply/detailData',{shopId:shopId}, {
            success: (res)=> {
              if (res.success) {
                let {tabList} = this;
                let resData = res.data || [];
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
              } else {
                Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
              }
              resolve(res);
            },
            error: (data)=> {
              console.log(data);
              Toast('Error : ' + JSON.stringify(data))
            }
          });
        })

      },
      // 切换tab选择
      selectTabContent(param){
        this.tabIndex = param.index;//当前页面TAB索引
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

    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';

    .scroll-layout {
        .scroll-tab-title {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        .roll-main,.roll-area {
            padding: p2r(5px 0);
        }
    }

</style>
