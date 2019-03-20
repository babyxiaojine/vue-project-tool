<template>
    <div class="wrapper">
        <div class="count-panel">
            <div class="count-total">
                <div class="record-num">
                    <em>{{recordData.countNum}}</em>
                    <small>人</small>
                </div>
                <div class="used-time">
                    <span>统计时间</span>
                    <em :class="countTimeOut&&'time-out'">{{recordData.usedTime}}</em>
                </div>
            </div>
            <div class="count-state bdr-top">
                <div class="cs-item step bdr-rt">
                    <span>{{(recordData.interval && recordData.interval == 'high') ? '高峰段' : '低峰段'}}</span>
                    <p>时间区段</p>
                </div>
                <div class="cs-item time">
                    <span>{{countStart}}</span>
                    <p>开始收集时间</p>
                </div>
            </div>
        </div>

        <div class="count-opts">
            <div class="opts-btn">
                <button class="btn" type="button" v-if="countState === 0" @click="startCountNum">开始</button>
                <button class="btn" type="button" v-if="countState === 1" @click="onCountNum">计数</button>
                <button class="btn btn-end" type="button" v-if="countState === 1" @click="endCountNum">结束</button>
                <button class="btn btn-cancel" type="button" v-if="countState === 2" @click="cancelCountNum">取消</button>
                <button class="btn btn-submit" type="button" v-if="countState === 2" @click="submitCount">保存</button>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui';
  import {getNowDateTime,geoLocation} from '@/util/common'
  export default {
    name: 'Home',
    data() {
      return {
        countState: 0,
        countTimer: null,
        countStart: '未开始',
        usedSecond: 0,
        recordData: {
          countNum: 0,
          usedTime: '00:00:00',
          interval: '-',
          startTime: '',
          endTime: '',
          week: ''
        },
        countTimeOut: false,
        minTime: 5,//最小时间
        maxTime: 30,//最大时间
      }
    },
    components: {
      //swiper
    },
    created() {

    },
    mounted() {
      this.timeInterval();//显示当前时间段
    },
    methods: {
      startCountNum(e){//开始
        //判断是否有位置信息
        let ltInfo = this.locationInfo;
        if (!ltInfo.latitude || !ltInfo.longitude) {
          dd.ready(() => {
            // console.log(33)
            geoLocation().then((res)=>{
              store.dispatch('location/setLocation',res);
            }).catch((err)=>{
              console.log(err,'获取位置失败');
              MessageBox('提示', '获取位置失败，请检查设置或重试！');
            })
          });
        } else {
          this.countState = 1;
          this.timeInterval();//时间段
          this.countStart = getNowDateTime(1);//开始收集时间
          this.recordData.startTime = getNowDateTime();//开始时间
          this.getTiming();//计时
        }

      },
      onCountNum(){//计数
        let countNum = this.recordData.countNum;
        this.recordData.countNum = countNum + 1;
      },
      endCountNum(){//结束
        let {minTime} = this;
        let sec = this.usedSecond;
        let min = parseInt(sec / 60);
        if (min < minTime){
          MessageBox.confirm('每次收集必须至少'+minTime+'分钟，确认放弃本次收集？').then(action => {
            this.initCoundParam();//初始化开始
          }).catch(data=>{
            console.log(data)
          })
        } else {
          MessageBox.confirm('确认结束本次收集?').then(action => {
            clearInterval(this.countTimer);
            this.countState = 2;
            this.recordData.endTime = getNowDateTime();
            this.recordData.week = getNowDateTime(4);
          }).catch(data=>{
            console.log(data,'取消')
          })
        }
      },
      cancelCountNum(){//取消
        // this.countState = 1;
        // this.getTiming(this.usedSecond);
        MessageBox.confirm('确认取消本次收集?').then(action => {
          this.initCoundParam();//初始化开始
        }).catch(data=>{
          console.log(data,'取消')
        })
      },
      //初始化计数开始
      initCoundParam(){
        clearInterval(this.countTimer);
        this.timeInterval();//时间段
        this.countState = 0;
        this.countStart = '未开始';
        this.recordData.usedTime = '00:00:00';
        this.recordData.countNum = 0;
        this.usedSecond = 0;
        this.countTimeOut = false;
      },
      submitCount(){//保存
        // console.log(this.recordData);
        this.$store.dispatch('pageCache/setData',{
          collectParam: this.recordData
        });
        this.$router.push({
          path: "/peopleFlow/submit",
          name: "CollectSubmit",
          // params: {
          //   recordData: this.recordData
          // }
        });
      },
      getTiming(num){//计时
        let that = this,sec = num || 0;
        let {maxTime} = this;
        let {startTime} = that.recordData;
        let sTime = parseInt(new Date(startTime.replace(/-/g,"\/")).getTime()/1000);
        clearInterval(this.countTimer);
        this.countTimer = setInterval(()=> {
          sec ++;
          let nTime = parseInt(new Date().getTime()/1000);
          // console.log(nTime - sTime,sec);
          if (nTime - sTime > sec) sec = nTime - sTime;
          let h = parseInt(sec/3600);
          let m = parseInt((sec - h*3600) / 60);
          let s = sec - h*3600 - m*60;
          // console.log(toDub(h)+":"+toDub(m)+":"+toDub(s));
          if (m >= maxTime) {//计时最大时间限制
            clearInterval(this.countTimer);
            this.countTimeOut = true;
            this.countState = 2;
            this.recordData.endTime = getNowDateTime();
            this.recordData.week = getNowDateTime(4);
          }
          // console.log(h, m, s, '计时');
          that.recordData.usedTime = toDub(h)+":"+toDub(m)+":"+toDub(s);
          that.usedSecond = sec;
        },1000);
        function toDub(n){
          return n<10?"0"+n:""+n;
        }
      },
      //时间区间对比
      timeInterval(){
        let intText = '';
        let amTime = this.timeRange('11:30','13:00');
        let pmTime = this.timeRange('17:00','20:30');

        if (amTime || pmTime){
          intText = 'high'
        } else {
          intText = 'low'
        }
        // console.log(amTime,pmTime,intText);
        this.recordData.interval = intText;
      },
      timeRange(beginTime, endTime) {
        let strb = beginTime.split (":");
        if (strb.length != 2) {
          return false;
        }

        let stre = endTime.split (":");
        if (stre.length != 2) {
          return false;
        }

        let b = new Date ();
        let e = new Date ();
        let n = new Date ();

        b.setHours (strb[0]);
        b.setMinutes (strb[1]);
        e.setHours (stre[0]);
        e.setMinutes (stre[1]);

        if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
          return true;
        } else {
          // console.log("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
          return false;
        }
      }
    },
    beforeDestroy(){
      clearInterval(this.countTimer);
    },
    computed: {
      // Getting Vuex State from store/modules/user
      ...mapState({
        locationInfo: state => state.location.data
      })

    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .wrapper {
        min-width: 320px;
        max-width: 640px;
        min-height: 100vh;
        margin: 0 auto;
        @include selectNone;
    }
    .count-panel {
        overflow: hidden;
        background: #ffffff;
    }
    .count-total {
        position: relative;
        width: p2r(260px);
        height: p2r(260px);
        border-radius: 50%;
        text-align: center;
        padding: p2r(40px 15px);
        margin: p2r(45px auto);
        background: #f5f5f5;
        &:before {
            display: block;
            content: '';
            position: absolute;
            top: -5px;
            right: -5px;
            bottom: -5px;
            left: -5px;
            border: 1px solid #92CEFF;
            border-radius: 50%;
        }
        .record-num {
            margin: p2r(15px 0);
            em {font-size: p2r(60px);}
            small {font-size: p2r(17px);}
        }
        .used-time {
            span {
                display: block;
                font-size: p2r(17px);
                color: #999;
                padding: p2r(10px 0 5px);
            }
            em {
                font-size: p2r(36px);
            }
        }

    }
    .count-state {
        display: flex;
        display: -webkit-flex;
        padding: p2r(18px 0);
        .cs-item {
            flex: 1;
            line-height: 1.4;
            text-align: center;
            font-size: p2r(14px);
            padding: p2r(0 10px);
            p {
                color: #999999;
            }
        }
    }
    .count-opts {
        text-align: center;
        padding-top: 10%;
        .opts-btn {
            button {
                position: relative;
                @include wh(74px,74px);
                color: #ffffff;
                font-size: p2r(17px);
                margin: p2r(0 5px);
                -webkit-border-radius: 100%;
                border-radius: 100%;
                background: #4196F7;
                -webkit-transition: all 0.3s ease-out;
                transition: all 0.3s ease-out;
                &.btn-end {
                    background: #FF5F5F;
                    &:before {
                        border-color: #FF5F5F;
                    }
                }
                &.btn-cancel {
                    color: #333;
                    background: #ffffff;
                    &:before {
                        border-color: #3AA7FF;
                    }
                }
                &:nth-child(2n) {
                    margin-left: 15%;
                }
                &:before {
                    display: block;
                    position: absolute;
                    content: '';
                    left: -4px;
                    top: -4px;
                    right: -4px;
                    bottom: -4px;
                    border: 1px solid #3AA7FF;
                    border-radius: 50%;
                }
                &:after {
                    content: "";
                    background: #fff;
                    position: absolute;
                    @include wh(74px,74px);
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    opacity: 0;
                    margin: auto;
                    border-radius: 50%;
                    transform: scale(1);
                    transition: all 0.3s ease-in-out;
                }
                &:active:after {
                    transform: scale(0);
                    opacity: 1;
                    transition: 0s;
                }

            }
        }
    }
    .time-out {color: #E8380D;}


</style>
