<template>
    <div class="wrapper store-calc" ref="calcWrapper">
        <div class="store-select" v-if="selectType == 1" ref="calcOptions">
            <div class="row-list bdtb">
                <div class="row-list-item">
                    <div class="cell-title">归属公司</div>
                    <div class="cell-value">{{level1Name}}</div>
                </div>
                <div class="row-list-item">
                    <div class="cell-title">归属分公司</div>
                    <div class="cell-value">{{level2Name}}</div>
                </div>
                <div class="row-list-item" @click="editComSelect('level3Ref','level3List',31,level2)">
                    <div class="cell-title">归属营运部</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="level3Name" placeholder="请选择" readonly><i v-if="!level3" class="iconfont icon-right-arrow"></i></div>
                </div>
                <div class="row-list-item" @click="editComSelect('level4Ref','level4List',4,level3)">
                    <div class="cell-title">归属区域</div>
                    <div class="cell-value"><input class="ipt-data" type="text" v-model="level4Name" placeholder="请选择" readonly><i v-if="!level4" class="iconfont icon-right-arrow"></i></div>
                </div>

            </div>
        </div>

        <div class="collect-store" v-bind:style="{height: scrollHeight+'px'}">
            <ul class="store-list bdtop" v-if="shopList.length">
                <li class="bdbtm" @click="checkItemOption(item,index)" v-for="(item,index) in shopList" :key="index">
                    <em :class="(item.shopCustomOrderFee && item.shopCustomOrderNum && item.flowCount) ? '':'check-disbled'"><i class="iconfont" :class="checkItem == index ? 'icon-selected':'icon-select'"></i>{{item.name}}</em>
                    <span class="total" :class="item.flowCount ? '':'red'">{{item.flowCount ? (item.flowCount/7).toFixed()+'人/日':'收集时间不足'}}</span>
                    <span class="shop">{{item.shopTypeName}}</span>
                </li>
            </ul>
            <ul class="store-list bdtop" v-if="targetList.length">
                <li class="bdbtm" @click="checkItemOption(item,index)" v-for="(item,index) in targetList" :key="index">
                    <em :class="item.flowCount ? '':'check-disbled'"><i class="iconfont" :class="checkItem == index ? 'icon-selected':'icon-select'"></i>{{item.name}}</em>
                    <span class="total" :class="item.flowCount ? '':'red'">{{item.flowCount ? (item.flowCount/7).toFixed()+'人/日':'收集时间不足'}}</span>
                    <span class="shop">{{item.objTypeName}}</span>
                </li>
            </ul>
            <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

        </div>

        <!--归属管理部门-->
        <selectPicker ref="level3Ref" :options="level3List" @confirm="level3Confirm"></selectPicker>
        <!--归属区域-->
        <selectPicker ref="level4Ref" :options="level4List" @confirm="level4Confirm"></selectPicker>

    </div>
</template>



<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,gaode2baidu} from '@/util/common'
  import {getSelectData} from '@/util/getData'
  import selectPicker from '@/components/selectPicker'
  export default {
    name: 'calcSelect',
    data() {
      return {
        objId: '',
        level1: '',
        level1Name: '',
        level2: '',
        level2Name: '',
        level3: '',
        level3Name: '',
        level4: '',//归属区域
        level4Name: '',
        startTime: '',
        endTime: '',
        checkItem: null,
        shopList: [],//门店列表
        targetList: [],//目标点列表
        noResult: false,
        selectType: 0,//选择类型
        scrollHeight: 0,//列表区域高度
        //选择数据
        level1List: [],//所属公司
        level2List: [],//所属分公司
        level3List: [],//归属管理部门
        level4List: [],//归属区域


      }
    },
    components: {
      selectPicker
    },
    created() {
      const routeParam = this.$route.params;
      // console.log(routeParam,'带参')
      if (routeParam.startTime && routeParam.endTime){
        this.objId = routeParam.tid;
        this.startTime = routeParam.startTime;
        this.endTime = routeParam.endTime;
        this.selectType = routeParam.selectType;
      }
      //设置title
      dd.ready(() => {
        dd.biz.navigation.setTitle({title: this.selectType == 0 ? '选择目标点':'选择参考门店'});
      })
    },
    mounted() {
      let {selectType} = this;
      let wrapHeight = this.$refs.calcWrapper.clientHeight;
      if (selectType == 0){
        this.scrollHeight = wrapHeight;
      } else {
        let calcOptions = this.$refs.calcOptions.clientHeight;
        this.scrollHeight = Number(wrapHeight-calcOptions);
      }

      //目标点数据加载
      if (this.selectType == 0) this.getStoreList();

      this.refreshUserInfo();
    },
    methods: {
      formatDate,
      //Picker公司店铺区域管理部选择
      editComSelect(refName,resList,postType,postId){
        let {level3,level2} = this;
        if (refName == 'level4Ref' && level3 == ''){
          MessageBox.alert('请选择所属营运部！', '提示');
          return false;
        }
        this.$refs[refName].open();
        if(this[resList].length < 1){
          getSelectData('officeList',{type:postType,id:postId}).then((res)=>{
            this[resList] = [...res];
          });
        }

      },
      //归属营运部门
      level3Confirm(res){
        this.level3 = res.id;
        this.level3Name = res.name;
      },
      //所在地区
      level4Confirm(res){
        this.level4 = res.id;
        this.level4Name = res.name;
        if (this.level4){
          this.getStoreList();
        }
      },
      //选择门店
      checkItemOption(item,index){
        let {startTime,endTime,level4,selectType} = this;
        if (selectType == 0){
          if (!item.flowCount){
            return false;
          }
          this.$store.dispatch('pageCache/setData',{
            calcStoreSelect:{
              ...this.calcSelectData,
              target: {...item},
              startTime,
              endTime
            }
          });

        } else if (selectType == 1){
          if ((!item.shopCustomOrderFee || !item.shopCustomOrderNum) && item.flowCount){
            Toast({message: '请检查客单费和客单数！',duration: 1000});
          }
          if (!item.shopCustomOrderFee || !item.shopCustomOrderNum || !item.flowCount){
            return false;
          }
          this.$store.dispatch('pageCache/setData',{
            calcStoreSelect:{
              ...this.calcSelectData,
              store: {...item},
              startTime,
              endTime
            }
          });
        }
        this.checkItem = index;

        this.$router.back(-1);
      },
      getStoreList(){
        let {objId,startTime,endTime,level4,selectType} = this;
        let postUrl = '';
        let postParam = {
          "endDate": endTime,
          "level4": level4,
          "objId": objId,
          "startDate": startTime
        };
        if (selectType == 1){
          postUrl = '/daily/fixedPointPredict/shopList';
        } else if (selectType == 0){
          postUrl = '/daily/fixedPointPredict/formalObjList';
        }
        postTokenData(base.basePath + postUrl,postParam, {
          success: (res)=> {
            if (res.success) {
              let resData = res.data || [];
              if (resData.length < 1) this.noResult = true;
              if (selectType == 1){
                this.shopList = [...resData];
              } else if (selectType == 0){
                this.targetList = [...resData];
              }

            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('Error : ' + JSON.stringify(data))
          }
        });
      },
      //用户基本信息
      refreshUserInfo(){
        postTokenData(base.basePath + '/user/userInfo',{}, {
          success: (res)=> {
            if (res.success) {
              let resData = res.data || {};
              // console.log(res,'用户基本信息');
              this.level1 = resData.level1;
              this.level1Name = resData.level1Name;
              this.level2 = resData.level2;
              this.level2Name = resData.level2Name;
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      },

    },
    computed: {
      ...mapState({
        calcSelectData: state => state.pageCache.calcStoreSelect,
      }),
    },
    watch: {
      level3(mewVal,oldVal){
        this.level4 = '';
        this.level4Name = '';
        this.level4List = [];
        this.shopList = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .collect-store {
        overflow: hidden;
        overflow-y: auto;
    }
    .store-select {
        padding-bottom: p2r(10px);
    }
    .store-list {
        .check-disbled .iconfont {
            color: #dddddd !important;
        }
        li {
            width: 100%;
            line-height: 1.3;
            padding: p2r(15px 10px);
            overflow: hidden;
            background: #ffffff;
            box-sizing: border-box;
            em {
                display: inline-block;
                float: left;
                width: 45%;
                font-weight: 600;
                overflow: hidden;
                i.iconfont {
                    font-weight: normal;
                    margin-right: p2r(3px);
                }
            }
            span {
                display: inline-block;
                float: left;
                font-size: p2r(14px);
                margin-left: p2r(5px);
                padding: p2r(2px 0 2px 5px);
                &.red{color:$red;}
            }
            span.shop {
                float: right;
            }

        }
        i.icon-select {font-size: p2r(18px);}
        i.icon-selected {font-size: p2r(18px);}
    }


</style>
