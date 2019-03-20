<template>
    <div class="wrapper">
        <div class="form2-title bdbtm mt10 center">{{name}}</div>
            <ul class="folding-list" v-if="visitLogList.length>0">
                <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                <li class="fold-list-item" v-for="(item,index) in visitLogList" :key="index">
                    <div class="fold" @click="panelItemFold(index,'visitFoldIndex')">
                        <p class="text-left wmjbox">
                            <em v-if="targetType==0">{{formatDate(item.startDate,'yyyy-MM-dd hh:mm')}} 至 {{formatDate(item.endDate,'yyyy-MM-dd hh:mm')}}</em>
                            <em v-if="targetType==1">{{formatDate(item.startTime,'yyyy-MM-dd hh:mm')}} 至 {{formatDate(item.endTime,'yyyy-MM-dd hh:mm')}}</em>
                        </p>
                        <p class="wmjbox">  
                            <em class="fl">沟通对象：{{targetType==0?item.linkupPerson:item.targetPerson}}</em>
                            <span class="fr">{{addrFoldIndex == index ? '收起':'展开'}}</span>
                        </p>
                    </div>
                    <div class="fold-body" v-show="visitFoldIndex == index">
                        <ul class="table-list visit-record text-16">
                            <li class="tbody"><div class="td text-left">沟通方式</div><div class="td vr-cont text-right">{{targetType==0?item.linkupMethod:item.communicateStyle}}</div></li>
                            <li class="tbody"><div class="td text-left">沟通对象</div><div class="td vr-cont text-right">{{targetType==0?item.linkupPerson:item.targetPerson}}</div></li>
                            <li class="tbody"><div class="td text-left">联系方式</div><div class="td vr-cont text-right">{{targetType==0?item.phone:item.contactType}}</div></li>
                            <li v-if="targetType==0" class="tbody"><div class="td text-left">开发费用</div><div class="td vr-cont text-right">{{item.developFee}}</div></li>
                            <li v-if="targetType==0" class="tbody"><div class="td text-left">租金</div><div class="td vr-cont text-right">{{item.rentFee}}</div></li>
                            <li v-if="targetType==0" class="tbody"><div class="td text-left">店铺</div><div class="td vr-cont text-right">{{item.storeId}}</div></li>
                            <li v-if="targetType==1" class="tbody"><div class="td text-left">沟通目的</div><div class="td vr-cont text-right">{{item.targetType}}</div></li>
                            <li class="tbody"><div class="td text-left">沟通内容</div><div class="td vr-cont text-right">{{targetType==0?item.context:item.content}}</div></li>
                        </ul>
                    </div>
                </li>
                </mt-loadmore>
            </ul>
            <div class="nodata" v-else>
                <div class="iconfont icon-nodata"></div>
                <div class="txt-nodata">暂无数据...</div>
            </div>
            <div class="nodata" v-if="allLoaded">已经到底了</div>
        </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,formatDate} from '@/util/common'
  export default {
    name: 'VisitLogList',
    data() {
      return {
        fitlerForm:{},
        targetType:0,
        visitLogList:[],
        addrFoldIndex:0,
        visitFoldIndex:0,
        name:"",
        listPage:1,
        id:"",
        allLoaded:false,
      }
    },
    created() {
    },
    mounted() {
        const routeQuery = this.$route.query;
        this.targetType=routeQuery .targetType;
        this.id=routeQuery.id;
        this.name=routeQuery.name;
        this.getVisitLogDetail(this.id);
    },
    methods: {
        formatDate,
        //获取拜访记录数据
        getVisitLogDetail(id,page=1,arg={pageNo:1,pageSize:20}){
            let postData = {};
            arg.pageNo=page;
            postData={...arg};
            if(this.targetType==0){
                //目标点拜访记录
                postData.id=id;
                this.getVisitLogList('/objpoint/visit/queryObjPointVisitRecord',postData,page);           
            }else{
                //门店拜访记录
                postData.shopId=id;
                this.getVisitLogList('/shop/visit/queryShopVisitRecord',postData,page);
            };
      },
      //请求拜访记录数据
      getVisitLogList(url,postData,page){
        postTokenData(url,postData, {
            success: (res)=> {
                if (res.success) {
                    let resData = res.data || [];
                    if(page>1){
                        if(resData.length){
                            this.visitLogList = [...this.visitLogList,...resData];
                            this.listPage = page;
                        }else{
                            this.allLoaded = true;
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    }else{
                        if(resData.length){
                            this.visitLogList = resData;
                        }else{
                            this.allLoaded = true;
                        }
                        this.listPage = page;
                    }
                } else {
                Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
            },
            error: (data)=> {
                Toast('Error : ' + JSON.stringify(data))
            }
        });
      },
      //展开折叠事件
      panelItemFold(index,type){
        if(this.addrFoldIndex==index){
            this.addrFoldIndex=-1;
            this[type]=-1;
        }else{
            this.addrFoldIndex=index;
            this[type]=index;
        }
      },
      // 获取更多
        loadMoreData(){
            this.getVisitLogDetail(this.id,this.listPage+1);
        },
    },
    computed: {
    },
    watch:{
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .form2-title{margin-left: 0!important; padding:0 p2r(15px); background: #fff;}
    .center{
        text-align: center;
    }
    .fold {
        em{
            font-weight: bold;
        }
        span{
            color: #4196F7;
        }
    }
    .wmjbox{
        height: 2rem;
        line-height: 2rem;
        font-size: 1rem;
        padding: 0 0.9375rem;
    }
    .fl{
        float: left;
    }
    .fr{
        float:right;
    }
    .text-left{
        text-align: left;
    }
    .text-right{
        text-align: right;
    }
    .text-16{
        font-size: p2r(16px);
    }
</style>
