
/**
 * 存储localStorage
 */
 export function setStore(name, content){
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export function getStore(name){
  if (!name) return;
  let s = window.localStorage.getItem(name);
  try{
  s = JSON.parse(s)
  }catch(err){

  }
  return s;
};

/**
 * 删除localStorage
 */
export function removeStore(name){
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储sessionStorage
 */
 export function setSession(name, content){
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export function getSession(name){
  if (!name) return;
  let s = window.sessionStorage.getItem(name);
  try{
  s = JSON.parse(s)
  }catch(err){

  }
  return s;
};

/**
 * 删除sessionStorage
 */
export function removeSession(name){
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/** 清除表单
* @param formObj->表单DOM元素
* @param type->可选项，需要清除表单的类型('text')
*/
function clearForm(formObj,type){
    if(formObj == undefined){ 
        return;
    }
    for(var i=0; i<formObj.elements.length; i++){
      if(type){
        if(formObj.elements[i].type == type){
            formObj.elements[i].value = "";
        } 
      }else{
        if(formObj.elements[i].type == "text"){
            formObj.elements[i].value = "";
        } 
        else if(formObj.elements[i].type == "password"){ 
            formObj.elements[i].value = ""; 
        } 
        else if(formObj.elements[i].type == "radio"){ 
            formObj.elements[i].checked = false; 
        } 
        else if(formObj.elements[i].type == "checkbox"){ 
            formObj.elements[i].checked = false; 
        } 
        else if(formObj.elements[i].type == "select-one"){ 
            formObj.elements[i].options[0].selected = true; 
        } 
        else if(formObj.elements[i].type == "select-multiple"){     
            for(var j = 0; j < formObj.elements[i].options.length; j++){ 
                formObj.elements[i].options[j].selected = false; 
            } 
        } 
        else if(formObj.elements[i].type == "file"){ 
            //formObj.elements[i].select(); 
            //document.selection.clear();              
            // for IE, Opera, Safari, Chrome 
            var file = formObj.elements[i]; 
             if(file.outerHTML){ 
                 file.outerHTML = file.outerHTML; 
             }else{ 
                 file.value = "";  // FF(包括3.5) 
            } 
        } 
        else if(formObj.elements[i].type == "textarea"){ 
            formObj.elements[i].value = ""; 
        } 
      }
    }
}

/** 序列化表单
* @param formObj->表单DOM元素
*/
function formatForm(form){
  // var form=document.getElementById(form);
  var arr={};
  for (var i = 0; i < form.elements.length; i++) {
    var feled=form.elements[i];
    if(!feled.name) continue;
    switch(feled.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
      break;
      case 'checkbox':
      case 'radio':
      if (!feled.checked) {
      break;
      }
      default:
      if (arr[feled.name]) {
        arr[feled.name]=arr[feled.name]+','+feled.value;
      }else{
        arr[feled.name]=feled.value;
      } 
    }
    console.log(arr[feled.name])
  }
  return arr
}

const validRules={
  'required': /[\S]+/,
  'mobile': /^[1][0-9]{10}$/,
  'email':/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
  'telephone':/^([0-9]{3,4}-)?[0-9]{7,8}$/,
  'remark': /^.{5,50}$/,
  'remark2': /^.{0,50}$/,
  'remark3': /^.{10,50}$/,
  'amount': /^[0-9]{1,6}(\.\d{1,2})?$/,
  'contactWay': function (str) {
    return validRules.mobile.test(str) || validRules.email.test(str) || validRules.telephone.test(str);
  }
}
function formatRegexp(str){
  let reg = /^(.+?)(\d+)-(\d+)$/;
  let marr = str.match(reg);
  if(marr){
    const headings = {
      's': '[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]',
      '*':'[\\w\\W]',
      'n':'\\d',
    }
    if(marr[1] in headings){
      let prefix = headings[marr[1]];
      let allReg = '^'+prefix+'{'+marr[2]+','+marr[3]+'}$'
      let resReg = new RegExp(allReg)
      return resReg;
    }
  }
  return false;
  
}
function validForm(formObj){
    if(formObj == undefined){ 
        return;
    }
    let status = true,msg = "验证通过";
    for(var i=0; i<formObj.elements.length; i++){
      let actEle = formObj.elements[i];
      let rule = actEle.getAttribute('rule'),
        tip = actEle.getAttribute('error') || actEle.getAttribute('placeholder') ;
      let val = actEle.value.trim();
      if(rule){
        if(validRules[rule]){
          const subRule = validRules[rule];
          if(typeof subRule === 'function'){
            if(!subRule(val)){
              status = false;
              msg = tip || '请填写必填字段';
              break;
            }
          }else{
            if(!subRule.test(val)){
              status = false;
              msg = tip || '请填写必填字段';
              break;
            }
          }
        }else{
          const cusRule = formatRegexp(rule);
          if(cusRule && !cusRule.test(val)){
              status = false;
              msg = tip || '请填写必填字段';
              break;
          }
        }

      }
    }
    return {status:status, msg:msg}
}

function openPreviewImage(imgs,actImg=''){
  let vact = actImg || imgs[0];
  dd.biz.util.previewImage({
      urls: imgs,
      current: vact,
      onSuccess : function(result) {
        console.log(result)
          /**/
      },
      onFail : function(err) {
        console.log(err)
      }
  })
}
function fileIsImg(url){
  return /\.(jpeg|jpg|gif|png)$/.test(url);
}
function splitFileName(url){
  let fnameurl = url.split('.');
  let fname = fnameurl[fnameurl.length-1].toUpperCase();
  return fname
}
function getFileName(url){
  let fnameurl = url.split('/');
  let fname = fnameurl[fnameurl.length-1];
  return fname
}
function downloadFile(url){
  // let corpId = getStore('ddConfig').corpId
  // dd.biz.cspace.saveFile({
  //     corpId,
  //     url,  // 文件在第三方服务器地址
  //     name:getFileName(url),
  //     onSuccess: function(data) {
  //       console.log(data)
  //     },
  //     onFail: function(err) {
  //         alert(JSON.stringify(err));
  //     }
  // });
  dd.biz.util.openLink({
      url,
      onSuccess : function(result) {
          /**/
      },
      onFail : function(err) {}
  })
}
export{
  clearForm,
  formatForm,
  validForm,
  openPreviewImage,
  validRules,
  splitFileName,
  fileIsImg,
  downloadFile
}