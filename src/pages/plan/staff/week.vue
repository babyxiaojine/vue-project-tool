<template>
    <div class="wrapper staff-week">
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
                    <router-link :to="{name: 'StaffWeekDetail', params: item}">
                        <div class="item-main bdbtm">
                            <div class="item-title"><span>{{item.month}}月第{{item.week}}周</span>{{item.title}}</div>
                            <div class="item-more"><i class="iconfont icon-right-arrow"></i></div>
                        </div>
                    </router-link>
                    <div class="item-opts" v-if="listType == '0' && item.createBy == userBase.loginName">
                        <button class="btn" type="button" @click="delWeekPlan(item)">删除</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

        <div class="foot-submit" v-if="pageAuth.add">
            <router-link tag="div" class="form-handles fix-area" :to="{name: 'StaffAddWeek'}">
                <button class="btn-confirm" type="button" @click="">新增</button>
            </router-link>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  export default {
    name: 'StaffWeek',
    data() {
      return {
        listType:"0",
        weekData: [],
        noResult: false,
        tabIndex:"0",
        listData:{},
        pageAuth:{
          add: false
        },
      }
    },
    created() {
      //权限
      let authorityInfo = this.userAuth.AuthorityInfo;
      if (authorityInfo.indexOf('devAttacheWeekPlan:add') > -1) this.pageAuth.add = true;
    },
    activated(){
      this.getDataInfo(this.listType);
    },
    methods: {
      // 获取列表
      getDataInfo(type){
        let newDate = new Date();
        let year = newDate.getFullYear();
        console.log(type,year);
        postTokenData('/expandshop/devPlan/devPlanWeek/devAttache/list',{auditStatus:type,year},(res)=>{
          if(res.success){
            let resData = res.data || [];
            this.listData = [...resData];
            if (!resData.length) {
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          }
        })
      },
      //删除
      delWeekPlan(item){
        const {userBase} = this;
        if (item.createBy != userBase.loginName) return false;
        let postParam = {
          id: item.id
        };
        MessageBox.confirm('确定删除此项！','提示',{
          closeOnClickModal:false
        }).then(({ value, action }) => {
          postTokenData('/expandshop/devPlan/devPlanWeek/devAttache/delete',postParam,(res)=>{
            if(res.success){
              Toast({message: '删除成功！', iconClass: 'mintui mintui-field-success'})
              this.getDataInfo(this.listType);
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
                    width: p2r(80px);
                }
            }
        }
    }

</style>
