<template>
    <div class="wrapper">
        <section class="task-list">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">待签收<span>({{list1.length}})</span></mt-tab-item>
                <mt-tab-item id="2">待办<span>({{list2.length}})</span></mt-tab-item>
                <mt-tab-item id="3">已办</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected" class="mt-tab">
                <mt-tab-container-item id="1">
                    <template v-if="list1.length>0">
                        <div class="task-list-item"  v-for="(vo,index) in list1">
                            <div class="item-main bdbtm">
                                <div class="item-tag">{{vo.procName.slice(0,1)}}</div>
                                <div class="item-info">
                                    <div class="name">{{vo.procName}} | <span>{{vo.title}}</span></div>
                                    <div class="time">{{formatDate(vo.createDate)}}</div>
                                </div>
                            </div>
                            <div class="jumper-handles"><button class="btn" type="button" @click="handleSign(vo.taskId)">签收</button></div>
                        </div>
                    </template>
                    <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <template v-if="list2.length>0">
                        <div class="task-list-item" v-for="(vo,index) in list2">
                            <div class="item-main bdbtm">
                                <div class="item-tag">{{vo.procName.slice(0,1)}}</div>
                                <div class="item-info">
                                    <div class="name">{{vo.procName}} | <span>{{vo.title}}</span></div>
                                    <div class="time">{{formatDate(vo.createDate)}}</div>
                                </div>
                            </div>
                            <div class="jumper-handles"><button class="btn" type="button" @click="jumpTodoTask(vo)">办理</button></div>
                        </div>
                    </template>
                    <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <mt-loadmore  :autoFill="false" :bottom-method="loadMoreData3" ref="loadmore3" :bottom-all-loaded="allLoaded3">
                        <template v-if="list3.length>0">
                            <div class="task-list-item" v-for="(vo,index) in list3">
                                <div class="item-main bdbtm">
                                    <div class="item-tag">{{vo.procName.slice(0,1)}}</div>
                                    <div class="item-info">
                                        <div class="name">{{vo.procName}} | <span>{{vo.title}}</span></div>
                                        <div class="time">{{formatDate(vo.createDate)}}</div>
                                    </div>
                                </div>
                                <div class="jumper-handles"><span>下一环节处理人：{{vo.nextProcessPeople}}</span><button class="btn" type="button" @click="jumpTodoTask(vo,true)">查看</button></div>
                            </div>
                        </template>
                        <div class="nodata" v-else><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>
                    </mt-loadmore>
                </mt-tab-container-item>
            </mt-tab-container>

        </section>
        <mt-popup
          v-model="filterPopupVisible"
          position="right">
          <div class="side-form">
            <form action="" @submit.prevent="filterFormSubmit">
                <div class="form-list">
                    <dl class="bdbtm">
                        <dt class="lab">流程名称</dt>
                        <dd>
                            <div class="vselect" :class="{'on':activeProcess == ''}" @click="selectProcess('')">全部</div>
                            <div class="vselect" :class="{'on':activeProcess == vo.processKey}" v-for="(vo,index) in allProcess" @click="selectProcess(vo.processKey)">{{vo.name}}</div>
                        </dd>
                    </dl>
                    <dl class="bdbtm">
                        <dt class="lab">时间</dt>
                        <dd>
                            <div class="vr-2">
                                <input type="text" class="ipt" placeholder="开始时间" @click="openPickerTime1" readonly="" :value="inputStartDate">
                                <input type="text" class="ipt" placeholder="结束时间" @click="openPickerTime2" readonly="" :value="inputEndDate">
                            </div>
                            
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
        <mt-datetime-picker ref="picker1" v-model="filter_start" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hourFormat="{value}时" minuteFormat="{value}分"></mt-datetime-picker>
        <mt-datetime-picker ref="picker2" v-model="filter_end" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hourFormat="{value}时" minuteFormat="{value}分"></mt-datetime-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate} from '@/util/common'
  import {taskConfig} from '@/util/config'
  import footNav from '@/components/footer/footNav'
  export default {
    name: 'TaskList',
    data() {
      return {
        selected: '1',//tab选中值
        list1:[],
        list2:[],
        list3:[],
        listPage3:1,
        allLoaded3:false,
        filterPopupVisible:false,
        filterForm:{
            procKey:'',
            start_time:'',
            end_time:''
        },
        allProcess:[],
        filter_start:new Date(),
        filter_end:new Date(),
        activeProcess:''
      }
    },
    components: {
      footNav
    },
    created() {
        this.filter_start =  new Date(Date.now()-90*24*3600000)
        this.getAllProcess();
    },
    mounted() {
    },
    activated(){
        this.getAllLists()
        this.tabBtnHandler()
    },
    methods: {
        // 获取流程
        getAllProcess(){
            postTokenData('/act/allProcess',{},(res)=>{
                if(res.code==='0000'){
                    this.allProcess = res.data;
                }
            })
        },
        // ddTab按钮
        tabBtnHandler(){
            dd.ready(()=> {
                dd.biz.navigation.setRight({
                  control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                  text: '筛选',//控制显示文本，空字符串表示显示默认文本
                  onSuccess : (result) => {
                    this.filterPopupVisible = true
                  }
                });
            });
        },
        // 普通列表
        getListData(url,attr,arg){
            console.log(arg)
            postTokenData(url,{...arg},(res)=>{
                if(res.code==='0000'){
                    if(res.data){
                        this[attr] = res.data;
                    }else{
                        this[attr] = [];
                    }
                    
                }
            })
        },
        // 办理流程
        jumpTodoTask(item,status){
            if(item.procKey && taskConfig[item.procKey]){
                let link = taskConfig[item.procKey];
                if(link){
                    if(typeof link == "object"){
                        link = link[item.taskDefinitionKey];
                        if(!link){
                            console.log('获取流程模板失败...')
                        }
                    }
                    this.$router.push({
                        name: link,
                        query: {...item,readonly:status}
                    })
                }
            }
        },
        // 加载型列表
        getFlowList(page=1,arg={}){
            postTokenData('/act/doneTask',{pageNo:page,pageSize:20,...arg},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data.list;
                    if(page>1){
                        if(rjson){
                            this.list3 = [...this.list3,...rjson];
                            this.listPage3 = page;
                        }else{
                            this.allLoaded3 = true;
                        }
                        this.$refs.loadmore3.onBottomLoaded();
                    }else{
                        if(rjson){
                            this.list3 = rjson;
                            this.listPage3 = page;
                        }else{
                            this.list3 = []
                            this.allLoaded3 = true;
                        }
                    }
                }
            })
        },
        formatDate,
        // 打开时间选择器
        openPickerTime1(){
            this.$refs.picker1.open()
        },
        openPickerTime2(){
            this.$refs.picker2.open()
        },
        // 加载更多列表
        loadMoreData3(res){
            this.getFlowList(this.listPage3+1)
        },
        getAllLists(){
            this.getListData('/act/todoUnSigned','list1')
            this.getListData('/act/todoSigned','list2')
            
        },
        getActTabList(arg){
            if(this.selected == 1){
                this.getListData('/act/todoUnSigned','list1',arg)
            }else if(this.selected == 2){
                this.getListData('/act/todoSigned','list2',arg)
            }else{
                this.getFlowList(1,arg)
            }
        },
        // 提交筛选
        filterFormSubmit(){
            const startDate = this.filter_start.getTime(),
                endDate = this.filter_end.getTime();
            if(startDate>endDate){
                Toast({
                  message: '开始时间不能大于结束时间',
                  iconClass: 'mintui mintui-field-error'
                });
                return false;
            }
            this.filterForm = {
                procKey: this.activeProcess,
                startDate: this.filter_start.getTime(),
                endDate: this.filter_end.getTime()
            }
            this.filterPopupVisible = false;
            this.getActTabList(this.filterForm);
            this.allLoaded3 = false;
        },
        // 重置筛选表单
        clickResetFilterForm(){
            this.filter_start = new Date(Date.now()-90*24*3600000),
            this.filter_end = new Date(),
            this.activeProcess = '',
            this.filterForm = {
                procKey:'',
                start_time:'',
                endDate:''
            };
        },
        // 选择流程
        selectProcess(val){
            this.activeProcess = val;
        },
        // 操作-签收
        handleSign(taskId){
            MessageBox.confirm('您确定签收此项任务?').then(action => {
                postTokenData('/act/claim',{taskId},(res)=>{
                    if(res.code==='0000'){
                        Toast('签收成功.')
                        this.getListData('/act/todoUnSigned','list1')
                        this.getListData('/act/todoSigned','list2')
                    }else{
                        Toast({
                          message: res.message,
                          iconClass: 'mintui mintui-field-error'
                        });
                    }
                })
            })

        }
    },
    watch:{
        selected(sid){
            if(sid==3){
                this.getFlowList()
            }
            // this.filterPopupVisible = true
        }
    },
    computed: {
        inputStartDate(){
            if(this.filter_start){
                return formatDate(this.filter_start.getTime(),'yyyy-MM-dd hh:mm');
            }else{
                return '';
            }
        },
        inputEndDate(){
            if(this.filter_end){
                return formatDate(this.filter_end.getTime(),'yyyy-MM-dd hh:mm');
            }else{
                return '';
            }
        }
    },
    deactivated(){
        dd.biz.navigation.setRight({
          control: false,
          text:''
        });
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .mt-tab{padding-top: 50px;}
    .task-list-item {
        margin-bottom: p2r(5px);
        background: #ffffff;
        &:first-child {
            margin-top: p2r(5px);
        }
        .item-main{@include flexbox; padding: p2r(10px 15px);}
        .item-tag{width:p2r(60px); height: p2r(60px); color:#fff; text-align: center; line-height: p2r(60px); background: #4196F7; border-radius:50%; font-size: p2r(22px); margin-right: p2r(12px);}
        .item-info{flex:1;}
        .name {
            line-height: p2r(20px);
            @include clamp;
            font-size: p2r(16px);
        }
        .time {
            font-size: p2r(12px);
            color: #999;
            padding-bottom: p2r(10px);
        }
    }

</style>
