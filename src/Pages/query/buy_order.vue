<template>
  <div class="container">
    <el-tabs v-model="activeName" class="my-tab" @tab-click="handleClick">
      <el-tab-pane label="已完成" name="first">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline my-form-users" v-model="complete">
          <el-form-item label="日期">
            <el-date-picker
              type="date"
              placeholder="起始日期"
              v-model="beginTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="终止日期"
              v-model="endTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="orderNo" placeholder="买入单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="agentId" placeholder="代理ID"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="completeList">查询</el-button>
          </el-form-item>
          <!-- 导出数据 -->

          <!-- <el-button type="primary" @click="Export">导出表格数据</el-button> -->
        </el-form>

        <!-- 完成表格-->
        <el-table
          class="table"
          :data="complete.tableData"
          v-loading.lock="fullscreenLoading"
          border
          style="width: 100% ;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="买入单号" align="center" width="180px"></el-table-column>
          <el-table-column prop="relationOrderNo" label="关联单号" align="center" width="180px"></el-table-column>
          <el-table-column prop="buyIntegral" label="买入积分" align="center"></el-table-column>
          <el-table-column prop="paymentAmount" label="付款金额" align="center"></el-table-column>
          <el-table-column prop="paymentType" label="付款方式" align="center">
            <template scope="scope">
              <span v-if="scope.row.paymentType === '0'">为完成</span>
              <span v-else-if="scope.row.paymentType === '1'">支付宝</span>
              <span v-else-if="scope.row.paymentType === '2'">微信</span>
              <span v-else-if="scope.row.paymentType === '3'">银行卡</span>
            </template>
          </el-table-column>
          <el-table-column prop="agencyAward" label=" 代理奖励 " align="center"></el-table-column>
          <el-table-column prop="teamAward" label=" 团队奖励 " align="center"></el-table-column>
          <el-table-column prop="receiptTime" label=" 接单时间 " align="center" width="180px"></el-table-column>
          <el-table-column prop="completeTime" label=" 完成时间 " align="center" width="180px"></el-table-column>
          <el-table-column prop="详情" label="操作" align="center">
            <template slot-scope="scope">
              <span style="color:#419EFF;cursor:pointer;" @click="todetail(scope.row.orderNo)">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <!--分页 -->
        <div class="page">
          <div class="pagination">
            <el-pagination
              background
               @size-change="finishhandleSizeChange"
              @current-change="finishhandleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="complete.total"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已取消" name="second">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="orderNo" placeholder="买入单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="agentId" placeholder="代理ID"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="cancelList">查询</el-button>
          </el-form-item>
        </el-form>

        <!-- 取消表格-->
        <el-table
          class="table"
          :data="cancel.tableData"
          border
          style="width: 100% ;"
          v-loading.lock="fullscreenLoading"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="buyIntegral" label="买入积分" align="center"></el-table-column>
          <el-table-column prop="paymentAmount" label="付款积分" align="center"></el-table-column>
          <el-table-column prop="receiptTime" label=" 接单时间 " align="center"></el-table-column>
          <el-table-column prop="cancelTime" label=" 取消时间 " align="center"></el-table-column>
          <el-table-column prop="cancelType" label=" 取消方式 " align="center">
            <template scope="scope">
              <span v-if="scope.row.cancelType ==='6'">主动取消</span>
              <span v-else-if="scope.row.cancelType ==='7'">超时取消</span>
            </template>
          </el-table-column>
          <el-table-column prop="详情" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <span style="color:#419EFF;cursor:pointer;" @click="toCancelDetail(scope.row.orderNo)">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <!--分页 -->
        <div class="page">
          <div class="pagination">
            <el-pagination
              background
               @size-change="cancelhandleSizeChange"
              @current-change="cancelhandleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cancel.total"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

export default {
  data() {
    return {
      activeName: "first",
      input: "",
      // 已完成
      complete: {
        tableData: [],
        total: 0
      },
      // 已取消
      cancel: {
        tableData: [],
        total: 0
      },
      currentPage:1,
      pageSize: 10,
      beginTime: "",
      endTime: "",
      orderNo: "",
      userId: "",
      agentId: "",
      fullscreenLoading: false,
      type: 2
    };
  },

  mounted() {
    this.completeList();
  },
  methods: {
     //分页
    finishhandleSizeChange(page){
      this.pageSize = page;
      this.completeList();
      // this.cancelList();
    },
    finishhandleCurrentChange(change){
      this.currentPage = change;
      this.completeList();
      // this.cancelList();
    },
    cancelhandleSizeChange(page){
      this.pageSize = page;
      this.cancelList();
    },
    cancelhandleCurrentChange(change){
      this.currentPage = change;
      this.cancelList();
    },
   
    // tab栏切换事件
    handleClick(tab, event) {
      if (tab.index === "0") {
        this.completeList();
      } else if (tab.index === "1") {
        this.cancelList();
      }
    },
    // 已完成数据
    completeList() {
      this.fullscreenLoading = true;
      const data = {
        token: localStorage.getItem("token"),
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        beginTime: this.beginTime,
        endTime: this.endTime,
        orderNo: this.orderNo,
        userId: this.userId,
        agentId: this.agentId,
        orderType: this.type
      };
      this.$get(
        "transactionDataQuery/getBuyOrSellOrderCompleteRecord",
        data
      ).then(res => {
        console.log(res)
        this.fullscreenLoading = false;
        this.complete.tableData = res.data.buyOrSellOrderCompleteRecords;
        this.complete.total = res.data.total;
      });
    },
    // 已完成查询
    // 已取消数据
    cancelList() {
      this.fullscreenLoading = true;
      const data = {
        token: localStorage.getItem("token"),
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        beginTime: this.beginTime,
        endTime: this.endTime,
        orderNo: this.orderNo,
        userId: this.userId,
        agentId: this.agentId,
        orderType: this.type
      };
      this.$get(
        "/transactionDataQuery/getBuyOrSellOrderCancelRecord",
        data
      ).then(res => {
        console.log(res)
        this.cancel.tableData = res.data.buyOrSellOrderCancelRecords;
        this.cancel.total = res.data.total;
        this.fullscreenLoading = false;
      });
    },
    // 去详完成情页
    todetail(orderNo) {
      this.$router.push({
        path: "/buy_detail",
        query: {
          orderNo: orderNo
        }
      });
    },

    // 到取消详情页

    toCancelDetail(orderNo) {
      this.$router.push({
        path: "/buy_cancel",
        query: {
          orderNo: orderNo
        }
      });
    },

    // Export() {
    //   this.$target("/api/order/purchaseExport", "买入订单");
    // }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 100% !important;
}
.container {
  height: 800px;
  background-color: #fff;
  color: #333;
  a {
    text-decoration: none;
  }
  .el-button--warning {
    width: 60px;
    height: 28px;
    padding: 0;
    border-radius: 2px;
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
      margin-left: 42px;
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

