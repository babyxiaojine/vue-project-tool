<template>
    <div class="wrapper collect-select">
        <mt-navbar class="bdbtm" v-model="listType">
            <mt-tab-item id="0">目标点</mt-tab-item>
            <mt-tab-item id="1">门店</mt-tab-item>
        </mt-navbar>
        <div class="collect-list" v-if="listData.length">
            <mt-loadmore :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                <ul class="store-list bdtop">
                    <li class="bdbtm" @click="checkItemOption(item,index)" v-for="(item,index) in listData" :key="index">
                        <em :class="(item.longitude || item.latitude) ? '':'check-disbled'"><i class="iconfont" :class="checkIndex == index ? 'icon-selected':'icon-select'"></i>{{item.shopName}}</em>
                        <span class="shop" v-if="!item.longitude || !item.latitude"><i class="iconfont icon-warning"></i></span>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="nextStepCount" :disabled="!checkItem.id">下一步</button>
            </div>
        </div>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  export default {
    name: 'collectL',
    data() {
      return {
        selectValue:[],
        listPage:1,
        listType:"0",
        listData:[],
        checkIndex: null,
        checkItem: {},
        allLoaded:false,
        noResult: false
      }
    },
    created() {

    },
    mounted() {
      this.getFlowList();
      //设置title
      // dd.ready(() => {
      //   dd.biz.navigation.setTitle({title: this.listType == 0 ? '选择目标点':'选择门店'});
      // });
    },
    methods: {
        // 获取更多
        loadMoreData(){
          this.$refs.loadmore.onBottomLoaded();
          this.getFlowList(this.listPage+1)
        },
        // 跳转详情
        jumpCollectDetail(itemBox,item){
            itemBox.activeItem = item;
            this.$router.push({
                name:'CollectDetail',
                params:itemBox
            })
        },
        // 获取列表
        getFlowList(page=1){

            let type = this.listType;
            postTokenData('/daily/peopleCount/allShopInfo',{type,pageNo:page,pageSize:20},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data.list || [];
                    if(rjson && rjson.length){
                        rjson.map((v)=>{
                            v.shopId = v.id;
                        })
                    } else {
                      if (!this.listData.length) this.noResult = true;//无数据
                    }
                    if(page>1){
                        this.listData = [...this.listData,...rjson];

                    }else{
                        this.listData = [...rjson];
                    }
                    if (rjson.length < 20) this.allLoaded = true;// 数据获取完毕
                    
                    this.listPage = page;
                    
                } else {
                  Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
                }
            })
        },
      //选择门店
      checkItemOption(item,index){
        if(!item.longitude || !item.latitude){
          Toast({message: '位置数据不完整！',duration: 1000});
          return false;
        }
        this.checkItem = item;
        this.checkIndex = index;
      },
      nextStepCount(){
        let {listType,checkItem} = this;
        const val = checkItem;
        val.type = listType;
        this.$store.dispatch('pageCache/setData',{
          flowFormData:{
            ...val
          }
        });

        this.$router.push({
          path:'/peopleFlow/collect',
          name:'Collect'
        });
      }
    },
    computed: {
    },
    watch:{
      // 切换类型
      listType(val){
        this.listData = [];
        this.checkIndex = null;
        this.checkItem = {};
        this.getFlowList();
      }
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .collect-select {
        .mint-navbar {
            padding: p2r(0 15px);
            background-color: #fafafa !important;
            .mint-tab-item {
                padding: p2r(15px 0 11px 0);
                margin-bottom: 4px;
                &.is-selected {
                    font-weight: 600;
                }
            }
        }
    }

    .collect-list {
        padding-top: p2r(55px);
    }
    .store-list {
        .check-disbled .iconfont {
            color: #dddddd !important;
        }
        li {
            width: 100%;
            line-height: 1.3;
            padding: p2r(15px 10px);
            overflow: hidden;
            background: #ffffff;
            box-sizing: border-box;
            em {
                display: inline-block;
                float: left;
                /*width: 45%;*/
                font-weight: 600;
                overflow: hidden;
                i.iconfont {
                    font-weight: normal;
                    margin-right: p2r(3px);
                }
            }
            span {
                display: inline-block;
                float: right;
                .iconfont {color:$red;}
            }

        }
        i.icon-select {font-size: p2r(18px);}
        i.icon-selected {font-size: p2r(18px);}
    }

</style>
