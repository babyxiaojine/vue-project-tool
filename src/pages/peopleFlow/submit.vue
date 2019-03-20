<template>
    <div class="wrapper">
        <div class="count-info row-list">
            <div class="row-list-item">
                <div class="cell-title">统计人数</div>
                <div class="cell-value">{{recordData.countNum}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">统计日期</div>
                <div class="cell-value">{{countDate}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">统计时间</div>
                <div class="cell-value">{{timeArea}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">时间区段</div>
                <div class="cell-value">{{recordData.interval == 'high' ? '高峰段' : '低峰段'}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">是否工作日</div>
                <div class="cell-value">{{isWorkday == 0 ? '否' : "是"}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">工作点类型</div>
                <div class="cell-value work-type">{{workType == 0 ? '正式目标点':'门店'}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">所属分公司</div>
                <div class="cell-value">{{loginInfo.level2Name ? loginInfo.level2Name : ''}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">{{workType == 0 ? '目标点' : '门店'}}</div>
                <div class="cell-value">{{selectInfo.shopName}}</div>
            </div>

        </div>

        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="submitCountData" :disabled="submitDisbled">提交</button>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,geoLocation,gaode2baidu,getDistance} from '@/util/common'
  export default {
    name: 'collectSubmit',
    data() {
      return {
        workType: 0,
        popupVisible: false,
        recordData: {},//页面传参
        timeArea: '',//时间区间
        countDate: '',//统计时间
        isWorkday: null,//是否工作日
        submitDisbled: false,
        locationData: {
          lat: '',
          lng: ''
        }
      }
    },
    components: {

    },
    created() {
      // let routeParam = this.$route.params.recordData;//传参
      let routeParam = this.collectInfo;//传参
      if (this.selectInfo.type) this.workType = this.selectInfo.type;//类型
      console.log(routeParam,'param');
      let sTime = routeParam.startTime.split(' ');
      let eTime = routeParam.endTime.split(' ');
      this.recordData = routeParam;//传参
      this.timeArea = sTime[1] + ' - ' + eTime[1];//时间区间
      this.countDate = eTime[0] + ' ' + routeParam.week;//统计时间
      this.judgeWorkday(`${eTime[0]}`);//是否工作日

    },
    mounted() {
      let ltInfo = this.locationInfo;
      if (ltInfo && ltInfo.latitude) {
        this.locationData = gaode2baidu(ltInfo.longitude,ltInfo.latitude);
        // console.log(ltInfo.latitude,ltInfo.longitude,'转换111')
        // console.log(this.locationData,'转换')
      }

    },
    methods: {
      //判断是否为工作日
      judgeWorkday(date) {
        let theDate = !date ? new Date() : new Date(date);
        let getday = theDate.getDay();
        if (getday > 0 && getday < 5 ) {
          this.isWorkday = 1;
        }
        else {
          this.isWorkday = 0;
        }
      },
      // 时分秒转分
      timeToMinute(time){
        let m = '';
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        let sec = time.split(':')[2];
        sec >= 30 ? sec = 1 : sec = 0;
        m = Number(hour*60) + Number(min) + Number(sec);
        return m;
      },
      //时间转时间戳
      formatTime(time){
        let timestamp = '';
        let timeStr = new Date(time.replace(/-/g,"/"));
        timestamp = timeStr.getTime();
        return timestamp;
      },
      //提交数据
      submitCountData(){
        let that = this;
        let distanceVal;
        let postData = {};
        let {lat,lng} = this.locationData;
        let {countNum,endTime,interval,startTime,usedTime,week} = this.recordData;
        let {shopId,latitude,longitude} = this.selectInfo;
        this.submitDisbled = true;
        if (!shopId){
          let typeTxt = this.workType === 0 ? '目标点' : '门店';
          Toast({message: typeTxt+'不能为空！', iconClass: 'mintui mintui-field-error'});
          this.submitDisbled = false;
          return false;
        }
        if (lat && lng && latitude && longitude){
          distanceVal = getDistance(lat,lng,latitude,longitude).toFixed(2);
        } else {
          Toast({message: '位置信息有误！', iconClass: 'mintui mintui-field-error'});
          this.submitDisbled = false;
          return false;
        }

        // console.log(lat,lng,latitude,longitude);

        postData.count  = countNum;
        postData.distance = distanceVal;
        postData.duration = this.timeToMinute(usedTime);
        postData.endDate = this.formatTime(endTime);
        postData.isWorkday = this.isWorkday;
        postData.section = interval;
        postData.shopId = shopId;
        postData.startDate = this.formatTime(startTime);
        postData.type = this.workType;
        postData.week  = week.slice(-1);

        // console.log(postData,'保存测算');

        postTokenData(base.basePath + '/daily/peopleCount/save',postData, {
          success: function (res) {
            if (res.success) {
              // console.log(res,'提交测算数据');
              Toast({message: '保存'+res.message, iconClass: 'mintui mintui-field-success'});
              //清除缓存
              that.$store.commit('pageCache/clearCache','collectInfo');
              that.$store.commit('pageCache/clearCache','flowFormData');
              that.$router.push({
                path: "/peopleFlow/lis",
                name: "CollectList"
              })

            } else {
              this.submitDisbled = false;
              Toast({message: '保存'+ res.message, iconClass: 'mintui mintui-field-error'});
            }
          },
          error: function (data) {
            console.log(data);
            this.submitDisbled = false;
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      }
    },
    computed: {
      // Getting Vuex State
      ...mapState({
        // userInfo: state => state.userInfo
        loginInfo: state => state.userInfo.base,
        selectInfo: state => state.pageCache.flowFormData,
        collectInfo: state => state.pageCache.collectParam,
        locationInfo: state => state.location.data
      })
    }

  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .count-info {
        background: #ffffff;
    }

</style>
