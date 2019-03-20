<template>
    <div class="wrapper">
        <mt-navbar v-model="listType">
            <mt-tab-item id="0">目标点</mt-tab-item>
            <mt-tab-item id="1">门店</mt-tab-item>
        </mt-navbar>
        <div class="collect-list">
            <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                <template v-if="listData.length>0">
                    <div class="coll-item" v-for="(vo, index) in listData" :key="index">
                        <div class="coll-top bdr-btm" @click="listToggleFold(index)">
                            <div class="title"><em>{{vo.shopName}}</em><span v-if="vo.totalData.status==1">{{vo.totalData.peoples}}人/日</span><span class="red" v-else>收集时间不足</span></div>
                            <div class="fold">{{flowItemVisibleId == index ? '收起' :'展开'}}</div>
                        </div>
                        <ul class="coll-list" v-show="flowItemVisibleId == index">
                            <li v-for="(gitem,gid) in vo.rtnPeopleCountDetails" :key="gid" to="/peopleFlow/detail?id=1" class="bdbtm" @click="jumpCollectDetail(vo,gitem)">
                                <span>{{gitem.section === 'high' ? '高峰' : '低峰'}}</span>
                                <span>{{gitem.isWorkDay == 1 ? '工作日' : '非工作日'}}</span>
                                <span>{{gitem.duration}}min</span>
                                <span>{{gitem.count}}</span>
                                <i class="iconfont icon-right-arrow"></i>
                            </li>
                            <li v-if="!vo.rtnPeopleCountDetails" class="no-list">暂无数据</li>
                        </ul>
                    </div>
                </template>
                <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            </mt-loadmore>
        </div>
        <div class="foot-submit">
            <div class="fix-area">
                <router-link class="btn" to="/peopleFlow/select">开始收集人流信息</router-link>
            </div>
        </div>

        <mt-popup
          v-model="fitlerPopupVisible"
          position="right">
          <div class="side-form">
            <form action="" @submit.prevent="fiterFormSubmit">
                <div class="form-list">
                    <dl class="bdbtm">
                        <dt class="lab">{{listType==1 ? '门店' : '目标点'}}名称</dt>
                        <dd><input type="text" class="ipt" :placeholder="'请输入'+(listType==1 ? '门店' : '目标点')+'名称'" v-model="fitlerForm.shopName"></dd>
                    </dl>
                    <dl class="bdbtm">
                        <dt class="lab">{{listType==1 ? '门店' : '目标点'}}编号</dt>
                        <dd><input type="text" class="ipt" :placeholder="'请输入'+(listType==1 ? '门店' : '目标点')+'编号'" v-model="fitlerForm.code"></dd>
                    </dl>
                </div>
                <div class="foot-submit">
                    <div class="form-handles fix-area">
                        <button class="reset-btn bdtop" type="reset" @click="clickResetFilterForm">重置</button>
                        <button class="sub-btn" type="submit">确认</button>
                    </div>
                </div>
            </form>
        </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  export default {
    name: 'collectL',
    data() {
      return {
        listPage:1,
        listType:"0",
        fitlerPopupVisible:false,
        allLoaded:false,
        fitlerForm:{
            shopName:'',
            code:'',
        },
        listData:[
        ],
        flowItemVisibleId:0
      }
    },
    created() {
        this.getFlowList()
        
    },
    mounted() {
        dd.ready(()=> {
            dd.biz.navigation.setRight({
              control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
              text: '筛选',//控制显示文本，空字符串表示显示默认文本
              onSuccess : (result) => {
                this.fitlerPopupVisible = true;
              },
              onFail : (err) => {}
            });
        });
    },
    methods: {
        // 获取更多
        loadMoreData(){
            this.getFlowList(this.listPage+1,)
        },
        // 跳转详情
        jumpCollectDetail(itemBox,item){
            itemBox.activeItem = item;
            this.$router.push({
                name:'CollectDetail',
                params:itemBox
            })
        },
        // 获取列表
        getFlowList(page=1,arg={}){

            let type = this.listType;
            postTokenData('/daily/peopleCount/list',{type,pageNo:page,pageSize:20,...arg},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data.list || [];
                    if(rjson && rjson.length){
                        rjson.map((v)=>{
                            console.log(v.shopName)
                            v.totalData = this.collectTotalData(v.rtnPeopleCountDetails)
                        })
                    }
                    if(page>1){
                        if(rjson.length){
                            this.listData = [...this.listData,...rjson];
                            this.listPage = page;
                        }else{
                            this.allLoaded = true;
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    }else{
                        if(rjson.length){
                            this.listData = rjson;
                        }else{
                            this.list3 = []
                            this.allLoaded = true;
                        }
                        this.listPage = page;
                    }
                    
                }
            })
        },
        // 点击切换展开收起
        listToggleFold(index,item){
            if(this.flowItemVisibleId == index){
                this.flowItemVisibleId=-1;
            }else{
                this.flowItemVisibleId=index;
            }
            
        },
        // 提交筛选
        fiterFormSubmit(){
            let formData = this.fitlerForm;
            this.getFlowList(1,formData)
            this.fitlerPopupVisible = false;
        },
        // 重置筛选表单
        clickResetFilterForm(){
            this.fitlerForm = {
                type:'0',
                shopName:'',
                shopCode:'',
                filiale:'0',
            }
        },
        // 统计人流量时间和总人数
        collectTotalData(olist){
            const res = {
                status:0,
                peoples:0
            };
            const calcobj = {s1:0, s2:0, s3:0, s4:0, t1:0, t2:0, t3:0, t4:0};
            if(olist && olist.length){
                olist.map((v,k)=>{
                  if(v.isWorkDay == 1){
                    if(v.section == 'high'){
                        calcobj.t1 += v.duration
                        calcobj.s1 += v.count
                    }else{
                        calcobj.t2 += v.duration
                        calcobj.s2 += v.count
                    }
                  }else{
                    if(v.section == 'high'){
                        calcobj.t3 += v.duration
                        calcobj.s3 += v.count
                    }else{
                        calcobj.t4 += v.duration
                        calcobj.s4 += v.count
                    }
                  }
                })
                if(calcobj.t1>=120 & calcobj.t2>=120 & calcobj.t3>=120 & calcobj.t4>=120){
                    res.status = 1;
                    res.peoples = parseInt(((calcobj.s1*5*60/calcobj.t1 + calcobj.s2*7*60/calcobj.t2) * 4 + (calcobj.s3*5*60/calcobj.t3 + calcobj.s4*7*60/calcobj.t4) * 3 ) / 7) ;
                }
            }
            return res;
        }
    },
    computed: {
    },
    watch:{
        // 切换类型
        listType(val){
            // this.fitlerPopupVisible = true
            this.listData = []
            this.getFlowList()
        }
    },
    destroyed(){
        dd.biz.navigation.setRight({
          control: false,
          text:''
        });
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .collect-list{
        padding-top:55px;
    }
    .coll-item {
        margin-bottom: p2r(5px);
        .coll-top {
            width: 100%;
            height: p2r(55px);
            line-height: p2r(55px);
            padding: p2r(0 10px);
            overflow: hidden;
            background: #ffffff;
            box-sizing: border-box;
            .title {
                font-weight: bold;
                float: left;
                    font-size:p2r(16px);
                span {
                    display: inline-block;
                    line-height: 1;
                    margin-left: p2r(5px);
                    padding-left: p2r(5px);
                    border-left: 1px solid #ddd;
                    &.red{color:$red;}
                }
            }
            .fold {
                font-size:p2r(16px);
                float: right;
                color:$blue;
            }
        }
        .coll-list {
            background: #ffffff;
            .bdbtm {
                font-size:p2r(16px);
                color:#333;
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                height: p2r(44px);
                line-height: p2r(44px);
                padding-right: p2r(20px);
                margin-left: p2r(20px);
                span{flex:1;
                    &:last-child{flex:0.5;}
                }
            }
            .no-list {
                text-align: center;
                font-size: p2r(14px);
                color: #999999;
                padding: p2r(30px 0);
            }
        }
    }



</style>
