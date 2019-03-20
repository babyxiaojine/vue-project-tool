<template>
    <div class="wrapper">
        <div class="form2-title bdbtm mt10">业务信息</div>
        <ul class="jumper-list" v-if="objectList.length>0">
            <template v-for="(vo, index) in objectList">
                <li :key="index">
                    <router-link  :to="{name:'PlanControllerDetail',query:{id:vo.id}}" class="item bdbtm">
                        <div class="td2">{{vo.name}}</div>
                        <i class="iconfont icon-right-arrow"></i>
                    </router-link>
                </li>
            </template>
        </ul> 
        <div class="form2-title bdbtm mt10">流转信息</div>
        <ul class="process-list">
            <li v-for="(vo,index) in processList" :key="index">
                <div class="info">
                    <p>{{formatDate(vo.startDate,'yyyy-MM-dd')}}</p>
                    <p>发起人发起 {{vo.auditPeople}}</p>
                    <!-- <div class="remark">这份提议可以</div> -->
                </div>
                <div class="hands">{{vo.statusName}}</div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData, getSelectYear ,formatDate} from '@/util/common'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'PlanControllerReportDetail',
    components:{
        selectPicker
    },
    data() {
      return {
        gid: '',
        processInsId: '',
        objectList: [],
        processList: []
      }
    },
    created() {
        this.gid = this.$route.query.id
        this.getListData().then((pid)=>{
            this.getProcessData(pid)
        })
    },

    mounted() {
        // this.tabBtnHandler()
    },
    methods: {
        // 获取列表
        getListData(){
            return new Promise((rev,rej)=>{
                let id = this.gid;
                postTokenData('/objPoint/planObj/processDetail',{id},(res)=>{
                    if(res.code==='0000'){
                        let rjson = res.data.objectList || [];
                        this.objectList = rjson;
                        this.processInsId = res.data.processInsId;
                        rev(res.data.processInsId)
                    }
                })
            })
        },
        // 获取列表
        getProcessData(id){
            postTokenData('/act/historyFlow',{processInsId:id},(res)=>{
                if(res.code==='0000'){
                    let rjson = res.data || [];
                    this.processList = rjson
                }
            })
        },
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
        .fold{float: right; color:$blue;}
    }

</style>
