<template>
    <div class="wrapper home-index">
        <header class="member-head">
            <div class="head-banner">
                <p class="wellcome-text">欢迎登陆生命周期管理系统</p>
                <p class="now-time">{{nowDate.date}}&nbsp;&nbsp;星期{{nowDate.week}}</p>
            </div>
            <div class="head-crumbs">
                <ul>
                    <router-link to="/task/list" tag="li"><p>任务</p><em>{{msgCount.taskCount || 0}}</em></router-link>
                    <li><p>我的消息</p><em>{{msgCount.messageCount || 0}}</em></li>
                </ul>
            </div>
        </header>

        <section class="member-content">
            <div class="module-panel">
                <router-link tag="div" to="/menu" class="panel-title">
                    <h2>常用菜单</h2>
                    <span class="view-more"><i class="icon icon-rt-more"></i></span>
                </router-link>
                <div class="panel-cont">
                    <ul class="clearfix">
                        <li v-if="index < 8" v-for="(item, index) in userMenu" :key="index">
                            <router-link :to="{ path: item.url}">
                                <!--<img src="/static/menuIcon/icon_salc.png" alt="">-->
                                <img :src="item.incUrl" alt="">
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                        <!--<li>-->
                            <!--<router-link to="/requireMent/approvalDetail">-->
                                <!--<img src="/static/menuIcon/icon_salc.png" alt="">-->
                                <!--<span>需求审批</span>-->
                            <!--</router-link>-->
                        <!--</li>-->
                        <template v-if="showTestMenus">
                            <li >
                                <router-link to="/officialTarget/list">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>正式目标点管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/storeCalc/add">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>定店测算</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/planController/index">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>规划目标点管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/planController/report">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>规划目标点提报</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/requireMent/index">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>需求设计</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/requireMent/apply">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>设计申请</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/designScheme/index">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>设计方案</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/visitLog/index">
                                    <img src="/static/menuIcon/icon_salc.png" alt="">
                                    <span>拜访记录</span>
                                </router-link>
                            </li>
                        </template>
                        <li v-if="!userMenu">
                            <router-link to="/menu">
                                <i class="add-menu"></i>
                                <span>添加常用</span>
                            </router-link>
                        </li>                    </ul>
                </div>
            </div>
        </section>


        <!--底部导航-->
        <foot-nav></foot-nav>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,Indicator } from 'mint-ui';
  import footNav from '@/components/footer/footNav'
  import {base,getUserInfo,postTokenData} from '@/util/common'
  export default {
    name: 'Home',
    data() {
      return {
        weekly: ['日','一','二','三','四','五','六'],
        userMenu: [],
        msgCount: {},
        showTestMenus: false
      }
    },
    components: {
      footNav 
    },
    created() {
        // Toast({message: '22222',duration: 50000})
    },
    mounted() {
        if(window.location.hostname.indexOf('10.28.')>-1){
            this.showTestMenus = true
        }
      getUserInfo().then((res) =>{
        let userInfo = this.$store.getters['userInfo/getUserInfo'];//缓存数据
        let ddConfig = this.$store.getters['ddConfig/getDdConfig'];//缓存数据

        postTokenData('/menu/commonMenus',{}, {
          success: (res)=> {
            if (res.success) {
              this.userMenu = res.data;
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
        this.getMissionCount()
      });
    },
    methods: {
        getMissionCount(){
            postTokenData('/act/taskCountAndMessageCunt',{}, {
              success: (res)=> {
                if (res.success) {
                  this.msgCount = res.data;
                } else {
                  Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
              },
              error: (data)=> {
                Toast('ticketError : ' + JSON.stringify(data))
              }
            });
        }
    },
    computed: {
      // Getting Vuex State
      ...mapState({
        // userInfo: state => state.userInfo
        loginInfo: state => state.userInfo.data
      }),
      //当前日期
      nowDate () {
        let today = new Date(new Date().toLocaleDateString());
        let y = today.getFullYear();
        let m = today.getMonth();
        let d = today.getDate();
        let date = `${y}年${m+1}月${d}日`;
        let week = this.weekly[today.getDay()];
        return {date:date,week:week}
      }

    }
  }
</script>

<style lang="scss">
    @import '~@/assets/css/base';
    .member-head {
        width: 100%;
        margin-bottom: p2r(10px);
        background: #ffffff;
        .head-banner {
            height: p2r(150px);
            color: #ffffff;
            text-align: center;
            font-size: p2r(20px);
            text-shadow: 0 1px 3px #1296db;
            padding-top: p2r(50px);
 			/*background: #1296db url("../../assets/home_top.jpg") 0 0/100% no-repeat;*/
            background: #1296db url("http://ls-resources.oss-cn-shanghai.aliyuncs.com/icon/cover.png") 0 0/100% no-repeat;            .wellcome-text {
                margin-bottom: p2r(15px);
            }
        }
        
    }
    .head-crumbs {
        ul {
            display: flex;
            display: -webkit-flex;
            /*justify-content:space-between;*/
            padding: p2r(20px 0);
            li {
                flex: 1;
                text-align: center;
                em {
                    display: block;
                    font-size: p2r(20px);
                    overflow: hidden;
                }
                p {
                    font-size: p2r(12px);
                    color: #999;
                    padding-bottom: p2r(8px);
                }
            }
        }
    }
    .member-content {
    
    }
    .module-panel {
        background: #ffffff;
        padding: p2r(0 10px);
        .panel-title {
            height: p2r(45px);
            line-height: p2r(45px);
            font-weight: 400;
            padding: p2r(0 10px);
            border-bottom: 1px solid #E5E5E5;
            h2 {
                float: left;
                font-size: p2r(17px);
            }
            .view-more {
                float: right;
                display: inline-block;
                width: 50%;
                text-align: right;
            }
        }
        .panel-cont {
            ul {
                padding: p2r(10px 0);
            }
            ul li {
                float: left;
                width: 25%;
                text-align: center;
                font-size: p2r(14px);
                padding: p2r(10px 0);
                .add-menu {
                    position: relative;
                    display: inline-block;
                    width: p2r(50px);
                    height: p2r(50px);
                    -webkit-border-radius: 50%;
                    border-radius: 50%;
                    background: #f5f5f5;
                    &:before {
                        display: block;
                        content: '';
                        @include wh(22px,2px);
                        @include center;
                        background: #999;
                    }
                    &:after {
                        display: block;
                        content: '';
                        @include wh(2px,22px);
                        @include center;
                        background: #999;
                    }
                }
                img {
                    display: inline-block;
                    width: p2r(50px);
                    height: p2r(50px);
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
                span {
                    display: block;
                    height: p2r(36px);
                    line-height: p2r(18px);
                    padding: p2r(0 10px);
                    font-size: p2r(14px);
                    overflow: hidden;
                }
            }
        }
    }

</style>
