<template>
    <div class="wrapper staff-month">
        <div class="nav-tab">
            <mt-navbar v-model="listType" class="bdbtm">
                <mt-tab-item id="0">待审核</mt-tab-item>
                <mt-tab-item id="1">审核中</mt-tab-item>
                <mt-tab-item id="2">已审核</mt-tab-item>
            </mt-navbar>
        </div>

        <div class="month-list">
            <ul class="approach-area" v-if="listData.length">
                <li class="approach-item" v-for="(item,index) in listData" :key="index">
                    <router-link :to="{name: 'StaffMonthDetail', params: item}">
                        <div class="item-main bdbtm">
                            <div class="item-title"><span>{{item.month}}</span>{{item.title}}</div>
                            <div class="item-more"><i class="iconfont icon-right-arrow"></i></div>
                        </div>
                    </router-link>
                    <div class="item-opts" v-if="listType == '0' && item.createBy == userBase.loginName">
                        <button class="btn" type="button" @click="delMonthPlan(item)">删除</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

        <div class="foot-submit" v-if="pageAuth.add">
            <router-link tag="div" class="form-handles fix-area" :to="{name: 'StaffAddMonth'}">
                <button class="btn-confirm" type="button" @click="">新增</button>
            </router-link>
        </div>

        <mt-popup v-model="fitlerPopupVisible" position="right">
            <div class="side-form">
                <div class="fitler-cont">
                    <dl class="sort-list">
                        <dt class="lab">选择年份</dt>
                        <dd>
                            <div class="select-item" :class="fitlerIndex == index && 'on'" @click="selectProcess(index)" v-for="(item,index) in fitlerYear" :key="index">{{item}}</div>
                        </dd>
                    </dl>
                </div>
                <div class="foot-submit">
                    <div class="form-handles fix-area">
                        <button class="btn-cancel bdtop" type="button" @click="fiterCancel">取消</button>
                        <button class="btn-confirm" type="button" @click="fiterSubmit">确认</button>
                    </div>
                </div>
            </div>
        </mt-popup>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  export default {
    name: 'StaffMonth',
    data() {
      return {
        listType:"0",
        listData:[],
        noResult: false,
        thisYear: new Date().getFullYear(),
        fitlerYear: [],//筛选年份
        fitlerIndex: 2,//筛选年份
        fitlerPopupVisible: false,
        pageAuth:{
          add: false
        },
      }
    },
    created() {
      //权限
      let authorityInfo = this.userAuth.AuthorityInfo;
      if (authorityInfo.indexOf('devAttacheMonthPlan:add') > -1) this.pageAuth.add = true;
    },
    activated(){
      let {listType,thisYear} = this;
      this.getDataInfo(listType,thisYear);
    },
    methods: {
      // ddTab按钮
      tabBtnHandler(onShow){
        dd.ready(()=> {
          dd.biz.navigation.setRight({
            show: onShow,
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '筛选',//控制显示文本，空字符串表示显示默认文本
            onSuccess : (result) => {
              this.getYearArr();
              this.fitlerPopupVisible = true;
            },
          });
        });
      },
      // 获取列表
      getDataInfo(type,year){
        console.log(type,year);
        postTokenData('/expandshop/devPlan/devPlanMonth/devAttache/list',{auditStatus:type,year},(res)=>{
          if(res.success){
            let resData = res.data || [];
            this.listData = [...resData];
            if (!resData.length) {
              this.noResult = true;
            } else {
              this.noResult = false;
              this.tabBtnHandler(true);//有数据显示筛选
            }
          }
        })
      },
      getYearArr(){
        let yearArr=[];
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();//当前年
        for ( let int = nowYear-2; int <= nowYear+1; int++) {
          yearArr.push(int);
        }
        this.fitlerYear = yearArr;
        // return yearArr;
      },
      //筛选选择
      selectProcess(index){
        this.fitlerIndex = index;
      },
      //关闭筛选
      fiterCancel(){
        this.fitlerPopupVisible = false;
      },
      //筛选确定
      fiterSubmit(){
        let {listType,fitlerYear,fitlerIndex} = this;
        this.thisYear = fitlerYear[fitlerIndex];
        this.getDataInfo(listType,this.thisYear);
        this.fitlerPopupVisible = false;
      },
      //删除
      delMonthPlan(item){
        const {userBase} = this;
        if (item.createBy != userBase.loginName) return false;
        let postParam = {
          id: item.id,
          processInsId: item.processInsId
        };
        MessageBox.confirm('确定删除此项！','提示',{
          closeOnClickModal:false
        }).then(({ value, action }) => {
          postTokenData('/expandshop/devPlan/devPlanMonth/devAttache/delete',postParam,(res)=>{
            if(res.success){
              Toast({message: '删除成功！', iconClass: 'mintui mintui-field-success'})
              const {listType,thisYear} = this;
              this.getDataInfo(listType,thisYear);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
            }
          })
        }).catch((data)=>{
          console.log(data)
        });

      }
    },
    computed: {
      ...mapState({
        userAuth: state => state.userInfo.auth,
        userBase: state => state.userInfo.base
      })
    },
    destroyed(){ 
        dd.biz.navigation.setRight({
            control: false,
            text:''
        });
    },
    watch:{
        // 切换tab类型
        listType(val){
          let {listType,thisYear} = this;
          this.noResult = false;
          this.getDataInfo(listType,thisYear);
        }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .approach-item {
        .item-main {
            span {
                &:first-child {
                    width: p2r(30px);
                }
            }
        }
    }

    /*筛选样式*/
    .side-form{
        width: 75vw;
        height: 100vh;
        background: #fff;
        .fitler-cont{
            padding-top:p2r(30px);
        }
        .sort-list {
            padding:p2r(10px);
            dt{
                padding-bottom: p2r(8px);
                font-size: p2r(12px);
                line-height: p2r(16px);
                position: relative;
                .iconfont{
                    position: absolute;
                    right: p2r(10px);
                }
            }
            dd{
                overflow: hidden;
            }
        }

        .select-item{
            float: left;
            width: 32%;
            text-align: center;
            @include trans;
            margin-left: 2%;
            height: p2r(36px);
            line-height: p2r(36px);
            font-size: p2r(12px);
            border-radius:p2r(4px);
            background: #f0f0f0;
            color:#333;
            margin-bottom: p2r(5px);
            touch-action: none;
            &:nth-child(3n+1){
                margin-left: 0;
            }
            &.on{
                background: rgba(65,150,247,0.20);
                color:#4196F7;
            }
        }

        .form-handles{
            @include flexbox;
            .btn-cancel{
                width:40%;
                background: #fff;
                color:#333;
            }
            .btn-confirm{
                width:60%;
            }
        }

    }

</style>
