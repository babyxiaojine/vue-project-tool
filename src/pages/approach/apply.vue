<template>
    <div class="wrapper scroll-layout">

        <scrollTab :options="tabList" :refresh="initTab" @changeMenu="selectTabContent" class="roll-head"></scrollTab>

        <form ref="postForm" class="post-form">
        <ApproachDetailItem ref="getWeekItem" :readonly="readonly" :tabIndex="tabIndex" :apprDetail="apprDetail" @itemData="getItemData"></ApproachDetailItem>
        </form>

        <div class="foot-submit" v-if="!readonly">
            <div class="fix-area">
                <button class="gray-btn bdtop" type="button"  @click="submitApplyData('no')">保存</button>
                <button class="sub-btn" type="submit" @click="submitApplyData('yes')">提交审核</button>
            </div>
        </div>

    </div>
</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData} from '@/util/common'
  import {getSession,formatForm,validForm} from '@/util/utils'
  import scrollTab from '@/components/scrollTab'
  import ApproachDetailItem from './DetailItem'
  export default {
    name: 'ApproachApply',
    data() {
      return {
        shopId: '',
        readonly: false,
        initTab: false,
        tabList: ['门店信息','联系人'],
        tabIndex: 0,
        apprDetail: {},
        templateHtml: [],
        tempData: ''//模板数据
      }
    },
    components: {
      scrollTab,
      ApproachDetailItem
    },
    created() {
        const routeParams = this.$route.params;
        const sessionParam = getSession('ApproachApply');
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
      //获取详情数据
      getApproachDetail(shopId){
        const {readonly} = this;
        return new Promise((resolve, reject)=>{
          postTokenData(base.basePath + '/approach/apply/applyData',{shopId:shopId}, {
            success: (res)=> {
              if (res.success) {
                let {tabList} = this;
                // let getItem = this.$refs.getWeekItem;
                let resData = res.data || [];
                this.apprDetail = {...resData};
                // getItem.selectList.devId = [...resData.devUserList];
                // getItem.selectList.engineUserId = [...resData.engUserList];
                // getItem.selectList.pmUserId = [...resData.pmUserList];
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
      //获取子组件数据
      getItemData(detail,tempData){
        this.apprDetail = {
          ...this.apprDetail,
          ...detail
        };
        this.tempData = tempData;
        // this.tempData = ''
      },
      // 提交
      submitApplyData(type){
        this.$refs.getWeekItem.getSaveData();
        const {shopId,apprDetail,tempData} = this;
        const validResult = validForm(this.$refs.postForm);
        if(!validResult.status){
          Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
          return false;
        }
        if (apprDetail.devUserList) delete apprDetail.devUserList;
        if (apprDetail.engUserList) delete apprDetail.engUserList;
        if (apprDetail.pmUserList) delete apprDetail.pmUserList;
        if (apprDetail.templateHtml) delete apprDetail.templateHtml;
        this.apprDetail.shopId = shopId;//添加店铺ID
        let postParam = apprDetail || {};
        let postUrl = '/approach/apply/save?';
        if (type == 'yes') postUrl = '/approach/apply/saveAndCommit?';
        // console.log(JSON.stringify(postParam),postParam,'保存');
        postTokenData(postUrl + tempData,postParam,(res)=>{
          if(res.success){
            Toast({message: res.message, iconClass: 'mintui mintui-field-success'});
            setTimeout(()=>{
              this.$router.back(-1)
            },1500)
          }else{
            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
          }
        })
      }
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

    .row-list-item {
        .appr-lab {
            width: p2r(160px);
        }
    }

    .process-base {
        .row-list {
            margin-bottom: p2r(5px);
            &:last-child {
                margin: 0;
            };
        }
    }

</style>
