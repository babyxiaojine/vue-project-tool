<template>
    <div class="wrapper">
        <template v-if="initEnd">
            <template v-if="(processLine.line=='line1' && processLine.node<3) || (processLine.line=='line2' && processLine.node<2)">
                <div class="form2-title bdbtm mt10">业务信息</div>

                <Check1 ref="process_check1" :pageAuth="pageAuth" :initData="formData" :readonly="!!readonly || processLine.node>0"></Check1>
                <Check2 v-if="processLine.node>0" :ref="'process_'+objData.taskDefinitionKey" :initData="formData" :readonly="!!readonly || processLine.node>1"></Check2>
                <Check6 v-if="processLine.line=='line1' && processLine.node>1" ref="process_check6" :initData="formData" :readonly="readonly || processLine.node>2"></Check6>

                <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

                <div class="foot-submit" v-if="!objData.readonly">
                    <div class="form-handles fix-area">
                        <template v-if="processLine.node == 0">
                            <button class="gray-btn bdtop" type="button" @click="$router.back(-1)">返回</button>
                            <button class="sub-btn" type="button" @click="submitSaveData()">提交审核</button>
                        </template>
                        <template v-else>
                            <button class="gray-btn bdtop" type="reset" @click="$router.back(-1)">返回</button>
                            <button class="gray-btn bdtop" type="reset" @click="submitProcessData('no')">退回</button>
                            <button class="gray-btn bdtop" type="reset" @click="submitProcessData('reject')">驳回</button>
                            <button class="sub-btn" type="submit" @click="submitProcessData('yes')">同意</button>
                        </template>
                    </div>
                </div>
            </template>

            <template v-else>
                <Check3 :ref="'process_'+objData.taskDefinitionKey" v-if="(processLine.line=='line1' && processLine.node>2) || (processLine.line=='line2' && processLine.node>1)" :pageAuth="pageAuth" :checkStep="objData.taskDefinitionKey" :initData="formData" :readonlyType="readonly ? ( readonly == 2 ? 3 : 1 )  : ( objData.taskDefinitionKey.indexOf('finish')>-1 ? 2 : 0 )">

                    <HistoryFlow slot="history-flow" v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>

                    <div class="foot-submit" v-if="!objData.readonly" slot="foot-submit">
                        <div class="form-handles fix-area">
                            <template v-if="processLine.node == 0">
                                <button class="gray-btn bdtop" type="button" @click="$router.back(-1)">返回</button>
                                <button class="sub-btn" type="button" @click="submitSaveData()">提交审核</button>
                            </template>
                            <template v-else>
                                <button class="gray-btn bdtop" type="button" @click="$router.back(-1)">返回</button>
                                <button class="gray-btn bdtop" type="button" @click="submitProcessData('no','请输入退回的意见')">退回</button>
                                <button class="gray-btn bdtop" type="button" @click="submitProcessData('reject','请输入驳回的意见')">驳回</button>
                                <!-- <div class="gray-btn btn bdtop"  @click="submitProcessData('reject')">驳回<div class="form-menus"><a href="javascript:;">设计图</a><a href="javascript:;">效果图</a><a href="javascript:;">工程图</a></div></div> -->
                                <button class="sub-btn" type="submit" @click="submitProcessData('yes','请输入同意的意见')">同意</button>
                            </template>
                        </div>
                    </div>
                </Check3>
            </template>
            <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import store from '@/store/index'
    import { Toast,MessageBox } from 'mint-ui'
    import { validForm,validRules } from '@/util/utils'
    import {formatForm, clearForm, getSession} from '@/util/utils'
    import {taskConfig, processTree} from '@/util/config'
    import {postTokenData, getSelectYear ,formatDate,objectParams} from '@/util/common'
    
    import PopComment from '@/components/PopComment'
    import HistoryFlow from '../historyFlow'
    import Check1 from './process/check1'
    import Check2 from './process/check2'
    import Check6 from './process/check6'
    import Check3 from './process/check3'
  export default {
    name: 'TaskDetail2RequireMent1',
    components:{
        PopComment,
        HistoryFlow,
        Check1,
        Check2,
        Check6,
        Check3,
    },
    data() {
      return {
        objData: {},
        formData:{
        },
        comment: '',
        pageAuth:{
            new:false, //新店
            heavy:false, //老店重改
            light:false, //老店轻改
        },
        showFran:false,
        readonly:false,
        processLine:{
            line: '',
            node: 0
        },
        procData: {},
        initEnd:false
      }
    },
    created() {
        const query = this.$route.query;
        this.objData = query;
        this.readonly = query.readonly;
        this.setAuthUser();
        this.getActLine(this.objData.taskDefinitionKey)
        this.getListData().then(()=>{
            this.initEnd = true;
        })

        
    },

    mounted() {
        // this.tabBtnHandler()
    },
    methods: {
        // 获取当前流程线
        getActLine(check){
            let tree = processTree['ProRequirementsDesignNew']
            let lineData = {
                line: '',
                node: 0
            }
            for(let t in tree){
                let cid = tree[t].indexOf(check)
                if(cid > -1){
                    lineData.line = t
                    lineData.node = cid
                    break;
                }
            }
            this.processLine = lineData;
        },
        // 获取授权功能
        setAuthUser(){
            let { AuthorityInfo = [] } = (store.getters['userInfo/getAuthInfo'] || {});
            let pageAuth = this.pageAuth;
            if(AuthorityInfo.indexOf('requirementApply:new')>-1){
                pageAuth.new = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:heavy')>-1){
                pageAuth.heavy = true;
            }
            if(AuthorityInfo.indexOf('requirementApply:light')>-1){
                pageAuth.light = true;
            }
            if(!pageAuth.new){
                this.formData.objectType = '0';
            }
            this.pageAuth = pageAuth;
        },


        // 获取当前节点活动的表单
        getActivityRef(){
            const {objData} = this;
            let actDom = objData.taskDefinitionKey;
            return this.$refs['process_'+actDom];
        },

        // 提交业务流程
        submitProcessData(actionType,actionTitle='您的意见'){
            const {objData, formData, comment } = this;

            let procData = {}
            // 判断操作类型为同意 >> 并且有附加数据 >> 并且附加数据不通过验证
            if(actionType === 'yes'){
                let actDom = this.getActivityRef();
                if(actDom){
                    procData = actDom.postData();
                    if(!procData){
                        return false;
                    }
                }
            }
            this.procData = procData;
            this.$refs.popComment.open(actionType,actionTitle);

        },
        // 确认意见提交表单内容
        confirmComment(comment,actionType){
            const {objData, formData, procData } = this;
            let sectionData = {
                id: formData.id,
                verifyId: objData.businessId,
                taskName: objData.taskDefinitionKey,
                taskId : objData.taskId,
                procDef: objData.procKey,
                actionType,
                comment,
                ...procData,
            }
            let queryData = '';
            if(objData.taskDefinitionKey=='check3' || objData.taskDefinitionKey=='check5'){
                queryData = this.getActivityRef().queryData()
            }
            console.log(JSON.stringify(procData))
            // return false;
            postTokenData('/requireMent/design/audit'+(queryData ? '?'+queryData : ''),sectionData,(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    Toast({message:'操作成功...', iconClass: 'mintui mintui-field-success'});
                    setTimeout(()=>{
                        this.$router.back(-1);
                    },1500)
                }else{
                    Toast({
                      message: res.message,
                      iconClass: 'mintui mintui-field-error'
                    });
                }
            })
        },
        // 提交审核check1 or commit
        submitSaveData(){
            this.$refs.process_check1.submitSaveData();
        },
        // 获取列表
        getListData(){
            return new Promise((reslove,rej)=>{
                const {objData} = this;
                let paramsData = getSession(this.$route.name);
                if(paramsData){
                    this.formData = paramsData;
                    reslove();
                }else{
                    const {readonly,processLine} = this;
                    let taskDefinitionKey = objData.taskDefinitionKey;
                    // if(readonly){
                    //     let actLine = processTree['ProRequirementsDesignNew'][processLine.line]
                    //     taskDefinitionKey = actLine[actLine.length-1];
                    // }
                    postTokenData('/act/dealTask',{businessId: objData.businessId, procDefKey: objData.procKey, taskDefinitionKey},(res)=>{
                        if(res.code==='0000'){
                            let rjson = JSON.parse(res.data);
                            this.formData = rjson;
                            reslove();  
                        }else{
                            Toast({
                              message: res.message,
                              iconClass: 'mintui mintui-field-error'
                            });
                        }
                    })
                }

            })
        },
        // 
        formatDate
    },
    watch:{
        formData(to,from){

        }
    },

    computed: {
    },
    destroyed(){ 
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .wrapper{height: 100vh; overflow-y:auto; -webkit-overflow-scrolling: touch;}

    .form2-title{margin-left: 0 !important; padding:0 p2r(15px); background: #fff;}

</style>
