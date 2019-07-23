<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--时间日期-->
      <el-form-item label="日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="startTime"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="endTime"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="username" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!--类型选择 -->
      <el-form-item>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 提现表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      v-show="value === '2'"
    >
      <el-table-column prop="beginTime" label="提现时间" align="center" width="180px"></el-table-column>
      <el-table-column prop="endTime" label="确认时间" align="center" width="180px"></el-table-column>
      <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="rechargeNum" label="提现/到账金额" align="center">
        <template scope="scope">
          <span>{{scope.row.rechargeNum}}</span>
          <span>/{{scope.row.toNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hash" label="提币地址" align="center" width="550px"></el-table-column>
      <el-table-column prop="confirm" label="哈希确认数" align="center"></el-table-column>
      <el-table-column prop="status" label="提现状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status ==='1'" style="color:#FFBB55">处理中</span>
          <span v-else-if="scope.row.status ==='2'" style="color:#69E1A5">成功</span>
          <span v-else-if="scope.row.status ==='3'" style="color:red">失败</span>
          <span v-else-if="scope.row.status ==='4'">无效地址</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="交易单号" align="center" width="180px"></el-table-column>
    </el-table>
    <!-- 充值列表 -->
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      v-show="value === '1'"
    >
      <el-table-column prop="beginTime" label="充值时间" align="center" width="180px"></el-table-column>
      <el-table-column prop="endTime" label="确认时间" align="center" width="180px"></el-table-column>
      <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="rechargeNum" label="充值数量" align="center"></el-table-column>
      <el-table-column prop="hash" label="交易哈希" align="center" width="550px"></el-table-column>
      <el-table-column prop="confirm" label="哈希确认数" align="center"></el-table-column>
      <el-table-column prop="status" label="充值状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status ==='1'" style="color:#FFBB55">处理中</span>
          <span v-else-if="scope.row.status ==='2'" style="color:#69E1A5">成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="交易单号" align="center" width="180px"></el-table-column>
    </el-table>

    <!--分页 -->
    <div class="page">
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10,20,30,40]"
          :page-size="10"
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
      options: [
        {
          value: "1",
          label: "充值"
        },
        {
          value: "2",
          label: "提现"
        }
      ],
      value: "2",
      startTime: "",
      endTime: "",
      total: 0,
      username: "",
      pageNum: 10,
      currentPage: 1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      const data = {
        pageSize: this.pageNum,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        bName: this.username,
        type: this.value
      };
      this.$get("platformWalletManagement/getBTerminalUSDTRecord", data).then(
        res => {
          this.tableData = res.data.bRechargeOrCashRecords;
          this.total = res.data.total;
        }
      );
    },
    // 分页
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getList();
    },
     handleSizeChange(value){
      this.pageNum = value
      this.getList()
    },
    // 查询
    queryList() {
      this.getList();
    },

    // 重置
    reset() {
      this.startTime = "";
      this.endTime = "";
      this.username = "";
      this.getList()
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #f5f6fa;
  color: #333;
  padding: 0 30px;
  box-sizing: border-box;
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
    }
    .el-button--default {
      margin-left: 46px;
      width: 50px !important;
      height: 28px;
      padding: 0;
    }
  }
  .page {
    height: 104px;
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

