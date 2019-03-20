<template>
    <div class="wrapper">
        <div class="plan-years mt10">
            <template v-if="listData.length>0">
                <router-link  class="count-item bdtop" v-for="(vo,index) in listData" :key="index"  tag="ul" :to="{ path: '/plan/yearDetail',query: { level1: vo.level1, year: year } }">
                    <div class="count-top bdbtm" >
                        <div class="title"><em>{{vo.companyName}}</em></div>
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                    <ul class="count-list bdbtm">
                        <li>
                            <span>{{vo.budgetNum}}</span><strong>预算</strong>
                        </li>
                        <li>
                            <span>{{vo.expectNum}}</span><strong>预计</strong>
                        </li>
                        <li>
                            <span>{{vo.actualNum}}</span><strong>实际</strong>
                        </li>
                        <li>
                            <span :class="{red:vo.diff<0, green:vo.diff>0}">{{vo.diff > 0 ? '+'+ vo.diff : vo.diff}}</span><strong>差异</strong>
                        </li>
                    </ul>
                </router-link>
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
    components:{
        SuperSelect
    },
    data() {
      return {
        listType:"0",
        listData:[
        ],
        yearList:getSelectYear(),
        year:new Date().getFullYear()
      }
    },
    created() {
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
                    console.log(232323)
                    this.$refs.superSelect.open(this.yearList,this.year)
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
        getDataInfo(){
            let year = this.year.toString();
            postTokenData('/devPlan/devPlanYear/list',{year},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    if(rjson.length>0){
                        rjson.map((item)=>{
                            item.diff = this.computeDiff(item);
                        })
                    }
                    this.listData = rjson;
                }
            })
        },
        computeDiff(item){
            const diff = item.actualNum - item.expectNum;
            return diff;
        }
    },
    watch:{
        // 切换tab类型
        listType(val){
            this.getDataInfo()
        }
    },
    
    destroy(from,to,next){ 
        dd.biz.navigation.setRight({
            control: false,
            text:''
        });
    },
    computed: {
    }
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
            .iconfont{float: right; font-size:p2r(16px);}
        }
        .count-list {
            background: #ffffff; @include flexbox;
            li{flex:1; font-size:p2r(16px); color:#333; padding:p2r(15px 0); line-height: p2r(24px); text-align: center;
                span{display: block;}
                strong{display: block;}
            }
        }
    }



</style>
