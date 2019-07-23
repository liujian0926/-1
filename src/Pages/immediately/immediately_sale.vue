<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--类型选择 -->
      <el-form-item>
        <el-input v-model="form.sellId" placeholder="卖出单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.rechargeId" placeholder="充值单号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="serach()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格-->
    <el-table
      class="table"
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="sellOrderNo" label="卖出单号"></el-table-column>
      <el-table-column prop="rechargeOrderNo" label="充值单号"></el-table-column>
      <el-table-column prop="sellCount" label="卖出数量"></el-table-column>
      <el-table-column prop="sellAmount" label="收款金额"></el-table-column>
      <el-table-column prop="rechargeCount" label="充值积分"></el-table-column>
      <el-table-column prop="rechargeAmount" label="支付金额"></el-table-column>
      <el-table-column prop="actAmount" label="到账积分"></el-table-column>
      <el-table-column prop="rate" label="手续费"></el-table-column>
      <el-table-column label="扣手续费方式">
        <template scope="scope">
          <span>{{scope.row.rateType | isRateType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="matchingTime" label="订单匹配时间"></el-table-column>
      <el-table-column prop="duration" label="持续时长（M）"></el-table-column>
      <el-table-column prop="astatus" label="A端状态">
        <template scope="scope">
          <span>{{scope.row.astatus | isAstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bstatus" label="B端状态">
        <template scope="scope">
          <span>{{scope.row.bstatus | isBstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template scope="scope">
          <router-link :to="{path:'/immediately_sale_detail', query: {orderNo: scope.row.sellOrderNo}}"><span style="color:#419EFF" >详情</span></router-link>
        </template>
      </el-table-column>
    </el-table>

    <!--分页 -->
    <div class="page">
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        sellId: '',
        rechargeId: ""
      },
      orderNo: '',
      pageSize: 10,
      total: 0,
      currentPage: 1
    };
  },
  created() {
    this.onSubmit()
  },
   methods: {
    // 每页显示条数选择
    handleSizeChange (count) {
      this.pageSize = count
      this.onSubmit()
    },
    // 当前页数改变
    handleCurrentChange (Current) {
      this.currentPage = Current
      this.onSubmit()
    },
    // 判断单号
    serach () {
      if (this.form.sellId === '' && this.form.rechargeId === '') {
        this.$message.warning('请输入查询订单号')
      }
      this.orderNo = this.form.sellId === '' ? this.form.rechargeId : this.form.sellId
      this.onSubmit()
    },
    // 获取订单列表
    onSubmit() {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        orderNo:this.orderNo
      };
      this.$get(
        "/sellRecharge/getSellRechargeOrderRecords", data).then(res => {
        var data = res.data
        this.tableData = data.sellRechargeOrder
        this.total = data.total
      })
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  .my-form-users {
    height: 75px;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-right: 18px;
    }
    .title {
      font-size: 13px;
      color: #253444;
      margin-right: 8px;
    }
    .el-button--primary {
      width: 100px !important;
      height: 28px;
      padding: 0;
      margin-left: 46px;
    }
    .el-button--default {
      margin-left: 46px;
      width: 50px !important;
      height: 28px;
      padding: 0;
    }
    .el-button--warning {
      width: 60px !important;
      height: 28px;
      padding: 0;
    }
  }

  .page {
    height: 78px;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 4px;
    .pagination {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>

