<template>
    <div class="wrapper">
        <mt-navbar v-model="listType">
            <mt-tab-item id="1">待申请</mt-tab-item>
            <mt-tab-item id="2">已申请</mt-tab-item>
        </mt-navbar>
        <div class="plan-month mint-navContent">
            <ul class="jumper-list" v-if="listData.length>0" @touchend='touchEnd'>
                <mt-loadmore :bottom-method="loadMoreData" ref="loadmore" :bottom-all-loaded="allLoaded"
                             :autoFill="false">
                    <li class="bdbtm mt10" v-for="(vo, index) in listData" :key="index">
                        <div v-if="listType == 1" @click="goToDetail(vo)">
                            <div class="item bdbtm">
                                <div class="td2">{{vo.objName}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </div>
                            <div class="item-main">
                                <div class="im-num">{{vo.objStatus}}</div>
                                <div class="im-name">{{vo.address}}</div>
                            </div>
                            <div class="bdtop item-main" v-if="!!vo.tradingArea && vo.tradingArea.length>0">
                                <div class="im-num"></div>
                                <div class="im-name">{{vo.tradingArea}}</div>
                            </div>
                            <div class="jumper-handles bdtop">
                                <div v-if="vo.predictFinish" tag="button" class="btn" @click.stop="onApplyClick(vo)">申请</div>
                                <div v-else tag="button" style="color:#E8380D;">未测算</div>
                            </div>
                        </div>
                        <div v-else-if="listType == 2" @click="goToDetail(vo)">
                            <div class="item-main">
                                <div class="im-num">{{vo.processStatusName}}</div>
                                <div class="im-name">{{vo.processTitle}}</div>
                                <i class="iconfont icon-right-arrow"></i>
                            </div>
                            <div v-if="userName == vo.processCreateBy && 0 == vo.processStatus" class="jumper-handles bdtop">
                                <div tag="button" class="btn" @click.stop="onDeleteClick(vo)">删除</div>
                            </div>
                        </div>

                    </li>
                </mt-loadmore>
            </ul>
            <div class="nodata" v-else>
                <div class="iconfont icon-nodata"></div>
                <div class="txt-nodata">暂无数据...</div>
            </div>
            <div class="nodata" v-if="allLoaded && listPage>1">已经到底了</div>
        </div>
        <mt-popup
                v-model="fitlerPopupVisible"
                position="right">
            <div class="side-form">
                <form action="" @submit.prevent="fiterFormSubmit">
                    <div class="form-list">
                        <dl class="bdbtm">
                            <dt class="lab">目标点名称</dt>
                            <dd><input type="text" class="ipt" :placeholder="'请输入目标点名称'" v-model="fitlerForm.objName">
                            </dd>
                        </dl>
                        <dl class="bdbtm">
                            <dt class="lab">目标点编号</dt>
                            <dd><input type="text" class="ipt" :placeholder="'请输入目标点编号'" v-model="fitlerForm.objCode">
                            </dd>
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
    import {Toast, MessageBox} from 'mint-ui'
    import {base,getUserInfo, postTokenData} from '@/util/common'
    import {getStore} from '@/util/utils'
    export default {
        name: 'TobeSetupList',
        data() {
            return {
                listPage: 1,
                listType: "1",
                fitlerPopupVisible: false,
                allLoaded: false,
                fitlerForm: {
                    objCode: '',
                    objName: ''
                },
                userName:'',
                listData: [],
                bottomReached:0,
                startY:0,
                currentY:0,
                direction:'',
                maxDistance:0,
                translate:0,
                isflowItemVisible: false
            }
        },
        created() {
            this.setAuthUser();
        },
        activated(){
            this.getFlowList()
        },
        mounted() {
            dd.ready(() => {
                dd.biz.navigation.setRight({
                    control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                    text: '筛选',//控制显示文本，空字符串表示显示默认文本
                    onSuccess: (result) => {
                        this.fitlerPopupVisible = true;
                    },
                    onFail: (err) => {
                    }
                });
            });
        },
        methods: {
            // 获取更多
            loadMoreData(){
                this.bottomReached = 1;
                this.getFlowList(this.listPage + 1,)
            },
            // 跳转详情
            jumpCollectDetail(itemBox, item){
                itemBox.activeItem = item;
                this.$router.push({
                    name: 'CollectDetail',
                    params: itemBox
                })
            },
            // 获取列表
            getFlowList(page = 1, arg = {}){
                let listType = this.listType;
                postTokenData('/expandshop/applyOpenShop/list', {
                    type: listType,
                    pageNo: page,
                    pageSize: 20, ...arg
                }, (res) => {
                    this.bottomReached = 0;
                    if (res.code === '0000') {
                        let rjson = res.data || [];
                        if (page > 1) {
                            if (rjson.length > 0) {
                                this.listData = [...this.listData, ...rjson];
                                this.listPage = page;
                            } else {
                                this.allLoaded = true;
                            }
                            this.$refs.loadmore.onBottomLoaded();
                        } else {
                            if (rjson) {
                                this.listData = rjson;
                            } else {
                                this.allLoaded = true;
                            }
                            this.listPage = page;
                        }
                    }
                })
            },
            // 点击切换展开收起
            listToggleFold(index, item){
                this.isflowItemVisible = !this.isflowItemVisible;

            },
            // 提交筛选
            fiterFormSubmit(){
                let formData = this.fitlerForm;
                this.getFlowList(1, formData);
                this.fitlerPopupVisible = false;
            },
            // 重置筛选表单
            clickResetFilterForm(){
                this.fitlerForm = {
                    objCode: '',
                    objName: ''
                }
            },
            // 统计人流量时间和总人数
            collectTotalData(olist){
                const res = {
                    status: 0,
                    peoples: 0
                };
                const calcobj = {s1: 0, s2: 0, s3: 0, s4: 0, t1: 0, t2: 0, t3: 0, t4: 0};
                if (olist && olist.length) {
                    olist.map((v, k) => {
                        if (v.isWorkDay == 1) {
                            if (v.section == 'high') {
                                calcobj.t1 += v.duration;
                                calcobj.s1 += v.count
                            } else {
                                calcobj.t2 += v.duration;
                                calcobj.s2 += v.count
                            }
                        } else {
                            if (v.section == 'high') {
                                calcobj.t3 += v.duration;
                                calcobj.s3 += v.count
                            } else {
                                calcobj.t4 += v.duration;
                                calcobj.s4 += v.count
                            }
                        }
                    });
                    if (calcobj.t1 >= 120 & calcobj.t2 >= 120 & calcobj.t3 >= 120 & calcobj.t4 >= 120) {
                        res.status = 1;
                        res.peoples = parseInt(((calcobj.s1 * 5 * 60 / calcobj.t1 + calcobj.s2 * 7 * 60 / calcobj.t2) * 4 + (calcobj.s3 * 5 * 60 / calcobj.t3 + calcobj.s4 * 7 * 60 / calcobj.t4) * 3 ) / 7);
                    }
                }
                return res;
            },
            goToDetail(item){
                if (this.listType == 1) {
                    this.$router.push({
                        name: 'TobeSetupDetail', params: {
                            tid: item.objId,
                            locationData:{
                                latitude:item.latitude,
                                longitude:item.longitude,
                                address:item.address
                            }
                        }
                    });
                } else {
                    this.getItemDetail(item.processVerifyId).then((res) => {
                        console.log(res);
                        this.$router.push({
                            name: 'TobeSetupDetail', params: {
                                tid: res.id,
                                locationData:{
                                    latitude:res.latitude,
                                    longitude:res.longitude,
                                    address:res.name
                                }
                            }
                        });
                    })
                }
            },
            onApplyClick(vo){
                MessageBox.confirm('确认申请此信息?').then(action => {
                    this.handleApply(vo);
                }).catch(data=>{
                    console.log(data)
                })
            },
            handleApply(vo){
                postTokenData(base.basePath + '/expandshop/applyOpenShop/save',{name:vo.objName+'待开店申请',objId:vo.objId}, {
                    success: (res)=> {
                        if (res.success) {
                            Toast({message: res.message, iconClass: 'mintui mintui-field-success'});
                            let newList = [];
                            this.listData.map((data,id)=>{
                                if(data.objId !== vo.objId){
                                    newList.push(data)
                                }
                            })
                            this.listData = newList;
                        } else {
                            Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
                        }
                    },
                    error: (data)=> {
                        console.log(data);
                        Toast('Error : ' + JSON.stringify(data))
                    }
                });
            },
            onDeleteClick(item){
                MessageBox.confirm('确认删除此信息?').then(action => {
                    this.handleDelete(item);//删除菜单
                }).catch(data=>{
                    console.log(data)
                })
            },
            handleDelete(item){
                postTokenData(base.basePath + '/expandshop/applyOpenShop/deleteByVerifyId',{verifyId:item.processVerifyId}, {
                    success: (res)=> {
                        if (res.success) {
                            Toast({message: res.message, iconClass: 'mintui mintui-field-success'});
                            let newList = [];
                            this.listData.map((data,id)=>{
                                if(data.processVerifyId !== item.processVerifyId){
                                    newList.push(data)
                                }
                            })
                            this.listData = newList;
                        } else {
                            Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
                        }
                    },
                    error: (data)=> {
                        console.log(data);
                        Toast('Error : ' + JSON.stringify(data))
                    }
                });
            },
            getItemDetail(processVerifyId){
                return new Promise((resolve,rej)=>{
                    postTokenData('/expandshop/applyOpenShop/queryByVerifyId',{
                        verifyId: processVerifyId,
                    },(res)=>{
                        if(res.code==='0000'){
                            resolve(res.data);
                        }else{
                            Toast({
                                message: res.message,
                                iconClass: 'mintui mintui-field-error'
                            });
                        }
                    })
                })
            },
            setAuthUser(){
                this.userName = getStore('baseInfo').loginName;
            },
            touchEnd:function(event){
                if(this.bottomReached == 1){
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        },
        computed: {},
        watch: {
            // 切换类型
            listType(val){
                this.listData = [];
                this.allLoaded = false;
                this.getFlowList()
            }
        },
        destroyed(){
            dd.biz.navigation.setRight({
                control: false,
                text: ''
            });
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';

    .side-form {
        width: 75vw;
        height: 100vh;
        background: #fff;

    .form-list {
        padding-top: p2r(30px);
    }

    dl {
        padding: p2r(10px);
    }

    dt {
        padding-bottom: p2r(8px);
        font-size: p2r(12px);
        line-height: p2r(16px);
        position: relative;

    .iconfont {
        position: absolute;
        right: p2r(10px);
    }

    }
    dd {
        overflow: hidden;
        max-height: p2r(44px);

    &
    .open {
        max-height: none
    }

    }
    .vselect {
        float: left;
        width: 32%;
        text-align: center;
    @include trans;
        margin-left: 2%;
        height: p2r(44px);
        line-height: p2r(44px);
        font-size: p2r(12px);
        border-radius: p2r(4px);
        background: #f0f0f0;
        color: #333;
        margin-bottom: p2r(5px);

    &
    :nth-child(3n+1) {
        margin-left: 0;
    }

    &
    .on {
        background: rgba(65, 150, 247, 0.20);
        color: #4196F7;
    }

    }
    .ipt {
        height: p2r(32px);
        border: 1px solid #ddd;
        width: 100%;
        box-sizing: border-box;
        padding-left: p2r(10px);
    }

    .form-handles {
    @include flexbox;

    .reset-btn {
        width: 40%;
        background: #fff;
        color: #333;
    }

    .sub-btn {
        width: 60%;
    }

    }
    }

    .jumper-list {
        background: none;

    .td1 {
        width: p2r(60px);
    }

    .td2 {
        flex: 1;
    }

    li {
        background: #fff;
    }

    }
    .item-main {
    @include flexbox;
        padding: p2r(15px 15px);
        font-size: p2r(15px);
        color: #666;

    .im-num {
        width: p2r(70px);
    }

    .im-name {
        flex: 1;
    }

    }


</style>
