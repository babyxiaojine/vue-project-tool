<template>
    <section class="footer-wrap">
        <div id='foot_nav'>
            <div @click = "gotoAddress('Home')" class="nav-item" :class="$route.path.indexOf('home') !== -1 && 'active'">
                <i class="iconfont icon-home"></i>
                <span>首页</span>
            </div>
            <div @click = "gotoAddress('Menu')" class="nav-item" :class="$route.path.indexOf('menu') !== -1 && 'active'">
                <i class="iconfont icon-menu"></i>
                <span>菜单</span>
            </div>
            <div @click = "gotoAddress('User')" class="nav-item" :class="$route.path.indexOf('user') !== -1 && 'active'">
                <i class="iconfont icon-user"></i>
                <span>我的</span>
            </div>
        </div>
    </section>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    created(){

    },
    mounted(){

    },
    computed: {

    },
    methods: {
      gotoAddress(path){
        this.$router.replace({name:path})
      }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
    @import '~@/assets/css/base';
    .footer-wrap{height: p2r(50px);}
    #foot_nav{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: p2r(50px);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .nav-item{
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        color: #999;
        .iconfont{
            width: p2r(22px);
            height: p2r(22px);
            font-size: p2r(22px);
            margin-top: p2r(8px);
        }
        span{
            line-height: 1.4;
            font-size: p2r(10px);
        }
        &.active {
            color: $red;
        }
    }

</style>