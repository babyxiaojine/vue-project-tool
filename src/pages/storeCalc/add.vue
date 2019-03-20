<template>
    <div class="wrapper store-calc">
        <div class="store-calc-add">
            <div class="row-list bdtb">

                <div class="row-list-item" @click="$refs.calcStartRef.open()">
                    <div class="cell-title">开始时间</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="calcStartFormatTime" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="calcEndSelect">
                    <div class="cell-title">结束时间</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="calcEndFormatTime" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="storeSelect(0)">
                    <div class="cell-title">目标点</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="targetName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="storeSelect(1)">
                    <div class="cell-title">参考门店</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="shopName" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="getAdjustParam('custNumberRef','customersNumber','Adjust_Param')">
                    <div class="cell-title cell-wide">客单数调整系数</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="postParam.customOrderNumAdjustParam" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="getAdjustParam('custPriceRef','customersPrice','Adjust_Param')">
                    <div class="cell-title cell-wide">客单价调整系数</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="postParam.customOrderFeeAdjustPara" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>
                <!--pattern="[^0-9.]*"-->
                <div class="row-list-item"><div class="cell-title">租赁税率</div><div class="cell-value"><input class="ipt-data" type="number" v-model="postParam.rentRate" oninput="this.value=this.value.replace(/[^0-9.]+/,'')" placeholder="请输入租赁税率"></div></div>
                <div class="row-list-item"><div class="cell-title">定价毛利</div><div class="cell-value"><input class="ipt-data" type="number" v-model="postParam.grossProfit" oninput="this.value=this.value.replace(/[^0-9.]+/,'')" placeholder="请输入定价毛利"></div></div>
                <div class="row-list-item" @click="$refs.humanTrafficRef.open()">
                    <div class="cell-title">是否数人流量</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="isPeopleCount" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i></div>
                </div>

            </div>
            <div class="foot-submit">
                <div class="fix-area">
                    <button class="btn" type="button" @click="calcStoreSubmit" :disabled="submitDisbled">开始测算</button>
                </div>
            </div>

        </div>

        <mt-datetime-picker ref="calcStartRef" v-model="calcStartPicker" @confirm="calcStartConfirm" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日">开始日期</mt-datetime-picker>
        <mt-datetime-picker ref="calcEndRef" :startDate="calcStartTime ? new Date(calcStartTime):new Date()" v-model="calcEndPicker" @confirm="calcEndConfirm" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日">结束日期</mt-datetime-picker>
        <selectPicker ref="custNumberRef" :options="customersNumber" @confirm="custNumberConfirm">客单数调整系数</selectPicker>
        <selectPicker ref="custPriceRef" :options="customersPrice" @confirm="custPriceConfirm">客单价调整系数</selectPicker>
        <selectPicker ref="humanTrafficRef" :options="isHumanTraffic" @confirm="humanTrafficConfirm">是否数人流量</selectPicker>


    </div>
</template>



<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,gaode2baidu} from '@/util/common'
  import {getSelectData} from '@/util/getData'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'calcAdd',
    data() {
      return {
        objId: '',
        postParam: {
          "customOrderFeeAdjustPara": '',
          "customOrderNumAdjustParam": '',
          "grossProfit": "",
          "ifPeopleCount": "",
          "objFlowNum": '',
          "objId": "",
          "rentRate": "",
          "shopCustomOrderFee": '',
          "shopCustomOrderNumber": '',
          "shopFlowNum": '',
          "shopId": ""
        },
        shopName: '',//参考门店名
        targetName: '',//目标点名称
        level4: '',//区域id,
        calcStartTime: '',//选择后开始时间(时间戳)
        calcEndTime: '',//选择后结束时间(时间戳)
        isPeopleCount: '',//是否人流量
        submitDisbled: false,

        //选择框数据
        customersNumber: [],//客单数系数
        customersPrice: [],//客单价系数
        isHumanTraffic: [{id: "0", name: "是"}, {id: "1", name: "否"}],//是否数人流量
        calcStartPicker:new Date(),//选择起始时间
        calcEndPicker:new Date(),//选择结束时间

      }
    },
    components: {
      selectPicker
    },
    created() {
      const routeParam = this.$route.params;
      if (routeParam.tid) this.objId = routeParam.tid;
      //选择门店信息缓存数据
      let selectParam = this.calcSelectData;
      if (selectParam){
        this.calcStartTime = selectParam.startTime;
        this.calcEndTime = selectParam.endTime;
        if (selectParam.store){
          let storeParam = selectParam.store;
          this.shopName = storeParam.name;
          this.postParam = {
            ...this.postParam,
            shopId: storeParam.id,
            shopFlowNum: storeParam.flowCount,
            shopCustomOrderFee: storeParam.shopCustomOrderFee,
            shopCustomOrderNumber: storeParam.shopCustomOrderNum
          }
        }
        if (selectParam.target){
          let targetParam = selectParam.target;
          this.targetName = targetParam.name;
          this.postParam = {
            ...this.postParam,
            objId: targetParam.id,
            objFlowNum: targetParam.flowCount,
          }
        }

      }
    },
    mounted() {
      // this.getOfficialDetail(this.objId,0);
      // this.initScrollNav();
      if (this.postParam.objId) this.rentGrossInfo();
    },
    methods: {
      formatDate,
      //开始时间
      calcStartConfirm(res){
        this.calcStartTime = new Date(res).getTime();
        this.calcEndTime = '';//清空结束时间
      },
      //结束时间
      calcEndSelect(){
        let {calcStartTime} = this;
        if (calcStartTime){
          this.$refs.calcEndRef.open();
        } else {
          MessageBox.alert('请先选择开始时间！', '提示');
        }
      },
      calcEndConfirm(res){
        let dayTime = 24*60*60*1000 - 1;
        this.calcEndTime = new Date(res.toLocaleDateString()).getTime() + dayTime;
      },
      //参考门店
      storeSelect(type){
        let {calcStartTime,calcEndTime,targetName} = this;
        if (type == 0 && (!calcStartTime || !calcEndTime)) {
          MessageBox.alert('请选择时间！', '提示');
          return false;
        }
        if (type == 1 && !targetName) {
          MessageBox.alert('请选择目标点！', '提示');
          return false;
        }
        this.$router.push({
          // path: '/storeCalc/selectData',
          name:'StoreCalcSelectData',
          params: {
            selectType: type,
            startTime: calcStartTime,
            endTime: calcEndTime
          }
        })
      },
      //客单数
      custNumberConfirm(res){
        this.postParam = {
          ...this.postParam,
          customOrderNumAdjustParam: res.id
        }
      },
      //客单价
      custPriceConfirm(res){
        this.postParam = {
          ...this.postParam,
          customOrderFeeAdjustPara: res.id
        }
      },
      //是否数人流量
      humanTrafficConfirm(res){
        this.postParam = {
          ...this.postParam,
          ifPeopleCount: res.id
        }
        this.isPeopleCount = res.name;
      },
      //获取到目标点的租赁税率和毛利
      rentGrossInfo(){
        let {calcStartTime,calcEndTime} = this;
        let postParam = {
          objId: this.postParam.objId,
          startDate: calcStartTime,
          endDate: calcEndTime
        };
        postTokenData(base.basePath + '/daily/fixedPointPredict/rentRateAndGrossProfit',postParam, {
          success: (res)=> {
            if (res.success) {
              let resData = res.data || {};
              // console.log(resData,'获取到目标点的租赁税率和毛利');
              this.postParam = {
                ...this.postParam,
                grossProfit: resData.grossProfit,
                rentRate: resData.rentRate,
              }
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      },
      //客单价客单数
      getAdjustParam(refName,resList,postType){
        let {level3,level2} = this;
        this.$refs[refName].open();
        if(this[resList].length < 1){
          getSelectData('dicList',{type:postType}).then((res)=>{
            this[resList] = [...res];
          });
        }

      },
      //开始测算
      calcStoreSubmit(){
        let {postParam} = this;
        this.submitDisbled = true;
        for (let key in postParam){
          if (postParam[key] == ''){
            MessageBox.alert('选择参数不能为空！', '提示');
            this.submitDisbled = false;
            return false;
          }
        }
        // console.log(postParam,'参数');
        postTokenData(base.basePath + '/daily/fixedPointPredict/predict',postParam, {
          success: (res)=> {
            if (res.success) {
              if (res.data){
                this.$router.push({
                  // path: '/storeCalc/detail',
                  name:'StoreCalcDetail',
                  params: {
                    detailData: res.data
                  }
                });
                this.$store.commit('pageCache/clearCache','calcStoreSelect');//清除数据
              }
              // console.log(res.data,'开始测算');
            } else {
              this.submitDisbled = false;
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            this.submitDisbled = false;
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      }


    },
    computed: {
      ...mapState({
        calcSelectData: state => state.pageCache.calcStoreSelect,
      }),
      calcStartFormatTime:function(){
        return  this.calcStartTime ? formatDate(this.calcStartTime):'';
      },
      calcEndFormatTime:function(){
        return  this.calcEndTime? formatDate(this.calcEndTime):'';
      },

    },
    watch: {
      //结束日期开始
      // calcStartTime: (val)=> {
      //   this.calcEndOrigin = JSON.parse(JSON.stringify(new Date(val)));
      // },
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';

    .cell-wide {
        width: p2r(180px);
    }

</style>
