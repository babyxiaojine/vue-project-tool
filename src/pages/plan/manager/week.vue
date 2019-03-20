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
                    <router-link :to="{name: 'ManagerWeekDetail', params: item}">
                        <div class="item-main bdbtm">
                            <div class="item-title"><span>{{item.month}}月第{{item.week}}周</span>{{item.title}}</div>
                            <div class="item-more"><i class="iconfont icon-right-arrow"></i></div>
                        </div>
                    </router-link>
                    <div class="item-opts" v-if="listType == '0' && item.createBy == userBase.loginName">
                        <button class="btn" type="button" @click="delWeekPlan(item)">删除</button>
                        <!--<button class="btn" type="button" @click="editWeekPlan(item)">修改</button>-->
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

        <div class="foot-submit" v-if="pageAuth.add">
            <router-link tag="div" class="form-handles fix-area" :to="{name: 'planManagerAddWeek'}">
                <button class="btn-confirm" type="button" @click="">新增</button>
            </router-link>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    import store from '@/store/index'
    import { Toast,MessageBox } from 'mint-ui'
    import {base,postTokenData} from '@/util/common'
    export default {
        name: 'planManagerWeek',
        data() {
            return {
                listType:"0",
                weekData: [],
                noResult: false,
                tabIndex:"0",
                listData:{},
                pageAuth:{
                    add:false,
                }
            }
        },
        created() {
            this.setAuthUser();
        },
        activated(){
            this.getDataInfo(this.listType);
        },
        methods: {
            setAuthUser(){
                let AuthorityInfo = (store.getters['userInfo/getAuthInfo'] || {}).AuthorityInfo ;
                let pageAuth = this.pageAuth;
                if(AuthorityInfo.indexOf('devManageWeekPlan:add')>-1){
                    pageAuth.add = true;
                }
                this.pageAuth = pageAuth;
            },
            // 获取列表
            getDataInfo(type){
                let newDate = new Date();
                let year = newDate.getFullYear();
                console.log(type,year);
                postTokenData('/devPlan/devPlanWeek/manager/list',{auditType:type,year},(res)=>{
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
                    postTokenData('/devPlan/devPlanWeek/manager/delete',postParam,(res)=>{
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
