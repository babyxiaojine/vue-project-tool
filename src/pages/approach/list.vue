<template>
    <div class="wrapper approach-list">

        <scrollTab :options="tabList" :dataType="1" :scrollOn="false" @changeMenu="selectTabContent"></scrollTab>

        <template v-if="listData.length">
            <mt-loadmore class="approach-area" :bottom-method="loadMoreData" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul>
                    <li class="approach-item bdtb" v-for="(item, index) in listData" :key="index">
                        <div class="item-main bdbtm">
                            <span>{{item.shopCode}}</span>
                            <span>{{item.shopName}}</span>
                            <span>{{item.shopNatureName}}</span>
                            <span>{{item.shopDecorationName}}</span>
                        </div>
                        <div class="item-opts">
                            <router-link v-if="item.applyFlag == '0'" :to="{name: 'ApproachApply', params: { shopId: item.shopId }}">
                                <button class="btn" type="button">申请</button>
                            </router-link>
                            <router-link v-else :to="{name: 'ApproachDetail', params: { shopId: item.shopId }}">
                                <button class="btn" type="button">查看</button>
                            </router-link>
                        </div>

                    </li>
                </ul>
            </mt-loadmore>
        </template>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import scrollTab from '@/components/scrollTab'
  export default {
    name: 'ApproachList',
    data() {
      return {
        listType:"0",
        listData:[],
        listPage: 1,
        listStatus: null,
        noResult: false,
        allLoaded: false,
        tabList: [{id:null,name:'待申请'},{id:0,name:'待审待'},{id:1,name:'审核中'},{id:2,name:'已审核'}],

      }
    },
    components: {
      scrollTab
    },
    created() {

    },
    mounted(){
      this.getApproachData();
    },
    methods: {
      selectTabContent(param){
        this.listStatus = param.id;
        this.listPage = 1;
        this.allLoaded = false;
        this.listData = [];
        if (this.listStatus != null){
          this.getApproachData(1,1,param.id);
        } else {
          this.getApproachData(1,0);
        }
      },
      // 获取更多
      loadMoreData(){
        let {listPage,listStatus} = this;
        this.$refs.loadmore.onBottomLoaded();
        if (this.listStatus != null){
          this.getApproachData(listPage + 1,1,listStatus);
        } else {
          this.getApproachData(listPage + 1,0);
        }
      },
      //获取列表数据
      getApproachData(listPage = 1,type = 0,status = 0){
        let postUrl = '/approach/apply/applyList';
        let postData = {
          pageNo: listPage,
          pageSize: 20,
          status: !!type ? status:''
        };
        if (!!type) postUrl = '/approach/apply/list';
        postTokenData(base.basePath + postUrl,postData, {
          success: (res)=> {
            if (res.success) {

              let resData = res.data || [];
              this.listData.push(...resData);
              this.listPage = listPage;
              //无结果页
              if (listPage = 1 && resData.length < 1) {
                this.noResult = true;
              } else {
                this.noResult = false;

              }
              if (resData.length < postData.pageSize) this.allLoaded = true;// 数据获取完毕
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('Error : ' + JSON.stringify(data))
          }
        });
      },
    },
    computed: {
    },
    destroyed(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .approach-area {
        padding-top: p2r(5px);
    }
    .approach-item {
        .item-main{
            span:nth-child(2){
                width: p2r(120px);
                line-height: 1.2;
                font-weight: 600;
                overflow: hidden;
            }
        }
    }

</style>
