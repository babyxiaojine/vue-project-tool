<template>

        <div class="scroll-tab-cont" :class="!readonly?'roll-area':'roll-main'" ref="scrollContainer">
            <div class="tab-item process-base" v-show="tabIndex == 0">
                <div class="row-list bdtb" v-if="'base'">
                    <div class="row-list-item"><div class="cell-title appr-lab">店号</div><div class="cell-value">{{apprDetail.shopCode}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">归属门店</div><div class="cell-value">{{apprDetail.shopName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">门店性质</div><div class="cell-value">{{apprDetail.shopNatureName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">门店经营范围</div><div class="cell-value">{{apprDetail.businessScopeName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">门店装修类型</div><div class="cell-value">{{decorationType(apprDetail.decorationType)}}</div></div>
                    <div class="row-list-item" @click="selectItemOption('shopOpenNature')">
                        <div class="cell-title appr-lab">门店开业性质</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="apprDetail.shopOpenNatureName" rule="required" error="请选择门店开业性质" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">归属分公司</div><div class="cell-value">{{apprDetail.level2Name}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">归属营运部</div><div class="cell-value">{{apprDetail.level3Name}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">归属区域</div><div class="cell-value">{{apprDetail.level4Name}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">门店地址</div><div class="cell-value">{{apprDetail.address}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">临近银行</div>
                        <div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="apprDetail.nearBank" rule="required" error="请输入临近银行" :placeholder="!readonly && '请输入临近银行'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">原门店号</div><div class="cell-value">{{apprDetail.oldShopCode}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">原门店</div><div class="cell-value">{{apprDetail.oldShopName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">原门店性质</div><div class="cell-value">{{apprDetail.oldShopNatureName}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">房东特殊要求</div>
                        <div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="apprDetail.specialRemarks" :placeholder="!readonly && '请输入房东特殊要求'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">商品配货特殊要求</div>
                        <div class="cell-value"><input class="ipt-data" type="text" maxlength="50" v-model="apprDetail.goodsRemarks" :placeholder="!readonly && '请输入商品配货特殊要求'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">预估销售额</div><div class="cell-value">{{apprDetail.foreCastSale}}</div></div>
                    <div class="row-list-item row-column">
                        <div class="cell-title appr-lab">备注</div>
                        <div class="cell-value"><textarea name="projectRemark" rows="5" v-model="apprDetail.remarks" :placeholder="!readonly && '请输入备注'" :readonly="readonly"></textarea></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">测量人员签字</div>
                        <div class="cell-value"><input placeholder="测量人员签字" type="text" class="ipt-data" rule="required" error="测量人员没有签字" readonly="" :value="apprDetail.surveyorSign ? '已签字，点击查看' : ''"  @click="openSignCanvas('surveyorSign',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" v-if="apprDetail.signDate"><div class="cell-title appr-lab">测量人员签字时间</div><div class="cell-value">{{formatDate(apprDetail.signDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">开发签字</div>
                        <div class="cell-value"><input placeholder="开发签字" type="text" class="ipt-data" rule="required" error="开发没有签字" readonly="" :value="apprDetail.developerSign ? '已签字，点击查看' : ''"  @click="openSignCanvas('developerSign',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" v-if="apprDetail.signDate"><div class="cell-title appr-lab">开发签字日期</div><div class="cell-value">{{formatDate(apprDetail.signDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">工程签字</div>
                        <div class="cell-value"><input placeholder="工程签字" type="text" class="ipt-data" rule="required" error="工程专员没有签字" readonly="" :value="apprDetail.engineerSign ? '已签字，点击查看' : ''"  @click="openSignCanvas('engineerSign',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <div class="row-list-item" v-if="apprDetail.signDate"><div class="cell-title appr-lab">工程签字日期</div><div class="cell-value">{{formatDate(apprDetail.signDate,'yyyy-MM-dd')}}</div></div>
                </div>

            </div>

            <div class="tab-item process-base" v-show="tabIndex == 1">
                <div class="row-list bdtb" v-if="'base'">
                    <div class="row-list-item"><div class="cell-title appr-lab">区域经理</div><div class="cell-value">{{apprDetail.regionManageName}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">区域经理联系电话</div>
                        <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.regionalManagerPhone" rule="mobile" error="区域经理联系电话格式不正确" :placeholder="!readonly && '请输入区域经理联系电话'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">工程专员</div><div class="cell-value">{{apprDetail.engineName}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">工程专员联系电话</div>
                        <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.enginePhone" rule="mobile" error="工程专员联系电话格式不正确" :placeholder="!readonly && '请输入工程专员联系电话'" :readonly="readonly"></div>
                    </div>
                    <!--加盟店字段-->
                    <template v-if="apprDetail.shopNature == '2'">
                        <div class="row-list-item"><div class="cell-title appr-lab">加盟商编码</div><div class="cell-value">{{apprDetail.franCode}}</div></div>
                        <div class="row-list-item"><div class="cell-title appr-lab">加盟商名称</div><div class="cell-value">{{apprDetail.franName}}</div></div>
                        <div class="row-list-item">
                            <div class="cell-title appr-lab">加盟商联系电话</div>
                            <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.franPhone" rule="mobile" error="加盟商联系电话格式不正确" :placeholder="!readonly && '请输入加盟商联系电话'" :readonly="readonly"></div>
                        </div>
                        <div class="row-list-item"><div class="cell-title appr-lab">加盟商打款时间</div><div class="cell-value">{{formatDate(apprDetail.payDate,'yyyy-MM-dd')}}</div></div>
                        <div class="row-list-item"><div class="cell-title appr-lab">加盟商打款金额</div><div class="cell-value">{{apprDetail.payMoney}}</div></div>
                    </template>
                    <div class="row-list-item" @click="selectItemOption('devId')">
                        <div class="cell-title appr-lab">开发专员</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="apprDetail.devName" rule="required" error="请选择开发专员" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">开发专员联系电话</div>
                        <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.devPhone" rule="mobile" error="开发专员联系电话格式不正确" :placeholder="!readonly && '请输入开发专员联系电话'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">业主</div>
                        <div class="cell-value"><input class="ipt-data" type="text" v-model="apprDetail.ownerName" rule="required" error="请输入业主" :placeholder="!readonly && '请输入业主'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">业主联系电话</div>
                        <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.ownerPhone" rule="mobile" error="业主联系电话格式不正确" :placeholder="!readonly && '请输入业主联系电话'" :readonly="readonly"></div>
                    </div>

                    <div class="row-list-item"><div class="cell-title appr-lab">设计公司</div><div class="cell-value">{{apprDetail.designCompanyName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">设计师</div><div class="cell-value">{{apprDetail.designUserName}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">设计师联系电话</div>
                        <div class="cell-value"><input class="ipt-data" type="number" v-model="apprDetail.designUserPhone" rule="mobile" error="设计师联系电话格式不正确" :placeholder="!readonly && '请输入设计师联系电话'" :readonly="readonly"></div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">通知测量时间</div><div class="cell-value">{{formatDate(apprDetail.notificatsurveyDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">现场实际测量时间</div><div class="cell-value">{{formatDate(apprDetail.actualsurveyDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">预计进场时间</div><div class="cell-value">{{formatDate(apprDetail.expectedDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item" @click="selectDateTime('actualDate')">
                        <div class="cell-title appr-lab">实际进场时间</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="formatDate(apprDetail.actualDate,'yyyy-MM-dd')" rule="required" error="请选择实际进场时间" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                    <div class="row-list-item" @click="selectDateTime('planHandoverDate')">
                        <div class="cell-title appr-lab">计划交接时间</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="formatDate(apprDetail.planHandoverDate,'yyyy-MM-dd')" rule="required" error="请选择计划交接时间" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                    <div class="row-list-item"><div class="cell-title appr-lab">装修公司</div><div class="cell-value">{{apprDetail.decoretionCompany}}</div></div>
                    <div class="row-list-item" @click="selectItemOption('pmUserId')">
                        <div class="cell-title appr-lab">项目经理</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="apprDetail.pmUserName" rule="required" error="请选择项目经理" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                    <div class="row-list-item" @click="selectItemOption('engineUserId')">
                        <div class="cell-title appr-lab">工程监理</div>
                        <div class="cell-value">
                            <input class="ipt-data" type="text" :value="apprDetail.engineUserName" rule="required" error="请选择工程监理" :placeholder="!readonly && '请选择'" readonly><i v-if="!readonly" class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-item" v-show="tabIndex == index + 2" v-for="(item,index) in apprDetail.templateHtml" :key="index">
                <form ref="templateHtml">
                    <div class="template-html" v-html="item.tabValue"></div>
                </form>
            </div>
            <!--流转信息-->
            <slot name="history-flow"></slot>

            <DrawSign @success="signSuccess" ref="drawSignCanvas"></DrawSign>
            <SuperSelect ref="addItemOption" @confirm="changeItemOption">选项</SuperSelect>
            <mt-datetime-picker ref="openTimeRef" v-model="predictTimePicker" @confirm="selectTimeConfirm" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日"></mt-datetime-picker>
        </div>



</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,objectParams} from '@/util/common'
  import {getSession,formatForm,validForm} from '@/util/utils'
  import scrollTab from '@/components/scrollTab'
  import DrawSign from '@/components/drawSign'
  import SuperSelect from '@/components/superSelect'
  export default {
    name: 'ApproachDetailItem',
    data() {
      return {
        activeSign: '',//签名
        shopOpenList: [],
        templateHtml: [],
        selectList:{
          shopOpenNature:[],//门店性质
          devId:[],
          pmUserId:[],
          engineUserId:[],
        },
        selectTimeType: '',
        predictTimePicker:new Date(),
      }
    },
    props:{
      readonly:{
        default: false,
        type: Boolean
      },
      tabIndex: {
        default: 0,
        type: Number
      },
      apprDetail:{
        default: {},
        type: Object
      }
    },
    components: {
      DrawSign,
      scrollTab,
      SuperSelect
    },
    created() {
    },
    mounted() {
    },
    methods: {
      formatDate,
      //内容选择
      selectItemOption(selectParam){
        if (this.readonly) return false;
        let openItem = this.$refs.addItemOption;
        if (selectParam === 'shopOpenNature'){
          this.getOpenShopNature().then((res)=>{
            this.selectList[selectParam] = [...res];
            openItem.open(this.selectList[selectParam],'',selectParam);
          })
        } else {
          if (this.selectList[selectParam].length) {
            openItem.open(this.selectList[selectParam],'',selectParam);
          } else {
            this.getSelectList(this.apprDetail.shopId).then(()=>{
              openItem.open(this.selectList[selectParam],'',selectParam);
            });
          }
        }
      },
      changeItemOption(val,param){
        const {apprDetail} = this;
        this.apprDetail[param] = val.id;
        switch (param){
          case 'devId':
            this.$set(apprDetail,'devName',val.name);
            this.$set(apprDetail,'devPhone',val.phone);
            break;
          case 'pmUserId':
            this.$set(apprDetail,'pmUserName',val.name);
            break;
          case 'engineUserId':
            this.$set(apprDetail,'engineUserName',val.name);
            break;
          default:
            this.$set(apprDetail,param+'Name',val.name);
        }
      },
      //时间日期选择
      selectDateTime(selectParam){
        if (this.readonly) return false;
        this.selectTimeType = selectParam;
        this.$refs.openTimeRef.open();
      },
      //时间日期确定
      selectTimeConfirm(val){
        const {selectTimeType} = this;
        let formatTime = '';
        formatTime = new Date(val).getTime();
        this.$set(this.apprDetail,selectTimeType,formatTime);
      },
      // 打开签名
      openSignCanvas(s,readonly){
        this.activeSign = s;
        this.$refs.drawSignCanvas.open(this.apprDetail[s],readonly)
      },
      // 签名完成回调
      signSuccess(res){
        const tag = this.activeSign;
        if (this.apprDetail[tag]){
          this.apprDetail[tag] = res;
        } else {
          this.$set(this.apprDetail,tag,res);
        }
      },
      //装修类型
      decorationType(type){
        let typeText = '';
        if (type && typeof type !== 'string') type = type.toString();
        switch (type){
          case '0': typeText = '标准'; break;
          case '1': typeText = '旗舰'; break;
          case '2': typeText = '主题'; break;
          default:  typeText = '-';
        }
        return typeText;
      },
      //门店开业性质
      shopNature(type){
        let natureText = '';
        let shopOpenList = this.shopOpenList;
        if (shopOpenList.length){
          for (let i = 0; i < shopOpenList.length; i++){
            if (shopOpenList[i].dataId == type){
              natureText = shopOpenList[i].dataName || '';
            }
          }
        }
        return natureText;
      },
      //获取门店开业性质列表
      getOpenShopNature(){
        return new Promise((resolve, reject)=>{
          postTokenData('/approach/apply/shopOpenNatureList',{},(res)=>{
            if(res.success){
              let resData = res.data || [];
              resData.map((item,key)=>{
                item.name = item.dataName;
                item.id = item.dataId;
              });
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
            }
          })
        })
      },
      //获取开发&项目&工程列表
      getSelectList(shopId){
        return new Promise((resolve, reject)=>{
          postTokenData('/approach/apply/getUserListData',{shopId},(res)=>{
            if(res.success){
              let resData = res.data || {};
              this.selectList.devId = [...resData.devUserList];
              this.selectList.engineUserId = [...resData.engUserList];
              this.selectList.pmUserId = [...resData.pmUserList];
              resolve(resData);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
            }
          })
        })
      },
      // 发送模板数据
      queryFormData(){
        let fromParam = [];
        let fromData = this.$refs.templateHtml;
        if (fromData.length){
          for (let i = 0;i < fromData.length; i++){
            let itemParam = formatForm(fromData[i]);
            fromParam.push(objectParams(itemParam));
          }
        }
        let postForm = fromParam.join('&');
        return postForm;
      },
      getSaveData(){
        const {apprDetail} = this;
        const tempData = this.queryFormData();
        // this.$emit('itemData',apprDetail);
        this.$emit('itemData',apprDetail,tempData);
      }
    },
    computed: {

    },
    watch: {
      tabIndex(){
        this.$refs.scrollContainer.scrollTop = 0;
      }

    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';

    .scroll-layout {
        .scroll-tab-title {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        .roll-main,.roll-area {
            padding: p2r(5px 0);
        }
    }

    .row-list-item {
        .appr-lab {
            width: p2r(160px);
        }
    }

    .process-base {
        .row-list {
            margin-bottom: p2r(5px);
            &:last-child {
                margin: 0;
            };
        }
    }

</style>
