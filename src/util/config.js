// 流程办理模板配置
const taskConfig = {
	'tobjplan' : 'TaskDetail2PlanController',//规划目标点
	'ProRequirementsDesignNew' : 'TaskDetail2RequireMent',//需求设计
	'flagshipStoreDesign' : 'TaskDetail2DesignScheme',//旗舰店设计方案
	'themeStoreDesign' : 'TaskDetail2DesignScheme',//主题店设计方案
	'standardstoredesign' : 'TaskDetail2DesignScheme',//标准店设计方案
	'applyopenshop' : 'ApplyopenShop',//待开店申请
  'DevExeweek': 'TaskDetail2StaffPlanWeek',//开发专员周计划
  'DevExemonth': 'TaskDetail2StaffPlanMonth',//开发专员月计划
  'DevOpenplanMonth': 'TaskDetail2ManagerPlanMonth',//开发经理月计划
  'DevOpenplanWeek': 'TaskDetail2ManagerPlanWeek',//开发经理月计划
  'TProjectApproach': 'TaskDetail2ApproachDetail',//进场申请
};
// 流程模板节点配置(长流程)
const processTree = {
	'ProRequirementsDesignNew' : {
		'line1':['check1','check2','check6','check3','finish1'],
		'line2':['commit','check4','check5','finish2'],
	},
	'flagshipStoreDesign' : {
		'line1':['check1','check0','check2','check3','checkx','check6','check8','check11','checks2','check14','check17','check18','check15','check16'],
		'line2':['check1','check0','check2','check3','checks','check7','check9','check19','check20','check12'],
	},
	'themeStoreDesign' : {
		'line1':['check1','check0','check2','checkx','check5','check7','checks2','check12','check13','check14'],
		'line2':['check1','check0','check2','checks','check6','check9','check11'],
	},
	'standardstoredesign' : {
		'line1':['check1','check2','check3','checkx','check8','check11','checks2','check18','check19','check21'],
		'line2':['check1','check2','check3','checks','check12','check14','check16'],
	},
    'applyopenshop' : {
        'line1':['commit','check0']
    }
};
export {
	taskConfig,
	processTree
}