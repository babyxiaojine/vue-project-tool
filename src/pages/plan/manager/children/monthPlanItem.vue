<template>
    <div>
        <div class="mass-tab">
            <ul class="mass-tab-title bdbtm">
                <li v-for="(item,index) in planType" :class="index == tabIndex && 'active'" :ket="index" @click="tabItemSelect(index,item.type)"><span>{{item.name}}</span></li>
            </ul>
        </div>
        <div class="add-target">
            <div class="target-top bdbtm" v-if="!readonly" @click="addPlanItem"><span>+添加{{addType}}</span></div>
            <div class="target-list" v-show="tabIndex == 0">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqObjPointTraceParams" :key="index">
                        <div class="tl-dir bdtop">
                            <div class="td-title">
                                <em>{{item.objName || item.shopName}}</em>
                                <span>编号：{{item.code}}</span>
                            </div>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqObjPointTraceParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item">
                                <div class="cell-title">目标点状态</div>
                                <div class="cell-value">{{item.objStatusName}}</div>
                            </div>
                            <div class="row-list-item" @click="selectItemOption({index:index,filed:'reqObjPointTraceParams',name:'currentMonthObjStatus'})">
                                <div class="cell-title">本月目标状态</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="item.currentMonthObjStatusName" rule="required" error="请选择本月目标状态" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqObjPointTraceParams',name:'predictDecidedTime'})">
                                <div class="cell-title">预计定店时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictDecidedTime,'yyyy-MM-dd')" rule="required" error="请选择预计定店时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">是否本月定店</div><div class="cell-value">{{item.shopDecidedFlag && (item.shopDecidedFlag == '0'?'否':'是')}}</div></div>
                            <div class="row-list-item" @click="selectItemOption({index:index,filed:'reqObjPointTraceParams',name:'shopDecidedType'})">
                                <div class="cell-title">定店类型</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="item.shopDecidedType && (item.shopDecidedType == '1'?'新店':'扩店')" rule="required" error="请选择定店类型" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqObjPointTraceParams',name:'predictOpenTime'})">
                                <div class="cell-title">预计开店时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictOpenTime,'yyyy-MM-dd')" rule="required" error="请选择预计开店时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">是否本月开业</div><div class="cell-value">{{item.shopOpenFlag && (item.shopOpenFlag == '0'?'否':'是')}}</div></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="target-list" v-show="tabIndex == 1">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqNewShopOpenParams" :key="index">
                        <div class="tl-dir bdtop">
                            <div class="td-title">
                                <em>{{item.objName || item.shopName}}</em>
                                <span>编号：{{item.code}}</span>
                            </div>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqNewShopOpenParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                            <div class="row-list-item"><div class="cell-title">工程进度</div><div class="cell-value">{{item.projectProgressName}}</div></div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqNewShopOpenParams',name:'predictOpenTime'})">
                                <div class="cell-title">预计开业时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictOpenTime,'yyyy-MM-dd')" rule="required" error="请选择预计开业时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="target-list" v-show="tabIndex == 2">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqExtendShopOpenParams" :key="index">
                        <div class="tl-dir bdtop">
                            <div class="td-title">
                                <em>{{item.objName || item.shopName}}</em>
                                <span>编号：{{item.code}}</span>
                            </div>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqExtendShopOpenParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                            <div class="row-list-item"><div class="cell-title">工程进度</div><div class="cell-value">{{item.projectProgressName}}</div></div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqExtendShopOpenParams',name:'predictOpenTime'})">
                                <div class="cell-title">预计开业时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictOpenTime,'yyyy-MM-dd')" rule="required" error="请选择预计开业时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="target-list" v-show="tabIndex == 3">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqReNewShopParams" :key="index">
                        <div class="tl-dir bdtop">
                            <div class="td-title">
                                <em>{{item.objName || item.shopName}}</em>
                                <span>编号：{{item.code}}</span>
                            </div>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqReNewShopParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqReNewShopParams',name:'predictRenewTime'})">
                                <div class="cell-title">预计续签时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictRenewTime,'yyyy-MM-dd')" rule="required" error="请选择预计续签时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqReNewShopParams',name:'contractExpirationTime'})">
                                <div class="cell-title">合同到期时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.contractExpirationTime,'yyyy-MM-dd')" rule="required" error="请选择合同到期时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">原月租</div>
                                <div class="cell-value"><input class="ipt-data" type="number" v-model="item.oldRent" rule="required" error="请输入原月租" placeholder="请输入原月租" :readonly="readonly"></div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">续签后租金</div>
                                <div class="cell-value"><input class="ipt-data" type="number" v-model="item.rent" rule="required" error="请输入续签后租金" placeholder="请输入续签后租金" :readonly="readonly"></div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">涨幅</div>
                                <div class="cell-value"><input class="ipt-data" type="text" :value="rentRatio({index:index,filed:'reqReNewShopParams',name:'growthRate'})" readonly></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="target-list" v-show="tabIndex == 4">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqCloseShopParams" :key="index">
                        <div class="tl-dir bdtop">
                            <div class="td-title">
                                <em>{{item.objName || item.shopName}}</em>
                                <span>编号：{{item.code}}</span>
                            </div>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqCloseShopParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item"><div class="cell-title">门店店号</div><div class="cell-value">{{item.code}}</div></div>
                            <div class="row-list-item"><div class="cell-title">门店性质</div><div class="cell-value">{{item.shopNature == '1'?'自营店':'加盟店'}}</div></div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqCloseShopParams',name:'predictCloseTime'})">
                                <div class="cell-title">预计闭店时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictCloseTime,'yyyy-MM-dd')" rule="required" error="请选择预计闭店时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqCloseShopParams',name:'contractExpirationTime'})">
                                <div class="cell-title">合同到期时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.contractExpirationTime,'yyyy-MM-dd')" rule="required" error="请选择合同到期时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectItemOption({index:index,filed:'reqCloseShopParams',name:'budgetFlag'})">
                                <div class="cell-title">预算内外</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="item.budgetFlag && (item.budgetFlag == '1'?'预算内':'预算外')" rule="required" error="请选择预算内外" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item" @click="selectItemOption({index:index,filed:'reqCloseShopParams',name:'closeReason'})">
                                <div class="cell-title">闭店原因</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="item.closeReasonName" rule="required" error="请选择闭店原因" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="target-list" v-show="tabIndex == 5">
                <ul class="clearfix">
                    <li v-for="(item,index) in reqBrandAddParams" :key="index">
                        <div class="tl-dir bdtop">
                            <span>{{item.brandName}}</span>
                            <span>{{item.devName}}</span>
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:'reqBrandAddParams',tag:item.code})">删除</button>
                        </div>
                        <div class="tl-cont row-list bdtb">
                            <div class="row-list-item" @click="selectItemOption({index:index,filed:'reqBrandAddParams',name:'projectName',brand:item.brandName})">
                                <div class="cell-title">项目名称</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="item.projectName" rule="required" error="请选择项目名称" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">对接人名称</div>
                                <div class="cell-value"><input class="ipt-data" type="text" rule="required" error="请输入对接人名称" v-model="item.dockerName" placeholder="请输入对接人名称" :readonly="readonly"></div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">对接人电话</div>
                                <div class="cell-value"><input class="ipt-data" type="text" v-model="item.dockerPhone" rule="required" error="请输入对接人电话" placeholder="请输入对接人电话" :readonly="readonly"></div>
                            </div>

                            <div class="row-list-item" @click="selectDateTime({index:index,filed:'reqBrandAddParams',name:'predictVisitTime'})">
                                <div class="cell-title">预计拜访时间</div>
                                <div class="cell-value">
                                    <input class="ipt-data" type="text" :value="formatDate(item.predictVisitTime,'yyyy-MM-dd')" rule="required" error="请选择预计拜访时间" placeholder="请选择" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                                </div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">当前状态</div><div class="cell-value">{{item.brandStatusName}}</div></div>
                            <div class="row-list-item row-column">
                                <div class="cell-title appr-lab">拜访事项</div>
                                <div class="cell-value"><textarea name="projectRemark" rows="5" v-model="item.visitMatters" placeholder="请输入拜访事项" :readonly="readonly"></textarea></div>
                            </div>
                            <div class="row-list-item"><div class="cell-title">责任人</div>
                                <div class="cell-value"><input class="ipt-data" type="text" v-model="item.responsible" placeholder="请输入责任人" :readonly="readonly"></div>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
            <!--流转信息-->
            <slot name="history-flow"></slot>
        </div>

        <!--内容选择-->
        <SuperSelect ref="addMonthSelect" @confirm="changeMonthItem">分类选择</SuperSelect>
        <SuperSelect ref="addItemOption" @confirm="changeItemOption">选项</SuperSelect>
        <mt-datetime-picker ref="openTimeRef" v-model="predictTimePicker" @confirm="selectTimeConfirm" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日"></mt-datetime-picker>

    </div>

</template>
<script>
    import { Toast,MessageBox } from 'mint-ui'
    import { splitFileName } from '@/util/utils'
    import {base,postTokenData,targetStatus,formatDate} from '@/util/common'
    import {getSelectData,getPlanSelect} from '@/util/getData'
    import SuperSelect from '@/components/superSelect'
    import addType from './addType'
    export default {
        name: 'monthPlanItem',
        data () {
            return {
                tabIndex: 0,
                tabType: 'objPoint',
                addType: '目标点',
                planType: [
                    {type:'objPoint',name:'目标跟进'},
                    {type:'newShop',name:'新店开业'},
                    {type:'extendShop',name:'扩店开业'},
                    {type:'reNewShop',name:'续签门店'},
                    {type:'closeShop',name:'闭店门店'},
                    {type:'brand',name:'拜访品牌'}
                ],
                //保存数据
                reqObjPointTraceParams: [],//目标点
                reqNewShopOpenParams: [],//新店
                reqExtendShopOpenParams: [],//扩店
                reqReNewShopParams: [],//续签,
                reqCloseShopParams: [],//闭店
                reqBrandAddParams: [],//品牌

                //选择数据
                selectTotal:[],//选择数据缓存效验
                selectTimeType:'',
                predictTimePicker:new Date(),
                objPoint: [],//目标点
                newShop: [],//新店
                extendShop: [],//扩店
                reNewShop: [],//续签
                closeShop: [],//闭店
                brand: [],//品牌
                shopDecidedType:[{id:1,name:'新店'},{id:2,name:'扩店'}],//定店类型
                currentMonthObjStatus: [],//当月目标点状态
                projectName: [],//项目名称
                budgetFlag: [{id:1,name:'预算内'},{id:2,name:'预算外'}],//预算内外
                closeReason: [],//闭店原因
            }
        },
        props: {
            readonly:{
                default: false,
                type: Boolean,
            },
            pageParam:{
                type: Object,
                default: ()=> {
                    return {};
                }
            }
        },
        components: {
            SuperSelect
        },
        created() {

        },
        mounted() {
        },
        methods: {
            targetStatus,
            formatDate,
            //添加子类选择
            addPlanItem(){
                let {tabIndex,tabType} = this;
                let {yearAndMonth,level3} = this.pageParam;
                if (!yearAndMonth) {MessageBox.alert('请选择月份！','提示');return false;}
                if (!level3) {MessageBox.alert('请选择所属开发部！','提示');return false;}
                //获取数据
                if (this[tabType].length){
                    this.$refs.addMonthSelect.open(this[tabType],'',tabType);
                } else {
                    getPlanSelect(tabType).then((res)=>{
                        this[tabType] = [...res];
                        this.$refs.addMonthSelect.open(this[tabType],'',tabType);
                    })
                }
            },
            changeMonthItem(val,type){
                let itemObj = addType[type];
                //判断是否存在
                if (this.selectTotal.indexOf(val.formalCode) > -1 || this.selectTotal.indexOf(val.code) > -1 || this.selectTotal.indexOf(val) > -1){
                    MessageBox.alert('目标点选择重复！', '提示');
                    return false;
                }
                if (type === 'objPoint'){
                    itemObj = {
                        ...itemObj,
                        code: val.formalCode,
                        objName: val.name,
                        objStatus: val.status,
                        devName: val.devStaffName,
                        otherId: val.id
                    };
                    //添加
                    this.selectTotal.push(val.formalCode);
                    this.reqObjPointTraceParams.unshift(itemObj);
                }
                if (type === 'newShop' || type === 'extendShop'){
                    let filedName = 'reqNewShopOpenParams';
                    itemObj = {
                        ...itemObj,
                        code: val.code,
                        shopName: val.name,
                        devName: val.devStaffName,
                        otherId: val.id,
                        projectProgress: val.processStatus,
                        projectProgressName: val.processStatusName
                    };
                    if (type === 'extendShop') filedName = 'reqExtendShopOpenParams';
                    //添加
                    this.selectTotal.push(val.code);
                    this[filedName].unshift(itemObj);
                }
                if (type === 'reNewShop'){
                    itemObj = {
                        ...itemObj,
                        code: val.code,
                        shopName: val.name,
                        devName: val.devStaffName,
                        otherId: val.id
                    };
                    //添加
                    this.selectTotal.push(val.code);
                    this.reqReNewShopParams.unshift(itemObj);
                }
                if (type === 'closeShop'){
                    itemObj = {
                        ...itemObj,
                        code: val.code,
                        shopName: val.name,
                        devName: val.devStaffName,
                        otherId: val.id,
                        shopNature: val.shopNature
                    };
                    //添加
                    this.selectTotal.push(val.code);
                    this.reqCloseShopParams.unshift(itemObj);
                }
                if (type === 'brand'){
                    itemObj = {
                        ...itemObj,
                        brandName: val,
                    };
                    //添加
                    this.selectTotal.push(val);
                    this.reqBrandAddParams.unshift(itemObj);
                }
                console.log(val,type,'select');
            },
            //删除指定项
            delAppointItem(param){
                let delIndex;
                let {selectTotal} = this;
                let index = param.index;
                let filed = param.filed;
                let tag = param.tag;
                //缓存数组序号
                if (selectTotal.length){
                    delIndex = selectTotal.indexOf(tag);
                }
                console.log(this[filed]);
                console.log(this.selectTotal);
                console.log('删除 》》》》》》》 ');
                MessageBox.confirm('确定删除此项！','提示',{
                    closeOnClickModal:false
                }).then(({ value, action }) => {
                    this[filed].splice(index,1);//删除当前项
                    this.selectTotal.splice(delIndex,1);//删除缓存选择
                    console.log(this[filed]);
                    console.log(this.selectTotal);
                }).catch((data)=>{
                    console.log(data)
                });

            },
            //清除数据
            clearAddData(){
                this.reqObjPointTraceParams= [];
                this.reqNewShopOpenParams= [];
                this.reqExtendShopOpenParams= [];
                this.reqReNewShopParams= [];
                this.reqCloseShopParams= [];
                this.reqBrandAddParams= [];
                this.selectTotal= [];
            },
            //内容选择
            selectItemOption(selectParam){
                if (this.readonly) return false;
                if (selectParam.name == 'currentMonthObjStatus'){
                    getSelectData('staticList',{type:'status'}).then((res)=>{
                        this.currentMonthObjStatus = [...res];
                        this.$refs.addItemOption.open(this[selectParam.name],'',selectParam);
                    })
                } else if(selectParam.name == 'projectName'){//品牌信息
                    getPlanSelect('brandName',{brandName:selectParam.brand}).then((res)=>{
                        this.projectName = res;
                        this.$refs.addItemOption.open(this[selectParam.name],'',selectParam);
                    })
                } else if(selectParam.name == 'closeReason'){//闭店原因
                    getSelectData('staticList',{type:'close_reason'}).then((res)=>{
                        this.closeReason = res;
                        this.$refs.addItemOption.open(this[selectParam.name],'',selectParam);
                    })
                } else {
                    this.$refs.addItemOption.open(this[selectParam.name],'',selectParam);
                }
            },
            changeItemOption(val,param){
                 console.log(param);
                let iFiled = param.filed;
                let iIndex = param.index;
                let iName = param.name;

                const thisObj = this[iFiled][iIndex];
                if (iName == 'projectName'){//品牌信息
                    let brand = this[iFiled][iIndex].brandName;
                    getPlanSelect('brandInfo',{brandName:brand,projectName:val}).then((res)=>{
                        console.log(res);
                        this[iFiled][iIndex].projectName= val;
                        this[iFiled][iIndex].otherId= res.id;
                        this[iFiled][iIndex].dockerName= res.pickUpName;
                        this[iFiled][iIndex].dockerPhone= res.pickUpPhone;
                        this[iFiled][iIndex].brandStatus= res.status;
                        this.$set(thisObj,'brandStatusName',res.statusName);
                    })
                } else {
                    thisObj[iName] = val.id;
                    this.$set(thisObj,iName+'Name',val.name);
                }

            },
            //时间日期选择
            selectDateTime(selectParam){
                console.log('selectDateTime >>>>>>> ');
                console.log(selectParam);
                if (this.readonly) return false;
                console.log('selectDateTime <<<<<<< ');
                this.selectTimeType = selectParam;
                this.$refs.openTimeRef.open();
            },
            //时间日期确定
            selectTimeConfirm(val){
                console.log(val);
                let formatTime = '';
                let tType = this.selectTimeType;
                let iFiled = tType.filed;//reqObjPointTraceParams
                let iIndex = tType.index;
                let iName = tType.name;//predictDecidedTime
                if (val){
                    if (iName == 'predictDecidedTime' || iName == 'predictOpenTime'){
                        let setName = '';
                        switch (iName){
                            case 'predictDecidedTime': setName = 'shopDecidedFlag'; break;
                            case 'predictOpenTime': setName = 'shopOpenFlag'; break;
                        }
                        const {yearAndMonth} = this.pageParam;
                        let selectYm = this.transYearMonth(val);
                        if (selectYm == yearAndMonth){
                            this[iFiled][iIndex][setName] = '1';//是
                        } else {
                            this[iFiled][iIndex][setName] = '0';//否
                        }
                    }
                    formatTime = new Date(val).getTime();
                    this.$set(this[iFiled][iIndex],iName,formatTime)
                }
            },
            // 转化年月
            transYearMonth(val){
                let data = new Date(val);
                let year = data.getFullYear();
                let month = data.getMonth()+1;
                month = month < 10 ? "0" + month : month;
                return year + month;
            },
            // TAB切换
            tabItemSelect(val,type){
                this.tabIndex = val;
                this.tabType = type;
                if (val === 0){
                    this.addType = '目标点'
                } else if (val === 5){
                    this.addType = '品牌'
                } else{
                    this.addType = '门店'
                }
            },
            //计算涨幅
            rentRatio(param){
                let iFiled = param.filed;
                let iIndex = param.index;
                let iName = param.name;
                let {oldRent,rent} = this[iFiled][iIndex];
                let perNum = '';
                if (oldRent && rent){
                    perNum = (((rent - oldRent)*100)/oldRent).toFixed(2);
                }
                this[iFiled][iIndex][iName] = perNum;
                if (perNum !='') return perNum + '%';
            },
            //保存数据
            savePlanData(){
                let {reqObjPointTraceParams,reqNewShopOpenParams,reqExtendShopOpenParams,reqReNewShopParams,reqCloseShopParams,reqBrandAddParams} = this;
                let allItem = {
                    reqObjPointTraceParams,
                    reqNewShopOpenParams,
                    reqExtendShopOpenParams,
                    reqReNewShopParams,
                    reqCloseShopParams,
                    reqBrandAddParams
                };
                this.$emit("itemData", allItem);
            }
        },
        computed:{
        },
        watch: {
            selectTotal(newVal, oldVal) {
                let itemNum = 0;
                newVal.length ? itemNum = parseInt(newVal.length) : 0;
                this.$emit("update:followup", itemNum);
            },

        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .mass-tab {
        padding-top: p2r(10px);
    }
    .mass-tab-title {
    li {
    span {
        display: inline-block;
        width: p2r(40px);
    }
    }
    }
    .target-list {
    ul {
    li {
        margin-bottom: p2r(10px);
    }
    }

    }
</style>