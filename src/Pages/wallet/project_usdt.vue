<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--时间日期-->
      <!-- <div class="title">日期</div> -->
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
        <el-input v-model="projectID" placeholder="项目方ID/名称"></el-input>
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
        <el-button>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 提现表格-->
    <el-table
      v-show="value==='2'"
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="beginTime" label="充值时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="确认时间" align="center"></el-table-column>
      <el-table-column prop="name" label="项目方名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="项目方ID" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
      <el-table-column prop="rechargeNum" label="提现数量" align="center"></el-table-column>
      <el-table-column prop="hash" label="提币地址" align="center"></el-table-column>
      <el-table-column prop="confirm" label="哈希确认数" align="center"></el-table-column>
      <el-table-column prop="status" label="提现状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status==1" style="color:#FFBC57">处理中</span>
          <span v-else-if="scope.row.status==2" style="color:#4CDB93">成功</span>
          <span v-else-if="scope.row.status==3" style="color:red">失败</span>
          <span v-else-if="scope.row.status==4" style="color:#4E4E4E">无效地址</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="交易单号" align="center"></el-table-column>
    </el-table>

    <!-- 充值表格 -->

    <el-table
      v-show="value==='1'"
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="beginTime" label="充值时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="确认时间" align="center"></el-table-column>
      <el-table-column prop="name" label="项目方名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="项目方ID" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
      <el-table-column prop="rechargeNum" label="充值数量" align="center"></el-table-column>
      <el-table-column prop="hash" label="提币地址" align="center"></el-table-column>
      <el-table-column prop="confirm" label="哈希确认数" align="center"></el-table-column>
      <el-table-column prop="status" label="充值状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status==0" style="color:#FFBC57">处理中</span>
          <span v-else-if="scope.row.status==1" style="color:#4CDB93">成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="交易单号" align="center"></el-table-column>
    </el-table>
    <!--分页 -->
    <div class="page">
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10,20,30,40]"
          :page-size="1"
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
      projectID: "",
      pageSize: 10,
      currentPage: 1,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表信息
    getList() {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        bName: this.projectID,
        type: this.value
      };
      this.$get(
        "/platformWalletManagement/getProjectSideUSDTRecord",
        data
      ).then(res => {
        this.tableData = res.data.projectRechargeOrCashRecords;
        this.total = res.data.total;
      });
    },
    // 查询数据
    queryData() {
      this.getList();
    },

    // 分页查询
    handleCurrentChange(value) {
      this.current = value;
      this.getList();
    },
     handleSizeChange(value){
      this.pageSize = value
      this.getList()
    },
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

