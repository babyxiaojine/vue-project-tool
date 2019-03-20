<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="aliveList">
        <router-view class="router-view" ></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
// export default {
//   name: 'App'
// }
export default {
  name: 'App',
  data(){
    return {
      isIos:false,
      transitionName:'',
    }
  },
  create(){
  },
  mounted(){
    this.getDevice();
    document.getElementById('init_load').style.display = 'none';
  },
  methods: {
    getDevice(){
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        this.isIos = true;
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = to.meta.id < from.meta.id ? 'slide-right' : 'slide-left';
      //页面title修改
      if (to.meta.title) {
        dd.biz.navigation.setTitle({title : to.meta.title});
      }

      // keep-alive动态缓存修改（动态增加）
      let aliveList = [...this.aliveList];
      if(to.meta.alive){
        const aid = this.aliveList.indexOf(to.name)
        if(aid<0){
          aliveList.push(to.name);
          this.$store.dispatch('userInfo/setAliveList',aliveList)
        }
      }
      // keep-alive动态缓存修改（动态删除）
      if(from.meta.alive && from.meta.id>to.meta.id){
        aliveList.findIndex((value,index)=>{
          if(value=== from.name){
            aliveList.splice(index,1);
            this.$store.dispatch('userInfo/setAliveList',aliveList)
          }
        })
      }
    }
  },
  computed:{
    aliveList() {
      return this.$store.getters['userInfo/getAlive'];
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 0.3s;
    position: absolute;
    width:100%;
    left:0;
}
.slide-right-enter {
  pointer-events:normal;
  transform: translateX(-100%);
}
.slide-right-leave-active {
  pointer-events:none;
    transform: translateX(100%);
}
.slide-left-enter {
  pointer-events:normal;

    transform: translateX(100%);
}
.slide-left-leave-active {
  pointer-events:none;
    transform: translateX(-100%);
}
</style>
