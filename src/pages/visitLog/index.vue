<template>
    <div class="wrapper">
        <mt-navbar v-model="listType">
            <mt-tab-item id="0">目标点</mt-tab-item>
            <mt-tab-item id="1">门店</mt-tab-item>
        </mt-navbar>
        <div class="plan-month mint-navContent">
            <ul class="jumper-list" v-if="listData.length>0">
                <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData"  ref="loadmore" :bottom-all-loaded="allLoaded">
                <li class="bdbtm mt10"  v-for="(vo, index) in listData" :key="index">
                    <div v-if="listType==0" @click="jumpDetail(vo)" class="item bdbtm">
                        <div class="td2">{{vo.inOrOut==1?"计划内":"计划外"}}</div>
                        <div class="td2">{{vo.name}}</div>
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                    <div v-if="listType==1"  class="item bdbtm">
                        <div class="td2">{{vo.name}}</div>
                    </div>
                    <div class="jumper-handles ">
                        <div class="btn" v-if="vo.signIn==0" @click="gotoNext(vo,1)">签到</div>
                        <div class="btn" v-else @click="addlogs(vo)">添加记录</div>
                        <mt-button type="danger" class="btn btn-warning" @click="gotoNext(vo,0)">拜访记录</mt-button>
                    </div>
                </li>
                </mt-loadmore>

            </ul>
            <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
            <div class="nodata" v-if="allLoaded && listData.length>0">已经到底了</div>
        </div>

        <mt-popup
          v-model="fitlerPopupVisible"
          position="right">
          <div class="side-form">
            <form action="" @submit.prevent="fiterFormSubmit">
                <div class="form-list">
                    <dl class="bdbtm">
                        <dt class="lab">{{listType==1 ? '门店' : '目标点'}}名称</dt>
                        <dd><input type="text" class="ipt" :placeholder="'请输入'+(listType==1 ? '门店' : '目标点')+'名称'" v-model="fitlerForm.name"></dd>
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
  import { Toast,MessageBox,Button,Indicator} from 'mint-ui'
  import{getStore,setStore} from "@/util/utils"
  import {base,postTokenData,gaode2baidu,getDistance} from '@/util/common'
  export default {
    name: 'VisitLog',
    data() {
      return {
        listPage:1,
        listType:"0",
        fitlerPopupVisible:false,
        // fitlerPopupVisible:true,
        allLoaded:false,
        fitlerForm:{
            name:'',
            code:'',
        },
        listData:[
        ],
        locationData: {
          lat: '',
          lng: '',
          nowDistance:"",
        },
        flowItemVisibleId:0
      }
    },
    created() {
        
    },
    mounted() {
        
    },
    activated(){
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
        this.getFlowList(1);
    },
    deactivated(){
        dd.ready(()=> {
            dd.biz.navigation.setRight({
              control: false,//是否控制点击事件，true 控制，false 不控制， 默认false
              text: '',//控制显示文本，空字符串表示显示默认文本
              onSuccess : (result) => {
              },
              onFail : (err) => {}
            });
        });
    },

    methods: {
        // 获取更多
        loadMoreData(){
            this.getFlowList(this.listPage+1);
        },        
        //带动态listType跳转
        gotoNext(item,type){
            let json={};
            json.id=item.id;
            if(type){
                Indicator.open('加载中...');
                dd.ready(()=>{
                    dd.device.geolocation.get({
                        targetAccuracy : Number,
                        coordinate : Number,
                        withReGeocode : Boolean,
                        useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                        onSuccess : (result)=> {
                            this.locationData=gaode2baidu(result.latitude,result.longitude);
                            this.locationData.nowDistance=getDistance(this.locationData.lat,this.locationData.lng,item.latitude,item.longitude
                            );
                            json.latitude=this.locationData.lat;
                            json.longitude=this.locationData.lng; 
                            json.nowDistance=this.locationData.nowDistance;
                            if(this.listType==0){
                                this.gotoadd(json,item,'/objpoint/visit/signIn');
                            }else{
                                this.gotoadd(json,item,'/shop/visit/signIn');
                            }
                        },
                        onFail : function(err) {
                            Toast({message: "获取定位信息失败，请检查网络设置！", iconClass: 'mintui mintui-field-error'})
                            Indicator.close();
                        }
                    });
                });   
                //测试用的假经纬度
                // json.latitude="114.20176";
                // json.longitude="30.65203"; 
                // json.nowDistance="7225566.7599";
                // this.locationData.lat="114.20176";
                // this.locationData.lng="30.65203"; 
                // this.locationData.nowDistance="7225566.7599";
                // if(this.listType==0){
                //     this.gotoadd(json,item,'/objpoint/visit/signIn');
                // }else{
                //     this.gotoadd(json,item,'/shop/visit/signIn');
                // }
            }else{
                this.$router.push({
                name: 'VisitLogList',
                query:{id:item.id,targetType:this.listType,name:item.name}
                });
            }
        },
        //签到
        gotoadd(json,item,url){
            postTokenData(url,json,{
                success: (res)=> {
                    if (res.success) {
                        this.$router.push({
                            name: 'VisitLogAdd',
                            query:{name:item.name,id:item.id,targetType:this.listType,locationData:this.locationData}
                        });
                    } else {
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                },
                error: (data)=> {
                    Toast('Error : ' + JSON.stringify(data))
                }
            })
        },
        //添加记录
        addlogs(item){
            let storeLocation={};
            storeLocation.lat=item.latitude;
            storeLocation.lng=item.longitude
            this.$router.push({
                name: 'VisitLogAdd',
                query:{name:item.name,id:item.id,targetType:this.listType,storeLocation}
            });
        },
        // 获取列表
        getFlowList(page=1,arg={pageNo:1,pageSize:20}){
            arg.pageNo=page;
            let type = this.listType;
            //根据type决定获取数据的接口
            if(type==0){
                arg.formalCode=this.fitlerForm.code;
                arg.name=this.fitlerForm.name;
                this.getList(page,'/objpoint/visit/list',arg);
            }else{
                arg.code=this.fitlerForm.code;
                arg.shopName=this.fitlerForm.name;
                this.getList(page,'/shop/visit/list',arg);
            }  
        },
        //请求店铺列表数据
        getList(page,url,arg){
            postTokenData(url,arg,(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data|| [];
                    rjson.forEach((item,index)=>{
                        if(item.signIn==1){
                            Toast({message: item.name+"已签到，未提交拜访记录", iconClass: 'mintui mintui-field-error'})
                        }
                    })
                    if(page>1){
                        if(rjson.length){
                            this.listData = [...this.listData,...rjson];
                            this.listPage = page;
                        }else{
                            this.allLoaded = true;
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    }else{
                        this.listData = rjson;
                        if(rjson.length<2){
                            this.allLoaded = true;
                        }else{
                            this.allLoaded = false;
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
        jumpDetail(item){
            this.$router.push({
                name:'OfficialDetail',
                params:{tid:item.id, showMap:true}
            })
        },
        // 提交筛选
        fiterFormSubmit(){
            this.getFlowList(1);
            this.fitlerPopupVisible = false;
        },
        // 重置筛选表单
        clickResetFilterForm(){
            this.fitlerForm = {
                type:'0',
                name:'',
                code:'',
                filiale:'0',
            }
        },
    },
    computed: {
    },
    watch:{
        // 切换类型
        listType(val){
            this.getFlowList();
            this.clickResetFilterForm();
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
    .jumper-list{background: none;
        li{background: #fff;}
    }
</style>
