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
                        <div class="td2">{{vo.requirementTitle}}</div>
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                    <div class="item-main">
                        <div class="im-num">{{vo.code}}</div>
                        <div class="im-name">{{vo.name}}</div>
                    </div>
                    <div class="jumper-handles bdtop" v-if="listType == 0 && vo.modifyTag == 1"><div tag="button" @click="jumpDetail(vo,false)" class="btn">修改</div></div>
                </li>
                </mt-loadmore>

            </ul>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <div class="nodata" v-if="allLoaded && listPage>1">已经到底了</div>
        </div>
        <div class="foot-submit" v-if="pageAuth.new || pageAuth.heavy || pageAuth.light">
            <div class="fix-area">
                <router-link class="btn" to="/requireMent/apply">申请</router-link>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
    import store from '@/store/index'
  import {base,postTokenData} from '@/util/common'
  import {taskConfig} from '@/util/config'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'RequireMent',
    components:{
        selectPicker
    },
    data() {
      return {
        listType: "0",
        listPage: 1,
        listData: [],
        allLoaded: false,
        typeArr: ['待审核','审核中','已审核'],
        pageAuth:{
            new:false, //新店
            heavy:false, //老店重改
            light:false, //老店轻改
        },
      }
    },
    created() {
        this.setAuthUser();
    },

    activated(){
        this.getListData();
    },
    methods: {
        setAuthUser(){
            let { AuthorityInfo = [] } = (store.getters['userInfo/getAuthInfo'] || {});
            let pageAuth = this.pageAuth;
            if(AuthorityInfo.indexOf('requirementApply:new')>-1){
                pageAuth.new = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:heavy')>-1){
                pageAuth.heavy = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:light')>-1){
                pageAuth.light = true;
            }
            this.pageAuth = pageAuth;
        },
        // 获取更多
        loadMoreData(){
            this.getListData(this.listPage+1,)
        },
        // 获取列表
        getListData(page=1,arg={}){

            let listType = this.listType;
            postTokenData('/requireMent/design/list',{status:listType,pageNo:page,pageSize:20,...arg},(res)=>{
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
                    
                }
            })
        },
        // 跳转详情或修改页面
        jumpDetail(item,readonly=2){
            this.getItemDetail(item,!readonly).then((res)=>{
                const objData = {
                    processInstenceId: res.procInsId  || '',
                    taskDefinitionKey: res.taskName || ''
                }
                let link = taskConfig['ProRequirementsDesignNew'];
                this.$router.push({
                    name: 'TaskDetail2RequireMent',
                    query: {...objData,readonly},
                    params:res
                })
            })
        },
        // 获取列表
        getItemDetail(item,isEdit=false){
            return new Promise((resolve,rej)=>{
                let url = isEdit ? '/requireMent/design/initUpdateDate' : '/requireMent/design/detail'
                postTokenData(url,{
                    requireMentId: item.requireMentId, 
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
