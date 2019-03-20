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
                <mt-loadmore :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                    <template v-for="(vo, index) in listData">
                        
                        <li class="bdbtm mt10" v-if="listType == 1"  :key="index">
                            <router-link  :to="{name:'PlanControllerDetail',query:{id:vo.id}}" class="item">
                                <div class="iconfont icon-selected" :class="{on:vo.selected}" v-on:click.stop.prevent="selectReItem(index)"></div>
                                <div class="td1" v-on:click.stop.prevent="selectReItem(index)">{{typeArr[listType-1]}}</div>
                                <div class="td2">{{vo.name}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </router-link>
                        </li>

                        <li v-else class="bdbtm mt10" :key="index">
                            <router-link  :to="{name:'PlanControllerReportDetail',query:{id:vo.id}}" class="item bdbtm">
                                <div class="td1">{{typeArr[listType-1]}}</div>
                                <div class="td2">{{vo.name}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </router-link>
                            <div class="jumper-handles" v-if="listType == 2 && vo.status == 0"><button class="btn btn-gray" type="button" @click="deleteData(vo.id)">删除</button></div>
                        </li>
                    </template>
                </mt-loadmore>
                
            </ul>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <div class="nodata" v-if="allLoaded && listPage>1">已经到底了</div>
        </div>
        <div class="foot-submit" v-if="listType == 1 && pageAuth.report">
            <div class="fix-area">
                <button class="btn" @click="handleReport">提报</button>
            </div>
        </div>
        <SuperSelect :options="yearList" ref="yearPicker" @confirm="selectYear"></SuperSelect>
    </div>

</template>

<script type="text/ecmascript-6">
    import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData, getSelectYear} from '@/util/common'
  import SuperSelect from '@/components/superSelect'
  export default {
    name: 'PlanControllerReport',
    components:{
        SuperSelect
    },
    data() {
      return {
        listType: "1",
        listData: [],
        listPage: 1,
        allLoaded: false,
        typeArr : ['待提报','待审核','已审核','已下发'],
        yearList: getSelectYear(new Date().getFullYear()-2,2),
        year: new Date().getFullYear().toString(),
        pageAuth:{
            report:false
        }
      }
    },
    created() {
        this.setAuthUser()
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
            if(AuthorityInfo.indexOf('planObjectReport:report')>-1){
                pageAuth.report = true;
            }
            this.pageAuth = pageAuth;
        },
        // 切换年份
        selectYear(val){
            this.submitReport(val)
        },
        handleReport(){
            let ids = []
            this.listData.map((item)=>{
                if(item.selected){
                    ids.push(item.id)
                }
            })
            if(!ids.length){
                Toast('请勾选信息...');
                return;
            }
            this.$refs.yearPicker.open(this.yearList,this.year)
        },
        submitReport(year){
            let ids = []
            this.listData.map((item)=>{
                if(item.selected){
                    ids.push(item.id)
                }
            })
            postTokenData('/objPoint/planObj/reportProcess',{ids:ids.join(','), reportYear:year},(res)=>{
                if(res.code==='0000'){
                    Toast('提报成功...');
                    this.getListData()
                }
            })
        },

        // 获取更多
        loadMoreData(){
            this.getListData(this.listPage+1)
        },
        // ddTab按钮
        // tabBtnHandler(){
        //     dd.ready(()=> {
        //         dd.biz.navigation.setRight({
        //           control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //           text: '筛选',//控制显示文本，空字符串表示显示默认文本
        //           onSuccess : (result) => {
        //             this.$refs.yearPicker.open()
        //           },
        //           onFail : (err) => {}
        //         });
        //     });
        // },
        // 获取列表
        getListData(page=1,arg={}){
            // 管理页面待提报的状态为0，提报页面待提报状态为1
            let listType = this.listType;
            let vurl = listType == 1 ? '/objPoint/planObj/list' : '/objPoint/planObj/processList'
            postTokenData(vurl,{listType,pageNo:page,pageSize:20,...arg},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data.list || [];
                    if(page>1){
                        if(rjson.length){
                            this.listData = [...this.listData,...rjson];
                            this.listPage = page;
                        }else{
                            this.listPage = page;
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
        selectReItem(id){
            const {listData} = this;
            listData[id].selected = !listData[id].selected
            this.listData = [...listData];
        },
        handleDelete(id){
            postTokenData('/objPoint/planObj/deleteProcess',{id},(res)=>{
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
        .icon-selected{margin-right: p2r(10px); font-size:p2r(22px); color:#999;}
        .icon-selected.on{color:$blue;}
    }


</style>
