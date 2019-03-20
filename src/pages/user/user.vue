<template>
    <div class="wrapper">
        <section class="user-info row-list">
            <div class="row-list-item">
                <div class="row-title">个人信息</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">姓名</div>
                <div class="cell-value">{{userInfo.name}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">工号</div>
                <div class="cell-value">{{userInfo.loginName}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">公司</div>
                <div class="cell-value">{{userInfo.level1Name}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">分公司</div>
                <div class="cell-value">{{userInfo.level2Name}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">部门</div>
                <div class="cell-value">{{userInfo.level3Name}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">职务</div>
                <div class="cell-value">{{userInfo.jobname}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">邮箱</div>
                <div class="cell-value">{{userInfo.email}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">手机</div>
                <div class="cell-value">{{userInfo.mobile}}</div>
            </div>
            <div class="row-list-item">
                <div class="cell-title">角色</div>
                <div class="cell-value">{{userInfo.jobname}}</div>
            </div>



            <template v-if="env !== 'production'">
              <div class="row-list-item" @click="$refs.superSelect.open(commonUser,userInfo.name)">
                  <div class="cell-title">常用账号</div>
                  <div class="cell-value">{{userInfo.name}}</div>
                  <div class="cell-more"><i class="iconfont icon-right-arrow"></i></div>
              </div>
              <div class="row-list-item" @click="editUserLogin">
                  <div class="cell-title">切换用户</div>
                  <div class="cell-value">{{userInfo.loginName}}</div>
                  <div class="cell-more"><i class="iconfont icon-right-arrow"></i></div>
              </div>
              <div class="row-list-item">
                  <div class="cell-value">{{loginInfo.dToken}}</div>
              </div>
            </template>
        </section>
        <SuperSelect ref="superSelect" @confirm="handleConfirm" :count="7"></SuperSelect>
        <!--底部导航-->
        <foot-nav></foot-nav>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import SuperSelect from '@/components/superSelect'
  import store from '@/store/index'
  import { Toast,MessageBox } from 'mint-ui'
  import { setStore, getStore } from '@/util/utils'
  import {base,postTokenData,axiosGet, refreshUserInfo, refreshUserAuth } from '@/util/common'
  import footNav from '@/components/footer/footNav'
  export default {
    name: 'user',
    data() {
      return {
        env:'',
        commonUser:[
        ],
        onlyUsers:[
          {name:'聂宁',id:'20007800'},
          {name:'雷鹏',id:'10112772'},
          {name:'李俊龙',id:'20007319'},
          {name:'项爱玲',id:'10114377'},
          {name:'余涛',id:'20014586'},
          {name:'尹松松',id:'12100420'},
          {name:'王龙飞',id:'14040282'},
          {name:'林赟',id:'20008430'},
          {name:'万张南',id:'10110507'},
          {name:'李小芬',id:'20014742'},
        ]
      }
    },
    components: {
      footNav,
      SuperSelect
    },
    created() {
      this.env = process.env.NODE_ENV
      let historyUsers = getStore('historyUsers') || [];
      this.commonUser = [...this.onlyUsers, ...historyUsers]
    },
    mounted() {
      
    },
    methods: {

      //切换用户登录TEST
      editUserLogin(){
        const dToken = this.$store.getters['userInfo/getdToken'];
        if(dToken){
          MessageBox.prompt('请输入工号','登录',{
            inputType: 'number',
            inputValidator:function(v){return /^[0-9]{8}$/.test(v);},
            inputErrorMessage:'请输入正确的工号',
          }).then(({ value, action }) => {
            this.switchLoginUser(value);
          }).catch((data)=>{
            console.log(data)
          });

        } else {

        }

      },
      handleConfirm(res){
        this.switchLoginUser(res.id)
      },
      switchLoginUser(value){
        const dToken = this.$store.getters['userInfo/getdToken'];
        axiosGet(base.basePath+'/auths/loginByLoginName?dToken='+dToken+'&loginName='+value,{}, {
          success:(res)=> {
            if (res.success) {
              let resData = res.data;
              this.$store.dispatch('userInfo/setUserInfo',resData);
              this.$store.dispatch('userInfo/setAliveList',[])
              refreshUserInfo().then((res)=>{
                let historyUsers = getStore('historyUsers') || [];
                let newData = {name: res.name, id: value};
                let newHis = (this.removalUser(newData, historyUsers)>-1 || this.removalUser(newData, this.onlyUsers)>-1 ) ? historyUsers : [...historyUsers, newData];
                let newUsers = [...this.onlyUsers, ...newHis]
                setStore('historyUsers', newHis)
                this.commonUser = newUsers;
              })
              refreshUserAuth()
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error:(data)=>{
            console.log(data);
            Toast('error : ' + JSON.stringify(data))
          }
        });
      },
      removalUser(val,arr){
        let flag = -1;
        arr.map((item,index)=>{
          if(val.id == item.id){
            flag = index;
          }
        })
        return flag;
      }

    },
    computed: {
      // Getting Vuex State
      ...mapState({
        loginInfo: state => state.userInfo.data,
        userInfo: state => state.userInfo.base || {},
      }),
    }

  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base';
    .user-info {
        background: #ffffff;
    }

</style>
