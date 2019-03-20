<template>
    <div class="wrapper add-week">
        <div class="row-list bdtb">
            <div class="row-list-item" @click="selectItemData('startDate')">
                <div class="cell-title">开始时间</div>
                <div class="cell-value is-select">
                    <input class="ipt-data" type="text" :value="formatDate(saveData.startDate,'yyyy-MM-dd')" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">结束时间</div>
                <div class="cell-value is-select">{{formatDate(saveData.endDate,'yyyy-MM-dd')}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">标题</div>
                <div class="cell-value">{{saveData.title}}</div>
            </div>
            <div class="row-list-item" @click="selectItemData('selectLevel3')">
                <div class="cell-title">所属开发部</div>
                <div class="cell-value">
                    <input class="ipt-data" type="text" :value="level3Name" placeholder="请选择" readonly><i class="iconfont icon-right-arrow"></i>
                </div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预算</div>
                <div class="cell-value">{{budgeNumber}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当月预计</div>
                <div class="cell-value">{{predictNumber}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">当周跟进</div>
                <div class="cell-value">{{followUp}}</div>
            </div>
        </div>

        <form ref="postForm" class="post-form">
            <weekPlanItem ref="getMonthItem" :checkInfo="checkInfo" :pageParam="saveData" :followup.sync="followUp" :readonly="readonly" @itemData="getItemData"></weekPlanItem>
        </form>

        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="saveWeekPlan">保存</button>
            </div>
        </div>
        <!--内容选择-->
        <selectCalendar ref="refCalendar" @confirm="changeCalendar"></selectCalendar>
        <SuperSelect ref="superSelect" @confirm="changeMonth"></SuperSelect>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    import { Toast,MessageBox } from 'mint-ui'
    import {base,postTokenData,formatDate} from '@/util/common'
    import { validForm } from '@/util/utils'
    import {getSelectData,getPlanSelect} from '@/util/getData'
    import selectCalendar from '@/components/selectCalendar'
    import SuperSelect from '@/components/superSelect'
    import weekPlanItem from './children/weekPlanItem'
    export default {
        name: 'planManagerAddWeek',
        data() {
            return {
                readonly: false,
                budgeNumber: '',//预算数
                predictNumber: '',//预计数
                level3Name: '',//开发部名称
                followUp: 0,//当月跟进
                itemTotal: 0,//添加总数
                submitDisbled: false,
                selectLevel3: [],//开发部
                checkInfo:{},
                saveData: {
                    startDate: "",
                    endDate: "",
                    title: "",
                    week: "",
                    yearAndMonth: ""
                },
                selectedFormal:[]
            }
        },
        components: {
            SuperSelect,
            selectCalendar,
            weekPlanItem
        },
        created() {
        },
        mounted(){
            //获取开发部
            if (this.userBase.level2){
                getSelectData('officeList',{type:32,id:this.userBase.level2}).then((res)=>{
                    this.selectLevel3 = [...res];
                })
            }
        },
        methods: {
            formatDate,
            //开始日期
            selectItemData(field){
                if(field === 'startDate'){
                    this.$refs.refCalendar.open(field);
                }else{
                    this.$refs.superSelect.open(this[field],'',field);
                }

            },
            //选择月份
            changeMonth(val,type){
                if (type === 'selectLevel3'){
                    this.level3Name = val.name;
                    this.saveData.level3 = val.id
                }
            },
            //获取预算数
            getBudgetAndPredictNum(ymData){
                postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/getBudgetAndPredictNum',ymData, (res)=>{
                    if (res.success) {
                        console.log(res.data);
                        this.budgeNumber = res.data.budge;
                        this.predictNumber = res.data.predict;
                    } else {
                        Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                    }
                });
            },
            changeCalendar(val,field){
                console.log('changeCalendar >>>>>>');
                console.log(JSON.stringify(val));
                console.log('<<<<<<< changeCalendar');
                const {startDate} = this.saveData;
                const selectTime = val.formatTime;
                const arrTime = val.arrayTime;
                const nowWeek = this.getWeekOfMonth(selectTime).toString();
                console.log('nowWeek '+nowWeek);
                if (selectTime && field == 'startDate'){
                    let weekNum = new Date(selectTime).getDay();
                    if (weekNum != 1) {
                        MessageBox('提示', '开始时间必须为周一！');
                        return false;
                    }
                    this.checkInfo = {year:arrTime[0],month:arrTime[1],week:nowWeek}
                    this.checkExist({year:arrTime[0],month:arrTime[1],week:nowWeek}).then((res)=>{
                        if (!res){
                            let setBase = ()=>{
                                this.saveData[field] = selectTime;
                                this.saveData.endDate = selectTime + 86400*7*1000;
                                this.saveData.week = nowWeek;
                                this.saveData.title = this.userBase.name + arrTime[0]+ '年'+arrTime[1]+'月第' +nowWeek + '周计划';
                                this.saveData.yearAndMonth = arrTime[0]+arrTime[1];
                                this.getBudgetAndPredictNum({
                                    year:arrTime[0],
                                    month:arrTime[1]

                                });
                            }
                            if (startDate && startDate != selectTime){
                                MessageBox.confirm('确定更换开始时间，已选数据将被删除！','提示',{
                                    closeOnClickModal:false
                                }).then(({ value, action }) => {
                                    this.$refs.getMonthItem.clearAddData();//清空组件选择数据
                                    setBase();
                                }).catch((data)=>{});
                            } else {
                                setBase();
                            }
                        } else {
                            MessageBox.alert('本周计划是已存在！','提示');
                        }
                    });
                }

            },
            //检查开发专员周计划是否存在
            checkExist(checkData){
                return new Promise((resolve, reject)=>{
                    postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/checkExist',checkData, (res)=>{
                        if (res.success) {
                            resolve(res.data);
                        } else {
                            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                        }
                    })
                })
            },
            getWeekOfMonth(times){
                var date = new Date(times);
                var dateStart = new Date(times); // 本月初
                var firstWeek = 1;
                if (dateStart.getDay() === 1) {
                    firstWeek = 1;
                } else if (dateStart.getDay() === 0) {
                    firstWeek = 8 - 7 + 1;
                } else {
                    firstWeek = 8 - dateStart.getDay() + 1;
                }
                var weekIndex = 1;
                var c = date.getDate();
                if (date.getDay() === 1 && date.getDate() < 7) {
                    weekIndex = 1;
                } else if (c < firstWeek ) {
                    weekIndex = -1;
                } else {
                    if (c < 7) {
                        weekIndex = Math.ceil(c/7);
                    } else {
                        c = c - firstWeek + 1;
                        if (c%7 === 0) {
                            if (dateStart.getDay() !== 6) {
                                weekIndex = c/7;
                            } else {
                                weekIndex = c/7 + 1;
                            }
                        } else {
                            weekIndex = Math.ceil(c/7);
                        }
                    }
                }
                return weekIndex;
            },
            //获取子组件数据
            getItemData(data){
                let allNum = 0;
                for (let key in data){
                    allNum += data[key].length;
                }
                this.itemTotal = allNum;
                this.saveData = {
                    ...this.saveData,
                    ...data
                };
                this.selectedFormal = [...select];
            },
            //保存计划
            saveWeekPlan(){
                this.$refs.getMonthItem.savePlanData();
                const postParam = this.saveData;
                const validResult = validForm(this.$refs.postForm);
                if (this.itemTotal <= 0) {
                    Toast({message: '计划列表不能为空！', iconClass: 'mintui mintui-field-error'});
                    return false;
                }
                if(!validResult.status){
                    Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'});
                    this.submitDisbled = false;
                    return false;
                }
                postTokenData(base.basePath + '/devPlan/devPlanWeek/manager/addWeekPlan',postParam, {
                    success: (res)=> {
                        if (res.success) {
                            Toast({message: '操作成功...', iconClass: 'mintui mintui-field-success'})
                            setTimeout(()=>{
                                this.$router.back(-1);
                            },1500)
                        } else {
                            this.submitDisbled = false;
                            Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                        }
                    },
                    error: (data)=> {
                        this.submitDisbled = false;
                        console.log('Error:' + JSON.stringify(data));
                    }
                });
            }
        },
        computed: {
            ...mapState({
                userBase: state => state.userInfo.base
            })
        },
        destroyed(){
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .add-week {
        padding-top: p2r(10px);
        .row-list-item {
            background-color: #ffffff;
        }
    }



</style>
