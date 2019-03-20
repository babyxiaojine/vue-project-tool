<template>
    <div class="wrapper official-list">
        <template v-if="listData.length">
            <mt-loadmore :bottom-method="loadMoreData" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul>
                    <li class="official-item bdtb" v-for="(item, index) in listData" :key="index">
                        <router-link :to="{name: 'OfficialDetail', params: { tid: item.id }}">
                        <div class="item-main bdbtm">
                            <div class="item-title"><span>{{targetStatus(item.status)}}</span>{{item.name}}</div>
                            <div class="item-more"><i class="iconfont icon-right-arrow"></i></div>
                        </div>
                        </router-link>
                        <div class="item-opts" v-if="item.status != '9' && item.status != '5' && item.status != '6' && item.status != '7' && item.status != '3040'">
                            <router-link :to="{name: 'OfficialEdit', params: { tid: item.id }}">
                            <button class="btn" type="button">修改</button>
                            </router-link>
                            <button class="btn" type="button" @click="discardTarget(item.id,index)">作废</button>
                        </div>

                    </li>
                </ul>
            </mt-loadmore>
        </template>
        <div class="nodata" v-if="noResult"><div class="iconfont icon-nodata"></div><div class="txt-nodata">暂无数据...</div></div>

        <mt-popup v-model="fitlerPopupVisible" position="right">
            <div class="side-form">
                <div class="fitler-cont">
                    <dl class="sort-list">
                        <dt class="lab">选择状态</dt>
                        <dd>
                            <div class="select-item" :class="item.selected && 'on'" @click="selectProcess(index)" v-for="(item,index) in statusArr" :key="index">{{item.name}}</div>
                        </dd>
                    </dl>
                </div>
                <div class="foot-submit">
                    <div class="form-handles fix-area">
                        <button class="btn-cancel bdtop" type="button" @click="fiterCancel">取消</button>
                        <button class="btn-confirm" type="button" @click="fiterSubmit">确认</button>
                    </div>
                </div>
            </div>
        </mt-popup>

    </div>
</template>



<script type="text/ecmascript-6">
  import { Toast,MessageBox } from 'mint-ui'
  import {base,axiosPost,postTokenData,formatDate,targetStatus} from '@/util/common'
  import {getSelectData} from '@/util/getData'
  import footNav from '@/components/footer/footNav'
  export default {
    name: 'OfficialList',
    data() {
      return {
        noResult: false,
        fitlerPopupVisible: false,
        listPage: 1,
        listData: [],
        statusArr: [],
        statusSelect: [],
        allLoaded: false
      }
    },
    components: {
      footNav
    },
    created() {

    },
    mounted() {
      this.getOfficialData();
    },
    methods: {
      targetStatus,
      getSelectData,
      // 获取更多
      loadMoreData(){
        this.$refs.loadmore.onBottomLoaded();
        this.getOfficialData(this.listPage + 1,);
      },
      //获取列表数据
      getOfficialData(listPage = 1){
        let postData = {
          "id": "",
          "pageNo": listPage,
          "pageSize": 20,
          "status": this.statusSelect
        };
        postTokenData(base.basePath + '/objPoint/formalObj/list',postData, {
          success: (res)=> {
            if (res.success) {

              let resData = res.data || [];
              this.listData.push(...resData);
              this.listPage = listPage;
              //无结果页
              if (listPage = 1 && resData.length < 1) {
                this.noResult = true;
              } else {
                this.noResult = false;
                this.showDingRightBtn(true);//显示顶部导航右侧按钮

              }
              if (resData.length < postData.pageSize) this.allLoaded = true;// 数据获取完毕
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
      //作废目标点
      discardTarget(tid,index){
        MessageBox.confirm('确定作废正式目标点？','提示',{
          closeOnClickModal: false
        }).then(action => {
          if (action === 'confirm'){
            postTokenData(base.basePath + '/objPoint/formalObj/invalid',{id:tid}, {
              success: (res)=> {
                if (res.success) {
                  this.listData.splice(index, 1);//删除作废项
                  Toast({message: res.message, iconClass: 'mintui mintui-field-success'});
                } else {
                  Toast({message: res.message, iconClass: 'mintui mintui-field-error'});
                }
              },
              error: (data)=> {
                console.log(data);
                Toast('Error : ' + JSON.stringify(data))
              }
            });
          }
        }).catch(()=>{});
      },
      //关闭筛选
      fiterCancel(){
        this.fitlerPopupVisible = false;
      },
      //筛选确定
      fiterSubmit(){
        let selectArr = [];
        let statusArr = this.statusArr;
        for (let i in statusArr){
            if (statusArr[i].selected){
              selectArr.push(statusArr[i].id)
            }
        }
        this.statusSelect = selectArr;
        this.listData = [];
        this.getOfficialData(1,selectArr);
        this.fitlerPopupVisible = false;
      },
      selectProcess(index){
        let theSelect = this.statusArr[index].selected;
        this.statusArr[index].selected = !theSelect;
      },
      showDingRightBtn(isShow){
        dd.ready(()=> {
          dd.biz.navigation.setRight({
            show: isShow,
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '状态',//控制显示文本，空字符串表示显示默认文本
            onSuccess : (result)=> {
              //加载类型数据
              this.getSelectData('staticList',{type:'status'}).then((res)=>{
                let newRes = [];
                res.forEach((item,index)=>{
                  item.selected = false;
                  newRes.push(item);
                })
                this.statusArr = [...newRes];
              }).catch((err)=>{});

              this.fitlerPopupVisible = true;
            }
          });
        });
      }
    },
    computed: {

    },
    beforeDestroy(){
        dd.biz.navigation.setRight({
          control: false,
          text:''
        });
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .official-list{
        overflow: hidden;
    }
    .official-item {
        margin-bottom: p2r(5px);
        background: #ffffff;
        &:first-child {
            margin-top: p2r(10px);
        }
        .item-main{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: p2r(16px 15px 16px 0);
            margin-left: p2r(15px);
            span {
                font-weight: 600;
                margin-right: p2r(20px);
            }
        }
        .item-opts {
            text-align: right;
            line-height: p2r(28px);
            padding:p2r(10px 15px);
            button {
                height: p2r(28px);
                line-height: inherit;
                color: $fff;
                padding: p2r(0 12px);
                margin-left: p2r(5px);
                border-radius: p2r(4px);
                background: $blue;
            }
        }
    }
    .side-form{
        width: 75vw;
        height: 100vh;
        background: #fff;
        .fitler-cont{
            padding-top:p2r(30px);
        }
        .sort-list {
            padding:p2r(10px);
            dt{
                padding-bottom: p2r(8px);
                font-size: p2r(12px);
                line-height: p2r(16px);
                position: relative;
                .iconfont{
                    position: absolute;
                    right: p2r(10px);
                }
            }
            dd{
                overflow: hidden;
            }
        }

        .select-item{
            float: left;
            width: 32%;
            text-align: center;
            @include trans;
            margin-left: 2%;
            height: p2r(36px);
            line-height: p2r(36px);
            font-size: p2r(12px);
            border-radius:p2r(4px);
            background: #f0f0f0;
            color:#333;
            margin-bottom: p2r(5px);
            touch-action: none;
            &:nth-child(3n+1){
                margin-left: 0;
            }
            &.on{
                background: rgba(65,150,247,0.20);
                color:#4196F7;
            }
        }

        .form-handles{
            @include flexbox;
            .btn-cancel{
                width:40%;
                background: #fff;
                color:#333;
            }
            .btn-confirm{
                width:60%;
            }
        }

    }
</style>
