<template>
    <div class="wrapper menu-page">
        <section class="menu-left">
            <ul>
                <li class="ml-li" :class="{active: 0 === menuIndex}" @click="chooseMenu(0)">
                    <span>常用菜单</span>
                </li>
                <li v-for="(item,index) in menuList" :key="item.id" class="ml-li" :class="{active: index+1 === menuIndex}" @click="chooseMenu(index+1)">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </section>
        <section class="menu-right">
            <div class="mr-area">
                <div class="mr-item" v-if="menuIndex === 0">
                    <div class="mr-title">
                        <em>开发日常</em>
                    </div>
                    <ul>
                        <li v-for="(item,index) in userMenu" :key="item.id" class="mr-li" @touchstart="delStartTouch(item.id)" @touchend="delEndTouch">
                            <router-link :to="{ path: item.url}">
                                <i class="mr-icon" :style="{'background-image':`url(${item.incUrl})`}"></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="mr-item" v-else v-for="(item,index) in menuList[menuIndex-1].child" :key="item.id">
                    <div class="mr-title">
                        <em>{{item.name}}</em>
                    </div>
                    <ul>
                        <li v-for="(subItem,subIndex) in item.child" :key="subItem.id" class="mr-li" @touchstart="addStartTouch(subItem.id)" @touchend="addEndTouch">
                            <router-link :to="{ path: subItem.url}">
                                <i class="mr-icon" :style="{'background-image':`url(${subItem.incUrl})`}"></i>
                                <span>{{subItem.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                    <div class="mr-tips">长按菜单，可以选择添加到"常用"</div>
                </div>
            </div>
            <div class="mr-tips">{{menuIndex == 0 ? '长按菜单，可以选择从"常用"删除' : '长按菜单，可以选择添加到"常用"'}}</div>
        </section>
        <!--底部导航-->
        <foot-nav></foot-nav>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { Toast,MessageBox } from 'mint-ui';
  import {base,postTokenData} from '@/util/common'
  import footNav from '@/components/footer/footNav'
  export default {
    name:'Menu',
    data(){
      return{
        loogDelTouch: null,
        loogAddTouch: null,
        userMenu: [],
        menuList: [],
        menuIndex: 0
      }
    },
    components: {
      footNav
    },
    created(){
      //阻止浏览器复制粘贴等事件
      // document.ontouchstart = (e)=> {e.preventDefault()};
      // document.oncontextmenu= (e)=> {e.preventDefault()};
    },
    activated(){
    },
    mounted(){
      this.getUserMenu().then((res)=>{
        this.getCommonMenu();
      }).catch((res)=>{
        console.log('error'+res)
      })
    },
    computed: {
      // Getting Vuex State
      ...mapState({
        // userInfo: state => state.userInfo
        loginInfo: state => state.userInfo.data
      }),
    },
    methods: {
      chooseMenu(index){
        this.menuIndex = index;
      },
      //删除菜单
      delStartTouch(mId) {
        clearTimeout(this.loogDelTouch);//清空定时器
        this.loogDelTouch=setTimeout(()=>{
          MessageBox.confirm('确认从“常用”菜单移除！','提示',{
            closeOnClickModal: false
          }).then(action => {
            action === 'confirm' && this.optsCommonMenu(mId,1);//删除菜单
          })
        },800);
      },
      delEndTouch() {
        clearTimeout(this.loogDelTouch);
      },
      //添加菜单
      addStartTouch(mId) {
        let uMenu = this.userMenu;
        clearTimeout(this.loogAddTouch);//清空定时器
        document.body.className = 'menu-body';
        this.loogAddTouch=setTimeout((e)=>{
          // e.stopPropagation();
          if (uMenu && uMenu.length){
            for (let i = 0;i < uMenu.length;i++){
                if (uMenu[i].id === mId) {
                  MessageBox.alert('此菜单已添加，不可重复添加！','提示');
                  return false;
                }
            }
            MessageBox.confirm('确认添加到“常用”菜单?','提示',{
              closeOnClickModal: false
            }).then(action => {
              action === 'confirm' && this.optsCommonMenu(mId);//添加菜案
            })
          } else {
            MessageBox.confirm('确认添加到“常用”菜单?','提示',{
              closeOnClickModal: false
            }).then(action => {
              action === 'confirm' && this.optsCommonMenu(mId);//添加菜案
            })
          }

        },800);
        return false;
      },
      addEndTouch() {

        clearTimeout(this.loogAddTouch);
        setTimeout(()=>{
          document.body.classList.remove("menu-body");
        },10);

      },
      //获取用户菜单
      getUserMenu(){
        return new Promise((resolve,reject)=>{
          postTokenData(base.basePath + '/menu/commonMenus',{}, {
            success:(res)=> {
              if (res.success) {
                this.userMenu = res.data;
                resolve(res);
              } else {
                Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
              }
            },
            error: (data)=> {
              console.log(data,'menu');
              reject(data);
              Toast('ticketError : ' + JSON.stringify(data))
            }
          });
        })

      },
      //获取常用菜单
      getCommonMenu(){
        postTokenData(base.basePath + '/menu/menus',{}, {
          success: (res)=> {
            if (res.success) {
              this.menuList = res.data;
            } else {
              Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      },
      //操作常用菜单
      optsCommonMenu(mid,type){
        let postData = {};
        let tipText = '添加',portUrl = '/menu/addCommonMenu';
        postData.menuId = mid;
        if(type == 1) {
          tipText = '删除';
          portUrl = '/menu/deleteCommonMenu';
        }
        postTokenData(base.basePath + portUrl,postData, {
          success: (res)=> {
            if (res.success) {
              this.getUserMenu();
              Toast({message: tipText + res.message, iconClass: 'mintui mintui-field-success'})
            } else {
              Toast({message: tipText + res.message, iconClass: 'mintui mintui-field-error'})
            }
          },
          error: (data)=> {
            console.log(data);
            Toast('ticketError : ' + JSON.stringify(data))
          }
        });
      }

    },
    beforeDestroy(){
      document.body.classList.remove("menu-body");
    }

  }
</script>

<style lang="scss">
    @import '~@/assets/css/base';
    .menu-page {
        display: -ms-flexbox;
        display: flex;
        -ms-flex: 1;
        flex: 1;
        height: 100vh;
        padding-bottom: p2r(50px);
        box-sizing: border-box;
        @include selectNone;
    }
    .menu-left{
        width: p2r(80px);
        .ml-li{
            height: p2r(50px);
            line-height: p2r(50px);
            font-size: p2r(16px);
            text-align: center;
            border-bottom: 0.025rem solid #ededed;
            position: relative;
            span{
                /*@include sc(.6rem, #666);*/
            }
        }
        .active{
            background-color: #fff;
        }
    }
    .menu-right{
        flex: 4;
        height: 100%;
        position: relative;

        background: #ffffff;
        .mr-area {
            width: 100%;
            height: 100%;
            padding-bottom: p2r(25px);
            overflow-y: auto;
            /*-webkit-overflow-scrolling: touch;*/
        }
        .mr-item {
            padding: p2r(10px 0);
            border-bottom: p2r(5px) solid #f6f6f6;
            overflow: hidden;
        }
        .mr-title {
            position: relative;
            font-size: p2r(17px);
            padding: p2r(5px 10px 10px);
            white-space: nowrap;
            overflow: hidden;
            em {
                display: inline-block;
                font-weight: 600;
                padding: p2r(0 6px);
                background: #ffffff;
                border-left: p2r(2px) solid #4196F7;
            }
        }
        .mr-li {
            float: left;
            width: 33.333%;
            text-align: center;
            font-size: p2r(14px);
            padding: p2r(10px 0);
            user-select:none;
            -webkit-user-select:none;
            .mr-icon {
                display: inline-block;
                width: p2r(50px);
                height: p2r(50px);
                -webkit-border-radius: 50%;
                border-radius: 50%;
                background-repeat: no-repeat;
                background-size: cover;
            }
            span {
                display: block;
                height: p2r(36px);
                line-height: p2r(18px);
                padding: p2r(0 10px);
                font-size: p2r(14px);
                overflow: hidden;
            }
        }
        .mr-tips {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: p2r(25px);
            line-height: p2r(20px);
            padding-bottom: p2r(5px);
            color: #999999;
            font-size: p2r(12px);
            text-align: center;
            background: #ffffff;
        }
    }
    /*scoped私有样式无法引用*/
    .menu-body {
        .mint-msgbox-btns {
            button {
                pointer-events:none !important;
            }
        }
    }


</style>