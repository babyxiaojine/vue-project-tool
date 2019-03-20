import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // {path: '/home',query: { queryId:  111},name: 'Home',component(resolve){require(['@/pages/requireMent/approvalDetail'], resolve)},meta: {title: '首页'}},
    {path: '/home',name: 'Home',component(resolve){require(['@/pages/home/index'], resolve)},meta: {title: '首页',id:1}},
    {path: '/menu',name: 'Menu',component(resolve){require(['@/pages/menu/menu'], resolve)},meta: {title: '菜单',id:1.1, alive:true}},
    {path: '/user',name: 'User',component(resolve){require(['@/pages/user/user'], resolve)},meta: {title: '我的',id:1.2}},

    // 任务信息
    {path: '/task/list',name: 'TaskList',component(resolve){require(['@/pages/task/list.vue'], resolve)},meta: {title: '任务信息',id:2, alive:true}},
    {path: '/task/planController/index',name: 'TaskDetail2PlanController',component(resolve){require(['@/pages/task/planController/index.vue'], resolve)},meta: {title: '任务办理',id:3}}, //规划目标点任务办理
    {path: '/task/requireMent/detail',name: 'TaskDetail2RequireMent',component(resolve){require(['@/pages/task/requireMent/detail.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/designScheme/detail',name: 'TaskDetail2DesignScheme',component(resolve){require(['@/pages/task/designScheme/detail.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/tobeSetup/detail',name: 'ApplyopenShop',component(resolve){require(['@/pages/task/tobeSetup/detail.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/staffPlan/week',name: 'TaskDetail2StaffPlanWeek',component(resolve){require(['@/pages/task/staffPlan/week.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/staffPlan/month',name: 'TaskDetail2StaffPlanMonth',component(resolve){require(['@/pages/task/staffPlan/month.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/managerPlan/month',name: 'TaskDetail2ManagerPlanMonth',component(resolve){require(['@/pages/task/managerPlan/month.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/managerPlan/week',name: 'TaskDetail2ManagerPlanWeek',component(resolve){require(['@/pages/task/managerPlan/week.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理
    {path: '/task/approach/detail',name: 'TaskDetail2ApproachDetail',component(resolve){require(['@/pages/task/approach/detail.vue'], resolve)},meta: {title: '任务办理',id:3}}, //需求设计任务办理

    // 人流量信息
    {path: '/peopleFlow/list',name: 'CollectList',component(resolve){require(['@/pages/peopleFlow/list.vue'], resolve)},meta: {title: '人流量信息查询',id:2}},
    {path: '/peopleFlow/collect',name: 'Collect',component(resolve){require(['@/pages/peopleFlow/collect.vue'], resolve)},meta: {title: '人流量信息收集',id:3}},
    {path: '/peopleFlow/submit',name: 'CollectSubmit',component(resolve){require(['@/pages/peopleFlow/submit.vue'], resolve)},meta: {title: '人流量信息收集',id:4}},
    {path: '/peopleFlow/select',name: 'CollectSelect',component(resolve){require(['@/pages/peopleFlow/select.vue'], resolve)},meta: {title: '选择',id:4}},
    {path: '/peopleFlow/detail',name: 'CollectDetail',component(resolve){require(['@/pages/peopleFlow/detail.vue'], resolve)},meta: {title: '人流量信息详情',id:3}},
    // 开发年计划
    {path: '/plan/year',name: 'planYear',component(resolve){require(['@/pages/plan/year.vue'], resolve)},meta: {title: '开发年计划',id:2}},
    {path: '/plan/yearDetail',name: 'planYearDetail',component(resolve){require(['@/pages/plan/yearDetail.vue'], resolve)},meta: {title: '开发年计划',id:3}},

    // 开发经理月、周计划
    {path: '/plan/manager/week',name: 'planManagerWeek',component(resolve){require(['@/pages/plan/manager/week.vue'], resolve)},meta: {title: '开发经理周计划',id:2, alive:true}},
    {path: '/plan/manager/month',name: 'planManagerMonth',component(resolve){require(['@/pages/plan/manager/month.vue'], resolve)},meta: {title: '开发经理月计划',id:2, alive:true}},
    {path: '/plan/manager/addWeek',name: 'planManagerAddWeek',component(resolve){require(['@/pages/plan/manager/addWeek.vue'], resolve)},meta: {title: '新增开发经理周计划',id:3}},
    {path: '/plan/manager/addMonth',name: 'planManagerAddMonth',component(resolve){require(['@/pages/plan/manager/addMonth.vue'], resolve)},meta: {title: '新增开发经理月计划',id:3}},
    {path: '/plan/manager/monthDetail',name: 'ManagerMonthDetail',component(resolve){require(['@/pages/plan/manager/monthDetail.vue'], resolve)},meta: {title: '开发经理月计划',id:3}},
    {path: '/plan/manager/weekDetail',name: 'ManagerWeekDetail',component(resolve){require(['@/pages/plan/manager/weekDetail.vue'], resolve)},meta: {title: '开发经理周计划',id:3}},

    // 开发专员月、周计划
    {path: '/plan/staff/week',name: 'StaffWeek',component(resolve){require(['@/pages/plan/staff/week.vue'], resolve)},meta: {title: '开发专员周计划',id:2, alive:true}},
    {path: '/plan/staff/month',name: 'StaffMonth',component(resolve){require(['@/pages/plan/staff/month.vue'], resolve)},meta: {title: '开发专员月计划',id:2, alive:true}},
    {path: '/plan/staff/addWeek',name: 'StaffAddWeek',component(resolve){require(['@/pages/plan/staff/addWeek.vue'], resolve)},meta: {title: '新增开发专员周计划',id:3}},
    {path: '/plan/staff/addMonth',name: 'StaffAddMonth',component(resolve){require(['@/pages/plan/staff/addMonth.vue'], resolve)},meta: {title: '新增开发专员月计划',id:3}},
    {path: '/plan/staff/weekDetail',name: 'StaffWeekDetail',component(resolve){require(['@/pages/plan/staff/weekDetail.vue'], resolve)},meta: {title: '开发专员周计划详情',id:3}},
    {path: '/plan/staff/monthDetail',name: 'StaffMonthDetail',component(resolve){require(['@/pages/plan/staff/monthDetail.vue'], resolve)},meta: {title: '开发专员月计划详情',id:3}},

    // 规划目标点管理
    {path: '/planController/index',name: 'PlanController',component(resolve){require(['@/pages/planController/index'], resolve)},meta: {title: '规划目标点管理',id:2, alive:true}},
    {path: '/planController/report',name: 'PlanControllerReport',component(resolve){require(['@/pages/planController/report'], resolve)},meta: {title: '规划目标点提报',id:2,alive:true}},
    {path: '/planController/add',name: 'PlanControllerAdd',component(resolve){require(['@/pages/planController/add'], resolve)},meta: {title: '新增规划目标点',id:3}},
    {path: '/planController/edit',name: 'PlanControllerEdit',component(resolve){require(['@/pages/planController/edit'], resolve)},meta: {title: '修改规划目标点',id:3}},
    {path: '/planController/detail',name: 'PlanControllerDetail',component(resolve){require(['@/pages/planController/detail'], resolve)},meta: {title: '规划目标点详情',id:3.1}},
    {path: '/planController/reportDetail',name: 'PlanControllerReportDetail',component(resolve){require(['@/pages/planController/reportDetail'], resolve)},meta: {title: '规划目标点提报',id:3,alive:true}},

    //正式目标点
    {path: '/officialTarget/list',name: 'OfficialList',component(resolve){require(['@/pages/officialTarget/list.vue'], resolve)},meta: {title: '正式目标点管理',id:2}},
    {path: '/officialTarget/detail',name: 'OfficialDetail',component(resolve){require(['@/pages/officialTarget/detail.vue'], resolve)},meta: {title: '正式目标点详情',id:3}},
    {path: '/officialTarget/edit',name: 'OfficialEdit',component(resolve){require(['@/pages/officialTarget/edit.vue'], resolve)},meta: {title: '正式目标点编辑',id:3}},

    //定店测算
    {path: '/storeCalc/add',name: 'StoreCalcAdd',component(resolve){require(['@/pages/storeCalc/add.vue'], resolve)},meta: {title: '定店测算',id:2}},
    {path: '/storeCalc/selectData',name: 'StoreCalcSelectData',component(resolve){require(['@/pages/storeCalc/selectData.vue'], resolve)},meta: {title: '选择测算数据',id:3}},
    {path: '/storeCalc/detail',name: 'StoreCalcDetail',component(resolve){require(['@/pages/storeCalc/detail.vue'], resolve)},meta: {title: '定店测算结果',id:3}},


    // 需求设计管理
    {path: '/requireMent/index',name: 'RequireMent',component(resolve){require(['@/pages/requireMent/index'], resolve)},meta: {title: '需求设计',id:2,alive:true}},
    {path: '/requireMent/apply',name: 'RequireMentApply',component(resolve){require(['@/pages/requireMent/apply'], resolve)},meta: {title: '需求设计修改',id:3}},
    // 设计方案管理
    {path: '/designScheme/index',name: 'DesignScheme',component(resolve){require(['@/pages/designScheme/index'], resolve)},meta: {title: '设计方案',id:2,alive:true}},

    //待开店申请
    {path: '/toboSetup/list',name: 'TobeSetupList',component(resolve){require(['@/pages/toboSetup/list.vue'], resolve)},meta: {title: '待开店申请',id:2, alive:true}},
    {path: '/toboSetup/detail',name: 'TobeSetupDetail',component(resolve){require(['@/pages/toboSetup/detail.vue'], resolve)},meta: {title: '待开店目标详情',id:3}},

    //进场申请
    {path: '/approach/list',name: 'ApproachList',component(resolve){require(['@/pages/approach/list.vue'], resolve)},meta: {title: '进场申请列表',id:2, alive:true}},
    {path: '/approach/apply',name: 'ApproachApply',component(resolve){require(['@/pages/approach/apply.vue'], resolve)},meta: {title: '进场申请',id:3}},
    {path: '/approach/detail',name: 'ApproachDetail',component(resolve){require(['@/pages/approach/detail.vue'], resolve)},meta: {title: '进场详情',id:3}},


    //拜访记录
    {path: '/visitLog/index',name: 'VisitLog',component(resolve){require(['@/pages/visitLog/index.vue'], resolve)},meta: {title: '拜访记录',id:2, alive:true}},
    {path: '/visitLog/logs',name: 'VisitLogList',component(resolve){require(['@/pages/visitLog/logs.vue'], resolve)},meta: {title: '拜访记录',id:3}},
    {path: '/visitLog/add',name: 'VisitLogAdd',component(resolve){require(['@/pages/visitLog/add.vue'], resolve)},meta: {title: '增加拜访记录',id:3}},

  ]
})
