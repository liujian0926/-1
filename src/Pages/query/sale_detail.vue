<template>
  <div class="container">
    <el-button type="warning" @click="goback()">返回</el-button>
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
      <el-table-column prop="memberLeve" label="会员级别" align="center">
         <template scope="scope">
              <span v-if="scope.row.memberLeve==='0'">普通会员</span>
              <span v-else-if="scope.row.memberLeve==='1'">C</span>
              <span v-else-if="scope.row.memberLeve==='2'">B</span>
              <span v-else-if="scope.row.memberLeve==='3'">A</span>
          </template>
      </el-table-column>
      <el-table-column prop="isAuth" label="实名认证" align="center">
          <template scope="scope">
              <span v-if="scope.row.isAuth==='0'">未认证</span>
              <span v-else-if="scope.row.isAuth==='1'">已认证</span>
              <span v-else-if="scope.row.isAuth==='2'">认证失败</span>
              <span v-else-if="scope.row.isAuth==='3'">未审核</span>
          </template>
      </el-table-column>
      <el-table-column prop="deposit" label="保证金" align="center"></el-table-column>
      <el-table-column prop="agencyAward" label="代理奖励" align="center"></el-table-column>
      <el-table-column prop="teamAward" label="团队奖励" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
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
      <el-table-column prop="recAmount" label="收款金额" align="center"></el-table-column>
      <el-table-column prop="sellIntegral" label="卖出金额" align="center"></el-table-column>
      <el-table-column prop="receiptTime" label="接单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="recType" label="收款方式" align="center">
        <template scope="scope">
              <span v-if="scope.row.recType==='0'">未支付</span>
              <span v-else-if="scope.row.recType==='1'">支付宝</span>
              <span v-else-if="scope.row.recType==='2'">微信</span>
              <span v-else-if="scope.row.recType==='3'">银行卡</span>
          </template>
      </el-table-column>
    </el-table>

     <div class="title">关联订单</div>
    <!-- 订单信息表格-->
    <el-table
      class="table"
      :data="AssociationData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="paymentAmount" label="付款金额" align="center"></el-table-column>
      <el-table-column prop="rechargeIntegral" label="充值积分" align="center"></el-table-column>
      <el-table-column prop="rechargeRate" label="充值费率" align="center"></el-table-column>
      <el-table-column prop="rateType" label="扣手续费方式" align="center">
        <template scope="scope">
              <span v-if="scope.row.rateType==='1'">项目方</span>
              <span v-else-if="scope.row.rateType==='2'">用户</span>
          </template>
      </el-table-column>
      <el-table-column prop="actualAchievement" label="充值到账" align="center"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="payType" label="支付方式" align="center">
        <template scope="scope">
              <span v-if="scope.row.payType==='0'">未支付</span>
              <span v-else-if="scope.row.payType==='1'">支付宝</span>
              <span v-else-if="scope.row.payType==='2'">微信</span>
              <span v-else-if="scope.row.payType==='3'">银行卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentAccount" label="收款人" align="center"></el-table-column>
      <el-table-column prop="paymentRemake" label="付款时备注" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "sale_detail",
  data() {
    return {
      //用户信息
      userData:[{}],
      //订单信息
      orderData:[{}],
      //关联订单
      AssociationData:[{}],
      //传递过来的id
      orderNo:{orderNo:this.$route.query.num}
    };
  },
  created() {
    this.getUsers()
  },
  methods: {
    //获取用户信息的数据
    getUsers(){
    this.$get("/transactionDataQuery/getSellOrderCompleteRecordDetails",this.orderNo).then(res=>{
      var arr=[]
      arr.push(res.data.userInfo)
      this.userData=res.data.userInfo.sellUserInfo
      this.orderData=res.data.sellOrderInfo.sellOrderInfo
      this.AssociationData=res.data.sellRelationOrderInfoVo.sellRelationOrderInfoVo
    })
    },
    //返回跳转
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
