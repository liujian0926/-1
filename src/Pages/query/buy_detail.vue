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
      <el-table-column prop="isAuth" label="实名认证" align="center">
        <template scope="scope">
          <span v-if="scope.row.isAuth ==='0'">未认证</span>
          <span v-else-if="scope.row.isAuth ==='1'">已认证</span>
          <span v-else-if="scope.row.isAuth ==='2'">认证失败</span>
          <span v-else-if="scope.row.isAuth ==='3'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="deposit" label="保证金" align="center"></el-table-column>
      <el-table-column prop="agencyAward" label="代理奖励" align="center"></el-table-column>
      <el-table-column prop="teamAward" label="团队奖励" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="	接单时间" align="center"></el-table-column>
      <el-table-column prop="completeTime" label="完成时间" align="center"></el-table-column>
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
      <el-table-column prop="paymentType" label="支付方式" align="center">
        <template scope="scope">
          <span v-if="scope.row.paymentType === '0'">为完成</span>
          <span v-else-if="scope.row.paymentType === '1'">支付宝</span>
          <span v-else-if="scope.row.paymentType === '2'">微信</span>
          <span v-else-if="scope.row.paymentType === '3'">银行卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="payee" label="收款人" align="center"></el-table-column>
      <el-table-column prop="paymentRemake" label="	付款时备注" align="center"></el-table-column>
      <el-table-column prop="paymentVouchers" label="支付凭证" align="center" width="500x">
        <template scope="scope">
          <el-button
            type="text"
            @click="tankuang(scope.row.paymentVouchers)"
            style="color:#197bb3;cursor: pointer;"
          >点击查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">关联订单</div>
    <!-- 关联订单表格-->
    <el-table
      v-loading.lock="fullscreenLoading"
      class="table"
      :data="relationOrderInfo"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="cashWithdrawalAmount" label="提现金额" align="center"></el-table-column>
      <el-table-column prop="cashWithdrawalIntegral" label="提现积分" align="center"></el-table-column>
      <el-table-column prop="cashWithdrawalRate" label="提现费率" align="center"></el-table-column>
      <el-table-column prop="rateType" label="扣手续费方式" align="center">
        <template scope="scope">
          <span v-if="scope.row.rateType === '1'">项目方</span>
          <span v-else-if="scope.row.rateType === '2'">用户支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="actualAchievement" label="实际到账" align="center"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="paymentAccount" label="收款账户" align="center">
        <template scope="scope">
          <span v-if="scope.row.paymentAccount === '0'">为完成</span>
          <span v-else-if="scope.row.paymentAccount === '1'">支付宝</span>
          <span v-else-if="scope.row.paymentAccount === '2'">微信</span>
          <span v-else-if="scope.row.paymentAccount === '3'">银行卡</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog title="支付凭证" :visible.sync="dialogVisible" width="20%">
      <img :src="url" alt style="width:100% !important"/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "buy_detail",
  data() {
    return {
      url: "",
      dialogVisible:false,
      orderNo: null,
      userData: [],
      orderData: [],
      relationOrderInfo: [],
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
        "/transactionDataQuery/getBuyOrderCompleteRecordDetails",
        data
      ).then(res => {
        this.fullscreenLoading = false;
        this.userData.push(res.data.userInfo);
        this.orderData.push(res.data.orderInfo);
        this.relationOrderInfo.push(res.data.relationOrderInfoVo);
      });
    },
    goback() {
      this.$router.go(-1);
    },
    //查看弹框
    tankuang(imgURL) {
      this.dialogVisible = true;
      this.url=imgURL
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
  img {
    height: 300px;
    width: 200px;
    display: block;
  }
}
</style>
