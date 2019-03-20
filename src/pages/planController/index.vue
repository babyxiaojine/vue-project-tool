<template>
    <div class="wrapper">
        <mt-navbar v-model="listType">
            <mt-tab-item id="1">待提报</mt-tab-item>
            <mt-tab-item id="2">待审核</mt-tab-item>
            <mt-tab-item id="3">已审核</mt-tab-item>
            <mt-tab-item id="4">已下发</mt-tab-item>
        </mt-navbar>
        <div class="plan-month mint-navContent">
            <ul class="jumper-list" v-if="listData.length>0">
                <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                    <template v-for="(vo, index) in listData">
                        <li class="bdbtm mt10" v-if="listType == 1" :key="index">
                            <router-link :to="{name:'PlanControllerDetail',query:{id:vo.id}}" class="item bdbtm">
                                <div class="td1">{{typeArr[listType-1]}}</div>
                                <div class="td2">{{vo.name}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </router-link>
                            <div class="jumper-handles" v-if="listType == 1 && (pageAuth.delete || pageAuth.edit) && (vo.status == 0 || vo.status == 3)"><button v-if="pageAuth.delete" class="btn btn-gray" type="button" @click="deleteData(vo.id)">删除</button><router-link tag="button" :to="{name:'PlanControllerEdit',query:{id:vo.id}}"  v-if="pageAuth.edit" class="btn">修改</router-link></div>
                        </li>
                        <li v-else class="bdbtm mt10"  :key="index">
                            <router-link  :to="{name:'PlanControllerReportDetail',query:{id:vo.id}}" class="item">
                                <div class="td1">{{typeArr[listType-1]}}</div>
                                <div class="td2">{{vo.name}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </router-link>
                        </li>
                    </template>
                </mt-loadmore>

            </ul>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <div class="nodata" v-if="allLoaded && listPage>1">已经到底了</div>
        </div>
        <div class="foot-submit" v-if="pageAuth.add">
            <div class="fix-area">
                <router-link class="btn" to="/planController/add">新增</router-link>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'PlanController',
    components:{
        selectPicker
    },
    data() {
      return {
        listType: "1",
        listPage: 1,
        listData: [],
        allLoaded: false,
        typeArr: ['待提报','待审核','已审核','已下发'],
        pageAuth:{
            delete:false,
            add:false,
            edit:false,
        },
      }
    },
    created() {
        this.setAuthUser();
    },

    mounted() {
        // this.tabBtnHandler()
    },
    activated(){
        this.getListData();
    },
    methods: {
        // 设置用户权限
        setAuthUser(){
            let { AuthorityInfo = [] } = (store.getters['userInfo/getAuthInfo'] || {});
            let pageAuth = this.pageAuth;
            if(AuthorityInfo.indexOf('planObjectManage:delete')>-1){
                pageAuth.delete = true;
            }
            if(AuthorityInfo.indexOf('planObjectManage:add')>-1){
                pageAuth.add = true;
            }
            if(AuthorityInfo.indexOf('planObjectManage:edit')>-1){
                pageAuth.edit = true;
            }
            this.pageAuth = pageAuth;
        },
        // 获取更多
        loadMoreData(){
            this.getListData(this.listPage+1,)
        },
        // ddTab按钮
        tabBtnHandler(){
            dd.ready(()=> {
                dd.biz.navigation.setRight({
                  control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                  text: '筛选',//控制显示文本，空字符串表示显示默认文本
                  onSuccess : (result) => {
                    this.$refs.yearPicker.open()
                  },
                  onFail : (err) => {}
                });
            });
        },
        // 获取列表
        getListData(page=1,arg={}){
            // 管理页面待提报的状态为0，提报页面待提报状态为1
            let listType = this.listType == 1 ? '0' : this.listType;
            let vurl = listType == 0 ? '/objPoint/planObj/list' : '/objPoint/planObj/processList'
            postTokenData(vurl,{listType,pageNo:page,pageSize:20,...arg},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data.list || [];
                    if(page>1){
                        this.listPage = page;
                        if(rjson.length){
                            this.listData = [...this.listData,...rjson];
                        }else{
                            this.allLoaded = true;
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    }else{
                        this.listData = rjson;
                        this.listPage = page;
                        if(rjson.length){
                            this.allLoaded = false;
                        }else{
                            this.allLoaded = true;
                        }
                    }
                    
                }
            })
        },
        handleDelete(id){
            postTokenData('/objPoint/planObj/delete',{id},(res)=>{
                if(res.code==='0000'){
                    Toast('删除成功，信息已删除...');
                    this.getListData()
                }
            })
        },
        deleteData(id){
            MessageBox.confirm('确认删除此信息?').then(action => {
              this.handleDelete(id);//删除菜单
            }).catch(data=>{
              console.log(data)
            })
        }
    },
    computed: {
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
            this.getListData()
        }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .jumper-list{background: none;
        li{background: #fff;}
        .td1{width:p2r(60px);}
        .td2{flex:1;}
    }

</style>
