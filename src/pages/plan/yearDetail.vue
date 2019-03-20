<template>
    <div class="wrapper">
        <mt-navbar v-model="planType" class="is-scrollx">
            <mt-tab-item id="1">新店定店</mt-tab-item>
            <mt-tab-item id="3">新店开业</mt-tab-item>
            <mt-tab-item id="4">扩店开业</mt-tab-item>
            <mt-tab-item id="5">门店续签</mt-tab-item>
            <mt-tab-item id="6">门店闭店</mt-tab-item>
        </mt-navbar>
        <div class="plan-years mint-navContent">
            <template v-if="listData.length>0">
                <div class="count-item bdtop" v-for="(vo,index) in listData" :key="index" :class="{fold_down:flowItemVisibleId == index}">
                    <div class="count-top bdbtm" @click="listToggleFold(index)">
                        <div class="title"><em>{{vo.branchName}}（{{vo.devDepartment}}）</em></div>
                        <div class="fold">{{flowItemVisibleId == index ? '收起' :'展开'}}</div>
                    </div>
                    <div class="count-info bdbtm">
                        <ul class="count-list">
                            <li>月</li><li>预算</li><li>预计</li><li>实际</li><li>差异</li>
                        </ul>
                        <ul class="count-list">
                            <li>汇总</li>
                            <li>{{vo.totalNums.budgetNum}}</li>
                            <li>{{vo.totalNums.expectNum}}</li>
                            <li>{{vo.totalNums.actualNum}}</li>
                            <li :class="{red:vo.totalNums.diff<0, green:vo.totalNums.diff>0}">{{vo.totalNums.diff > 0 ? '+'+ vo.totalNums.diff : vo.totalNums.diff}}</li>
                        </ul>
                        <ul class="count-list" v-for="(ritem,rid) in vo.rtnYearPlanBranchDetails">
                            <li>{{ritem.month}}</li>
                            <li>{{ritem.budgetNum}}</li>
                            <li>{{ritem.expectNum}}</li>
                            <li>{{ritem.actualNum}}</li>
                            <li :class="{red:ritem.diff<0, green:ritem.diff>0}">{{ritem.diff > 0 ? '+'+ ritem.diff : ritem.diff}}</li>
                        </ul>
                    </div>
                </div>
            
            </template>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
        </div>
        <SuperSelect ref="superSelect" @confirm="changeSelect"></SuperSelect>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,getSelectYear} from '@/util/common'
  import SuperSelect from '@/components/superSelect'
  export default {
    name: 'planYear',
    data() {
      return {
        level1:null,
        listData:[
        ],
        flowItemVisibleId:-1,
        planType:'1',
        yearList:getSelectYear(),
        year:new Date().getFullYear()
      }
    },
    components:{
        SuperSelect
    },
    created() {
        const {level1,year} = this.$route.query;
        this.level1 = level1
        if(year) this.year = year;
        this.getDataInfo()
        
    },
    mounted() {
        this.tabBtnHandler()
    },
    methods: {
     
         // ddTab按钮
         tabBtnHandler(){
             dd.ready(()=> {
                 dd.biz.navigation.setRight({
                   control: true,
                   text: '筛选',
                   onSuccess : (result) => {

                     this.$refs.superSelect.open(this.yearList,this.year);
                   },
                   onFail : (err) => {}
                 });
             });
         },
         // 切换年份
         changeSelect(val){
             this.year = val;
             this.getDataInfo()
         },
        // 获取列表
        getDataInfo(page=1,arg={}){
            let year = this.year.toString()
            let {level1,planType} = this;
            postTokenData('/devPlan/devPlanYear/listForBranc',{year,planType,level1},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    if(rjson.length>0){
                        rjson.map((item)=>{
                            const totalNums = {budgetNum:0, expectNum:0, actualNum:0, diff:0}
                            if(item.rtnYearPlanBranchDetails && item.rtnYearPlanBranchDetails.length>0){
                                item.rtnYearPlanBranchDetails.map(ent=>{
                                    ent.diff = this.computeDiff(ent);
                                    totalNums.budgetNum += ent.budgetNum
                                    totalNums.expectNum += ent.expectNum
                                    totalNums.actualNum += ent.actualNum
                                    totalNums.diff += ent.diff
                                })
                            }
                            item.totalNums = totalNums;
                        })
                    }
                    this.flowItemVisibleId = -1;
                    this.listData = rjson;
                }
            })
        },
         // 点击切换展开收起
         listToggleFold(index){
             if(this.flowItemVisibleId == index){
                 this.flowItemVisibleId=-1;
             }else{
                 this.flowItemVisibleId=index;
             }
             
         },
         computeDiff(item){
             return item.actualNum - item.expectNum;
         }
    },
    computed: {
    },
    destroy(from,to,next){ 
        dd.biz.navigation.setRight({
            control: false,
            text:''
        });
    },
    watch:{
        // 切换tab类型
        planType(val){
            this.getDataInfo()
        }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .count-item {background: #ffffff;
        margin-bottom: p2r(5px);
        .count-top { height: p2r(55px); line-height: p2r(55px);
            padding-right: p2r(10px);
            margin-left: p2r(10px);
            overflow: hidden;
            .title {float: left; font-size:p2r(16px); font-weight: bold;}
            .fold {
                font-size:p2r(16px);
                float: right;
                color:$blue;
            }
            .iconfont{float: right; font-size:p2r(16px);}
        }
        .count-info{padding:p2r(10px 0);}
        .count-list {
            background: #ffffff; @include flexbox;
            li{flex:1; font-size:p2r(16px); color:#333; padding:p2r(5px 0); line-height: p2r(24px); text-align: center;
                span{display: block;}
                strong{display: block;}
            }
            

        }
        
        &:not(.fold_down){
            .count-list:nth-child(n+3){display: none;}
        }
    }



</style>
