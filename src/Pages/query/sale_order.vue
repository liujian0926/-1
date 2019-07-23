<template>
  <div class="container">
    <el-tabs v-model="activeName" class="my-tab">
      <el-tab-pane label="已完成" name="first">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="接单时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="finishForm.beginTime"
              style="width:100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="finishForm.endTime"
              style="width:100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="finishForm.orderNo" placeholder="卖出单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="finishForm.userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="finishForm.agentId" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="finishquery">查询</el-button>
          </el-form-item>
         
        </el-form>

        <!-- 表格-->
        <el-table
          class="table"
          :data="complete.tableData"
          border
          style="width:100%;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="卖出单号" align="center"></el-table-column>
          <el-table-column prop="relationOrderNo" width="100" label="关联单号" align="center"></el-table-column>
          <el-table-column prop="buyIntegral" label="卖出积分" align="center"></el-table-column>
          <el-table-column prop="paymentAmount" label=" 收款金额 " align="center"></el-table-column>
          <el-table-column prop="paymentType" label=" 付款方式 " align="center">
             <template scope="scope">
              <span v-if="scope.row.paymentType==='0'">未支付</span>
              <span v-else-if="scope.row.paymentType==='1'">支付宝</span>
              <span v-else-if="scope.row.paymentType==='2'">微信</span>
              <span v-else-if="scope.row.paymentType==='3'">银行卡</span>
            </template>
          </el-table-column>
          <el-table-column prop="agencyAward" label=" 代理奖励 " align="center"></el-table-column>
          <el-table-column prop="teamAward" label=" 团队奖励 " align="center"></el-table-column>
          <el-table-column prop="receiptTime" label=" 接单时间 " align="center"></el-table-column>
          <el-table-column prop="completeTime" label=" 完成时间 " align="center"></el-table-column>
          <el-table-column prop="详情" label="操作" align="center" width="100">
            <template scope='scope'>
              <span style="color:#419EFF;cursor:pointer" @click="detail(scope.row)">详情</span>
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
              :current-page="finishForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="finishForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="complete.total"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!-- 取消区域 -->
      <el-tab-pane label="已取消" name="second">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="接单时间">
            <el-date-picker
              type="date"
              placeholder="起始日期"
              v-model="cancelForm.beginTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="终止日期"
              v-model="cancelForm.endTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="cancelForm.orderNo" placeholder="卖出单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="cancelForm.userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="cancelForm.agentId" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cancelquery">查询</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格-->
        <el-table
          class="table"
          :data="cancel.tableData"
          border
          style="width: 100%;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="卖出单号" align="center"></el-table-column>
          <el-table-column prop="buyIntegral" width="100" label="卖出积分" align="center"></el-table-column>
          <el-table-column prop="paymentAmount" label="收款金额" align="center"></el-table-column>
          <el-table-column prop="receiptTime" label=" 接单时间 " align="center"></el-table-column>
          <el-table-column prop="cancelTime" label=" 取消时间 " align="center"></el-table-column>
          <el-table-column prop="cancelType" label=" 取消方式 " align="center">
            <template scope="scope">
              <span v-if="scope.row.cancelType==='6'">手动取消</span>
              <span v-if="scope.row.cancelType==='7'">超时取消</span>
            </template>
          </el-table-column>
          <el-table-column prop="详情" label="操作" align="center" width="100">
            <template scope='scope'>
              <span style="color:#419EFF;cursor:pointer" @click="canceldetail(scope.row)">详情</span>
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
              :current-page="cancelForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="cancelForm.pageSize"
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
import { log } from "util";
export default {
  data() {
    return {
      activeName: "first",
      // 已完成表格区域
      complete: {
        tableData: [],
        total: 0
      },
      //已完成表单及分页区域
      finishForm: {
        currentPage: 1,
        pageSize: 10,
        orderType: 1,
        beginTime: "",
        endTime: "",
        orderNo: "",
        userId: "",
        agentId: ""
      },
      // 已取消表格区域
      cancel: {
        tableData: [],
        total: 0
      },
      //已取消表单及分页区域
      cancelForm: {
        currentPage: 1,
        pageSize: 10,
        orderType: 1,
        beginTime: "",
        endTime: "",
        orderNo: "",
        userId: "",
        agentId: ""
      }
    };
  },
  created() {
    this.finishItem();
    this.cancelItem();
  },
  methods: {
    //分页
    finishhandleSizeChange(page){
     this.finishForm.pageSize=page
     this.finishItem();
    },
    finishhandleCurrentChange(change){
      this.finishForm.currentPage=change
      this.finishItem();
    },
    cancelhandleSizeChange(page){
       this.cancelForm.pageSize=page
      this.cancelItem();
    },
    cancelhandleCurrentChange(change){
       this.cancelForm.currentPage=change
       this.cancelItem();
    },
    //已完成数据
    finishItem() {
      this.$get(
        "/transactionDataQuery/getBuyOrSellOrderCompleteRecord",
        this.finishForm
      ).then(res => {
        this.complete.tableData = res.data.buyOrSellOrderCompleteRecords;
        this.complete.total = res.data.total;
      });
    },
    //已取消数据
    cancelItem() {
      this.$get(
        "transactionDataQuery/getBuyOrSellOrderCancelRecord",
        this.cancelForm
      ).then(res => {
        this.cancel.tableData = res.data.buyOrSellOrderCancelRecords;
        this.cancel.total = res.data.total;
      });
    },
    //点击完成区域查询
    finishquery() {
      this.finishItem();
    },
    //点击取消区域查询
    cancelquery() {
      this.cancelItem();
    },
    //点击已完成详情跳转逻辑
    detail(value){
    this.$router.push({path:"/sale_detail",query:{num:value.orderNo}})
    },
    //点击已取消区域详情逻辑
    canceldetail(val){
    this.$router.push({path:"/sale_cancel",query:{num:val.orderNo}})
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 100% !important;
}
.container {
  height: 696px;
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

