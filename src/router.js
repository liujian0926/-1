
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// const Foo = () => import('./Foo.vue')

// 首页模块组件
import index from './Pages/index.vue';
// 登录页组件
import login from './Pages/login.vue';

// 平台钱包管理模块
import home from './Pages/wallet/home.vue';
// 钱包数据组件
import data from './Pages/wallet/data.vue';
// 收入支出组件
import income from './Pages/wallet/income.vue';
// 平台提现记录组件
import platformCash from './Pages/wallet/platform_cash.vue';
// 平台收益组件
import platformEarnings from './Pages/wallet/platform_earnings.vue';
// 项目usdt组件
import projectUsdt from './Pages/wallet/project_usdt.vue';
// 项目积分兑换组件
import projectExchange from './Pages/wallet/project_exchange.vue';
// 项目积分充值
import projectRecharge from './Pages/wallet/project_recharge.vue';
// B端usdt组件
import Busdt from './Pages/wallet/B_usdt.vue';
// B端积分兑换
import Bexchange from './Pages/wallet/B_exchange.vue';
// B端积分买卖组件
import Bdeal from './Pages/wallet/B_deal.vue';
// 平台usdt组件
import platformUsdt from './Pages/wallet/platform_usdt.vue';

// 运营模块
import runHome from './Pages/run/run_home.vue';
// 数据观察模块
import observer from './Pages/run/observer.vue';
// 收益分析
import analysis from './Pages/run/analysis.vue';
// B端用户
import Busers from './Pages/run/B_users.vue';
// A端用户
import Ausers from './Pages/run/A-users.vue';
// 订单数据
import orderData from './Pages/run/order_data.vue';
// B端保证金
import Bdeposit from './Pages/run/B_deposit.vue';
// 交易习惯
import habit from './Pages/run/habit.vue';

// 用户管理模块
import usersHome from './Pages/users/users_home.vue';
// A用户管理
import AuserManager from './Pages/users/A_userManager.vue';
// B用户管理
import BuserManager from './Pages/users/B_userManager.vue';
// a端数据详情页
import Adetail from './Pages/users/A_detail.vue';
// b端数据详情
import Bdetail from './Pages/users/B_detail.vue';


// 交易数据查询模块
import queryHome from './Pages/query/query_home.vue';
import buyOrder from './Pages/query/buy_order.vue';
import saleOrder from './Pages/query/sale_order.vue';
import rechargeOrder from './Pages/query/recharge_order.vue';
import cashOrder from './Pages/query/cash_order.vue';
import buyDetail from './Pages/query/buy_detail.vue';
import buyCancel from './Pages/query/buy_cancel.vue';
import saleDetail from './Pages/query/sale_detail.vue';
import saleCancel from './Pages/query/sale_cancel.vue';
import rechargeDetail from './Pages/query/recharge_detail.vue';
import rechargeCancel from './Pages/query/recharge_cancel.vue';
import cashDetail from './Pages/query/cash_detail.vue';
import cashCancel from './Pages/query/cash_cancel.vue';
import abnormal from "./Pages/query/abnormal.vue";
import cancelDetail from "./Pages/query/cancelDetail.vue";

// 即时交易数据模块
import immediatelyHome from './Pages/immediately/immediately_home.vue';
import immediatelyBuy from './Pages/immediately/immediately_buy.vue';
import immediatelySale from './Pages/immediately/immediately_sale.vue';
import immediatelyBuyDetail from './Pages/immediately/immediately_buy_detail.vue';
import immediatelySaleDetail from './Pages/immediately/immediately_sale_detail.vue';

// 终端管理
import terminalHome from './Pages/terminal/terminal_home.vue';
import Bmanager from './Pages/terminal/B_manager.vue';
import projectManager from './Pages/terminal/project_manager.vue';
import agentManager from './Pages/terminal/agent_manager.vue';
import projectDetail from './Pages/terminal/project_detail.vue';
import agentDetail from './Pages/terminal/agent_detail.vue';

// 系统管理模块
import systemHome from './Pages/system/system_home.vue';
import send from './Pages/system/send.vue';
import member from './Pages/system/member.vue';
import role from './Pages/system/role.vue';
import password from './Pages/system/password.vue';
import memberAdd from './Pages/system/member_add.vue';
import memberDetail from './Pages/system/member_detail.vue';
import roleDetail from './Pages/system/role_detail.vue';
import visit from './Pages/system/visit.vue';
import noticeContent from './Pages/system/notice_content.vue'

// 信息审核模块
import informationHome from './Pages/information/information_home.vue';
import informationCash from './Pages/information/information_cash.vue';
import ArealName from './Pages/information/A_real_name.vue';
import Areject from './Pages/information/A_reject.vue';
import Breject from './Pages/information/B_reject.vue';
import BrealName from './Pages/information/B_real_name.vue';
import agencyApply from './Pages/information/agency_apply.vue';
import agencyApplyDetail from './Pages/information/agency_apply_detail.vue';
import aegncyAudit from './Pages/information/aegncy_audit.vue';

// 申述管理模块
import stateHome from './Pages/state-manager/state_home.vue';
import untreated from './Pages/state-manager/untreated.vue';
import processing from './Pages/state-manager/processing.vue';
import completed from './Pages/state-manager/completed.vue';
import undone from './Pages/state-manager/undone.vue';
import takeOver from './Pages/state-manager/takeOver.vue'
import processingDetail from './Pages/state-manager/processing_detail.vue'
import revokedDetails from './Pages/state-manager/revoked_details.vue'
import completedDetail from './Pages/state-manager/completed_detail.vue'

const routes = [
  {path: '/', component: login },
  {path: '/login', component: login },
  {path:'/index', component: index},
  // 钱包模块
  {path: '/home', component: home,
  children:[
    {path:'/data',component:data,meta:'0'},
    {path:'/income',component:income,meta:'1'},
    {path:'/platform_cash',component:platformCash,meta:'2'},
    {path:'/platform_earnings',component:platformEarnings,meta:'3'},
    {path:'/project_usdt',component:projectUsdt,meta:'4'},
    {path:'/project_exchange',component:projectExchange,meta:'5'},
    {path:'/project_recharge',component:projectRecharge,meta:'6'},
    {path:'/B_usdt',component:Busdt,meta:'7'},
    {path:'/B_exchange',component:Bexchange,meta:'8'},
    {path:'/B_deal',component:Bdeal,meta:'9'},
    {path:'/platform_usdt',component:platformUsdt,meta:'10'},

  ]
  },
  // 运营模块
  {path:'/run_home',component:runHome,
  children:[
    {path:'/observer',component:observer,meta:'0'},
    {path:'/analysis',component:analysis,meta:'1'},
    {path:'/B_users',component:Busers,meta:'2'},
    {path:'/A-users',component:Ausers,meta:'3'},
    {path:'/order_data',component:orderData,meta:'4'},
    {path:'/B_deposit',component:Bdeposit,meta:'5'},
    {path:'/habit',component:habit,meta:'6'},
  ]
},
// 用户管理模块
{path:'/users_home',component:usersHome,
children:[
  {path:'/A_userManager',component:AuserManager,meta:'0'},
  {path:'/B_userManager',component:BuserManager,meta:'1'},
  {path:'/A_detail',component:Adetail,meta:'0'},
  {path:'/B_detail',component:Bdetail,meta:'1'},
]

},
// 交易数据查询块
{path:'/query_home',component:queryHome,
  children:[
    {path:'/buy_order',component:buyOrder,meta:'0'},
    {path:'/sale_order',component:saleOrder,meta:'1'},
    {path:'/recharge_order',component:rechargeOrder,meta:'2'},
    {path:'/cash_order',component:cashOrder,meta:'3'},
    {path:'/buy_detail',component:buyDetail,meta:'0'},
    {path:'/buy_cancel',component:buyCancel,meta:'0'},
    {path:'/sale_detail',component:saleDetail,meta:'1'},
    {path:'/sale_cancel',component:saleCancel,meta:'1'},
    {path:'/recharge_detail',component:rechargeDetail,meta:'2'},
    {path:'/recharge_cancel',component:rechargeCancel,meta:'2'},
    {path:'/cash_detail',component:cashDetail,meta:'3'},
    {path:'/cash_cancel',component:cashCancel,meta:'3'},
    {path:'/abnormal',component:abnormal,meta:'4'},
  ]
},
// 即时交易数据
{path:'/immediately_home',component:immediatelyHome,
  children:[
    {path:'/immediately_buy',component:immediatelyBuy,meta:'0'},
    {path:'/immediately_sale',component:immediatelySale,meta:'1'},
    {path:'/immediately_buy_detail',component:immediatelyBuyDetail,meta:'0'},
    {path:'/immediately_sale_detail',component:immediatelySaleDetail,meta:'1'},
  ]
},
// 终端管理
{path:'/terminal_home',component:terminalHome,
  children:[
    {path:'/B_manager',component:Bmanager,meta:'0'},
    {path:'/projectManager',component:projectManager,meta:'1'},
    {path:'/agent_manager',component:agentManager,meta:'2'},
    {path:'/project_detail',component:projectDetail,meta:'1'},
    {path:'/agent_detail',component:agentDetail,meta:'2'},
  ]
},
//系统管理模块
{path:'/system_home',component:systemHome,
  children:[
    {path:'/send',component:send,meta:'0'},
    {path:'/member',component:member,meta:'1'},
    {path:'/role',component:role,meta:'2'},
    {path:'/password',component:password,meta:'3'},
    {path:'/member_add',component:memberAdd,meta:'4'},
    {path:'/member_detail',component:memberDetail,meta:'4'},
    {path:'/role_detail',component:roleDetail,meta:'2'},
    {path:'/visit',component:visit,meta:'3'},
    {path:'/notice_content',component:noticeContent,meta:'0'},
  ]
},
// 信息审核模块
{path:'/information_home',component:informationHome,
  children:[
    {path:'/information_cash',component:informationCash,meta:'0'},
    {path:'/A_real_name',component:ArealName,meta:'1'},
    {path:'/A_reject',component:Areject,meta:'1'},
    { path: '/B_real_name', component: BrealName,meta:'2'},
    {path:'/B_reject',component:Breject,meta:'2'},
    {path:'/agency_apply',component:agencyApply,meta:'3'},
    {path:'/agency_apply_detail',component:agencyApplyDetail,meta:'3'},
    {path:'/aegncy_audit',component:aegncyAudit,meta:'4'},

  ]
},
// 申述管理模块
{path:'/state_home',component:stateHome,
  children:[
    {path:'/untreated',component:untreated,meta:'0'},
    {path:'/processing',component:processing,meta:'1'},
    {path:'/completed',component:completed,meta:'2'},
    {path:'/undone',component:undone,meta:'3'},
    {path:'/takeOver',component:takeOver,meta:'0'},
    {path:'/processing_detail',component:processingDetail,meta:'1'},
    {path:'/completed_detail',component:completedDetail,meta:'2'},
    {path:'/revoked_details',component:revokedDetails,meta:'3'},
  ]
}

]


const router = new Router({
	mode: 'history',
  routes
})

export default router