<template>
    <div>
      <div class="form2-title bdbtm mt10">流转信息 <span class="fold" v-if="processList.length>1" @click="changeDataVisible">{{dataVisible ? '收起' : '展开'}}</span></div>
      <ul class="process-list">
          <li v-for="(vo,index) in processList" :key="index" v-show="index==0 || dataVisible">
              <div class="info">
                  <p>{{formatDate(vo.startDate,'yyyy-MM-dd hh:mm')}}</p>
                  <p v-if="vo.auditPeople">执行人 {{vo.auditPeople}}</p>
                  <div v-if="vo.comment" class="remark">{{vo.comment}}</div>
              </div>
              <div class="hands">{{vo.statusName}}</div>
          </li>
      </ul>

    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { postTokenData, formatDate } from '@/util/common'
  export default {
    name:'HistoryFlow',
    components:{
    },
    props:{
      processInstenceId:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        processList: [],
        dataVisible: false,
      }
    },
    created() {
     this.getProcessData()   
    },

    mounted() {

    },
    methods: {
      formatDate,
       // 获取列表
       getProcessData(){
           const {processInstenceId} = this;
           postTokenData('/act/historyFlow',{processInsId: processInstenceId},(res)=>{
               if(res.code==='0000'){
                   let rjson = res.data || [];
                   this.processList = rjson
               }
           })
       },
       // 展开收起流转信息
       changeDataVisible(){
           this.dataVisible = !this.dataVisible;
       },
    },
    watch:{

    },

  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .form2-title{margin-left: 0!important; padding:0 p2r(15px); background: #fff;}

</style>