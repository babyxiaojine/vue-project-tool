// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'//vuex
import {setSession,removeSession,getSession} from '@/util/utils'//vuex
// import {getUserInfo} from '@/util/common'//vuex
// import Mint from 'mint-ui'
import {Popup,Picker,Navbar,Button, TabItem,TabContainer, TabContainerItem, Checklist, DatetimePicker,Swipe, SwipeItem } from 'mint-ui';
import FastLoadmore from '@/components/loadmore'; //去除BUG的loadmore
import 'mint-ui/lib/style.css'/*mint-ui样式*/
import './assets/css/global.scss' /*引入公共样式*/
import FastClick from 'fastclick'/*FastClick*/
//初始化FastClick实例
FastClick.prototype.focus = function(targetElement) {
  var length;
  if (deviceIsIOS&& targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus(); 
  }
}

FastClick.attach(document.body);
// Vue.use(Mint);
Vue.component(Popup.name,Popup);
Vue.component(Picker.name,Picker);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(FastLoadmore.name, FastLoadmore);
Vue.component(Checklist.name, Checklist);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
// 全局引入Toast
// import Toast from './components/Toast/index';
// Vue.use(Toast);

Vue.config.productionTip = false;

if(process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development'){
  let VConsole = require('../static/vconsole.min');
  let vConsole = new VConsole();
}
router.beforeEach((to,from,next)=>{
    if(Object.keys(to.params).length>0 && to.meta.id>from.meta.id){
      setSession(to.name,to.params)
    }
    if(to.meta.id<from.meta.id && getSession(from.name)){
      removeSession(from.name)
    }

    next()
    
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//vuex
  components: { App },
  template: '<App/>'
})
