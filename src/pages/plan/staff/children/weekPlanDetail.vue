<template>
    <div>
        <div class="mass-tab">
            <ul class="mass-tab-title bdbtm">
                <li v-for="(item,index) in weekData" :class="index == tabIndex && 'active'" :id="index" :ket="index" @click="tabItemSelect(index)"><span>{{item.day}}</span>{{item.week}}</li>
            </ul>
        </div>
        <div class="week-cont">
            <ul class="week-list" v-if="listData.length">
                <li class="item" v-for="(item, index) in listData" :key="index">
                    <div class="state">{{item.status == 'Y'?'已签到':'未开始'}}</div>
                    <div class="store">{{item.name}}</div>
                </li>
            </ul>
            <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <!--流转信息-->
            <slot name="history-flow"></slot>
        </div>
    </div>

</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  export default {
    name: 'weekPlanDetail',
    data () {
      return {
        weekData: [],
        tabIndex: 0,
        listData:[],
        noResult:false
      }
    },
    props: {
      detailData:{
        default: () => ({}),
        type: Object
      }
    },
    created() {
      //TAB标题
      this.getWeek();
    },
    mounted() {
      this.updateShowData(this.tabIndex);
    },
    methods: {
      tabItemSelect(val){
        const {weekData} = this;
        this.tabIndex = val;
        this.updateShowData(val);
      },
      //更新展示数据
      updateShowData(val){
        const {detailData} = this;
        switch (val){
          case 0: this.listData = detailData.sunday || []; break;
          case 1: this.listData = detailData.monday || []; break;
          case 2: this.listData = detailData.tuesday || []; break;
          case 3: this.listData = detailData.wednesday || []; break;
          case 4: this.listData = detailData.thursday || []; break;
          case 5: this.listData = detailData.friday || []; break;
          case 6: this.listData = detailData.saturday || []; break;
        }
        if (this.listData.length){
          this.noResult = false;
        } else {
          this.noResult = true;
        }
      },
      //本周日期
      getWeek() {
        let weekData = [];
        let now = new Date();
        //周一开始
        // let firstDay=new Date(now - (now .getDay() - 1 ) * 86400000);
        //周日开始
        let firstDay=new Date(now - (now .getDay()) * 86400000);
        // firstDay.setDate(firstDay.getDate() + i);
        for (let i = 0; i < 7; i++){
          let weekItem = {};
          weekItem.day = firstDay.getDate() + i;
          weekItem.week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][firstDay.getDay() + i];
          weekData.push(weekItem);
        }
        this.weekData = weekData;
      },
    },
    watch:{
      detailData(){
        this.updateShowData(this.tabIndex);
      }
    },
  }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .mass-tab-title {
        li {
            flex-direction: column;
        }
    }
    .week-list{
        padding: p2r(15px);
        .item{
            margin-bottom:p2r(15px);
            padding: p2r(10px);
            border-radius: p2r(8px);
            background: #ffffff;
            .state {
                line-height: p2r(22px);
                font-size: p2r(16px);
                font-weight: 600;
                padding-bottom: p2r(4px);
            }
            .store {
                line-height: p2r(20px);
                font-size: p2r(14px);
            }
        }
    }
</style>