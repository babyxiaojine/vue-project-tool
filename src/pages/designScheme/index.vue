<template>
    <div class="wrapper">
        <mt-navbar v-model="listType">
            <mt-tab-item id="0">待审核</mt-tab-item>
            <mt-tab-item id="1">审核中</mt-tab-item>
            <mt-tab-item id="2">已审核</mt-tab-item>
        </mt-navbar>
        <div class="plan-month mint-navContent">
            <ul class="jumper-list" v-if="listData.length>0">
                <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                <li class="bdbtm mt10"  v-for="(vo, index) in listData" :key="index">
                    <div @click="jumpDetail(vo)" class="item bdbtm">
                        <div class="td2">{{vo.designTitle}}</div>
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                    <div class="item-main">
                        <div class="im-num">{{vo.code}}</div>
                        <div class="im-name">{{vo.name}}</div>
                    </div>
                </li>
                </mt-loadmore>
            </ul>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <div class="nodata" v-if="allLoaded && listPage>1">已经到底了</div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import {taskConfig} from '@/util/config'
  export default {
    name: 'DesignScheme',
    components:{
    },
    data() {
      return {
        listType: "0",
        listPage: 1,
        listData: [],
        allLoaded: false,
        typeArr: ['待审核','审核中','已审核'],
      }
    },
    created() {
    },

    activated(){
        this.getListData();
    },
    mounted() {
    },
    methods: {
        // 获取更多
        loadMoreData(){
            this.getListData(this.listPage+1,)
        },
        // 获取列表
        getListData(page=1,arg={}){
            return new Promise((reslove,reject)=>{
                let listType = this.listType ;
                postTokenData('/expandshop/designScheme/list',{status:listType,pageNo:page,pageSize:20,...arg},(res)=>{
                    if(res.code==='0000'){
                        let rjson = res.data || [];
                        if(page>1){
                            if(rjson.length){
                                this.listData = [...this.listData,...rjson];
                                this.listPage = page;
                            }else{
                                this.listPage = page;
                                this.allLoaded = true;
                            }
                            this.$refs.loadmore.onBottomLoaded();
                        }else{
                            this.listData = rjson;
                            if(rjson.length){
                                this.allLoaded = false;
                            }else{
                                this.allLoaded = true;
                            }
                            this.listPage = page;
                        }
                        reslove()
                    }
                })
            })
        },

        jumpDetail(item,readonly=true){
            this.getItemDetail(item).then((res)=>{
                const objData = {
                    processInstenceId: res.procInsId  || '',
                    taskDefinitionKey: res.taskName
                }
                let link = taskConfig[item.procDef || 'flagshipStoreDesign'];
                this.$router.push({
                    name: link,
                    query: {...objData,readonly},
                    params:res
                })
            })
        },
        // 获取列表
        getItemDetail(item){
            return new Promise((resolve,rej)=>{
                postTokenData('/expandshop/designScheme/detail',{
                    designSchemeId: item.designSchemeId, 
                    verifyId: item.verifyId
                },(res)=>{
                    if(res.code==='0000'){
                        resolve(res.data);
                    }else{
                        Toast({
                          message: res.message,
                          iconClass: 'mintui mintui-field-error'
                        });
                    }
                })
            })
        },
    },
    computed: {
    },
    destroyed(){ 
        dd.biz.navigation.setRight({
            control: false,
            text:''
        });
    },
    watch:{
        // 切换tab类型
        listType(val){
            this.getListData()
        }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .jumper-list{background: none;
        .td1{width:p2r(60px);}
        .td2{flex:1;}
        li{background: #fff;}
    }
    .item-main{@include flexbox; padding: p2r(15px 15px); font-size:p2r(15px); color:#666;
        .im-num{width:p2r(70px);}
        .im-name{flex:1;}
    }

</style>
