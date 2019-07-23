<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--类型选择 -->
      <el-form-item>
        <el-input v-model="form.buyId" placeholder="买入单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.withdrawalId" placeholder="提现单号"></el-input>
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
      <el-table-column prop="buyOrderNo" label="买入单号"></el-table-column>
      <el-table-column prop="cashOrderNo" label="提现单号"></el-table-column>
      <el-table-column prop="buyCount" label="买入数量"></el-table-column>
      <el-table-column prop="buyAmount" label="买入金额"></el-table-column>
      <el-table-column prop="cashCount" label="提现数量"></el-table-column>
      <el-table-column prop="cashAmount" label="提现金额"></el-table-column>
      <el-table-column prop="actAmount" label="到账金额"></el-table-column>
      <el-table-column prop="rate" label="手续费"></el-table-column>
      <el-table-column label="扣手续费方式">
        <template scope="scope">
          <span>{{scope.row.rateType | isRateType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="matchingTime" label="订单匹配时间"></el-table-column>
      <el-table-column prop="duration" label="持续时长（s）"></el-table-column>
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
          <router-link :to="{path:'/immediately_buy_detail', query: {orderNo: scope.row.buyOrderNo}}"><span style="color:#419EFF" >详情</span></router-link>
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
        buyId: '',
        withdrawalId: ""
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
      if (this.form.buyId === '' && this.form.withdrawalId === '') {
        this.$message.warning('请输入查询订单号')
      }
      this.orderNo = this.form.buyId === '' ? this.form.withdrawalId : this.form.buyId
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
        "/buyCash/getBuyCashRecords", data).then(res => {
        var data = res.data
        this.tableData = data.buyCashRecords
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

