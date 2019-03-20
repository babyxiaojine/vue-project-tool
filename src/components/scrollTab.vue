<template>
    <div class="scroll-tab">
        <div class="scroll-tab-title bdbtm" ref="scorollTab" v-if="options.length">
            <ul class="tab-title-list" ref="scorollList" :class="!scrollOn && 'tab-flex-list'" :style="scrollOn ? 'width:'+tabWidth+'px;':''">
                <template v-if="dataType == 0">
                    <li v-if="item != ''" v-for="(item,index) in options" :key="index" class="menu-li" :class="{active: index == tabIndex}" @click="chooseMenu({index:index,name:item})">
                        <span>{{item}}</span>
                    </li>
                </template>
                <template v-else>
                    <li v-for="(item,index) in options" :key="index" class="menu-li" :class="{active: index == tabIndex}" @click="chooseMenu({index:index,id:item.id})">
                        <span>{{item.name}}</span>
                    </li>
                </template>
                <slot name="addSlot"></slot>  
            </ul>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'scrollTab',
    data(){
      return{
        tabIndex: 0,//选中索引
        tabWidth: 0
      }
    },
    props:{
      /*
      *数据格式
      * 0：['标签一','标签二','标签三']
      * 1：[{id:1,name:'标签一'},{id:2,name:'标签二'}]
      */
      dataType:{
        default: 0,
        type: Number
      },
      options:{
        default: ()=> {
          return []
        },
        type: Array
      },
      //是否滚动
      scrollOn:{
        default: true,
        type: Boolean
      },
      autoSwitch:{
        default: true,
        type: Boolean
      },
      defaultSelected:{//默认选中
        default: 0,
        type: Number
      },
      refresh:{//刷新BScroll
        default: false,
        type: Boolean
      }
    },
    created(){

    },
    mounted(){
      this.$nextTick(function(){
        if (this.scrollOn){
          this.getTabTitleWidth().then(()=>{
            this.initScrollNav();
            // if (this.defaultSelected !== 0){
            //   this.chooseMenu(this.defaultSelected);
            // }
          })
        }
        //初始化选中
        if (this.defaultSelected !== 0){
          this.chooseMenu({index:this.defaultSelected});
        }

      })
    },
    methods: {
      switchTab(index){
        this.tabIndex = index;
        if (this.scrollOn){
          const el = this.$refs.scorollList.children[index];
          const scrollTabWidth = this.$refs.scorollTab.clientWidth;
          this.scrollTabTitle.scrollToElement(el, 100, -(scrollTabWidth/2 - 50),true );
        }
      },
      initScrollNav(){
        this.scrollTabTitle = new BScroll(this.$refs.scorollTab, {
          click: true,
          scrollX:true,
          // bounce: false,//是否启用回弹动画效果
          bounceTime: 300,//弹力动画持续的毫秒数
          eventPassthrough:'vertical' //忽略竖直方向的滚动
        });
        // this.scrollTabTitle.refresh();//刷新tab标题数据
      },
      chooseMenu(param){
        if(this.autoSwitch){
          this.switchTab(param.index);
        }
        this.$emit('changeMenu',param);
      },
      getTabTitleWidth(){
        return new Promise((resolve, reject)=> {
          let listWidth = 0;
          const listTab = this.$refs.scorollTab;
          const listContainer = this.$refs.scorollList;
          if (listContainer) {
            const listArr = Array.from(listContainer.children);
            listArr.forEach((item, index) => {
              listWidth += item.clientWidth;
            });
          }
          // if (listWidth <= listTab.clientWidth) {
          //   this.scrollOn = false;
          // }
          this.tabWidth = listWidth;
          resolve(listWidth);
        })
      }


    },
    computed: {

    },
    watch:{
      refresh(val){
        if (val){
          this.getTabTitleWidth().then(()=>{
            this.scrollTabTitle.refresh();//刷新tab标题数据
          })
        }
      }

    }

  }
</script>

<style type="text/css" lang="scss">
    /*@import '~@/assets/css/base';*/
</style>