<template>
  <div class="container">
    <el-button type="warning" @click="goback()">返回</el-button>
    <div class="title">A端用户信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="aUserInfo"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="projectId" label="项目方ID" align="center"></el-table-column>
      <el-table-column prop="agentId" label="代理方ID" align="center"></el-table-column>
      <el-table-column label="实名认证" align="center">
        <template scope="scope">
          <span>{{scope.row.isAuth | isAutn}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="电话号码" align="center"></el-table-column>
    </el-table>
    <div class="title">A端订单信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="aOrderInfo"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="orderStatus" label="订单状态" align="center">
        <template scope="scope">
          <span style="color:#4298FA">{{scope.row.orderStatus | isAstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cashCount" label="付款金额" align="center"></el-table-column>
      <el-table-column prop="cashAmount" label="充值积分" align="center"></el-table-column>
      <el-table-column prop="rate" label="手续费率" align="center"></el-table-column>
      <el-table-column prop="actAmount" label="到账积分" align="center"></el-table-column>
      <el-table-column label="扣手续费方式" align="center">
        <template scope="scope">
          <span>{{scope.row.rateType | isRateType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="placeTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
    </el-table>
    <div class="title">B端用户信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="bUserInfo"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="agentId" label="代理方ID" align="center"></el-table-column>
      <el-table-column prop="memberLeve" label="会员级别" align="center">
        <template scope="scope">
          <span>{{scope.row.memberLeve | isMemberLeve}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实名认证" align="center">
        <template scope="scope">
          <span>{{scope.row.isAuth | isAuth}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deposit" label="保证金" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话号码" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
    </el-table>
    <div class="title">B端订单信息</div>
    <!-- 表格-->
    <el-table
      class="table"
      :data="bOrderInfo"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="orderStatus" label="订单状态" align="center">
        <template scope="scope">
          <span style="color:#4298FA">{{scope.row.orderStatus | isBstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payAmount" label="收款金额" align="center"></el-table-column>
      <el-table-column prop="buyAmount" label="卖出数量" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNo: '',
      aOrderInfo: [],
      aUserInfo: [],
      bOrderInfo: [],
      bUserInfo: [],
      timeS: '0'
    }
  },
  created() {
    this.orderNo = this.$route.query.orderNo
    this.getOrderDetail()
  },
  methods: {
    // 返回
    goback () {
      this.$router.go(-1)
    },
    // 获取订单详细信息
    getOrderDetail () {
      const data = {
        orderNo: this.orderNo
      };
      this.$get(
        "/sellRecharge/getSellRechargeRecordDetail", data).then(res => {
        var data = res.data
        this.aOrderInfo = data.aOrderInfo.aOrderInfo
        this.aUserInfo = data.aUserInfo.aUserInfo
        this.bOrderInfo = data.bOrderInfo.sellBOrderInfo
        this.bUserInfo = data.bUserInfo.bUserInfo
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px 30px 0 30px;
  box-sizing: border-box;
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
    width: 100%;
    height: 20px;
    color: #253444;
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0 10px 0;
  }
}
</style>
