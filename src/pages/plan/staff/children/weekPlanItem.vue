<template>
    <div>
        <div class="mass-tab">
            <ul class="mass-tab-title bdbtm">
                <li v-for="(item,index) in weekData" :class="index == tabIndex && 'active'" :id="index" :ket="index" @click="tabItemSelect(index,item.type)"><span>{{item.day}}</span>{{item.week}}</li>
            </ul>
        </div>
        <div class="add-target">
            <div class="target-top bdbtm" v-if="!readonly" @click="addPlanItem"><span>+添加目标点</span></div>
            <div class="target-tips">清务必保证添加经理周计划的目标点</div>
            <div class="target-list">
                <ul class="bdtop clearfix">
                    <li class="bdbtm" v-for="(item,index) in selectedFormal" :key="index" v-if="item.type == tabType">
                        <div class="tl-dir">
                            <span>{{item.name}}</span>
                            <!--<input type="text" placeholder="预计跟进次数">-->
                            <button v-if="!readonly" type="button" @click="delAppointItem({index:index,filed:tabType,tag:item.id})">删除</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--内容选择-->
        <SuperSelect ref="superSelect" @confirm="changeFormal"></SuperSelect>

    </div>

</template>
<script>
  import { Toast,MessageBox } from 'mint-ui'
  import {base,postTokenData} from '@/util/common'
  import SuperSelect from '@/components/superSelect'
  export default {
    name: 'weekPlanItem',
    data () {
      return {
        tabIndex: 0,
        tabType: 'sunday',
        weekData: [],
        selectedFormal: [],//选中的目标点
        formalDataList: [],
        saveData: {
          friday: [],
          monday: [],
          saturday: [],
          sunday: [],
          thursday: [],
          tuesday: [],
          wednesday: [],
        },
      }
    },
    props: {
      readonly:{
        default: false,
        type: Boolean,
      },
      pageParam:{
        type: Object,
        default: ()=> {
          return {};
        }
      }
    },
    components: {
      SuperSelect
    },
    created() {
      //TAB标题
      this.getWeek();
    },
    mounted() {
    },
    methods: {
      tabItemSelect(val,type){
        this.tabType = type;
        if(val != this.tabIndex) this.tabIndex = val;

      },
      //添加子类选择
      addPlanItem(){
        let {tabIndex,tabType} = this;
        let {startDate} = this.pageParam;
        if (!startDate) {MessageBox.alert('请选择开始时间！','提示');return false;}
        //获取数据
        if (this.formalDataList.length){
          this.$refs.superSelect.open(this.formalDataList,'',tabType);
        } else {
          postTokenData(base.basePath + '/expandshop/devPlan/devPlanWeek/devAttache/getFormalList',{}, (res)=>{
            if (res.success) {
              let resData = res.data || [];
              // console.log(resData,'sssssss')
              this.formalDataList = resData;
              this.$refs.superSelect.open(this.formalDataList,'',tabType);
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          });
        }
      },
      //选择目标点
      changeFormal(val,type){
        //判断是否存在
        if (this.saveData[type].indexOf(val.id) > -1){
          MessageBox.alert('目标点选择重复！', '提示');
          return false;
        }
        const typeObj = {id:val.id,name:val.name,type};
        this.selectedFormal.unshift(typeObj);//添加选中集合
        this.saveData[type].unshift(val.id)
      },
      //删除指定项
      delAppointItem(param){
        let delIndex;
        let index = param.index;
        let filed = param.filed;
        let tag = param.tag;

        MessageBox.confirm('确定删除此项！','提示',{
          closeOnClickModal:false
        }).then(({ value, action }) => {
          const {selectedFormal} = this;
          this.saveData[filed].splice(index,1);//删除当前项
          for (let key in selectedFormal){
            if (selectedFormal[key].id == tag) {
              this.selectedFormal.splice(key,1);//删除展示项
            }
          }
        }).catch((data)=>{
          console.log(data)
        });
      },
      clearAddData(){
        this.saveData= {
          friday: [],
          monday: [],
          saturday: [],
          sunday: [],
          thursday: [],
          tuesday: [],
          wednesday: [],
        };
        this.selectedFormal = [];
      },
      //本周日期
      getWeek() {
        let weekData = [];
        let now = new Date();
        //周日开始
        let firstDay=new Date(now - (now .getDay()) * 86400000);
        for (let i = 0; i < 7; i++){
          let weekItem = {};
          weekItem.day = firstDay.getDate() + i;
          weekItem.week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][firstDay.getDay() + i];
          weekItem.type = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][firstDay.getDay() + i];
          weekData.push(weekItem);
        }
        this.weekData = weekData;
      },

      //保存数据
      savePlanData(){
        let {saveData,selectedFormal} = this;
        this.$emit("itemData", saveData,selectedFormal);
      }
    },
    watch: {
      'pageParam.businessInfo'(newVal,oldVal){
        let weekData = {};
        let itemTotal = [];
        let itemSelected = [];
        for (let key in newVal){
          let itemVal = newVal[key];
          let itemArr = [];
          itemVal.forEach((item,index)=>{
            itemArr.push(item.id);
            itemTotal.push(item.id);
            item.type = key;
            itemSelected.push(item);
          });
          weekData[key] = itemArr;
        }
        this.saveData = {...weekData};
        this.selectedFormal = itemSelected;
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .mass-tab {
        padding-top: p2r(10px);
    }
    .mass-tab-title {
        li {
            flex-direction: column;
            span {
                width: p2r(40px);
            }
        }
    }
    .add-target .target-list{margin:0;};
</style>