<template>
    <div class="wrapper">
        <div class="collect-list">
            <ul class="coll-list">
                <li class="bdbtm"><div class="lab">名称</div><div class="info">{{detail.shopName}}</div></li>
                <li class="bdbtm"><div class="lab">目标点类型</div><div class="info">{{detail.type == '0' ? '目标点' : '门店'}}</div></li>
                <li class="bdbtm"><div class="lab">人数</div><div class="info">{{detail.activeItem.count}} 人</div></li>
                <li class="bdbtm"><div class="lab">测试时间</div><div class="info">{{formatDate(detail.activeItem.startDate)}} - {{formatDate(detail.activeItem.endDate)}}</div></li>
                <li class="bdbtm"><div class="lab">持续时间</div><div class="info">{{detail.activeItem.duration}} 分钟</div></li>
                <li class="bdbtm"><div class="lab">是否工作日</div><div class="info">{{detail.activeItem.isWorkDay==1 ? '是' : '否'}}（周{{detail.activeItem.week}}）</div></li>
                <li class="bdbtm"><div class="lab">时间区段</div><div class="info">{{detail.activeItem.section==='high' ? '高峰' : '低峰'}}</div></li>
                <li class="bdbtm"><div class="lab">提交时离店距离</div><div class="info">{{detail.activeItem.distance}} 米</div></li>
                <li class="bdbtm"><div class="lab">区域</div><div class="info">{{detail.area}}</div></li>
                <li class="bdbtm"><div class="lab">详细地址</div><div class="info">{{detail.addrDetail}}</div></li>
                <li class="bdbtm"><div class="lab">归属公司</div><div class="info">{{detail.company}}</div></li>
                <li class="bdbtm"><div class="lab">归属分公司</div><div class="info">{{detail.filiale}}</div></li>
            </ul>
        </div>

        <div class="foot-submit">
            <div class="fix-area">
                <button class="btn" type="button" @click="clickDeleteData">删除</button>
            </div>
        </div>

    </div> 
</template>

<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData,formatDate} from '@/util/common'
  export default {
    name: 'collectDetail',
    data() {
      return {
        detail:{}
      }
    },
    components: {

    },
    created() {
        var pathParams = this.$route.params
        this.detail = pathParams;
    },
    mounted() {
    },
    methods: {
      formatDate:formatDate,

      clickDeleteData(){
          MessageBox.confirm('确认删除此信息?').then(action => {
            this.handleDelete();//删除菜单
          }).catch(data=>{
            console.log(data)
          })
      },
      handleDelete(){
        postTokenData('/daily/peopleCount/delete',{id:this.detail.activeItem.id},(res)=>{
            if(res.code==='200'){
                Toast({message:'删除成功！',iconClass: 'mintui mintui-field-success'});
                this.$router.back(-1);
            }
        })
      }
    },
    computed: {

    }
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .collect-list{
        padding-top:p2r(10px); margin-bottom:p2r(20px);
    }
    .coll-list {
        background: #ffffff;
        .bdbtm {
            font-size:p2r(16px);
            color:#333;
            @include flexbox;
            line-height: p2r(24px);
            padding: p2r(10px 20px 10px 0);
            margin-left: p2r(20px);
            &:last-child:after{display: none;}
        }
        .lab{width:p2r(140px);}
        .info{flex:1; text-align: right;}
    }


</style>
