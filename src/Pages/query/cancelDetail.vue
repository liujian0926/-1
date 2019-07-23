<template>
  <div class="container">
    <el-button type="warning" @click="goback()">返回</el-button>
    <div class="title">用户信息</div>
    <!-- 用户信息表格-->
    <el-table
      v-loading.lock="fullscreenLoading"
      class="table"
      :data="userData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="memberLeve" label="会员等级" align="center"></el-table-column>
      <el-table-column prop="isAuth" label="是否实名" align="center">
        <template scope="scope">
          <span v-if="scope.row.isAuth ==='0'">未认证</span>
          <span v-else-if="scope.row.isAuth ==='1'">已认证</span>
          <span v-else-if="scope.row.isAuth ==='2'">认证失败</span>
          <span v-else-if="scope.row.isAuth ==='3'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="deposit" label="保证金" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
      <el-table-column prop="cancelTime" label="取消时间" align="center"></el-table-column>
    </el-table>
    <div class="title">订单信息</div>
    <!-- 订单信息表格-->
    <el-table
      v-loading.lock="fullscreenLoading"
      class="table"
      :data="orderData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="paymentAmount" label="付款金额" align="center"></el-table-column>
      <el-table-column prop="buyIntegral" label="买入数量" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "buy_detail",
  data() {
    return {
      orderNo: null,
      userData: [],
      orderData: [],
      fullscreenLoading: false
    };
  },
  created() {
    this.orderNo = this.$route.query.orderNo;
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      this.fullscreenLoading = true;
      const data = {
        orderNo: this.orderNo,
        token: localStorage.getItem("token")
      };
      this.$get(
        "/transactionDataQuery/getBuyOrderCancelRecordDetails",
        data
      ).then(res => {
        this.fullscreenLoading = false;
        this.userData.push(res.data.buyUserInfoCancel);
        this.orderData.push(res.data.buyOrderInfoCancel);
      });
    },
    goback() {
      this.$router.go(-1);
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
