<template>
    <div class="wrapper">
        <div class="form2-title bdbtm mt10">规划目标点列表</div>
        <ul class="jumper-list" v-if="objectList.length>0">
            <template v-for="(vo, index) in objectList">
                <li :key="index">
                    <router-link :to="{name:'PlanControllerDetail',query:{id:vo.id}}" class="item bdbtm">
                        <div class="td2">{{vo.name}}</div>
                        <i class="iconfont icon-right-arrow"></i>
                    </router-link>
                </li>
            </template>
        </ul> 
        <form class="row-form" ref="postForm">
            <div class="row-item bdbtm mt10" v-if="!objData.readonly && objData.taskDefinitionKey == 'check4'">
                <div class="rtitle">审核意见</div>
                <div class="rvalue"><textarea placeholder="输入审核意见" rule="remark" error="输入意见字数限制5-50字" maxlength="50" class="ipt" v-model="comment"></textarea></div>
            </div>
        </form>


        <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

        <div class="foot-submit" v-if="!objData.readonly">
            <div class="form-handles fix-area">
                <template v-if="objData.taskDefinitionKey == 'check1'">
                    <button class="gray-btn bdtop" type="reset" @click="$router.back(-1)">返回</button>
                    <button class="sub-btn" type="submit" @click="handleProcess('yes')">提报审核</button>
                </template>
                <template v-if="objData.taskDefinitionKey == 'check4'">
                    <button class="gray-btn bdtop" type="reset" @click="$router.back(-1)">返回</button>
                    <button class="gray-btn bdtop" type="reset" @click="handleProcess('no')">不同意</button>
                    <button class="sub-btn" type="submit" @click="handleProcess('yes')">同意</button>
                </template>
                <template v-if="objData.taskDefinitionKey == 'check3'">
                    <button class="gray-btn bdtop" type="reset" @click="$router.back(-1)">返回</button>
                    <button class="sub-btn" type="submit" @click="handleProcess('yes')">下发</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import { validForm } from '@/util/utils'
  import {base,postTokenData, getSelectYear ,formatDate} from '@/util/common'
  import selectPicker from '@/components/selectPicker'

  import HistoryFlow from '../historyFlow'
  export default {
    name: 'TaskDetail2PlanController',
    components:{
        selectPicker,
        HistoryFlow
    },
    data() {
      return {
        objData: {},
        processInsId: '',
        objectList: [],
        comment: '',
      }
    },
    created() {
        const query = this.$route.query;
        console.log(query)
        this.objData = query;
        this.getListData()
    },

    mounted() {
        // this.tabBtnHandler()
    },
    methods: {
        // 操作流程
        handleProcess(actionType){
            if(actionType === 'yes'){
                this.submitProcessData('yes');
            }else{
                MessageBox.confirm('您确定不同意此项任务?').then(action => {
                    this.submitProcessData(actionType);
                })
            }
        },
        submitProcessData(actionType){
            const {objData, comment } = this;
            const validResult = validForm(this.$refs.postForm);
            if(!validResult.status){
                Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                return false;
            }
            postTokenData('/objPoint/planObj/auditProcess',{
                verifyId: objData.businessId,
                taskName: objData.taskDefinitionKey,
                taskId : objData.taskId,
                actionType,
                comment
            },(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    Toast('操作成功...');
                    setTimeout(()=>{
                        this.$router.back(-1);
                    },1500)
                }else{
                    Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
                }
            })
        },

        // 获取列表
        getListData(){
            return new Promise((rev,rej)=>{
                const {objData} = this;
                postTokenData('/act/dealTask',{businessId: objData.businessId, procDefKey: objData.procKey, taskDefinitionKey: objData.taskDefinitionKey},(res)=>{
                    if(res.code==='0000'){
                        let rjson = JSON.parse(res.data).objectList;
                        console.log()
                        this.objectList = rjson;
                        // this.processInsId = res.data.processInsId;
                    }
                })
            })
        },
        // 
        formatDate
    },
    computed: {
    },
    destroyed(){ 
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .jumper-list{background: none; border-top: 0;
        li{background: #fff; margin-top: 0;}
        .td2{flex:1;}
    }

    .form2-title{margin-left: 0; padding:0 p2r(15px); background: #fff;
        
    }

</style>
