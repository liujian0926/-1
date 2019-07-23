<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <div class="title">用户信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="userstableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"

    >
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="isAuth" label="实名认证" align="center">
        <template scope="scope">
        <span v-if="scope.row.isAuth==='0'">未认证</span>
        <span v-else-if="scope.row.isAuth==='1'">已认证</span>
        <span v-else-if="scope.row.isAuth==='2'">认证失败</span>
        <span v-else-if="scope.row.isAuth==='3'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="cancelTime" label="取消时间" align="center"></el-table-column>
    </el-table>
    <div class="title">订单信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="ordertableData"
      border
      style="width:100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="amount" label="提现金额" align="center"></el-table-column>
      <el-table-column prop="integral" label="提现积分" align="center"></el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userstableData:[],
      ordertableData:[],
      //获取传递过来的参数
       orderNo:{orderNo:this.$route.query.num},
    }
  },
  created(){
  this.getAllcancel()
  },
  methods:{
    getAllcancel(){
    this.$get("/transactionDataQuery/getRechargeOrCashOrderCancelRecordDetails",this.orderNo).then(res=>{
      this.userstableData=res.data.rechargeOrCashUserInfoCancel.rechargeOrCashUserInfoCancel
      this.ordertableData=res.data.rechargeOrCashOrderInfoCancel.rechargeOrCashOrderInfoCancel
    })
    },
    goback(){
      this.$router.go(-1)
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
