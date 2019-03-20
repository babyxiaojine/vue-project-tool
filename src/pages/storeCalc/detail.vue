<template>
    <div class="wrapper">

        <div class="calc-detail mtb10">
            <div class="folding-list">
                <div class="fold-list-item">
                    <div class="fold-title" @click="panelItemFold(0,'manageFoldIndex')"><em>重要信息</em><span>{{manageFoldIndex == 0 ? '收起':'展开'}}</span></div>
                    <div class="fold-body" v-show="manageFoldIndex == 0">
                        <ul class="table-list">
                            <li class="thead">
                                <div class="th">项目</div>
                                <div class="th">直营店</div>
                                <div class="th">加盟店<br />(公司)</div>
                                <div class="th">加盟店<br />(加盟商)</div>
                            </li>
                            <li class="tbody"><div class="td col-name">终端销售收入</div><div class="td">{{itemTrans('importantInfo','saleInputA')}}</div><div class="td">{{itemTrans('importantInfo','saleInputB')}}</div><div class="td">{{itemTrans('importantInfo','saleInputC')}}</div></li>
                            <li class="tbody"><div class="td col-name">不含税收入</div><div class="td">{{itemTrans('importantInfo','inputAWithoutTax')}}</div><div class="td">{{itemTrans('importantInfo','inputBWithoutTax')}}</div><div class="td">{{itemTrans('importantInfo','inputCWithoutTax')}}</div></li>
                            <li class="tbody"><div class="td col-name">净利润</div><div class="td">{{itemTrans('importantInfo','retainedProfitA')}}</div><div class="td">{{itemTrans('importantInfo','retainedProfitB')}}</div><div class="td">{{itemTrans('importantInfo','retainedProfitC')}}</div></li>
                            <li class="tbody"><div class="td col-name">净利润率</div><div class="td">{{itemTrans('importantInfo','retainedProfitRateA')+'%'}}</div><div class="td">{{itemTrans('importantInfo','retainedProfitRateB')+'%'}}</div><div class="td">{{itemTrans('importantInfo','retainedProfitRateC')+'%'}}</div></li>
                            <li class="tbody"><div class="td col-name">终端销售利润率</div><div class="td">{{itemTrans('importantInfo','saleProfitRateA')+'%'}}</div><div class="td">{{itemTrans('importantInfo','saleProfitRateB')+'%'}}</div><div class="td">{{itemTrans('importantInfo','saleProfitRateC')+'%'}}</div></li>
                            <li class="tbody"><div class="td col-name">三年利润</div><div class="td">{{itemTrans('importantInfo','recoupFeeA')}}</div><div class="td">{{itemTrans('importantInfo','recoupFeeB')}}</div><div class="td">{{itemTrans('importantInfo','recoupFeeC')}}</div></li>
                            <li class="tbody"><div class="td col-name">加盟投资回收期</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('importantInfo','recoupMonth')}}</div></li>
                            <li class="tbody"><div class="td col-name">加盟投资回报率</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('importantInfo','backRate')+'%'}}</div></li>
                        </ul>
                    </div>
                </div>
                <div class="fold-list-item">
                    <div class="fold-title" @click="panelItemFold(1,'manageFoldIndex')"><em>测算数据</em><span>{{manageFoldIndex == 1 ? '收起':'展开'}}</span></div>
                    <div class="fold-body" v-show="manageFoldIndex == 1">
                        <ul class="table-list">
                            <li class="thead">
                                <div class="th">项目</div>
                                <div class="th">目标点</div>
                                <div class="th">参考门店</div>
                            </li>
                            <li class="tbody"><div class="td col-name">名字</div><div class="td">{{itemTrans('basisInfo','objName')}}</div><div class="td">{{itemTrans('basisInfo','shopName')}}</div></li>
                            <li class="tbody"><div class="td col-name">门店类型</div><div class="td">{{itemTrans('basisInfo','objTypeName')}}</div><div class="td">{{itemTrans('basisInfo','shopTypeName')}}</div></li>
                            <li class="tbody"><div class="td col-name">客流数量</div><div class="td">{{itemTrans('basisInfo','objPassengerFlowNum')}}</div><div class="td">{{itemTrans('basisInfo','shopPassengerFlowNum')}}</div></li>
                            <li class="tbody"><div class="td col-name">进店率</div><div class="td">{{itemTrans('basisInfo','objEnterRate')+'%'}}</div><div class="td">{{itemTrans('basisInfo','shopEnterRate')+'%'}}</div></li>
                            <li class="tbody"><div class="td col-name">客单价</div><div class="td">{{itemTrans('basisInfo','objOrderFee')}}</div><div class="td">{{itemTrans('basisInfo','shopOrderFee')}}</div></li>
                            <li class="tbody"><div class="td col-name">客单数</div><div class="td">{{itemTrans('basisInfo','objOrderNum')}}</div><div class="td">{{itemTrans('basisInfo','shopOrderNum')}}</div></li>
                            <li class="tbody"><div class="td col-name">日均销售额</div><div class="td">{{itemTrans('basisInfo','objDailyAveSaleNum')}}</div><div class="td">{{itemTrans('basisInfo','shopDailyAveSaleNum')}}</div></li>
                            <li class="tbody"><div class="td col-name">面积</div><div class="td">{{itemTrans('basisInfo','objArea')}}</div><div class="td">{{itemTrans('basisInfo','shopArea')}}</div></li>
                            <li class="tbody"><div class="td col-name">面积区间</div><div class="td">{{itemTrans('basisInfo','objAreaRegion')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">年租金(3年平均值)</div><div class="td">{{itemTrans('basisInfo','objYearRent')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">月租金</div><div class="td">{{itemTrans('basisInfo','objMonthRent')}}</div><div class="td">{{itemTrans('basisInfo','shopMonthRent')}}</div></li>
                            <li class="tbody"><div class="td col-name">支付方式</div><div class="td">{{itemTrans('basisInfo','objPayMethod')}}</div><div class="td">{{itemTrans('basisInfo','shopPayMethod')}}</div></li>
                            <li class="tbody"><div class="td col-name">首笔租金</div><div class="td">{{itemTrans('basisInfo','objFirstRent')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">首笔投入</div><div class="td">{{itemTrans('basisInfo','objFirstInput')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">租售比</div><div class="td">{{itemTrans('basisInfo','objRentSaleRate')}}</div><div class="td">-</div></li>
                        </ul>
                    </div>
                </div>
                <div class="fold-list-item">
                    <div class="fold-title" @click="panelItemFold(2,'manageFoldIndex')"><em>其他明细</em><span>{{manageFoldIndex == 2 ? '收起':'展开'}}</span></div>
                    <div class="fold-body" v-show="manageFoldIndex == 2">
                        <ul class="table-list">
                            <li class="thead">
                                <div class="th">项目</div>
                                <div class="th">直营店</div>
                                <div class="th">加盟店<br />(公司)</div>
                                <div class="th">加盟店<br />(加盟商)</div>
                            </li>
                            <li class="tbody"><div class="td col-name">成本（不含税/含税）</div><div class="td">{{itemTrans('otherInfo','costA')}}</div><div class="td">{{itemTrans('otherInfo','costB')}}</div><div class="td">{{itemTrans('otherInfo','costC')}}</div></li>
                            <li class="tbody"><div class="td col-name">毛利</div><div class="td">{{itemTrans('otherInfo','grossProfitA')}}</div><div class="td">{{itemTrans('otherInfo','grossProfitB')}}</div><div class="td">{{itemTrans('otherInfo','grossProfitC')}}</div></li>
                            <li class="tbody"><div class="td col-name">附加税</div><div class="td">{{itemTrans('otherInfo','addTaxA')}}</div><div class="td">{{itemTrans('otherInfo','addTaxB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务利润</div><div class="td">{{itemTrans('otherInfo','otherProfitA')}}</div><div class="td">{{itemTrans('otherInfo','otherProfitB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务收入<br />(辅料)</div><div class="td">{{itemTrans('otherInfo','otherInputAccessoryA')}}</div><div class="td">-</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务收入<br />(管理费)</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','otherInputManageB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务收入<br />(加盟费)</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','otherInputJoininB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务成本<br />(辅料)</div><div class="td">{{itemTrans('otherInfo','otherCostAccessoryA')}}</div><div class="td">{{itemTrans('otherInfo','otherCostAccessoryB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">其他业务成本<br />(税金支出)</div><div class="td">-</div><div class="td">-</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">主营业务利润</div><div class="td">{{itemTrans('otherInfo','mainProfitA')}}</div><div class="td">{{itemTrans('otherInfo','mainProfitB')}}</div><div class="td">{{itemTrans('otherInfo','mainProfitC')}}</div></li>
                            <li class="tbody"><div class="td col-name">主营业务利润率</div><div class="td">{{itemTrans('otherInfo','mainProfitRateA')+'%'}}</div><div class="td">{{itemTrans('otherInfo','mainProfitRateB')+'%'}}</div><div class="td">{{itemTrans('otherInfo','mainProfitRateC')+'%'}}</div></li>
                            <li class="tbody"><div class="td col-name">费用合计</div><div class="td">{{itemTrans('otherInfo','feeSumA')}}</div><div class="td">{{itemTrans('otherInfo','feeSumB')}}</div><div class="td">{{itemTrans('otherInfo','feeSumC')}}</div></li>
                            <li class="tbody"><div class="td col-name">费用率</div><div class="td">{{itemTrans('otherInfo','feeRateA')+'%'}}</div><div class="td">{{itemTrans('otherInfo','feeRateB')+'%'}}</div><div class="td">{{itemTrans('otherInfo','feeRateC')+'%'}}</div></li>
                            <li class="tbody"><div class="td col-name">加盟费</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','joininFeeC')}}</div></li>
                            <li class="tbody"><div class="td col-name">人工</div><div class="td">{{itemTrans('otherInfo','labourA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','labourC')}}</div></li>
                            <li class="tbody"><div class="td col-name">租赁<br />(年)</div><div class="td">{{itemTrans('otherInfo','rentA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','rentC')}}</div></li>
                            <li class="tbody"><div class="td col-name">装修</div><div class="td">{{itemTrans('otherInfo','fitmentA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','fitmentC')}}</div></li>
                            <li class="tbody"><div class="td col-name">配送<br />(不含税收入*费率)</div><div class="td">{{itemTrans('otherInfo','distributionA')}}</div><div class="td">{{itemTrans('otherInfo','distributionB')}}</div><div class="td">-</div></li>
                            <li class="tbody"><div class="td col-name">水电</div><div class="td">{{itemTrans('otherInfo','utilitiesA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','utilitiesC')}}</div></li>
                            <li class="tbody"><div class="td col-name">税金</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','taxC')}}</div></li>
                            <li class="tbody"><div class="td col-name">物料</div><div class="td">{{itemTrans('otherInfo','accessoryA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','accessoryC')}}</div></li>
                            <li class="tbody"><div class="td col-name">促销</div><div class="td">{{itemTrans('otherInfo','salesPromotionA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','salesPromotionC')}}</div></li>
                            <li class="tbody"><div class="td col-name">平台佣金</div><div class="td">{{itemTrans('otherInfo','platformCommissionA')}}</div><div class="td">-</div><div class="td">{{itemTrans('otherInfo','platformCommissionC')}}</div></li>
                            <li class="tbody"><div class="td col-name">其他管理费</div><div class="td">{{itemTrans('otherInfo','manageFeeA')}}</div><div class="td">{{itemTrans('otherInfo','manageFeeB')}}</div><div class="td">{{itemTrans('otherInfo','manageFeeC')}}</div></li>
                            <li class="tbody"><div class="td col-name">所得税</div><div class="td">{{itemTrans('otherInfo','incomeTaxA')}}</div><div class="td">{{itemTrans('otherInfo','incomeTaxB')}}</div><div class="td">-</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {formatDate} from '@/util/common'
  export default {
    name: 'calcDetail',
    data() {
      return {
        detailData: {},
        manageFoldIndex: 0
      }
    },
    components: {
    },
    created() {
      const routeParam = this.$route.params;
      if (routeParam.detailData) this.detailData = {...routeParam.detailData};
    },
    mounted() {
    },
    methods: {
      //展开折叠事件
      panelItemFold(index,type){
        if(this[type] === index){
          this[type] = -1;
        }else{
          this[type] = index;
        }
      },
      //数据处理
      itemTrans(itemData,field){
        let itemValue = '';
        let detailData = this.detailData;
        if (itemData.indexOf('.') < 0) {
          let valueData = detailData[itemData] || {};
          itemValue = valueData[field] ? valueData[field]:'-';
        } else {
          let itemArr = itemData.split('.'),
              arrOne = itemArr[0],
              arrTwo = itemArr[1];
          let topData = detailData[arrOne] || {};
          let subData = topData[arrTwo] || {};
          itemValue = subData[field] ? subData[field]:'-';
        }
        return itemValue;
      },
      formatDate

    },
    computed: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
