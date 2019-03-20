<template>
    <div class="wrapper official-detail">
        <TargetInfo v-if="formData.id" :datailId="formData.id" :mapVisible="true" :locationData="{latitude: formData.latitude, longitude: formData.longitude, title: formData.name}"></TargetInfo>

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
                    <button class="sub-btn" type="submit" @click="submitProcessData('yes')">同意</button>
                </template>
            </div>
        </div>
        <PopComment ref="popComment" @confirm="confirmComment" ></PopComment>
    </div>
</template>



<script type="text/ecmascript-6">
    import { Toast,MessageBox } from 'mint-ui'
    import {formatForm, clearForm, getSession} from '@/util/utils'
    import {taskConfig, processTree} from '@/util/config'
    import {base,axiosPost,postTokenData } from '@/util/common'
    import TargetInfo from '@/pages/officialTarget/targetInfo'
    import PopComment from '@/components/PopComment'
    import imgPart from '../../officialTarget/children/imgPart'
    import HistoryFlow from '../historyFlow'
    export default {
        name: 'ApplyopenShop',
        data() {
            return {
                // datailId: 'dfdec848e0134aa3a471ac86104cb202',
                objData: {},
                formData:{
                },
                datailId: '',
                tabList: ['基础信息','照片','预算信息','租赁信息','工程信息','房东信息','经营分析','选址分析','拜访记录','定位信息'],
                tabIndex: 0,
                listType:"0",
                detailData: {},
                addrFoldIndex: -1,
                manageFoldIndex: -1,
                visitFoldIndex: -1,
                siteTotalNumber: 0,
                processLine:{
                    line: '',
                    node: -1
                },
                procData: {}
                // detailData: {base:{},img:{},rent:{},project:{},landlord:{},siteSelections:{},businessAnalysis:{},landlordComms:{}}

            }
        },
        components: {
            TargetInfo,
            imgPart,
            PopComment,
            HistoryFlow
        },
        created() {
            const query = this.$route.query;
            this.objData = query;
            this.readonly = !!query.readonly;
            this.getListData().then(()=>{
                this.getActLine(this.objData.taskDefinitionKey)
            })
        },
        mounted() {
            // this.initScrollNav();
        },
        methods: {
            // 获取当前流程线
            getActLine(check){
                let tree = processTree['applyopenshop'];
                let lineData = {
                    line: '',
                    node: -1
                };
                for(let t in tree){
                    let cid = tree[t].indexOf(check);
                    if(cid > -1){
                        lineData.line = t;
                        lineData.node = cid;
                        break;
                    }
                }
                console.log(lineData);
                this.processLine = lineData;
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
                                // this.getOfficialDetail(this.formData.id,0);
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
            // 提交业务流程
            submitProcessData(actionType){
                const {objData, formData, comment } = this;

                let procData = {};
                // 判断操作类型为同意 >> 并且有附加数据 >> 并且附加数据不通过验证
                if(actionType === 'yes'){
                    let actDom = this.getActivityRef();
                    console.log(actDom);
                    if(actDom){
                        procData = actDom.postData();

                        if(!procData){
                            return false;
                        }
                    }
                }
                this.procData = procData;
                let titles = {
                    'yes':'请输入同意的意见',
                    'no':'请输入退回的意见',
                    'reject':'请输入驳回的意见',
                };
                this.$refs.popComment.open(actionType,titles[actionType]);

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
                };
                let queryData = '';
                console.log(JSON.stringify(procData));
                // return false;
                postTokenData('/expandshop/applyOpenShop/audit'+(queryData ? '?'+queryData : ''),sectionData,(res)=>{
                    if(res.code==='0000'){
                        let rjson = res.data || [];
                        Toast({message: '操作成功...', iconClass: 'mintui mintui-field-success'})
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
            submitSaveData(){
//                this.$refs.popComment.open('check','请输入审核的意见');
                const {objData, formData, procData } = this;
                let sectionData = {
                    id: formData.id,
                    verifyId: objData.businessId,
                    taskName: objData.taskDefinitionKey,
                    taskId : objData.taskId,
                    procDef: objData.procKey,
                    actionType:'yes',
                    ...procData,
                };
                let queryData = '';
                console.log(JSON.stringify(procData));
                // return false;
                postTokenData('/expandshop/applyOpenShop/saveAudit'+(queryData ? '?'+queryData : ''),sectionData,(res)=>{
                    if(res.code==='0000'){
                        let rjson = res.data || [];
                        Toast({message: '操作成功...', iconClass: 'mintui mintui-field-success'})
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
            // 获取当前节点活动的表单
            getActivityRef(){
                const {objData} = this;
                let actDom = objData.taskDefinitionKey;
                if(actDom.indexOf('finish')>-1){
                    return false;
                }
                return this.$refs['process_'+actDom];
            },

        },
        computed: {

        }
    }
</script>

