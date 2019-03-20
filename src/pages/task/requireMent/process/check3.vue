<template>
    <div class="wrapper scroll-layout">

        <scrollTab :options="tabList" @changeMenu="selectTabContent" class="roll-head"></scrollTab>

        <div class="scroll-tab-cont" :class="(readonlyType == 1 || readonlyType == 3) ? 'roll-main':'roll-area'" ref="scrollContainer">
            <div class="tab-item process-base" v-show="tabIndex == 0">
                <div class="row-list bdtb" v-if="'base'">
                    <div class="row-list-item"><div class="cell-title appr-lab">开发人员</div><div class="cell-value">{{apprDetail.developName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">开发人员联系电话</div><div class="cell-value">{{apprDetail.developPhone}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">通知测量时间</div><div class="cell-value">{{formatDate(apprDetail.notificatsurveyDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">预计进场时间</div><div class="cell-value">{{formatDate(apprDetail.expectedDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">设计公司</div><div class="cell-value">{{apprDetail.designCompanyName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">设计公司短信接收号码</div><div class="cell-value">{{apprDetail.messagePhone}}</div></div>
                    <div class="row-list-item" v-if="apprDetail.measuringCompanyName"><div class="cell-title appr-lab">测量公司</div><div class="cell-value">{{apprDetail.measuringCompanyName}}</div></div>
                    <div class="row-list-item"><div class="cell-title appr-lab">业主意见</div><div class="cell-value">{{apprDetail.owersRemark}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">业主签字</div>
                        <div class="cell-value"><input placeholder="业主签字" type="text" class="ipt-data" readonly="" value="点击查看"  @click="$refs.drawSignCanvas.open(apprDetail.ownersOption,true)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <!-- <div class="row-list-item"><div class="cell-title appr-lab">业主签字日期</div><div class="cell-value">{{apprDetail.createDate}}</div></div> -->

                    <template v-if="apprDetail.franRemark">
                        <div class="row-list-item"><div class="cell-title appr-lab">加盟商意见</div><div class="cell-value">{{apprDetail.franRemark}}</div></div>
                        <div class="row-list-item">
                            <div class="cell-title appr-lab">加盟商签字</div>
                            <div class="cell-value"><input placeholder="加盟商签字" type="text" class="ipt-data" readonly="" value="点击查看"  @click="$refs.drawSignCanvas.open(apprDetail.franOption,true)"><i class="iconfont icon-right-arrow"></i></div>
                        </div>
                    </template>
                    <div class="row-list-item"><div class="cell-title appr-lab">开发意见</div><div class="cell-value">{{apprDetail.developRemark}}</div></div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">开发签字</div>
                        <div class="cell-value"><input placeholder="开发签字" type="text" class="ipt-data" readonly="" value="点击查看"  @click="$refs.drawSignCanvas.open(apprDetail.developOption,true)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                    <!-- <div class="row-list-item"><div class="cell-title appr-lab">开发签字日期</div><div class="cell-value">{{apprDetail.createDate}}</div></div> -->
                    <div class="row-list-item"><div class="cell-title appr-lab">实际测量时间</div><div class="cell-value">{{formatDate(measure.actualsurveyDate,'yyyy-MM-dd')}}</div></div>
                    <div class="row-list-item">
                      <div class="cell-title appr-lab">设计开始时间</div>
                      <div class="cell-value" v-if="readonlyType == 2"><input placeholder="设计开始时间" type="text" class="ipt-data" readonly="" :value="formatDate(measure.designschemeDate,'yyyy-MM-dd')"  @click="$refs.designschemeDate.open()"><i class="iconfont icon-right-arrow"></i></div>
                      <div class="cell-value" v-else>{{formatDate(measure.designschemeDate,'yyyy-MM-dd')}}</div>
                    </div>
                </div>
                <div class="row-list bdtb" v-if="'base'">
                    <div class="row-list-item row-column">
                        <div class="cell-title appr-lab">测量人员意见</div>
                        <div class="cell-value"><textarea name="" rows="5" v-model="measure.surveyorRemark" placeholder="请输入审批意见" :readonly="readonly"></textarea></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">测量人员签字</div>
                        <div class="cell-value"><input placeholder="测量人员签字" type="text" class="ipt-data" readonly="" :value="measure.surveyorOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('surveyorOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                </div>
                <div class="row-list bdtb" v-if="checkStep == 'check3' || checkStep == 'finish1'">
                    <div class="row-list-item row-column">
                        <div class="cell-title appr-lab">开发意见</div>
                        <div class="cell-value"><textarea name="" rows="5" v-model="measure.developRemark" placeholder="请输入开发意见" :readonly="readonly"></textarea></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">开发签字</div>
                        <div class="cell-value"><input placeholder="开发签字" type="text" class="ipt-data" readonly="" :value="measure.developOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('developOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                </div>
                <div class="row-list bdtb" v-if="checkStep == 'check5' || checkStep == 'finish2'">
                    <div class="row-list-item row-column">
                        <div class="cell-title appr-lab">工程意见</div>
                        <div class="cell-value"><textarea name="projectRemark" rows="5" v-model="measure.projectRemark" placeholder="请输入开发意见" :readonly="readonly"></textarea></div>
                    </div>
                    <div class="row-list-item">
                        <div class="cell-title appr-lab">工程签字</div>
                        <div class="cell-value"><input placeholder="工程签字" type="text" class="ipt-data" readonly="" :value="measure.projectOption ? '已签字，点击查看' : ''"  @click="openSignCanvas('projectOption',readonly)"><i class="iconfont icon-right-arrow"></i></div>
                    </div>
                </div>

            </div>

            
            <div class="tab-item" v-show="tabIndex == 1">
                <form action="" ref="photoForm">
                  <imgPart :readonly="readonly" :imgParam="measure" :measure.sync="measure"></imgPart>
                </form>
            </div>
            <template v-if="readonlyType != 1">
              <div class="tab-item" v-show="tabIndex == index + 2" v-for="(item,index) in apprDetail.templateHtml" :key="index">
                  <form ref="templateHtml">
                      <div class="template-html" v-html="item.tabValue"></div>
                  </form>
              </div>
            </template>
            <!--流转信息-->
            <slot name="history-flow"></slot>
        </div>
        
        <DrawSign @success="signSuccess" ref="drawSignCanvas"></DrawSign>
        <mt-datetime-picker ref="designschemeDate" :startDate="new Date()" type="date" @confirm="select_designschemeDate"></mt-datetime-picker>
        <slot name="foot-submit"></slot>

    </div>
</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,objectParams} from '@/util/common'
  import {formatForm, validRules} from '@/util/utils'
  import scrollTab from '@/components/scrollTab'
  import DrawSign from '@/components/drawSign'
  import imgPart from './check3img'
  import HistoryFlow from '@/pages/task/historyFlow'
  export default {
    name: 'Check3',
    data() {
      return {
        tabList: ['流程信息','照片'],
        tabIndex: 0,
        readonly:false,
        apprDetail: {},
        measure: {
          surveyorOption: '',//测量人员签字 ,
          surveyorRemark: '',//测量人员意见 ,
          developOption: '',//开发签字 ,
          developRemark: '',//开发意见 ,
          projectOption: '',//工程签字 ,
          projectRemark: '',//工程意见 ,
          handPainting: '',//手绘平面图 ,
          iAngleOne: '',//内部照片-角度1 ,
          iAngleTwo: '',//内部照片-角度2 ,
          iAngleThree: '',//内部照片-角度3 ,
          iAngleFour: '',//内部照片-角度4 ,
          iAngleFive: '',//内部照片-角度5 ,
          iAngleSix: '',//内部照片-角度6 ,
          iAngleSeven: '',//内部照片-角度7 ,
          iAngleEight: '',//内部照片-角度8 ,
          measuringFilePath: '',//测量资料路径 ,
          oLeftRight: '',//外部照片-门口-从左到右 ,
          oMiddle: '',//外部照片-门口-正对 ,
          oRightLeft: '',//外部照片-门口-从右到左 ,
          pAngleOne: '',//局部照片-角度1 ,
          pAngleTwo: '',//局部照片-角度2 ,
          pAngleThree: '',//局部照片-角度3 ,
          pAngleFour: '',//局部照片-角度4 ,
          pAngleFive: '',//局部照片-角度5 ,
        },
        activeSign: '',//签名

      }
    },
    props:{
      readonlyType:{
        type: Number,
        default: 0
      },
      initData:{
        type:Object,
        default:{}
      },
      pageAuth:{
        type:Object,
        default:{
          new:false,
          heavy:false,
          light:false,
        }
      },
      checkStep:{
        default:'',
        type:String
      }
    },
    components: {
      DrawSign,
      imgPart,
      HistoryFlow,
      scrollTab
    },
    created() {

    },
    mounted() {
      this.readonly = !!this.readonlyType;
      this.getApprovalDetail();
    },
    methods: {
      formatDate,
      // 选择设计开始时间
      select_designschemeDate(res){
        this.measure = {
          ...this.measure,
          designschemeDate : new Date(res).getTime()
        }
      },
      //获取详情数据
      getApprovalDetail(id,type){
        let resData = this.initData;
        return new Promise((resolve, reject)=>{
            let {tabList,measure,readonly,readonlyType} = this;

            this.measure = {
              ...this.measure,
              ...resData.measure,
              measuringFilePath: resData.measuringFilePath,
            };

            if(!readonlyType){ //判断check3或check5条件下，清空带入签字和意见
              this.measure = {
                ...this.measure,
                surveyorOption: '',//测量人员签字 ,
                surveyorRemark: '',//测量人员意见 ,
                developOption: '',//开发签字 ,
                developRemark: '',//开发意见 ,
                projectOption: '',//工程签字 ,
                projectRemark: '',//工程意见 ,
              }
            }
            // if (resData.measure){
            //   let resMeasure = resData.measure;
            //   for (let key in resMeasure){
            //     if (measure[key] !== 'undefined' && measure.hasOwnProperty(key)){
            //       this.measure[key] = resMeasure[key];
            //     }
            //   }
            // }

            if(resData.templateHtml) {
              let otherTab = resData.templateHtml;
              if(this.readonlyType!=1){

                for (let i = 0; i < otherTab.length; i++){
                  tabList.push(otherTab[i].tabName);
                  if(readonly){
                      otherTab[i].tabValue = otherTab[i].tabValue.replace(new RegExp('input','gm'),'input disabled="disabled"');
                  }
                  
                }
                this.tabList = tabList;
              }
            }
            this.apprDetail = {...resData};
            resolve();
        })

      },
      // 切换tab选择
      selectTabContent(param){
        this.tabIndex = param.index;//当前页面TAB索引
        this.$refs.scrollContainer.scrollTop = 0;
      },
      // 打开签名
      openSignCanvas(s,readonly){
        this.activeSign = s;
        this.$refs.drawSignCanvas.open(this.measure[s],readonly)
      },
      // 签名完成回调
      signSuccess(res){
        const tag = this.activeSign;
        this.measure[tag] = res;
      },
      // 发送模板数据
      postData(){
        let procData = this.measure;
        let resFlag = true;
        if(this.readonlyType == 2){
          procData = {
            designschemeDate: this.measure.designschemeDate
          }
        }else{
          let errormsg = {
            handPainting: '请选择手绘平面图' ,
            iAngleEight: '请选择内部照片-角度8' ,
            iAngleFive: '请选择内部照片-角度5' ,
            iAngleFour: '请选择内部照片-角度4' ,
            iAngleOne: '请选择内部照片-角度1' ,
            iAngleSeven: '请选择内部照片-角度7' ,
            iAngleSix: '请选择内部照片-角度6' ,
            iAngleThree: '请选择内部照片-角度3' ,
            iAngleTwo: '请选择内部照片-角度2' ,
            oLeftRight: '请选择外部照片-门口-从左到右' ,
            oMiddle: '请选择外部照片-门口-正对' ,
            oRightLeft: '请选择外部照片-门口-从右到左' ,
            pAngleFive: '请选择局部照片-角度5' ,
            pAngleFour: '请选择局部照片-角度4' ,
            pAngleOne: '请选择局部照片-角度1' ,
            pAngleThree: '请选择局部照片-角度3' ,
            pAngleTwo: '请选择局部照片-角度2' ,
            measuringFilePath: '请选择测量资料路径' ,
            developOption: '请输入开发签字' ,
            developRemark: '请输入开发意见,字数限制10-50字' ,
            projectOption: '请输入工程签字' ,
            projectRemark: '请输入工程意见,字数限制10-50字' ,
            surveyorOption: '请输入测量人员签字' ,
            surveyorRemark: '请输入测量人员意见,字数限制10-50字' ,
          }
          let addData = {}
          for(let i in procData){
            if(this.checkStep==='check3' || this.checkStep==='finish1'){
              if(i==='projectOption' || i=='projectRemark'){
                continue;
              }
            }else{
              if(i==='developOption' || i=='developRemark'){
                continue;
              }
            }
            if( i !== 'measuringFilePath' && !procData[i]){
              resFlag = false;
              Toast({message: errormsg[i], iconClass: 'mintui mintui-field-error'})
              break;
            }
            if(i === 'developRemark' || i === 'projectRemark' || i === 'surveyorRemark'){ //验证备注
              if(!validRules.remark3.test(procData[i])){
                resFlag = false;
                Toast({message: errormsg[i], iconClass: 'mintui mintui-field-error'})
                break;
              }
            }
          }        
        }

        return resFlag ? procData : false;
      },
      // 发送模板数据
      queryData(){
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
      }


    },
    computed: {

    },
    watch: {
      measure: (val)=>{
        console.log(val, '子组件参数')
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
            padding: p2r(10px 0);
        }
    }

    .row-list-item {
        .appr-lab {
            width: p2r(160px);
        }
    }

    .process-base {
        .row-list {
            margin-bottom: p2r(10px);
            &:last-child {
                margin: 0;
            };
        }
    }

</style>
