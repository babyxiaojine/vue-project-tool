<template>
    <div class="wrapper">
        <div class="main-content">
            <form class="row-form" ref="mustForm">
                <div class="row-item bdbtm" >
                    <div class="rtitle">{{listType==0 ? '目标点':'门店'}}</div>
                    <div class="rvalue">
                        <input  type="text" class="ipt" :value="name" readonly="" >
                    </div>
                </div>
                <div class="row-item bdbtm" >
                    <div class="rtitle"><i class="icon-must">*</i>沟通方式</div>
                    <div class="rvalue">
                        <input type="hidden" :name="this.listType==0?'linkUpMethod':'communicateStyle'" :value="formData.commuId">
                        <input rule="required" placeholder="选择沟通方式" type="text" class="ipt" :value="formData.commuType" readonly="" @click="$refs.contactTypeRef.open(commuTypeList,formData.commuType)" >
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                </div>
                <div class="row-item bdbtm" >
                    <div class="rtitle"><i class="icon-must">*</i>沟通对象</div>
                    <div class="rvalue">
                        <input rule="*2-20" :name="this.listType==0?'linkUpPerson':'communicatePerson'" placeholder="输入沟通对象,2-20个字" type="text" class="ipt" v-model="formData.objName">
                    </div>
                </div>
                <div class="row-item bdbtm" >
                    <div class="rtitle"><i class="icon-must">*</i>联系方式</div>
                    <div class="rvalue">
                        <input rule="contactWay" :name="this.listType==0?'phone':'contactType'" placeholder="输入正确联系方式" type="text" class="ipt" v-model="formData.contactType" >
                    </div>
                </div>
                <template v-if="listType==0">
                    <div class="row-item bdbtm">
                        <div class="rtitle"><i class="icon-must">*</i>开发费用</div>
                        <div class="rvalue">
                            <input rule="amount" name="developFee" placeholder="输入开发费用,最大支持6位数" type="text" class="ipt" v-model="formData.developPay" >
                        </div>
                    </div>
                    <div class="row-item bdbtm" >
                        <div class="rtitle"><i class="icon-must">*</i>租金</div>
                        <div class="rvalue">
                            <input rule="amount" name="rentFee" placeholder="输入租金,最大支持6位数" type="text" class="ipt" v-model="formData.rental" >
                        </div>
                    </div>
                    <div class="row-item bdbtm" >
                        <div class="rtitle"><i class="icon-must">*</i>店铺</div>
                        <div class="rvalue">
                            <input type="hidden" placeholder="选择沟通所在店铺" name="storeId" :value="formData.storeId">
                            <input placeholder="选择沟通所在店铺"  type="text" class="ipt" readonly="" @click="$refs.objNameRef.open(storeNameList,formData.storeName)" :value="formData.storeName" >
                            <i class="iconfont icon-right-arrow"></i>
                        </div>
                    </div>
                </template>
                <div class="row-item bdbtm" v-if="listType==1">
                    <div class="rtitle"><i class="icon-must">*</i>目的类型</div>
                    <div class="rvalue">
                        <input type="hidden" name="targetType" :value="formData.targetTypeId">
                        <input placeholder="请选择目的类型" rule="required" type="text" class="ipt" readonly="" @click="$refs.targetTypeRef.open(targetTypeList,formData.targetType)" :value="formData.targetType" >
                        <i class="iconfont icon-right-arrow"></i>
                    </div>
                </div>
                <div class="row-item" >
                    <div class="rtitle"><i class="icon-must">*</i>沟通内容</div>
                    <div class="rvalue"></div>
                </div>
                <div class="row-item bdbtm padding-top" >
                    <textarea rule="*10-2000" class="ipt text-left padding-top"  :name="this.listType==0?'context':'content'" placeholder="输入沟通内容,10-2000个字" v-model="formData.contactContent"></textarea>
                </div>
            </form>
        </div>
        <SuperSelect ref="contactTypeRef" @confirm="handleCommuType">沟通方式</SuperSelect>
        <SuperSelect ref="targetTypeRef" @confirm="handleTargetType">目的类型</SuperSelect>
        <SuperSelect ref="objNameRef" @confirm="handleStoreName">店铺</SuperSelect>
        <div class="foot-submit">
            <div class="fix-area">
                <mt-button type="primary" :disabled="disabledFlag" @click="commitLogs()">提交</mt-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Toast,MessageBox,Button} from 'mint-ui'
    import {base,postTokenData,formatDate,gaode2baidu,getDistance} from '@/util/common'
    import {validForm,formatForm} from '@/util/utils'
    import SuperSelect from '@/components/superSelect'
  export default {
    name: 'VisitLogAdd',    
    components:{
        SuperSelect
    },
    data() {
      return {
        listType:0,
        tid:"",
        name:"",
        disabledFlag:false,
        formData:{
            commuType:"",
            commuId:"",
            targetType:"",
            objName:"",
            contactType:"",
            developPay:"",
            storeName:"",
            storeId:"",
            targetType:"",
            contactContent:"",
        },
        locationData: {
          lat: '',
          lng: '',
          nowDistance:"",
        },
        storeLocation:{
            lat: '',
            lng: '',
        },
        commuTypeList:[''],
        targetTypeList:[''],
        storeNameList:[],
      }
    },
    created() {
        
    },
    mounted() {
        let routeQuery=this.$route.query;
        this.listType = routeQuery.targetType;
        this.tid=routeQuery.id;
        this.name=routeQuery.name;
        if(routeQuery.locationData){
            //签到点的经纬度
            this.locationData.lat=routeQuery.locationData.lat;
            this.locationData.lng=routeQuery.locationData.lng;
            this.locationData.nowDistance=routeQuery.locationData.nowDistance;
        }
        if(routeQuery.storeLocation){
            //店铺的经纬度
            this.storeLocation.lat=routeQuery.storeLocation.lat;
            this.storeLocation.lng=routeQuery.storeLocation.lng;
        }
        this.getcommuTypeList({type:"visit_communicate_style"});
        this.getcommuTypeList({type:"visit_target_type"});
        this.getstoreNameList({id:this.tid});
    },
    methods: {
        //选择沟通方式
        handleCommuType(res){
            this.formData.commuType=res.name;
            this.formData.commuId=res.id;
        },
        //选择目的类型
        handleTargetType(res){
            this.formData.targetType=res.name;
            this.formData.targetTypeId=res.id;
        },
        //选择店铺
        handleStoreName(res){
            this.formData.storeName=res.name;
            this.formData.storeId=res.storeId;
        },
        //提交记录
        commitLogs(){
            const validResult = validForm(this.$refs.mustForm);
            if(!validResult.status){
                Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                return false;
            };
            if(!this.locationData.lat){
                //点击添加记录进入
                this.disabledFlag=true;
                this.getDD();
            }else{
                //点击签到进入
                let json=formatForm(this.$refs.mustForm);
                json.latitude=this.locationData.lat;
                json.longitude=this.locationData.lng;
                json.nowDistance=this.locationData.nowDistance;
                if(this.listType==0){
                    json.id=this.tid;
                    this.saveAdd('/objpoint/visit/saveData',json);
                }else{
                    json.shopId=this.tid;
                    this.saveAdd('/shop/visit/saveRecord',json);
                }
            }
        },
        // 获取沟通方式/沟通目的下拉框
        getcommuTypeList(json){
            postTokenData('/select/selectData/getDicList',json,{
                success: (res)=> {
                    if (res.success) {
                        let resData = res.data || [];
                        let value=json.type;
                        if(value=="visit_communicate_style"){
                            this.commuTypeList = resData;
                        }
                        if(value=="visit_target_type"){
                            this.targetTypeList = resData;
                        }
                    } else {
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                },
                error: (data)=> {
                    Toast('Error : ' + JSON.stringify(data))
                }
            });
        },
        // 获取店铺下拉框
        getstoreNameList(json){
            postTokenData('/objpoint/visit/selectStore',json,{
                success: (res)=> {
                    if (res.success) {
                        let resData = res.data || [];
                        if(resData.length==0&&this.listType==0){
                            Toast({message:"店铺选项为空，需要维护目标点的千分点和焦点范围", iconClass: 'mintui mintui-field-error'})
                        }else{
                            resData.forEach((item,index)=>{
                            let json={};
                            json.storeId=item.storeId;
                            json.name=item.storeName;
                            this.storeNameList.push(json);
                        })
                        }
                    } else {
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                },
                error: (data)=> {
                    Toast('Error : ' + JSON.stringify(data))
                }
            });
        },
        //获取经纬度及距离
        getDD(){
            dd.ready(()=>{
                dd.device.geolocation.get({
                    targetAccuracy : Number,
                    coordinate : Number,
                    withReGeocode : Boolean,
                    useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess : (result)=> {
                        this.locationData=gaode2baidu(result.latitude,result.longitude);
                        this.locationData.nowDistance=getDistance(this.locationData.lat,this.locationData.lng,this.storeLocation.lat,this.storeLocation.lng,
                        );
                        let json=formatForm(this.$refs.mustForm);
                        json.latitude=this.locationData.lat;
                        json.longitude=this.locationData.lng;
                        json.nowDistance=this.locationData.nowDistance;
                        if(this.listType==0){
                            json.id=this.tid;
                            this.saveAdd('/objpoint/visit/saveData',json);
                        }else{
                            json.shopId=this.tid;
                            this.saveAdd('/shop/visit/saveRecord',json);
                        }
                    },
                    onFail : (err)=> {
                        Toast({message: "获取定位信息失败，请检查网络设置！", iconClass: 'mintui mintui-field-error'})
                        this.disabledFlag=false;
                    }
                });
            });
        },
        //调用接口存储记录并退出
        saveAdd(url,json){
            postTokenData(url,json,{
                success: (res)=> {
                    if (res.success) {
                        this.$router.go(-1);
                    } else {
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                },
                error: (data)=> {
                    Toast('Error : ' + JSON.stringify(data));
                    this.disabledFlag=false;
                }
            });
        }
    },
    computed: {
       
    },
    watch:{
        
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .form2-title{margin-left: 0!important; padding:0 p2r(15px); background: #fff;}
    .text-left{text-align: left!important;}
    .padding-top{padding-top:p2r(0px)!important;}
</style>
