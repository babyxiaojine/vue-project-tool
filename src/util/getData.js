import { Toast,MessageBox } from 'mint-ui'
import {base,axiosPost,postTokenData} from '@/util/common'

/*
*正式目标点详情
* 0 base 基本信息
* 1 img 图片信息
* 2 budget 预算信息
* 3 rent 租赁信息
* 4 project 工程信息
* 5 landlord 房东信息
* 6 businessAnalysis 经营分析
* 7 siteSelections 选址分析
* 8 landlordComms 沟通记录
*/
export const getOfficialDetail = (id,type) => {
  let postData = {
    id: id,
    type: type
  };
  return new Promise((resolve, reject)=>{
    postTokenData(base.basePath + '/objPoint/formalObj/detail',postData, {
      success: (res)=> {
        let resData = res.data || {};
        if (res.success) {
          resolve(resData);
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error: (data)=> {
        reject(data);
        console.log(data);
        Toast('Error : ' + JSON.stringify(data))
      }
    });
  })
};

/*
* 获取选择数据细信息
*/
export const getSelectData = (postType,postData) => {
  let postUrl = '';
  let postParam = postData || {};
  switch (postType){
    case 'staticList': postUrl = '/static/selectData/getStaticList'; break;//根据类型从静态参数表中获取数据
    case 'dicList': postUrl = '/select/selectData/getDicList'; break;//字典参数接口
    case 'franList': postUrl = '/select/selectData/getFranList'; break;//获取加盟商列表
    case 'officeList': postUrl = '/select/selectData/getOfficeList'; break;//查询归属公司，归属分公司，管理部，区域，店铺列表
    case 'developList': postUrl = '/select/selectData/getDevelopList'; break;//查询归属开发部下的开发专员列表
    case 'areaList': postUrl = '/select/selectData/getAreaList'; break;//查询省份，城市，县区，商圈列表
    default: postUrl = '/select/selectData/getFranList';
  }
  return new Promise((resolve, reject)=>{
    postTokenData(base.basePath + postUrl,postParam, {
      success: (res)=> {
        if (res.success) {
          let resData = res.data || {};
          resolve(resData);
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error: (data)=> {
        console.log(data);
        reject(data);
        Toast('Error : ' + JSON.stringify(data))
      }
    });
  })
};

/*
* 获取开发计划数据信息
*/
export const getPlanSelect = (postType,postParam) => {
  let postUrl = '';
  let postData = postParam || {};
  switch (postType){
    case 'objPoint': postUrl = '/devPlan/getFormalList'; break;//查询正式目标点列表
    case 'newShop': postUrl = '/devPlan/getShopListForNewShopOrExtendShop'; break;//查询门店下拉框（新店开业，扩店开业）
    case 'newShopOpen': postUrl = '/devPlan/getShopListForNewShopOrExtendShop'; break;//查询门店下拉框（新店开业，扩店开业）
    case 'extendShop': postUrl = '/devPlan/getShopListForNewShopOrExtendShop'; break;//查询门店下拉框（新店开业，扩店开业）
    case 'extendShopOpen': postUrl = '/devPlan/getShopListForNewShopOrExtendShop'; break;//查询门店下拉框（新店开业，扩店开业）
    case 'reNewShop': postUrl = '/devPlan/getShopLstForReNewShop'; break;//续签门店下框接口
    case 'closeShop': postUrl = '/devPlan/getShopListForCloseShop'; break;//闭店门店下拉框
    case 'brand': postUrl = '/devPlan/getAllBrand'; break;//获取品牌名称
    case 'brandName': postUrl = '/devPlan/getProjectListByBrandName'; break;//获取品牌下面项目名称
    case 'brandInfo': postUrl = '/devPlan/getBrandInfoByBrandNameAndProjectName'; break;//根据品牌名称和项目名称获取到品牌信息
    default: postUrl = '/select/selectData/getFranList';
  }
  return new Promise((resolve, reject)=>{
    postTokenData(base.basePath + postUrl,postData, {
      success: (res)=> {
        if (res.success) {
          let resData = res.data || {};
          resolve(resData);
        } else {
          Toast({message: res.message, iconClass: 'mintui mintui-field-error'})
        }
      },
      error: (data)=> {
        console.log(data);
        reject(data);
        Toast('Error : ' + JSON.stringify(data))
      }
    });
  })
};
