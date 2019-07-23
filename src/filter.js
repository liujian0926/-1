const isAutn = (value) => {
   switch (value) {
     case '0':
       value = '未认证'
       break;
     case '1':
       value = '已认证'
       break;
     case '2':
       value = '认证失败'
       break;
     default:
       value = '未审核'
       break;
   }
   return value
}
const isPayType = (value) => {
  switch (value) {
    case '0':
      value = '未支付'
      break;
    case '1':
      value = '支付宝'
      break;
    case '2':
      value = '微信'
      break;
    default:
      value = '银行卡'
      break;
  }
  return value
}
const isMemberLeve = (value) => {
  switch (value) {
    case '1':
      value = 'C'
      break;
    case '2':
      value = 'B'
      break;
    default:
      value = 'A'
      break;
  }
  return value
}
const grant = (value) => {
  switch (value) {
    case 0:
      value = '普通会员'
      break;
    case 1:
      value = 'C'
      break;
    case 2:
      value = 'B'
      break;
    default:
      value = 'A'
      break;
  }
  return value
}
const isRateType = (value) => {
  return value === '1' ? '项目方' : '用户'
}
const isAgencyType = (value) => {
  return value === '1' ? '项目方' : '交易端'
}
const accountStatus = (value) => {
  return value === 0 ? '锁定' : '正常'
}
const isType = (value) => {
  return value == 3 ? '冻结' : '返回'
}
const isBacks = (value) => {
  return value == 0 ? '没退回' : '退回'
}
const isAgencyT= (value) => {
  return value === 1 ? 'A端' : 'B端'
}
const isAstatus = (value) => {
  switch (value) {
    case '1':
      value = '已提交'
      break;
    case '2':
      value = '待付款'
      break;
    case '3':
      value = '未到账'
      break;
    case '4':
      value = '手动取消'
      break;
    case '5':
      value = '已完成'
      break;
    case '6':
      value = '已匹配'
      break;
    case '7':
      value = '待确认'
      break;
    default:
      value = '自动取消'
      break;
  }
  return value
}
const isBstatus = (value) => {
  switch (value) {
    case '1':
      value = '已接单'
      break;
    case '2':
      value = '待付款'
      break;
    case '3':
      value = '未到账'
      break;
    case '4':
      value = '待确认'
      break;
    case '5':
      value = '已完成'
      break;
    case '6':
      value = '手动取消'
      break;
    default:
      value = '自动取消'
      break;
  }
  return value
}
const is_status = (value) => {
  switch (value) {
    case 0:
      value = '未审核'
      break;
    case 1:
      value = '已通过'
      break;
    default:
      value = '已拒绝'
      break;
  }
  return value
}
const is_idType = (value) => {
  switch (value) {
    case '1':
      value = '身份证'
      break;
    case '2':
      value = '护照'
      break;
    default:
      value = '港澳通行证'
      break;
  }
  return value
}
const is_agencyType = (value) => {
  switch (value) {
    case 1:
      value = 'A端代理'
      break;
    case 2:
      value = 'A端总代'
      break;
    case 3:
      value = 'B端代理'
    break;
    default:
      value = 'B端总代'
      break;
  }
  return value
}
export {
  isAutn, isPayType, isMemberLeve, isRateType, grant, isType,
  isAstatus, isBstatus, isAgencyType, is_agencyType, isBacks,
  is_status, is_idType, accountStatus, isAgencyT
}