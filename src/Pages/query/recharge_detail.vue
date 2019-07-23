<template>
  <div class="container">
    <el-button type="warning"  @click="goback()">返回</el-button>
    <div class="title">用户信息</div>
    <!-- 用户信息表格-->
    <el-table

      class="table"
      :data="userData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="isAuth" label="实名认证" align="center">
        <template scope="scope">
         <span v-if="scope.row.isAuth==='0'">未认证</span>
         <span v-if="scope.row.isAuth==='1'">已认证</span>
         <span v-if="scope.row.isAuth==='2'">认证失败</span>
         <span v-if="scope.row.isAuth==='3'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="agencyAward" label="代理奖励" align="center"></el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="completeTime" label="完成时间" align="center"></el-table-column>
    </el-table>
    <div class="title">订单信息</div>
    <!-- 订单信息表格-->
   <el-table

      class="table"
      :data="orderData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="paymentAmount" label="付款金额" align="center"></el-table-column>
      <el-table-column prop="orderAmount" label="充值积分" align="center"></el-table-column>
      <el-table-column prop="rate" label="费率" align="center"></el-table-column>
      <el-table-column prop="rateType" label="扣手续费方" align="center">
        <template scope="scope">
         <span v-if="scope.row.rateType==='0'">项目方</span>
         <span v-else-if="scope.row.rateType==='1'">用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="buyIntegral" label="到账积分" align="center"></el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="paymentType" label="支付方式" align="center">
        <template scope="scope">
         <span v-if="scope.row.paymentType==='0'">未支付</span>
         <span v-else-if="scope.row.paymentType==='1'">支付宝</span>
         <span v-else-if="scope.row.paymentType==='2'">微信</span>
         <span v-else-if="scope.row.paymentType==='3'">银行卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="payee" label="收款人" align="center"></el-table-column>
      <el-table-column prop="paymentRemake" label="收款时备注" align="center"></el-table-column>
    </el-table>

    <div class="title">关联订单</div>
    <!-- 关联订单信息表格-->
   <el-table

      class="table"
      :data="AssociationorderData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="receAmount" label="收款金额" align="center"></el-table-column>
      <el-table-column prop="sellIntegral" label="卖出数量" align="center"></el-table-column>

      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="payType" label="收款方式" align="center">
        <template scope="scope">
         <span v-if="scope.row.payType==='0'">未支付</span>
         <span v-else-if="scope.row.payType==='1'">支付宝</span>
         <span v-else-if="scope.row.payType==='2'">微信</span>
         <span v-else-if="scope.row.payType==='3'">银行卡</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
       //传递过来的id
      orderNo:{orderNo:this.$route.query.num},
      userData:[],
      orderData:[],
      AssociationorderData:[]
    };
  },
  created(){
  this.getUsersInfo()
  },
  methods:{
   goback() {
      this.$router.go(-1)
    },
   //获取用户信息
   getUsersInfo(){
     this.$get("/transactionDataQuery/getRechargeOrderCompleteRecordDetails",this.orderNo).then(res=>{
       this.userData=res.data.rechargeOrCashUserInfo.rechargeOrCashUserInfo
       this.orderData=res.data.rechargeOrderInfo.rechargeOrderInfo
       this.AssociationorderData=res.data.rechargeRelationOrderInfoVo.rechargeRelationOrderInfoVo
     })
   }
 }

};
</script>

<style lang="less" scoped>
.container {
  padding-top: 20px;
  height: 696px;
  width: 100%;
  background-color: #fff;
  .el-button--warning {
    width: 60px;
    height: 28px;
    padding: 0;
    border-radius: 2px;
  }
  .title {
      width: 59px;
      height: 20px;
      color: #253444;
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0 10px 0;
  }
}
</style>
