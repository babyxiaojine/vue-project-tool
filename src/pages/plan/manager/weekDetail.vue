<template>
    <div class="wrapper month-detail scroll-layout">

        <scrollTab :options="tabList" :dataType="1" @changeMenu="selectTabContent" class="roll-head"></scrollTab>

        <weekPlanDetail ref="scrollContainer" :tabType="tabType" :pageParam="detailData" :noResult="noResult">
            <!--流转信息-->
            <HistoryFlow slot="history-flow" v-if="pageParam.processInsId" :processInstenceId="pageParam.processInsId"></HistoryFlow>
        </weekPlanDetail>

    </div>
</template>

<script type="text/ecmascript-6">
    import { Toast,MessageBox } from 'mint-ui'
    import {base,postTokenData} from '@/util/common'
    import {getSession} from '@/util/utils'
    import scrollTab from '@/components/scrollTab'
    import weekPlanDetail from './children/weekPlanDetail'
    import HistoryFlow from '@/pages/task/historyFlow'
    export default {
        name: 'ManagerWeekDetail',
        data() {
            return {
                pageParam:{},//页面传参
                tabList: [{id:1,name:'目标跟进'},{id:3,name:'新店开业'},{id:4,name:'扩店开业'},{id:5,name:'续签门店'},{id:6,name:'闭店门店'},{id:7,name:'拜访品牌'},],
                tabIndex: 0,
                tabType: 1,
                noResult: false,
                detailData: {
                    objTrace: [],//目标点
                    newShopOpen: [],//新店
                    extendShopOpen: [],//扩店
                    reNewShop: [],//续店
                    closeShop: [],//闭店
                    brand: [],//品牌
                }
            }
        },
        components: {
            scrollTab,
            HistoryFlow,
            weekPlanDetail
        },
        created() {
            const routeParams = this.$route.params;
            const sessionParam = getSession('ManagerMonthDetail');
            if (routeParams.id){
                this.pageParam = routeParams;
            } else if (sessionParam.id){
                this.pageParam = sessionParam;
            }
        },
        mounted(){
            this.getPlanDetail(1);
        },
        methods: {
            // 切换tab选择
            selectTabContent(param){
                const thisType = this.getSortType(param.id);
                this.tabType = param.id;//当前页面ID
                this.tabIndex = param.index;//当前页面TAB索引
                this.noResult = false;
                if (!this.detailData[thisType].length){
                    this.getPlanDetail(param.id);//获取TAB数据
                }
                this.$refs.scrollContainer.scrollTop = 0;
            },
            //获取计划详情
            getPlanDetail(planType){
                let postData = {
                    id: this.pageParam.id,
                    planType
                };
                postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/detail',postData, (res)=>{
                    if (res.success) {
                        let resData = res.data || [];
                        if (resData.length){
                            const thisType = this.getSortType(planType);
                            this.detailData[thisType] = [...resData];
                            this.noResult = false;
                        } else {
                            this.noResult = true;
                        }
                    } else {
                        Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                });
            },
            //获取分类名
            getSortType(id){
                let theType = '';
                switch (id){
                    case 1: theType = 'objTrace'; break;
                    case 3: theType = 'newShopOpen'; break;
                    case 4: theType = 'extendShopOpen'; break;
                    case 5: theType = 'reNewShop'; break;
                    case 6: theType = 'closeShop'; break;
                    case 7: theType = 'brand'; break;
                    default: theType = 'objTrace';
                }
                return theType;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .scroll-tab-cont {
        padding-top: p2r(10px);
    .target-list {
    ul {
    li {
        margin-bottom: p2r(10px);
    }
    }

    }
    }

</style>
