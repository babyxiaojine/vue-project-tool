<template>
    <div class="wrapper">
        <div class="form2-title bdbtm mt10">目标点归属信息</div>

        <Check1 v-if="formData.procDef" ref="process_check1" :initData="formData" :readonly="readonly || processLine.node>0"></Check1>

        <form class="row-form mt10" ref="dataForm" v-if="processLine.line">
            <!-- 旗舰店（flagshipStoreDesign） -->
            <template v-if="formData.procDef === 'flagshipStoreDesign'">


                <template v-if="compareProcess('check0')">
                    <DesignPhoto title="平面图" :imgs="formData.planePath" :remark="formData.planeRemarks"></DesignPhoto>
                    <div class="row-item bdbtm">
                        <div class="rtitle">审图意见</div>
                        <div class="rvalue"><div class="rChar">{{formData.commentLp || '-'}}</div></div>
                    </div>
                </template>

                <div class="row-item bdbtm">
                    <div class="rtitle">设计开始时间</div>
                    <div class="rvalue"><div class="rChar">{{formatDate(formData.designschemeDate,'yyyy-MM-dd')}}</div></div>
                </div>

                <ExpectedDate :readonly="readonly || (objData.taskDefinitionKey !== 'check15' && objData.taskDefinitionKey !== 'check9')" :formData.sync="formData">预计进场时间</ExpectedDate>

                <EffectFlag v-if="compareProcess('check0')" :readonly="readonly || objData.taskDefinitionKey !== 'check0'" :formData="formData">是否需要效果图</EffectFlag>


                <DesignPhoto v-if="processLine.line==='line1' && compareProcess('checkx',1)" title="效果图" :imgs="formData.effectPath" :remark="formData.effectRemarks">效果图</DesignPhoto>

                <DesignPhoto v-if="(processLine.line==='line1' && compareProcess('checks2',1) ) || (processLine.line==='line2' && compareProcess('checks',1) )" title="施工图" :imgs="formData.constructionPath" :remark="formData.constructionRemarks">施工图</DesignPhoto>

                <BuildUnit v-if="objData.taskDefinitionKey === 'check16' || objData.taskDefinitionKey === 'check12'" :formData.sync="formData" :readonly="readonly">施工单位</BuildUnit>

                <BusinessBp v-if="compareProcess('check9') || compareProcess('check15')" :readonly="readonly || compareProcess('check9',1) || compareProcess('check15',1)" :formData="formData">是否已报批物业</BusinessBp>
            </template>
            <!-- 旗舰店（flagshipStoreDesign）end -->
            <!-- 主题店（themeStoreDesign） -->
            <template v-if="formData.procDef === 'themeStoreDesign'">

                <template v-if="compareProcess('check0')">
                    <DesignPhoto title="平面图" :imgs="formData.planePath" :remark="formData.planeRemarks"></DesignPhoto>
                    <div class="row-item bdbtm">
                        <div class="rtitle">审图意见</div>
                        <div class="rvalue"><div class="rChar">{{formData.commentLp || '-'}}</div></div>
                    </div>
                </template>

                <div class="row-item bdbtm">
                    <div class="rtitle">设计开始时间</div>
                    <div class="rvalue"><div class="rChar">{{formatDate(formData.designschemeDate,'yyyy-MM-dd')}}</div></div>
                </div>

                <ExpectedDate :readonly="readonly || (objData.taskDefinitionKey !== 'check13' && objData.taskDefinitionKey !== 'check9')" :formData.sync="formData">预计进场时间</ExpectedDate>

                <EffectFlag v-if="compareProcess('check2')" :readonly="readonly || objData.taskDefinitionKey !== 'check2'" :formData="formData">是否需要效果图</EffectFlag>


                <DesignPhoto v-if="processLine.line==='line1' && compareProcess('checkx',1)" title="效果图" :imgs="formData.effectPath" :remark="formData.effectRemarks">效果图</DesignPhoto>

                <DesignPhoto v-if="(processLine.line==='line1' && compareProcess('checks2',1)) || (processLine.line==='line2' && compareProcess('checks',1))" title="施工图" :imgs="formData.constructionPath" :remark="formData.constructionRemarks">施工图</DesignPhoto>

                <BuildUnit v-if="objData.taskDefinitionKey === 'check14' || objData.taskDefinitionKey === 'check11'" :formData.sync="formData" :readonly="readonly">施工单位</BuildUnit>

                <BusinessBp v-if="compareProcess('check9') || compareProcess('check13')" :readonly="readonly || compareProcess('check9',1) || compareProcess('check13',1)" :formData="formData">是否已报批物业</BusinessBp>
            </template>
            <!-- 主题店（themeStoreDesign）end -->
            <!-- 标准店（standardstoredesign） -->
            <template v-if="formData.procDef === 'standardstoredesign'">

                <template v-if="compareProcess('check2')">
                    <DesignPhoto title="平面图" :imgs="formData.planePath" :remark="formData.planeRemarks"></DesignPhoto>
                    <div class="row-item bdbtm">
                        <div class="rtitle">审图意见</div>
                        <div class="rvalue"><div class="rChar">{{formData.commentLp || '-'}}</div></div>
                    </div>
                </template>

                <div class="row-item bdbtm">
                    <div class="rtitle">设计开始时间</div>
                    <div class="rvalue"><div class="rChar">{{formatDate(formData.designschemeDate,'yyyy-MM-dd')}}</div></div>
                </div>

                <ExpectedDate :readonly="readonly || (objData.taskDefinitionKey !== 'check19' && objData.taskDefinitionKey !== 'check14')" :formData.sync="formData">预计进场时间</ExpectedDate>

                <EffectFlag v-if="compareProcess('check3')" :readonly="readonly || objData.taskDefinitionKey !== 'check3'" :formData="formData">是否需要效果图</EffectFlag>

                <DesignPhoto v-if="processLine.line==='line1' && compareProcess('checkx',1)" title="效果图" :imgs="formData.effectPath" :remark="formData.effectRemarks">效果图</DesignPhoto>

                <DesignPhoto v-if="(processLine.line==='line1' && compareProcess('checks2',1) ) || (processLine.line==='line2' && compareProcess('checks',1) )" title="施工图" :imgs="formData.constructionPath" :remark="formData.constructionRemarks">施工图</DesignPhoto>

                <BuildUnit v-if="objData.taskDefinitionKey === 'check21' || objData.taskDefinitionKey === 'check16'" :formData.sync="formData" :readonly="readonly">施工单位</BuildUnit>
                
                <BusinessBp v-if="compareProcess('check14') || compareProcess('check19')" :readonly="readonly || compareProcess('check14',1) || compareProcess('check19',1)" :formData="formData">是否已报批物业</BusinessBp>
            </template>
            <!-- 标准店（standardstoredesign）end -->
        </form>

        <HistoryFlow v-if="objData.processInstenceId" :processInstenceId="objData.processInstenceId"></HistoryFlow>
        
        <div class="foot-submit" v-if="!readonly">
            <div class="btnfold-layer" v-show="rejectVisible" @click="()=>{this.rejectVisible=false}"></div>
            <div class="form-handles fix-area">
                <button class="gray-btn bdtop" type="reset" @click="$router.back(-1)">返回</button>
                <button class="gray-btn bdtop" type="reset" @click="submitProcessData('no','请输入退回的意见')">退回</button>
                <div class="gray-btn btn bdtop" @click="showRejectVisible">驳回
                    <div class="form-menus" v-show="rejectVisible">
                        <a href="javascript:;" @click="submitProcessData('reject','请输入驳回到平面图的意见','planePath')">平面图</a>
                        <a href="javascript:;" v-if="processLine.stage===2 || processLine.stage===3" @click="submitProcessData('reject','请输入驳回到效果图的意见','effectPath')">效果图</a>
                        <a href="javascript:;" v-if="processLine.stage>2" @click="submitProcessData('reject','请输入驳回到施工图的意见','constructionPath')">施工图</a>
                    </div>
                </div>
                <button class="sub-btn" type="submit" @click="submitProcessData('yes')">同意</button>
            </div>
        </div>
        <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>
        
    </div>
</template>

<script type="text/ecmascript-6">
    import { Toast,MessageBox } from 'mint-ui'
    import {validForm,validRules ,formatForm, clearForm, getSession} from '@/util/utils'
    import {taskConfig, processTree} from '@/util/config'
    import {postTokenData, getSelectYear ,formatDate,objectParams} from '@/util/common'
    import PopComment from '@/components/PopComment'
    import SuperSelect from '@/components/superSelect'
    import HistoryFlow from '../historyFlow'
    import Check1 from './process/check1'
    import DesignPhoto from './process/designPhoto'
    import BuildUnit from './process/buildUnit'
    import ExpectedDate from './process/expectedDate'
    import EffectFlag from './process/effectFlag'
    import BusinessBp from './process/businessBp'
  export default {
    name: 'TaskDetail2DesignScheme',
    components:{
        PopComment,
        HistoryFlow,
        SuperSelect,
        Check1,
        DesignPhoto,
        BuildUnit,
        ExpectedDate,
        EffectFlag,
        BusinessBp
    }, 
    data() {
      return {
        objData: {},
        formData:{
        },
        comment: '',
        showFran:false,
        readonly:false,
        processLine:{
            line: '', //当前流程分支线,
            node: 0,  //当前流程节点索引,
            stage: 1  //当前流程阶段[1:设计图审批阶段,2:效果图审批阶段,3:需要效果图的施工图审批阶段,4:不需要效果图的施工图审批阶段]
        },
        procData: {},
        rejectVisible:false,
        rejectNode:'',
      }
    },
    created() {
        const query = this.$route.query;
        this.objData = query;
        this.readonly = !!query.readonly;
        this.getListData().then(()=>{
            
            this.getActLine(this.objData.taskDefinitionKey)
            // this.$refs.process_check1.todoInit()
        })

    },

    mounted() {
        // this.tabBtnHandler()
    },
    methods: {
        // 显示隐藏驳回菜单
        showRejectVisible(){
            this.rejectVisible = !this.rejectVisible;
        },
        // 比较节点信息
        compareProcess(cname,value=0){
            const processLine = this.processLine;
            let tree = processTree[this.formData.procDef];
            let cval = tree[processLine.line].indexOf(cname);
            return (cval>-1) && (processLine.node >= cval + value);
        },
        /* 获取当前流程线
        * @return 
        * line:当前流程分支线,
        * node:当前流程节点索引,
        * stage:当前流程阶段[1:设计图审批阶段,2:效果图审批阶段,3:需要效果图的施工图审批阶段,4:不需要效果图的施工图审批阶段]
        */
        getActLine(check){
            let tree = processTree[this.formData.procDef]
            let line = '', node = 0, stage = 1;
            for(let t in tree){
                let cid = tree[t].indexOf(check)
                if(cid > -1){
                    line = t
                    node = cid
                    break;
                }
            }
            if(line == 'line1'){
                let stage1 = tree.line1.indexOf('checkx'),
                    stage2 = tree.line1.indexOf('checks2');
                if(node > stage1){
                    stage = 2
                }    
                if(node > stage2){
                    stage = 3
                }    
            }else if(line == 'line2'){
                stage = 4;
            }
            this.processLine = {line,node,stage}
        },

        // 获取当前节点活动的表单
        getActivityRef(){
            const {objData} = this;
            let actDom = objData.taskDefinitionKey;
            if(actDom.indexOf('finish')>-1){
                return false;
            }
            return this.$refs['process_'+actDom];
        },

        // 提交业务流程
        submitProcessData(actionType,actionTitle='您的意见',actionStep=''){
            const {objData, formData, comment } = this;

            let procData = {}
            // 判断操作类型为同意 >> 并且有附加数据 >> 并且附加数据不通过验证
            if(actionType === 'yes'){
                let actDom = this.$refs.dataForm;
                const validResult = validForm(actDom);
                if(!validResult.status){
                    Toast({message: validResult.msg, iconClass: 'mintui mintui-field-error'})
                    return false;
                }
                procData = formatForm(actDom);
            }
            this.procData = procData;
            this.rejectNode = actionStep;
            this.$refs.popComment.open(actionType,actionTitle);

        },
        // 确认意见提交表单内容
        confirmComment(comment,actionType){
            const {objData, formData, procData,rejectNode } = this;
            let sectionData = {
                id: formData.id,
                verifyId: objData.businessId,
                taskName: objData.taskDefinitionKey,
                // procInsId:objData.processInstenceId,
                taskId : objData.taskId,
                procDef: objData.procKey,
                objectId: formData.objectId,
                // status: formData.status,
                actionType,
                comment,
                ...procData,
            }
            if(actionType === 'reject'){
                sectionData.rejectNode = rejectNode
            }
            console.log(JSON.stringify(sectionData))
            // return false;
            postTokenData('/expandshop/designScheme/audit',sectionData,(res)=>{
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
                    postTokenData('/act/dealTask',{businessId: objData.businessId, procDefKey: objData.procKey, taskDefinitionKey: objData.taskDefinitionKey},(res)=>{
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

<style lang="scss" scoped>
    .wrapper{height: 100vh; overflow-y:auto; -webkit-overflow-scrolling: touch;}
</style>