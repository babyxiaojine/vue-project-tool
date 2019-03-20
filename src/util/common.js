import axios from 'axios'
import { Toast,Indicator } from 'mint-ui'//icon:mintui-more/mintui-back/mintui-search/mintui-field-error/mintui-field-warning/mintui-success/mintui-field-success
import jsAPI from './jsAPI'
import store from '../store/index'
import {setStore, getStore} from '@/util/utils'

//API环境配置
const _EVN_ = process.env.NODE_ENV;
const baseApiConfig = {
    development:{
      // basePath:'http://192.168.32.31:8088/services',
      basePath:'http://shop-dingding-server.e-lppz.com/services', 
      // basePath:'http://10.6.24.67:8088/services',//马露
      // basePath:'http://10.6.24.72:8088/services',//马露
      // basePath:'http://10.6.24.97:8088/services', 
      // basePath:'http://shop-dingding.e-lppz.com/services',
      // basePath:'http://10.6.24.135:8088',
      webPath:window.location.protocol+'//'+window.location.host,
    },
    testing:{
      basePath:'http://shop-dingding-server.e-lppz.com/services',
      webPath:window.location.protocol+'//'+window.location.host,
      // webPath:'http://10.6.24.85:8080'
    },
    production:{
        basePath: 'http://shop-dingding-server.lppz.com/services',
        webPath: window.location.protocol+'//'+window.location.host
    }
}
//基本环境配置
const base = baseApiConfig[_EVN_];
// const base = baseApiConfig['production']

if(window.location.hostname.indexOf('10.28.')>-1){
  let testUser = getStore('userInfo')
  if(testUser && testUser.dToken){
    store.dispatch('userInfo/setUserInfo',{dToken:testUser.dToken});
  }

}
// else if(getStore('userInfo')){
//   console.log(getStore('userInfo'))
// }


/**
 * 设置axios全局参数
 */
const axiosConfig = axiosSetConfig();
function axiosSetConfig() {
  let config = {
    responseType: 'json',
    // withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    baseURL: base.basePath,
    // transformRequest: function (obj) {
    //   let str = []; for (let s in obj) { str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])); } return str.join("&");
    // }
  };
  return config;
}
/**
 * 请求LOADING设置 
 */
// 请求拦截器
axios.interceptors.request.use((config) => {
  if (config.showLoading) {
    showLoading()
  }
  return config
}, (error) => {
  return Promise.reject(error)
});
// 响应拦截器
axios.interceptors.response.use((response) => {

  if (response.config.showLoading) {
    tryHideLoading();
  }
  return response
}, (error) => {
  tryHideLoading();
  return Promise.reject(error)
});

let loadingRequestCount = 0 ;
export function showLoading() {
  if (loadingRequestCount === 0) {
    Indicator.open('加载中...');
  }
  loadingRequestCount++;
}
export function tryHideLoading() {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) {
    Indicator.close();
  }
}
/**
 * POST请求
 */
function axiosPost(url, data, options, loginExpires) {
  if (typeof options === 'object') {
    var { success, error, showLoading=true,setting={}} = options
  } else if (typeof options === 'function') {
    var success = options
    var showLoading = true;
  }
  return axios.post(url, data, {
    ...axiosConfig,
    ...setting,
    showLoading,
    onUploadProgress:(res)=>{
      if(typeof options === 'object' && options.onUploadProgress){
        options.onUploadProgress(res);
      }
    }
  }).then((res) => {
    if (res.status === 200) {
      success && success(res.data);
      if(res.data.code==='10001'){ //登录过期状态码
        loginExpires && loginExpires();
      }
    } else {
      Toast({message:'您的网络开小差了，请稍后再试！',iconClass: 'mintui mintui-field-error'});
    }
  }).catch(function (errormsg) {
    if (error) {
      error(errormsg);
      console.log(errormsg);
    } else {
      console.log(errormsg);
      Toast({message: '您的网络开小差了，请稍后再试！',iconClass: 'mintui mintui-field-error'})
    }
  })
}
/**
 * GET请求
 */
function axiosGet(url, data, options) {
  if (typeof options === 'object') {
    var { success, error } = options
  } else if (typeof options === 'function') {
    var success = options
  }
  // var data = {
  //   body:JSON.stringify(data)
  // }
  return axios.get(url, data, axiosConfig).then((res) => {
    if (res.status === 200) {
      success && success(res.data);
    } else {
      Toast({message:'您的网络开小差了，请稍后再试！',iconClass: 'mintui mintui-field-error'});
    }
  }).catch(function (errormsg) {
    if (error) {
      error(errormsg);
      // console.log(errormsg,'tttttt');
    } else {
      console.log(errormsg);
      Toast({message: '您的网络开小差了，请稍后再试！',iconClass: 'mintui mintui-field-error'})
    }
  })
}

function parse(str){
    try {
        return JSON.parse(str);
    }catch(e) {
        return false;
    }
}
/*
* 格式化日期
* @param timestamp->验证的字符
* @param format-> null=年月日时分秒 , 'ymd格式'=年月日
 */
function formatDate(timestamp,format = 'yyyy-MM-dd hh:mm:ss') {
    if (/^\d{10}$/.test(timestamp)) {
        timestamp *= 1e3
    } else if (/^\d{13}$/.test(timestamp)) {
        timestamp = parseInt(timestamp)
    } else {
        // console.log("时间戳格式不正确！");
        return '';
    }
    var time = new Date(timestamp);
     var o = {  
        "M+" : time.getMonth()+1,                 //月份 
        "d+" : time.getDate(),                    //日 
        "h+" : time.getHours(),                   //小时 
        "m+" : time.getMinutes(),                 //分 
        "s+" : time.getSeconds(),                 //秒 
        "q+" : Math.floor((time.getMonth()+3)/3), //季度 
        "S"  : time.getMilliseconds()             //毫秒 
    }; 
    if(format){
        if(/(y+)/.test(format)) {
                format=format.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
    }

    return format
}

function cookies(){
  return {
    set:function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    get:function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    },
    clear:function(name) {
      this.set(name, "", -1);
    }
  }
}
// 解析url传的参数
function parseQueryString(url) {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(decodeURIComponent(decodeURIComponent(url))),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
}

//格式化对象
function objectParams(obj){
  let params = [];
  for (let key in obj){
    params.push(key + '=' + obj[key]);
  }
  return params.join('&');
}
//获取配置信息
let dd = window.dd,DingTalkPC = window.DingTalkPC;
let ddConfig = null;

function initDdConfig(){
  let store_ddConfig = getStore('ddConfig')
  if(store_ddConfig){
    console.log(store_ddConfig)
    if(DingTalkPC && DingTalkPC.ua.isDesktop && DingTalkPC.ua.isInDingTalk){
      DingTalkPC.config(store_ddConfig);
    }else{
      dd.config(store_ddConfig);
    }
  }
}
initDdConfig();
function getConfig () {
  return new Promise((resolve, reject) => {
    let location = window.location.href;
    axiosGet(base.basePath + '/auths/configs?url='+location,{}, {
      success:function (res) {
        if (res.success) {
          let resData = res.data.data;
          ddConfig = {
            agentId: resData.agentid, // 必填，微应用ID
            corpId: resData.corpId, // 必填，企业ID
            timeStamp: resData.timeStamp, // 必填，生成签名的时间戳
            nonceStr: resData.nonceStr, // 必填，生成签名的随机串
            signature: resData.signature, // 必填，签名
            // 选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: jsAPI // 必填，需要使用的jsapi列表，注意：不要带dd。
          };
          setStore('ddConfig',ddConfig);
          if(DingTalkPC && DingTalkPC.ua.isDesktop && DingTalkPC.ua.isInDingTalk){
            DingTalkPC.config(ddConfig);
          }else{
            dd.config(ddConfig);
          }
          resolve(ddConfig);
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error:function(data){
        console.log(data);
        Toast('error : ' + JSON.stringify(data))
      }
    });

  })
}

//获取用户token
function getAuths(info) {
  return new Promise((resolve, reject) => {
    let dCode = info.code;
    axiosGet(base.basePath + '/auths/login?dingCode=' + dCode,{}, {
      success: function (res) {
        if (res.success) {
          resolve(res.data);
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error: function (data) {
        console.log(data);
        Toast('ticketError : ' + JSON.stringify(data))
      }
    });
  })
}




function ddIsReady () {
  return new Promise((resolve, reject) => {
    if(DingTalkPC && DingTalkPC.ua.isDesktop && DingTalkPC.ua.isInDingTalk){
      DingTalkPC.runtime.permission.requestAuthCode({
        corpId: ddConfig.corpId,//企业ID
        onSuccess: function(info) {
          getAuths(info).then(data => {
            resolve(data);
          });

        },
        onFail : function(err) {
          reject('ticketError11 : ' + JSON.stringify(err))
        }
      })
    }else{
      dd.ready(() => {

        dd.ui.webViewBounce.disable();
        dd.runtime.permission.requestAuthCode({
          corpId: ddConfig.corpId,
          onSuccess: function (info) {

            getAuths(info).then(data => {
              resolve(data);
            });

          },
          onFail: function (err) {
            reject('ticketError : ' + JSON.stringify(error))
          }
        });

        // 获取位置信息
        geoLocation().then((res)=>{
          store.dispatch('location/setLocation',res);
        }).catch((err)=>{
          console.log(err,'获取位置失败');
          // Toast({message: '获取位置失败,请检查设置或重试！', iconClass: 'mintui mintui-field-error'})
        })
      });
      dd.error((err) => {
        console.log(err,'ddError');
        Toast({message: 'dd error: ' + JSON.stringify(err), iconClass: 'mintui mintui-field-error'});
      })
    }
  })
}
//获取位置信息
function geoLocation() {
  return new Promise((resolve,reject)=>{
    dd.device.geolocation.get({
      targetAccuracy : 200,
      coordinate : 1,
      withReGeocode : true,
      useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
      onSuccess : function(result) {
        resolve(result);
      },
      onFail : function(err) {
        reject(err);
        console.log(err,'获取位置失败')
      }
    });
  })

}
// Promise.prototype.finally = function (callback) {
//   let P = this.constructor;
//   return this.then(
//     value  => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => { throw reason })
//   );
// };
// 

// 获取用户资料信息
function refreshUserInfo(){
  return new Promise((resolve,reject)=>{
    postTokenData('/user/userInfo',{}, {
      success: (res)=> {
        if (res.success) {
          store.dispatch('userInfo/setBaseInfo',res.data);
          resolve(res.data)
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error: (data)=> {
        console.log(data);
        Toast('ticketError : ' + JSON.stringify(data))
      }
    });
  })
}

// 获取用户权限信息
function refreshUserAuth(){
  postTokenData('/menu/getAuthorityInfo',{}, {
    success: (res)=> {
      if (res.success) {
        store.dispatch('userInfo/setAuthInfo',res.data);
      } else {
        Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
      }
    },
    error: (data)=> {
      console.log(data);
      Toast('ticketError : ' + JSON.stringify(data))
    }
  });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    const userInfo = store.getters['userInfo/getUserInfo'];
    
    if(userInfo.dToken){
      !Object.keys(store.getters['userInfo/getBaseInfo']).length && refreshUserInfo();
      !Object.keys(store.getters['userInfo/getAuthInfo']).length && refreshUserAuth();
      resolve(userInfo)
    }else{
      getConfig().then((data)=>{
        store.dispatch('ddConfig/setDdConfig',data);
        // resolve(data);
      }).catch((err)=>{
        reject('error',JSON.stringify(err));
      }).finally(()=>{
        ddIsReady().then((data)=>{
          store.dispatch('userInfo/setUserInfo',data);
          refreshUserInfo();
          refreshUserAuth();
          resolve(data);
        })
      })
    }
  })
}

function postTokenData(url,data={},options){
  const dToken = store.getters['userInfo/getdToken'];
  let queryStr = url.indexOf("?") != -1 ? '&' : '?';
  if(dToken){
    const meUrl = url + queryStr+'dToken=' + dToken
    return axiosPost(meUrl,data,options,()=>{ //如果登录过期,清除dToken，并重新调用函数走else登录。
      store.dispatch('userInfo/clearUserInfo');
      postTokenData(url,data,options);
    })
  }else{
    getUserInfo().then(res=>{
      const meUrl = url + queryStr+'dToken=' + res.dToken
      return axiosPost(meUrl,data,options)
    })  
  } 
}


/**
 * 获取当前时间
 * 默认格式YYYY-MM-DD HH:MM:SS
 * TYPE:0 YYYY-MM-DD
 * TYPE:1 YYYY-MM-DD HH:MM
 * TYPE:2 HH:MM:SS
 * TYPE:3 HH:MM
 * TYPE:4 WK
 */
function getNowDateTime(type) {
  let currentDate = '';
  let str = (num)=>{
    if (num >= 0 && num <= 9) {
      num = "0" + num;
    }
    return num;
  };
  let date = new Date();
  let year = date.getFullYear();
  let month = str(date.getMonth() + 1);
  let day = str(date.getDate());
  let hour = str(date.getHours());
  let min = str(date.getMinutes());
  let sec = str(date.getSeconds());
  let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
  switch (type) {
    case 0:
      currentDate = year + '-' + month + '-' + day;
      break;
    case 1:
      currentDate = year + '-' + month + '-' + day + " " + hour + ':' + min;
      break;
    case 2:
      currentDate = hour + ':' + min + ':' + sec;
      break;
    case 3:
      currentDate = hour + ':' + min;
      break;
    case 4:
      currentDate = week;
      break;
    default:
      currentDate = year + '-' + month + '-' + day + " " + hour + ':' + min + ':' + sec;
  }
  return currentDate;
}

/**
 * 百度坐标转高德（传入经度、纬度）
 */
function baidu2gaode(bd_lng, bd_lat) {
  let X_PI = Math.PI * 3000.0 / 180.0;
  let x = bd_lng - 0.0065;
  let y = bd_lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  let gd_lng = z * Math.cos(theta);
  let gd_lat = z * Math.sin(theta);
  return {
    lat: gd_lat,
    lng: gd_lng
  }
}

/**
 * 高德坐标转百度（传入经度、纬度）
 */
function gaode2baidu(gd_lng, gd_lat) {
  let X_PI = Math.PI * 3000.0 / 180.0;
  let x = gd_lng, y = gd_lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  let bd_lng = z * Math.cos(theta) + 0.0065;
  let bd_lat = z * Math.sin(theta) + 0.006;
  return {
    lat: bd_lat.toFixed(5),
    lng: bd_lng.toFixed(5)
  };
}

/**
* 计算坐标点间的距离
* @param {Object} lat1
* @param {Object} lng1
* @param {Object} lat2
* @param {Object} lng2
*/
function getDistance(lat1,lng1,lat2,lng2){
  let EARTH_RADIUS = 6378137.0;    //单位M
  let PI = Math.PI;
  let getRad = (d)=>{
    return d*PI/180.0;
  };
  let radLat1 = getRad(lat1);
  let radLat2 = getRad(lat2);
  let a = radLat1 - radLat2;
  let b = getRad(lng1) - getRad(lng2);
  let s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s*EARTH_RADIUS;
  s = Math.round(s*10000)/10000.0;
  return s;
}

// 起始年份统一化函数
function getSelectYear(start=2013,later=5){
  const years = [];
  const end = new Date().getFullYear()+later;
  for(let i=start; i<=end; i++){
      years.push(i+'')
  }
  return years;
}

// 对象对比
function compareObject(obj1,obj2){
  let flag = true
  for (let key in obj1){
    if(obj1[key] !== obj2[key]){
      flag = false
      break;
    }
  }
  return flag;
}



// base64转blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

//目标点状态
function targetStatus(type) {
  let statusName = '';
  let statusType = type;
  if (type && typeof type != 'string'){
    statusType = type.toString();
  }
  switch (statusType){
    case '0': statusName = '未开始'; break;
    case '1': statusName = '沟通中'; break;
    case '2': statusName = '已报价'; break;
    case '3': statusName = '谈判中'; break;
    case '4': statusName = '已测量'; break;
    case '5': statusName = '已审批'; break;
    case "6": statusName = '已签订'; break;
    case "7": statusName = '已定店'; break;
    case '1020': statusName = '有意向'; break;
    case '0010': statusName = '准备中'; break;
    case '3040': statusName = '审核中'; break;
    case '9': statusName = '已作废'; break;
    default: statusName = '';
  }
  return statusName;
}


export{
  base,
  getConfig,
  formatDate,
  ddIsReady,
  getUserInfo,
  axiosPost,
  axiosGet,
  cookies,
  objectParams,
  parseQueryString,
  postTokenData,
  getNowDateTime,
  geoLocation,
  baidu2gaode,
  gaode2baidu,
  getDistance,
  getSelectYear,
  compareObject,
  formatForm,
  dataURLtoBlob,
  refreshUserInfo,
  refreshUserAuth,
  targetStatus
}