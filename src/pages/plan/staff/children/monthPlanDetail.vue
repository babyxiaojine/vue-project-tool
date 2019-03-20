<template>
    <div class="scroll-tab-cont roll-main">
        <div class="target-list" v-if="tabType == 1">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.objTrace" :key="index">
                    <div class="tl-dir bdtop">
                        <div class="td-title">
                            <em>{{item.shopName}}<i v-if="!item.editFlag" class="within-plan"></i></em>
                            <span>编号：{{item.code}}</span>
                        </div>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">目标点状态</div><div class="cell-value">{{item.objStatusName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">本月目标状态</div><div class="cell-value">{{item.currentMonthObjStatusName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计定店时间</div><div class="cell-value">{{formatDate(item.predictDecidedTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">是否本月定店</div><div class="cell-value">{{item.shopDecidedFlag && (item.shopDecidedFlag == '0'?'否':'是')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">定店类型</div><div class="cell-value">{{item.shopDecidedType && (item.shopDecidedType == '1'?'新店':'扩店')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计开店时间</div><div class="cell-value">{{formatDate(item.predictOpenTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">是否本月开业</div><div class="cell-value">{{item.shopOpenFlag && (item.shopOpenFlag == '0'?'否':'是')}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="target-list" v-if="tabType == 3">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.newShopOpen" :key="index">
                    <div class="tl-dir bdtop">
                        <div class="td-title">
                            <em>{{item.shopName}}<i v-if="!item.editFlag" class="within-plan"></i></em>
                            <span>编号：{{item.code}}</span>
                        </div>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                        <div class="row-list-item"><div class="cell-title">工程进度</div><div class="cell-value">{{item.projectProgressName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计开业时间</div><div class="cell-value">{{formatDate(item.predictOpenTime,'yyyy-MM-dd')}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="target-list" v-if="tabType == 4">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.extendShopOpen" :key="index">
                    <div class="tl-dir bdtop">
                        <div class="td-title">
                            <em>{{item.shopName}}<i v-if="!item.editFlag" class="within-plan"></i></em>
                            <span>编号：{{item.code}}</span>
                        </div>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                        <div class="row-list-item"><div class="cell-title">工程进度</div><div class="cell-value">{{item.projectProgressName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计开业时间</div><div class="cell-value">{{formatDate(item.predictOpenTime,'yyyy-MM-dd')}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="target-list" v-if="tabType == 5">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.reNewShop" :key="index">
                    <div class="tl-dir bdtop">
                        <div class="td-title">
                            <em>{{item.shopName}}<i v-if="!item.editFlag" class="within-plan"></i></em>
                            <span>编号：{{item.code}}</span>
                        </div>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计续签时间</div><div class="cell-value">{{formatDate(item.predictRenewTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">合同到期时间</div><div class="cell-value">{{formatDate(item.contractExpirationTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">原月租</div><div class="cell-value">{{item.oldRent}}</div></div>
                        <div class="row-list-item"><div class="cell-title">续签后租金</div><div class="cell-value">{{item.rent}}</div></div>
                        <div class="row-list-item"><div class="cell-title">涨幅</div><div class="cell-value">{{item.growthRate+'%'}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="target-list" v-if="tabType == 6">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.closeShop" :key="index">
                    <div class="tl-dir bdtop">
                        <div class="td-title">
                            <em>{{item.shopName}}<i v-if="!item.editFlag" class="within-plan"></i></em>
                            <span>编号：{{item.code}}</span>
                        </div>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                        <div class="row-list-item"><div class="cell-title">门店性质</div><div class="cell-value">{{item.shopNature == '1'?'自营店':'加盟店'}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计闭店时间</div><div class="cell-value">{{formatDate(item.predictCloseTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">合同到期时间</div><div class="cell-value">{{formatDate(item.contractExpirationTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预算内外</div><div class="cell-value">{{item.budgetFlag == '1'?'预算内':'预算外'}}</div></div>
                        <div class="row-list-item"><div class="cell-title">闭店原因</div><div class="cell-value">{{item.closeReasonName}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="target-list" v-if="tabType == 7">
            <ul class="clearfix">
                <li v-for="(item,index) in pageParam.brand" :key="index">
                    <div class="tl-dir bdtop">
                        <span>{{item.brandName}}</span>
                        <span>{{item.devName}}</span>
                        <!--<span v-if="!item.editFlag">计划内</span>-->
                    </div>
                    <div class="tl-cont row-list bdtb">
                        <div class="row-list-item"><div class="cell-title">项目名称</div><div class="cell-value">{{item.projectName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">对接人名称</div><div class="cell-value">{{item.dockerName}}</div></div>
                        <div class="row-list-item"><div class="cell-title">对接人电话</div><div class="cell-value">{{item.dockerPhone}}</div></div>
                        <div class="row-list-item"><div class="cell-title">预计拜访时间</div><div class="cell-value">{{formatDate(item.predictVisitTime,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title">当前状态</div><div class="cell-value">{{item.brandStatusName}}</div></div>
                        <div class="row-list-item row-column"><div class="cell-title appr-lab">拜访事项</div><div class="cell-value">{{item.visitMatters}}</div></div>
                        <div class="row-list-item"><div class="cell-title">责任人</div><div class="cell-value">{{item.responsible}}</div></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
        <!--流转信息-->
        <slot name="history-flow"></slot>

    </div>

</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,targetStatus,formatDate} from '@/util/common'
  import HistoryFlow from '@/pages/task/historyFlow'
  export default {
    name: 'monthPlanDetail',
    data () {
      return {
      }
    },
    components:{
      HistoryFlow
    },
    props: {
      tabType:{
        default: 0,
        type: Number
      },
      noResult:{
        default: false,
        type: Boolean
      },
      pageParam:{
        type: Object,
        default: ()=> {
          return {};
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      targetStatus,
      formatDate,
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