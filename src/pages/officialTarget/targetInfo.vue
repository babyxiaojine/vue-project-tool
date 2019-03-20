<template>
    <div>
        <scrollTab :options="tabList" @changeMenu="selectTabContent" :autoTabDisabledId="autoTabDisabledId">
            <li class="menu-li" slot="addSlot" v-if="mapVisible" @click="openMaps">
                <span>定位信息</span>
            </li>
        </scrollTab>

        <div class="scroll-tab-cont">
            <div class="tab-item" v-show="tabIndex == 0">
                <div class="row-list bdtb" v-if="'base'">
                    <div class="row-list-item"><div class="cell-title">名称</div><div class="cell-value">{{itemTrans('base','name')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">目标点代码</div><div class="cell-value">{{itemTrans('base','formalCode')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">目标点性质</div><div class="cell-value">{{itemTrans('base','shopNature') == '1' ? '直营店':'加盟店'}}</div></div>
                    <div class="row-list-item"><div class="cell-title">目标点状态</div><div class="cell-value">{{targetStatus(itemTrans('base','status'))}}</div></div>
                    <div class="row-list-item"><div class="cell-title">加盟商</div><div class="cell-value">{{itemTrans('base','franName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">焦点范围</div><div class="cell-value">{{itemTrans('base','focusArea')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">千分点</div><div class="cell-value">{{itemTrans('base','milliPoint')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">预计出店时间</div><div class="cell-value">{{formatDate(itemTrans('base','predictTime'))}}</div></div>
                    <div class="row-list-item"><div class="cell-title">形象等级</div><div class="cell-value">{{itemTrans('base','figureLevelName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">门店位置等级</div><div class="cell-value">{{itemTrans('base','positionLevelName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">门店编制</div><div class="cell-value">{{itemTrans('base','peopleCountData')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">经纬度</div><div class="cell-value">{{itemTrans('base','longitude')}}-{{itemTrans('base','latitude')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">所在地区</div><div class="cell-value">{{itemTrans('base','region')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">详细地址</div><div class="cell-value">{{itemTrans('base','address')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value">{{itemTrans('base','remark')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">所属公司</div><div class="cell-value">{{itemTrans('base','level1Name')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">所属分公司</div><div class="cell-value">{{itemTrans('base','level2Name')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">所属开发部</div><div class="cell-value">{{itemTrans('base','level3Name')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">开发专员</div><div class="cell-value">{{itemTrans('base','devStaffName')}}</div></div>
                    <!--<div class="row-list-item"><div class="cell-title">所属商圈</div><div class="cell-value">{{itemTrans('base','tradingAreaName')}}</div></div>-->
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 1">
                <div class="row-list bdtb">
                    <imgPart :editable="true" :objId="datailId"></imgPart>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 3">
                <div class="row-list bdtb">
                    <div class="row-list-item"><div class="cell-title">租金(元/月)</div><div class="cell-value">{{itemTrans('rent','rentMoney')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">定金(元)</div><div class="cell-value">{{itemTrans('rent','frontMoney')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">押金(元)</div><div class="cell-value">{{itemTrans('rent','fee')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">开发费用(元)</div><div class="cell-value">{{itemTrans('rent','developFee')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">支付方式</div><div class="cell-value">{{itemTrans('rent','payMethodname')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">签约年限(年)</div><div class="cell-value">{{itemTrans('rent','signYears')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">信息来源</div><div class="cell-value">{{itemTrans('rent','infoRootName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value">{{itemTrans('rent','remarks')}}</div></div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 4">
                <div class="row-list bdtb">
                    <div class="row-list-item"><div class="cell-title">店招宽度(米)</div><div class="cell-value">{{itemTrans('project','signWide')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">内宽(米)</div><div class="cell-value">{{itemTrans('project','innerWide')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">净高(米)</div><div class="cell-value">{{itemTrans('project','tall')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">进深(米)</div><div class="cell-value">{{itemTrans('project','deep')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">面积(平方米)</div><div class="cell-value">{{itemTrans('project','area')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">广告位</div><div class="cell-value">{{itemTrans('project','advPositionName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">门店位置</div><div class="cell-value">{{itemTrans('project','shopPositionName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">店招形状</div><div class="cell-value">{{itemTrans('project','signShapeName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">客流动向</div><div class="cell-value">{{itemTrans('project','passengerTrendName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">收银台位置</div><div class="cell-value">{{itemTrans('project','deskPositionName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">施工要求</div><div class="cell-value">{{itemTrans('project','constrDemandName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">上水问题</div><div class="cell-value">{{itemTrans('project','upProblem')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">下水问题</div><div class="cell-value">{{itemTrans('project','downProblem')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">进线</div><div class="cell-value">{{itemTrans('project','coilIn')}}</div></div>
                    <div class="row-list-item"><div class="cell-title">预计进场时间</div><div class="cell-value">{{formatDate(itemTrans('project','predictIntime'))}}</div></div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value">{{itemTrans('project','remarks')}}</div></div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 5">
                <div class="row-list bdtb">
                    <div class="row-list-item"><div class="cell-title landlord-info">房产类别</div><div class="cell-value">{{itemTrans('landlord','houseTypeName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">合作方式</div><div class="cell-value">{{itemTrans('landlord','cooperationName')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">原始房东姓名</div><div class="cell-value">{{itemTrans('landlord','firstLandlord')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">原始房东联系方式</div><div class="cell-value">{{itemTrans('landlord','firstPhone')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">二手房东名</div><div class="cell-value">{{itemTrans('landlord','secondLandlord')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">二手房东联系方式</div><div class="cell-value">{{itemTrans('landlord','secondPhone')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">三手房东名</div><div class="cell-value">{{itemTrans('landlord','thirdLandlord')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">三手房东联系方式</div><div class="cell-value">{{itemTrans('landlord','thirdPhone')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">四手房东名</div><div class="cell-value">{{itemTrans('landlord','fourthLandlord')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">四手房东联系方式</div><div class="cell-value">{{itemTrans('landlord','fourthPhone')}}</div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">办证资料</div><div class="cell-value">{{itemTrans('landlord','certificateName')}}</div></div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 6">
                <div class="folding-list">
                    <div class="fold-list-item" @click="panelItemFold(0,'manageFoldIndex')">
                        <div class="fold-title"><em>重要信息</em><span>{{manageFoldIndex == 0 ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="manageFoldIndex == 0">
                            <ul class="table-list">
                                <li class="thead">
                                    <div class="th">项目</div>
                                    <div class="th">直营店</div>
                                    <div class="th">加盟店<br />(公司)</div>
                                    <div class="th">加盟店<br />(加盟商)</div>
                                </li>
                                <li class="tbody"><div class="td col-name">终端销售收入</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleInputA')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleInputB')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleInputC')}}</div></li>
                                <li class="tbody"><div class="td col-name">不含税收入</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','inputAWithoutTax')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','inputBWithoutTax')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','inputCWithoutTax')}}</div></li>
                                <li class="tbody"><div class="td col-name">净利润</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitA')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitB')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitC')}}</div></li>
                                <li class="tbody"><div class="td col-name">净利润率</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitRateA')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitRateB')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','retainedProfitRateC')+'%'}}</div></li>
                                <li class="tbody"><div class="td col-name">终端销售利润率</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleProfitRateA')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleProfitRateB')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','saleProfitRateC')+'%'}}</div></li>
                                <li class="tbody"><div class="td col-name">三年利润</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','recoupFeeA')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','recoupFeeB')}}</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','recoupFeeC')}}</div></li>
                                <li class="tbody"><div class="td col-name">加盟投资回收期</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','recoupMonth')}}</div></li>
                                <li class="tbody"><div class="td col-name">加盟投资回报率</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.importantInfo','backRate')+'%'}}</div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="fold-list-item" @click="panelItemFold(1,'manageFoldIndex')">
                        <div class="fold-title"><em>测算数据</em><span>{{manageFoldIndex == 1 ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="manageFoldIndex == 1">
                            <ul class="table-list">
                                <li class="thead">
                                    <div class="th">项目</div>
                                    <div class="th">目标点</div>
                                    <div class="th">参考门店</div>
                                </li>
                                <li class="tbody"><div class="td col-name">名字</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objName')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopName')}}</div></li>
                                <li class="tbody"><div class="td col-name">门店类型</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objTypeName')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopTypeName')}}</div></li>
                                <li class="tbody"><div class="td col-name">客流数量</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objPassengerFlowNum')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopPassengerFlowNum')}}</div></li>
                                <li class="tbody"><div class="td col-name">进店率</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objEnterRate')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopEnterRate')+'%'}}</div></li>
                                <li class="tbody"><div class="td col-name">客单价</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objOrderFee')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopOrderFee')}}</div></li>
                                <li class="tbody"><div class="td col-name">客单数</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objOrderNum')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopOrderNum')}}</div></li>
                                <li class="tbody"><div class="td col-name">日均销售额</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objDailyAveSaleNum')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopDailyAveSaleNum')}}</div></li>
                                <li class="tbody"><div class="td col-name">面积</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objArea')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopArea')}}</div></li>
                                <li class="tbody"><div class="td col-name">面积区间</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objAreaRegion')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">年租金(3年平均值)</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objYearRent')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">月租金</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objMonthRent')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopMonthRent')}}</div></li>
                                <li class="tbody"><div class="td col-name">支付方式</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objPayMethod')}}</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','shopPayMethod')}}</div></li>
                                <li class="tbody"><div class="td col-name">首笔租金</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objFirstRent')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">首笔投入</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objFirstInput')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">租售比</div><div class="td">{{itemTrans('businessAnalysis.basisInfo','objRentSaleRate')}}</div><div class="td">-</div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="fold-list-item" @click="panelItemFold(2,'manageFoldIndex')">
                        <div class="fold-title"><em>其他明细</em><span>{{manageFoldIndex == 2 ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="manageFoldIndex == 2">
                            <ul class="table-list">
                                <li class="thead">
                                    <div class="th">项目</div>
                                    <div class="th">直营店</div>
                                    <div class="th">加盟店<br />(公司)</div>
                                    <div class="th">加盟店<br />(加盟商)</div>
                                </li>
                                <li class="tbody"><div class="td col-name">成本（不含税/含税）</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','costA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','costB')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','costC')}}</div></li>
                                <li class="tbody"><div class="td col-name">毛利</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','grossProfitA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','grossProfitB')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','grossProfitC')}}</div></li>
                                <li class="tbody"><div class="td col-name">附加税</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','addTaxA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','addTaxB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务利润</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherProfitA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherProfitB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务收入<br />(辅料)</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherInputAccessoryA')}}</div><div class="td">-</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务收入<br />(管理费)</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherInputManageB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务收入<br />(加盟费)</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherInputJoininB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务成本<br />(辅料)</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherCostAccessoryA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','otherCostAccessoryB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">其他业务成本<br />(税金支出)</div><div class="td">-</div><div class="td">-</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">主营业务利润</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitB')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitC')}}</div></li>
                                <li class="tbody"><div class="td col-name">主营业务利润率</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitRateA')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitRateB')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','mainProfitRateC')+'%'}}</div></li>
                                <li class="tbody"><div class="td col-name">费用合计</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeSumA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeSumB')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeSumC')}}</div></li>
                                <li class="tbody"><div class="td col-name">费用率</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeRateA')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeRateB')+'%'}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','feeRateC')+'%'}}</div></li>
                                <li class="tbody"><div class="td col-name">加盟费</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','joininFeeC')}}</div></li>
                                <li class="tbody"><div class="td col-name">人工</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','labourA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','labourC')}}</div></li>
                                <li class="tbody"><div class="td col-name">租赁<br />(年)</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','rentA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','rentC')}}</div></li>
                                <li class="tbody"><div class="td col-name">装修</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','fitmentA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','fitmentC')}}</div></li>
                                <li class="tbody"><div class="td col-name">配送<br />(不含税收入*费率)</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','distributionA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','distributionB')}}</div><div class="td">-</div></li>
                                <li class="tbody"><div class="td col-name">水电</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','utilitiesA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','utilitiesC')}}</div></li>
                                <li class="tbody"><div class="td col-name">税金</div><div class="td">-</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','taxC')}}</div></li>
                                <li class="tbody"><div class="td col-name">物料</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','accessoryA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','accessoryC')}}</div></li>
                                <li class="tbody"><div class="td col-name">促销</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','salesPromotionA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','salesPromotionC')}}</div></li>
                                <li class="tbody"><div class="td col-name">平台佣金</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','platformCommissionA')}}</div><div class="td">-</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','platformCommissionC')}}</div></li>
                                <li class="tbody"><div class="td col-name">其他管理费</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','manageFeeA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','manageFeeB')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','manageFeeC')}}</div></li>
                                <li class="tbody"><div class="td col-name">所得税</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','incomeTaxA')}}</div><div class="td">{{itemTrans('businessAnalysis.otherInfo','incomeTaxB')}}</div><div class="td">-</div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 7">
                 <div class="folding-list" v-if="detailData.siteSelections">
                     <div class="fold-list-item">
                         <div class="fold-title" :class="siteTotalClass(siteTotalNumber)"><em>合计得分：{{siteTotalNumber}}</em></div>
                     </div>
                    <div class="fold-list-item" v-for="(item,index) in detailData.siteSelections" :key="index">
                        <div class="fold-title" @click="panelItemFold(index,'addrFoldIndex')"><em>{{item.name}}</em><span>{{addrFoldIndex == index ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="addrFoldIndex == index">
                            <ul class="odd-list" v-if="item.options">
                                <li v-for="(childItem,childIndex) in item.options" :key="childIndex">
                                    <i class="iconfont" :class="childItem.status == '1' ? 'icon-selected':'icon-select'"></i>
                                    {{childItem.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 8">
                <div class="folding-list" v-if="detailData.landlordComms">
                    <div class="fold-list-item" v-for="(item,index) in detailData.landlordComms" :key="index">
                        <div class="fold-title" @click="panelItemFold(index,'visitFoldIndex')"><em>{{formatDate(item.linkupStartDate,'yyyy-MM-dd hh:mm')}} 至 {{formatDate(item.linkupEndDate,'yyyy-MM-dd hh:mm')}}</em><span>{{visitFoldIndex == index ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="visitFoldIndex == index">
                            <ul class="table-list visit-record text-16">
                                <li class="tbody"><div class="td">沟通方式</div><div class="td vr-cont">{{item.linkupMethodName}}</div></li>
                                <li class="tbody"><div class="td">沟通对象</div><div class="td vr-cont">{{item.linkupObj}}</div></li>
                                <li class="tbody"><div class="td">联系方式</div><div class="td vr-cont">{{item.phone}}</div></li>
                                <li class="tbody"><div class="td">开发费用</div><div class="td vr-cont">{{item.devFee}}</div></li>
                                <li class="tbody"><div class="td">租金</div><div class="td vr-cont">{{item.rent}}</div></li>
                                <li class="tbody"><div class="td">沟通内容</div><div class="td vr-cont">{{item.content}}</div></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            </div>

        </div>

    </div>
</template>



<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,targetStatus} from '@/util/common'
  import scrollTab from '@/components/scrollTab'
  import imgPart from './children/imgPart'
  export default {
    name: 'TargetInfo',
    data() {
      return {
        autoTabDisabledId:[9],
        // tabList: ['基础信息','照片','预算信息','租赁信息','工程信息','房东信息','经营分析','选址分析','拜访记录'],
        tabList: ['基础信息','照片','','租赁信息','工程信息','房东信息','经营分析','选址分析','拜访记录'],
        tabIndex: 0,
        listType:"0",
        detailData: {},
        addrFoldIndex: 0,
        manageFoldIndex: -1,
        visitFoldIndex: 0,
        siteTotalNumber: 0,
      }
    },
    components: {
      scrollTab,
      imgPart
    },
    props:{
        datailId:{
            type:String,
            default:''
        },
        mapVisible:{
            type:Boolean,
            default:false
        },
    },
    created() {
      // const routeParam = this.$route.params;
      // if (routeParam.tid) this.datailId = routeParam.tid;
    },
    mounted() {
        this.getOfficialDetail(this.datailId,0);
    },
    methods: {
      formatDate,
      targetStatus,
      //获取详情数据
      getOfficialDetail(id,type){
        let postData = {
          id: id,
          type: type
        };
        postTokenData('/objPoint/formalObj/detail',postData, {
          success: (res)=> {
            if (res.success) {
              let resData = res.data || {};
              this.detailData = {...this.detailData,...resData};
              if (type == 7) this.siteTotalScore();//计算分数
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
      // 切换tab选择
      selectTabContent(param){
        this.tabIndex = param.index;//当前页面TAB索引
        this.getOfficialDetail(this.datailId,param.index);
        //折叠展示
        this.manageFoldIndex = 0;
        this.addrFoldIndex = this.visitFoldIndex = 0;
      },
      // 打开地图
      openMaps(){
        const {base = {}} = this.detailData; 
        dd.ready((res)=>{
            dd.biz.map.view({
                latitude: base.latitude, // 纬度
                longitude: base.longitude, // 经度
                title: base.address
            });
        })
      },
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
      //分数样式处理
      siteTotalClass(num){
        let sitClass = "score-red";
        if (num >= 78){
          sitClass = 'score-green';
        } else if (num > 58 && num < 78){
          sitClass = 'score-yello';
        }
        return sitClass;
      },
      //选址计算分数
      siteTotalScore(){
        let siteInfo = this.detailData.siteSelections;
        let sumNum = 0;
        for (let key in siteInfo){
          let itemOpt = siteInfo[key].options;
          let sumIten = 0;
          for (let t = 0; t < itemOpt.length; t++){
            if (itemOpt[t].status == '1') sumIten += itemOpt[t].sortNum;
          }
          sumNum += sumIten;
        }
        this.siteTotalNumber = sumNum;
      },

    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    /*房东信息*/
    .landlord-info {
        width: p2r(220px);
    }
    /*表格第一列*/
    .col-name {
        width: p2r(100px);
    }
    /*沟通记录*/
    .vr-cont {
        flex: 3;
        text-align: left;
    }
    /*分数颜色*/
    .score-green {color: #15BC83;}
    .score-yello {color: #f08b1d;}
    .score-red {color: #E8380D;}
    i.icon-select {font-size: p2r(18px);}
    i.icon-selected {font-size: p2r(18px);}


    .scroll-tab-cont {
        margin: p2r(10px 0);
    }
    .text-16{
        font-size: p2r(16px);
    }

</style>
