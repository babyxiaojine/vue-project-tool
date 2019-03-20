<template>
    <div class="wrapper official-edit scroll-edit">

        <scrollTab ref="editSwitchTab" :options="tabList" :dataType="1" :autoSwitch="false" @changeMenu="selectTabContent"></scrollTab>

        <div class="scroll-tab-cont">
            <div class="tab-item" v-show="tabIndex == 0">
                <div class="row-list">
                    <div class="row-list-item"><div class="cell-title">名称</div><div class="cell-value">{{baseParam.name}}</div></div>
                    <div class="row-list-item"><div class="cell-title">目标点代码</div><div class="cell-value">{{baseParam.formalCode}}</div></div>
                    <div class="row-list-item" @click="$refs.targetStatusRef.open()">
                        <div class="cell-title">目标状态</div>
                        <div class="cell-value"><input class="ipt-data" type="text" :value="targetStatus(baseParam.status)" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editValueSelect('shopNatureRef','shopNatureList','shopnature')">
                        <div class="cell-title">目标点性质</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.shopNature == '1' ? '直营店':'加盟店'" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" v-show="baseParam.shopNature != 1" @click="franNameSelect">
                        <div class="cell-title">加盟商</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.franName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">焦点范围</div><div class="cell-value">{{baseParam.focusArea}}</div></div>
                    <div class="row-list-item"><div class="cell-title">千分点</div><div class="cell-value">{{baseParam.milliPoint}}</div></div>
                    <div class="row-list-item" @click="predictTimeSelect">
                        <div class="cell-title">预计出店时间</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="predictFormatTime" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editValueSelect('figureLevelRef','figureLevelList','figure_level')">
                        <div class="cell-title">形象等级</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.figureLevelName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <!--<div class="row-list-item" @click="positionLevelSelect">-->
                    <div class="row-list-item" @click="editValueSelect('positionLevelRef','positionLevelList','position_level')">
                        <div class="cell-title">门店位置等级</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.positionLevelName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editValueSelect('peopleCountRef','peopleCountList','people_count')">
                        <div class="cell-title">门店编制</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.peopleCountData" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="getMapLocate">
                        <div class="cell-title">经纬度</div>
                        <div class="cell-value"><input class="ipt-data" type="text" :value="(baseParam.longitude&&baseParam.latitude) && (baseParam.longitude+','+baseParam.latitude)" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div></div>
                    <div class="row-list-item" @click="$refs.regionRef.open(localtionCitys[2] ? localtionCitys : [baseParam.provId, baseParam.eparchyCode, baseParam.areaCode ])">
                        <div class="cell-title">所在地区</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.region" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">详细地址</div><div class="cell-value"><input class="ipt-data" type="text"  v-model="baseParam.address" placeholder="请输入详细地址"></div></div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="baseParam.remark" placeholder="请输入备注信息"></div></div>
                    <!--<div class="row-list-item" @click="editComSelect('level1Ref','level1List',1)">-->
                    <div class="row-list-item">
                        <div class="cell-title">所属公司</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.level1Name" placeholder="请选择" readonly></div>
                    </div>
                    <!--<div class="row-list-item" @click="editComSelect('level2Ref','level2List',2,baseParam.level1)">-->
                    <div class="row-list-item">
                        <div class="cell-title">所属分公司</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.level2Name" placeholder="请选择" readonly></div>
                    </div>
                    <!--<div class="row-list-item" @click="editComSelect('level3Ref','level3List',32,baseParam.level2)">-->
                    <div class="row-list-item">
                        <div class="cell-title">所属开发部</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.level3Name" placeholder="请选择" readonly></div>
                    </div>
                    <div class="row-list-item" @click="editDevSelect('devStaffRef','devStaffList',baseParam.level3)">
                        <div class="cell-title">开发专员</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.devStaffName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <!--<div class="row-list-item" @click="editAreaSelect('tradingAreaRef','tradingAreaList',3,baseParam.areaCode)">-->
                        <!--<div class="cell-title">所属商圈</div>-->
                        <!--<div class="cell-value"><input class="ipt-data" type="text" v-model="baseParam.tradingAreaName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>-->
                    <!--</div>-->
                </div>
                <div class="foot-submit">
                    <div class="fix-area">
                        <button class="btn" type="button" @click="editParamSubmit('baseParam')">保存</button>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 1">
                    <imgPart :editable="false" :objId="objId"></imgPart>
            </div>
            <div class="tab-item" v-show="tabIndex == 3">
                <div class="row-list">
                    <div class="row-list-item"><div class="cell-title">租金(元/月)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="rentParam.rentMoney" placeholder="请输入金额"></div></div>
                    <div class="row-list-item"><div class="cell-title">定金(元)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="rentParam.frontMoney" placeholder="请输入金额"></div></div>
                    <div class="row-list-item"><div class="cell-title">押金(元)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="rentParam.fee" placeholder="请输入金额"></div></div>
                    <div class="row-list-item"><div class="cell-title">开发费用(元)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="rentParam.developFee" placeholder="请输入金额"></div></div>
                    <div class="row-list-item" @click="editDictSelect('payMethodRef','payMethodList','pay_method')">
                        <div class="cell-title">支付方式</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="rentParam.payMethodname" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">签约年限(年)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="rentParam.signYears" placeholder="请输入签约年限"></div></div>
                    <div class="row-list-item" @click="editDictSelect('infoRootRef','infoRootList','info_root')">
                        <div class="cell-title">信息来源</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="rentParam.infoRootName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="rentParam.remarks" placeholder="请输入备注"></div></div>
                </div>
                <div class="foot-submit">
                    <div class="fix-area">
                        <button class="btn" type="button" @click="editParamSubmit('rentParam')">保存</button>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 4">
                <div class="row-list">
                    <div class="row-list-item"><div class="cell-title">店招宽度(米)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="projectParam.signWide" placeholder="请输入店招宽度"></div></div>
                    <div class="row-list-item"><div class="cell-title">内宽(米)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="projectParam.innerWide" placeholder="请输入内宽"></div></div>
                    <div class="row-list-item"><div class="cell-title">净高(米)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="projectParam.tall" placeholder="请输入净高"></div></div>
                    <div class="row-list-item"><div class="cell-title">进深(米)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="projectParam.deep" placeholder="请输入进深"></div></div>
                    <div class="row-list-item"><div class="cell-title">面积(平方米)</div><div class="cell-value"><input class="ipt-data" type="number" v-model="projectParam.area" placeholder="请输入进深"></div></div>
                    <div class="row-list-item" @click="editDictSelect('advPositionRef','advPositionList','adv_position')">
                        <div class="cell-title">广告位</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.advPositionName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('shopPositionRef','shopPositionList','shop_position')">
                        <div class="cell-title">门店位置</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.shopPositionName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('signShapeRef','signShapeList','sign_shape')">
                        <div class="cell-title">店招形状</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.signShapeName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('passengerTrendRef','passengerTrendList','passenger_trend')">
                        <div class="cell-title">客流动向</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.passengerTrendName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('deskPositionRef','deskPositionList','desk_position')">
                        <div class="cell-title">收银台位置</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.deskPositionName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('constrDemandRef','constrDemandList','constr_demand')">
                        <div class="cell-title">施工要求</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="projectParam.constrDemandName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">上水问题</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="projectParam.upProblem" placeholder="请输入上水问题"></div></div>
                    <div class="row-list-item"><div class="cell-title">下水问题</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="projectParam.downProblem" placeholder="请输入下水问题"></div></div>
                    <div class="row-list-item"><div class="cell-title">进线</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="projectParam.coilIn" placeholder="请输入进线"></div></div>
                    <div class="row-list-item" @click="predictInSelect">
                        <div class="cell-title">预计进场时间</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="predictInFormatTime" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title">备注</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="projectParam.remarks" placeholder="请输入备注"></div></div>
                </div>
                <div class="foot-submit">
                    <div class="fix-area">
                        <button class="btn" type="button" @click="editParamSubmit('projectParam')">保存</button>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 5">
                <div class="row-list">
                    <div class="row-list-item" @click="editDictSelect('houseTypeRef','houseTypeList','house_type')">
                        <div class="cell-title">房产类别</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="landlordParam.houseTypeName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" @click="editDictSelect('cooperationRef','cooperationList','cooperation')">
                        <div class="cell-title">合作方式</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="landlordParam.cooperationName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title landlord-info">原始房东姓名</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="5" v-model="landlordParam.firstLandlord" placeholder="请输入原始房东姓名"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">原始房东联系方式</div><div class="cell-value"><input class="ipt-data" type="tel" pattern="\d*" maxlength="11" v-model="landlordParam.firstPhone" placeholder="请输入原始房东联系方式"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">二手房东名</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="5" v-model="landlordParam.secondLandlord" placeholder="请输入原始房东姓名"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">二手房东联系方式</div><div class="cell-value"><input class="ipt-data" type="tel" pattern="\d*" maxlength="11" v-model="landlordParam.secondPhone" placeholder="请输入二手房东联系方式"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">三手房东名</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="5" v-model="landlordParam.thirdLandlord" placeholder="请输入三手房东名"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">三手房东联系方式</div><div class="cell-value"><input class="ipt-data" type="tel" pattern="\d*" maxlength="11" v-model="landlordParam.thirdPhone" placeholder="请输入三手房东联系方式"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">四手房东名</div><div class="cell-value"><input class="ipt-data" type="text" maxlength="5" v-model="landlordParam.fourthLandlord" placeholder="请输入四手房东名"></div></div>
                    <div class="row-list-item"><div class="cell-title landlord-info">四手房东联系方式</div><div class="cell-value"><input class="ipt-data" type="tel"  pattern="\d*" maxlength="11" v-model="landlordParam.fourthPhone" placeholder="请输入四手房东联系方式"></div></div>
                    <div class="row-list-item">
                        <div class="cell-title">办证资料</div>
                        <!--<div class="cell-value">{{itemTrans('landlord','certificates')}}</div>-->
                        <!--{{certificateArr}}-->
                        <div class="cell-value check-certificate"><mt-checklist align="left" v-model="checkCertList" :options="certificateArr" @change="checkCertificate($event)"></mt-checklist></div>

                    </div>
                </div>
                <div class="foot-submit">
                    <div class="fix-area">
                        <button class="btn" type="button" @click="editParamSubmit('landlordParam')">保存</button>
                    </div>
                </div>
            </div>
            <div class="tab-item" v-show="tabIndex == 7">

                 <div class="folding-list roll-area" v-if="detailData.siteSelections">
                    <div class="fold-list-item">
                        <div class="fold-title" :class="siteTotalClass(siteTotalNumber)"><em>合计得分：{{siteTotalNumber}}</em></div>
                    </div>
                    <div class="fold-list-item" v-for="(item,index) in detailData.siteSelections" :key="index">
                        <div class="fold-title" @click="panelItemFold(index,'addrFoldIndex')"><em>{{item.name}}</em><span>{{addrFoldIndex == index ? '收起':'展开'}}</span></div>
                        <div class="fold-body" v-show="addrFoldIndex == index">
                            <ul class="odd-list" v-if="item.options">
                                <li v-for="(childItem,childIndex) in item.options" :key="childIndex" @click="siteSelectionsOpts(index,childIndex)">
                                    <i class="iconfont" :class="childItem.status == '1' ? 'icon-selected':'icon-select'"></i>
                                    {{childItem.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="foot-submit">
                    <div class="fix-area">
                        <button class="btn" type="button" @click="editParamSubmit('siteInfoParams')">保存</button>
                    </div>
                </div>
            </div>

        </div>

        <!--目标点性质-->
        <selectPicker ref="shopNatureRef" :options="shopNatureList" @confirm="shopNatureConfirm"></selectPicker>
        <!--目标点状态-->
        <selectPicker ref="targetStatusRef" :options="targetStatusList" @confirm="targetStatusConfirm"></selectPicker>
        <!--加盟商-->
        <selectPicker ref="franNameRef" :options="franNameList" @confirm="franNameConfirm"></selectPicker>
        <!--出店时间-->
        <mt-datetime-picker ref="predictTimeRef" v-model="predictTimePicker" @confirm="predictTimeConfirm" type="datetime" year-format="{value}" month-format="{value}月" date-format="{value}日" hour-format="{value}时" minute-format="{value}分"></mt-datetime-picker>
        <!--形象等级-->
        <selectPicker ref="figureLevelRef" :options="figureLevelList" @confirm="figureLevelConfirm"></selectPicker>
        <!--门店位置等级-->
        <selectPicker ref="positionLevelRef" :options="positionLevelList" @confirm="positionLevelConfirm"></selectPicker>
        <!--门店编制-->
        <selectPicker ref="peopleCountRef" :options="peopleCountList" @confirm="peopleCountConfirm"></selectPicker>
        <!--所在地区-->
        <areaPicker ref="regionRef" @confirm="regionConfirm"></areaPicker>
        <!--所属公司-->
        <selectPicker ref="level1Ref" :options="level1List" @confirm="level1Confirm"></selectPicker>
        <!--所属分公司-->
        <selectPicker ref="level2Ref" :options="level2List" @confirm="level2Confirm"></selectPicker>
        <!--归属管理部门-->
        <selectPicker ref="level3Ref" :options="level3List" @confirm="level3Confirm"></selectPicker>
        <!--开发专员-->
        <selectPicker ref="devStaffRef" :options="devStaffList" @confirm="devStaffConfirm"></selectPicker>
        <!--所属商圈-->
        <selectPicker ref="tradingAreaRef" :options="tradingAreaList" @confirm="tradingAreaConfirm"></selectPicker>
        <!--支付方式-->
        <selectPicker ref="payMethodRef" :options="payMethodList" @confirm="payMethodConfirm"></selectPicker>
        <!--信息来源-->
        <selectPicker ref="infoRootRef" :options="infoRootList" @confirm="infoRootConfirm"></selectPicker>
        <!--广告位-->
        <selectPicker ref="advPositionRef" :options="advPositionList" @confirm="advPositionConfirm"></selectPicker>
        <!--门店位置-->
        <selectPicker ref="shopPositionRef" :options="shopPositionList" @confirm="shopPositionConfirm"></selectPicker>
        <!--店招形状-->
        <selectPicker ref="signShapeRef" :options="signShapeList" @confirm="signShapeConfirm"></selectPicker>
        <!--客流动向-->
        <selectPicker ref="passengerTrendRef" :options="passengerTrendList" @confirm="passengerTrendConfirm"></selectPicker>
        <!--收银台位置-->
        <selectPicker ref="deskPositionRef" :options="deskPositionList" @confirm="deskPositionConfirm"></selectPicker>
        <!--施工要求-->
        <selectPicker ref="constrDemandRef" :options="constrDemandList" @confirm="constrDemandConfirm"></selectPicker>
        <!--预计进场时间-->
        <mt-datetime-picker ref="predictInRef" v-model="predictTimePicker" @confirm="predictInConfirm" type="datetime" year-format="{value}" month-format="{value}月" date-format="{value}日" hour-format="{value}时" minute-format="{value}分"></mt-datetime-picker>
        <!--房产类别-->
        <selectPicker ref="houseTypeRef" :options="houseTypeList" @confirm="houseTypeConfirm"></selectPicker>
        <!--合作方式-->
        <selectPicker ref="cooperationRef" :options="cooperationList" @confirm="cooperationConfirm"></selectPicker>

    </div>
</template>



<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,gaode2baidu,targetStatus} from '@/util/common'
  import {getSelectData} from '@/util/getData'
  import scrollTab from '@/components/scrollTab'
  import areaPicker from '@/components/areaPicker'
  import selectPicker from '@/components/selectPicker'
  import imgPart from './children/imgPart'
  export default {
    name: 'officialEdit',
    data() {
      return {
        // tabList: ['基础信息','照片','预算信息','租赁信息','工程信息','房东信息','经营分析','选址分析','拜访记录'],
        tabList: [{id:0,name:'基础信息'},{id:1,name:'照片'},{id:3,name:'租赁信息'},{id:4,name:'工程信息'},{id:5,name:'房东信息'},{id:7,name:'选址分析'}],
        tabIndex: 0,
        listType:"0",
        detailData: {},
        addrFoldIndex: -1,
        manageFoldIndex: -1,
        visitFoldIndex: -1,
        localtionCitys:[],
        objId: '',
        // objId: "dfdec848e0134aa3a471ac86104cb202",
        baseParam: {
          address: '',
          areaCode: '',
          areaName: '',
          devStaffId: '',
          devStaffName: '',
          eparchyCode: '',
          eparchyName: '',
          figureLevel: '',
          figureLevelName: '',
          flour: '',
          flourData: '',
          focusArea: '',
          formalCode: '',
          franId: '',
          franName: '',
          inOrOut: '',
          inoutDistrict: '',
          inoutDistrictData: '',
          latitude: '',
          level1: '',
          level1Name: '',
          level2: '',
          level2Name: '',
          level3: '',
          level3Name: '',
          longitude: '',
          milliPoint: '',
          name: '',
          objType: '',
          oldShopId: '',
          oldShopName: '',
          peopleCount: '',
          peopleCountData: '',
          planningType: '',
          planningTypeName: '',
          positionLevel: '',
          positionLevelName: '',
          predictTime: '',
          provId: '',
          provName: '',
          region: '',
          remark: '',
          shopNature: '',
          status: '',
          tradingArea: '',
          tradingAreaName: ''
        },
        landlordParam: {
          certificate: "",
          certificates: "",
          cooperation: "",
          cooperationName: "",
          firstLandlord: "",
          firstPhone: "",
          fourthLandlord: "",
          fourthPhone: "",
          houseType: "",
          houseTypeName: "",
          secondLandlord: "",
          secondPhone: "",
          thirdLandlord: "",
          thirdPhone: ""
        },
        certificateArr: [],//房产资料
        checkCertList: [],//房产资料选中列表
        projectParam: {
          advPosition: "",
          advPositionName: "",
          area: "",
          coilIn: "",
          constrDemand: "",
          constrDemandName: "",
          deep: "",
          deskPosition: "",
          deskPositionName: "",
          downProblem: "",
          innerWide: "",
          passengerTrend: "",
          passengerTrendName: "",
          predictIntime: "",
          remarks: "",
          shopPosition: "",
          shopPositionName: "",
          signShape: "",
          signShapeName: "",
          signWide: "",
          tall: "",
          upProblem: ""
        },
        rentParam: {
          developFee: "",
          developFee: "",
          fee: "",
          frontMoney: "",
          infoRoot: "",
          infoRootName: "",
          payMethod: "",
          payMethodname: "",
          remarks: "",
          rentMoney: "",
          signYears: ""
        },
        siteInfoParams: [
          {
            id: "",
            name: "",
            options: [
              {
                id: "",
                name: "",
                orderNum: 0,
                sortNum: 0,
                status: ""
              }
            ]
          }
        ],
        siteTotalNumber: 0,//选址分析分数统计
        // type: 0

        shopNatureList:[],//目标点性质选项
        targetStatusList:[{id:'0',name:'未开始'},{id:'1',name:'沟通中'},{id:'2',name:'已报价'},{id:'3',name:'谈判中'},{id:'1020',name:'有意向'},{id:'0010',name:'准备中'}],//目标点状态
        franNameList:[],//加盟商选项
        predictTimePicker:new Date(),
        figureLevelList: [],//形象等级
        positionLevelList: [],//门店位置等级
        peopleCountList: [],//门店编制
        level1List: [],//所属公司
        level2List: [],//所属分公司
        level3List: [],//归属管理部门
        devStaffList: [],//开发专员列表
        tradingAreaList: [],//商圈列表
        payMethodList: [],//支付方式
        infoRootList: [],//信息来源
        advPositionList: [],//广告位
        shopPositionList: [],//门店位置
        signShapeList: [],//店招形状
        passengerTrendList: [],//客流动向
        deskPositionList: [],//收银台位置
        constrDemandList: [],//施工要求
        houseTypeList: [],//房产类别
        cooperationList: [],//合作方式

        // singleOption: ['']//单项选择

      }
    },
    components: {
      selectPicker,
      areaPicker,
      imgPart,
      scrollTab
    },
    created() {
      const routeParam = this.$route.params;
      if (routeParam.tid) this.objId = routeParam.tid;
    },
    mounted() {
      this.getOfficialDetail(this.objId,0);
    },
    methods: {
      targetStatus,
      getSelectData,
      /*--------------------基本信息--------------------*/
      //Picker静态参数选择
      editValueSelect(refName,resList,postType){
        this.$refs[refName].open();
        if (!this[resList].length){
          this.getSelectData('staticList',{type:postType}).then((res)=>{
            this[resList] = [...res];
          });
        }
      },
      //Picker公司店铺区域管理部选择
      editComSelect(refName,resList,postType,postId){
        let {level1,level2} = this.baseParam;
        if (refName == 'level3Ref' && level2 == ''){
          MessageBox.alert('请选选择所属分公司！', '提示');
          return false;
        }
        this.$refs[refName].open();
        if (!this[resList].length){
          this.getSelectData('officeList',{type:postType,id:postId}).then((res)=>{
            this[resList] = [...res];
          });
        }
      },
      //选择目标点性质
      shopNatureConfirm(res){
        this.baseParam= {
          ...this.baseParam,
          shopNature: res.id,
          shopNatureData: res.name
        };
        if (res.id == '1') {//直营店清空加盟商数据
          this.baseParam.franId = '';
          this.baseParam.franName = '';
        }
      },
      //选择目标点状态
      targetStatusConfirm(res){
        this.baseParam= {
          ...this.baseParam,
          status: res.id.toString()
        };
      },
      //选择加盟商
      franNameSelect(){
        this.$refs.franNameRef.open();
        if (!this.franNameList.length){
          this.getSelectData('franList').then((res)=>{
            this.franNameList = [...res];
          });
        }
      },
      franNameConfirm(res){
        // console.log(res,'结盟商');
        this.baseParam = {
          ...this.baseParam,
          franId: res.id,
          franName: res.name
        }
      },
      //选择预计出店时间
      predictTimeSelect(){
        this.$refs.predictTimeRef.open();
        if (this.baseParam.predictTime) this.predictTimePicker = new Date(this.baseParam.predictTime);
      },
      predictTimeConfirm(res){
        let selectTime;
        if (res) selectTime = new Date(res).getTime();
        this.baseParam = {
          ...this.baseParam,
          predictTime: selectTime
        }
      },
      //形象等级
      figureLevelConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          figureLevel: res.id,
          figureLevelName: res.name
        }
      },
      //门店位置等级
      positionLevelConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          positionLevel: res.id,
          positionLevelName: res.name
        }
      },
      //门店编制
      peopleCountConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          peopleCount: res.id,
          peopleCountData: res.name
        }
      },
      //获取经纬度
      getMapLocate(){
        let lng = this.baseParam.longitude || 116.473565;
        let lat = this.baseParam.latitude || 39.903578;
        dd.ready(() => {
          dd.biz.map.locate({
            latitude: lat, // 纬度
            longitude: lng, // 经度
            onSuccess: (result)=> {
              /* result 结构 */
              const newLng = result.longitude;
              const newLat = result.latitude;
              let locateData = gaode2baidu(newLng,newLat);
              this.baseParam = {
                ...this.baseParam,
                longitude: locateData.lng,
                latitude: locateData.lat,
                address: result.snippet
              }
              this.localtionCitys = [poi.province, poi.city, poi.adName]
            },
            onFail: function (err) {
            }
          });

        })
      },
      //所在地区
      regionConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          provId: res.prov.id,
          provName: res.prov.name,
          eparchyCode: res.city.id,
          eparchyName: res.city.name,
          areaCode: res.dist.id,
          areaName: res.dist.name,
          region: res.prov.name + res.city.name + res.dist.name
        }
      },
      //所属公司
      level1Confirm(res){
        this.baseParam = {
          ...this.baseParam,
          level1: res.id,
          level1Name: res.name,
          level2: '',
          level2Name: '',
          level3: '',
          level3Name: '',
          devStaffId: '',
          devStaffName: ''//开发专员名称
        }
      },
      //所属分公司
      level2Confirm(res){
        this.baseParam = {
          ...this.baseParam,
          level2: res.id,
          level2Name: res.name
        }
      },
      //归属管理部门
      level3Confirm(res){
        this.baseParam = {
          ...this.baseParam,
          level3: res.id,
          level3Name: res.name
        }
      },
      //开发专员列表
      editDevSelect(refName,resList,postId){
        let {level3} = this.baseParam;
        if (refName == 'devStaffRef' && level3 == ''){
          MessageBox.alert('请选选择所属开发部！', '提示');
          return false;
        }
        this.$refs[refName].open();
        if (!this[resList].length){
          this.getSelectData('developList',{id:postId}).then((res)=>{
            this[resList] = res || [''];
          });
        }
      },
      devStaffConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          devStaffId: res.id,
          devStaffName: res.name
        }
      },
      //省市县商圈
      editAreaSelect(refName,resList,postType,postId){
        this.$refs[refName].open();
        if (!this[resList].length){
          this.getSelectData('areaList',{type:postType,id:postId}).then((res)=>{
            this[resList] = res || [''];
          });
        }
      },
      tradingAreaConfirm(res){
        this.baseParam = {
          ...this.baseParam,
          tradingArea: res.id,
          tradingAreaName: res.name
        }
      },
      /*--------------------租赁信息--------------------*/
      //支付方式
      editDictSelect(refName,resList,postType){
        this.$refs[refName].open();
        if (!this[resList].length){
          this.getSelectData('dicList',{type:postType}).then((res)=>{
            this[resList] = res || [''];
          });
        }
      },
      payMethodConfirm(res){
        this.rentParam = {
          ...this.rentParam,
          payMethod: res.id,
          payMethodname: res.name
        }
      },
      //信息来源
      infoRootConfirm(res){
        this.rentParam = {
          ...this.rentParam,
          infoRoot: res.id,
          infoRootName: res.name
        }
      },
      /*--------------------工程信息--------------------*/
      //广告位
      advPositionConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          advPosition: res.id,
          advPositionName: res.name
        }
      },
      //门店位置
      shopPositionConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          shopPosition: res.id,
          shopPositionName: res.name
        }
      },
      //店招形状
      signShapeConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          signShape: res.id,
          signShapeName: res.name
        }
      },
      //客流动向
      passengerTrendConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          passengerTrend: res.id,
          passengerTrendName: res.name
        }
      },
      //收银台位置
      deskPositionConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          deskPosition: res.id,
          deskPositionName: res.name
        }
      },
      //施工要求
      constrDemandConfirm(res){
        this.projectParam = {
          ...this.projectParam,
          constrDemand: res.id,
          constrDemandName: res.name
        }
      },
      //预计进场时间
      predictInSelect(){
        this.$refs.predictInRef.open();
        if (this.projectParam.predictIntime) this.predictTimePicker = new Date(this.projectParam.predictIntime);
      },
      predictInConfirm(res){
        let selectTime;
        if (res) selectTime = new Date(res).getTime();
        this.projectParam = {
          ...this.projectParam,
          predictIntime: selectTime
        }
      },

      /*--------------------房东信息--------------------*/
      //房产类别
      houseTypeConfirm(res){
        this.landlordParam = {
          ...this.landlordParam,
          houseType: res.id,
          houseTypeName: res.name
        }
      },
      //合作方式
      cooperationConfirm(res){
        this.landlordParam = {
          ...this.landlordParam,
          cooperation: res.id,
          cooperationName: res.name
        }
      },
      // 证件资料
      checkCertificate(res){
        this.landlordParam = {
          ...this.landlordParam,
          certificate: res.join(',')
        }
      },

      /*--------------------选址分析--------------------*/
      //选址详情选择
      siteSelectionsOpts(topIndex,subIndex){
        let siteInfo = this.siteInfoParams;
        let thisTop = siteInfo[topIndex];
        let thisSub = thisTop.options[subIndex];
        if (thisSub.status == '0'){
          thisSub.status = '1';
        } else {
          thisSub.status = '0';
        }
        this.siteTotalScore();//重新计算分数
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
        let siteInfo = this.siteInfoParams;
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
      //编辑数据保存
      editParamSubmit(saveType){
        let postParam = {};
        postParam.objId = this.objId;
        postParam[saveType] = this[saveType];
        switch (saveType){
          case 'baseParam': postParam.type = 0; break;
          case 'imgParam': postParam.type = 1; break;
          case 'landlordParam': postParam.type = 5; break;
          case 'projectParam': postParam.type = 4; break;
          case 'rentParam': postParam.type = 3; break;
          case 'siteInfoParams': postParam.type = 7; break;
        }
        // console.log(JSON.stringify(postParam),'保存请求参数');
        postTokenData(base.basePath + '/objPoint/formalObj/edit',postParam, {
          success: (res)=> {
            if (res.success && res.code == '0000') {
              Toast({message: '保存成功！', iconClass: 'mintui mintui-field-success'})
              this.getOfficialDetail(this.objId, postParam.type);//刷新数据
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
      //获取详情数据
      getOfficialDetail(id,type){
        let postData = {
          id: id,
          type: type
        };
        postTokenData(base.basePath + '/objPoint/formalObj/detail',postData, {
          success: (res)=> {
            if (res.success) {
              let resData = res.data || {};
              this.detailData = {...this.detailData,...resData};

              switch (type){
                case 0: this.baseParam = {...resData.base}; break;
                case 1: this.imgParam = {...resData.img}; break;
                case 3: this.rentParam = {...resData.rent}; break;
                case 4: this.projectParam = {...resData.project}; break;
                case 5:
                  this.landlordParam = {...resData.landlord};
                  //默认显示值
                  let checkList = this.landlordParam.certificate;
                  this.checkCertList = checkList ? checkList.split(','):[];
                  //加载资料选项
                  this.getSelectData('dicList',{type:'certificate'}).then((res)=>{
                    let certArr = [];
                    res.forEach((item, index)=>{
                      let certItem = {};
                      certItem.label = item.name;
                      certItem.value = item.id;
                      certArr.push(certItem);
                    });
                    this.certificateArr = certArr;
                  });
                  break;
                case 7:
                  let siteData = resData.siteSelections,siteNew = [];
                  //数组元素为对象对象深度拷贝
                  siteData.map((e)=>{
                    if(typeof e === 'object'){
                      siteNew.push(Object.assign({},e));
                    }else{
                      siteNew.push(e);
                    }
                  });
                  this.siteInfoParams = siteNew;
                  this.siteTotalScore();//计算分数
                  break;
              }

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
        //对比差异
        let {tabIndex} = this;
        let beforeDetail = this.detailData;
        let editData = {};
        let saveType = '';
        switch (tabIndex){
          case 0: editData = this.baseParam; beforeDetail = beforeDetail.base; saveType = 'baseParam'; break;
          case 1: editData = this.imgParam; beforeDetail = beforeDetail.img; saveType = 'imgParam'; break;
          case 3: editData = this.rentParam; beforeDetail = beforeDetail.rent; saveType = 'rentParam'; break;
          case 4: editData = this.projectParam; beforeDetail = beforeDetail.project; saveType = 'projectParam'; break;
          case 5: editData = this.landlordParam; beforeDetail = beforeDetail.landlord; saveType = 'landlordParam'; break;
          case 7: editData = this.siteInfoParams; beforeDetail = beforeDetail.siteSelections; saveType = 'siteInfoParams'; break;
        }
        for (let key in editData){

          if (tabIndex != 7 && editData[key] !== '' && editData[key] !== beforeDetail[key]) {
            MessageBox.confirm('是否保存当前页面？','提示',{
              closeOnClickModal: false
            }).then(action => {
              if (action === 'confirm'){
                this.editParamSubmit(saveType);
              }
            }).catch(()=>{
              this.tabSwitch(param);
            });
            return false;
          }
          // if (this.tabIndex == 7) {
          //   // console.log(editData,beforeDetail,'2222222222222222222222222')
          //   let optData = editData[key].options;
          //   for (let p = 0; p < optData.length; p++){
          //       for (let listKey in optData[p]){
          //         console.log(optData[p].status,beforeDetail[key].options[p].status,'11111111111111111111111111')
          //         if (optData[p][listKey] !== '' && optData[p][listKey] !== beforeDetail[key].options[p][listKey]) {
          //           console.log(optData[p][listKey],'s9s9s99a9a9a9s9as89a8a98s9a9s8a98s')
          //           // dspdlsdjlasd();
          //         }
          //       }
          //   }
          // }
        }

        this.tabSwitch(param);
      },
      tabSwitch(param){
        this.tabIndex = param.id;//当前页面TAB对应ID
        this.$refs.editSwitchTab.switchTab(param.index);
        this.getOfficialDetail(this.objId,param.id);
        //折叠展示
        this.addrFoldIndex = this.manageFoldIndex = this.visitFoldIndex = -1;
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
          itemValue = valueData[field];
        } else {
          let itemArr = itemData.split('.'),
              arrOne = itemArr[0],
              arrTwo = itemArr[1];
          let topData = detailData[arrOne] || {};
          let subData = topData[arrTwo] || {};
          itemValue = subData[field];
        }
        return itemValue;
      },
      formatDate



    },
    computed: {
      predictFormatTime:function(){
        return  this.baseParam.predictTime ? formatDate(this.baseParam.predictTime):'';
      },
      predictInFormatTime:function(){
        return  this.projectParam.predictIntime ? formatDate(this.projectParam.predictIntime):'';
      }
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

</style>
