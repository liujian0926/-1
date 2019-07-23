<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--时间日期-->
      <el-form-item label="日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.start"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.end"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-input v-model="name" placeholder="项目方ID/名称"></el-input>
      </el-form-item>
      <!--类型选择 -->
      <el-form-item>
        <el-select v-model="value" placeholder="业务类型">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData(form)">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="addTime" label="发起时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="完成时间" align="center"></el-table-column>
      <el-table-column prop="projectName" label="项目方名称" align="center"></el-table-column>
      <el-table-column prop="projectId" label="项目方ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="mobile" label="用户电话" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="交易单号" align="center" width="180px"></el-table-column>
      <el-table-column prop="operationType" label="交易类型" align="center"></el-table-column>
      <el-table-column prop="primitiveIntegral" label="原始积分" align="center"></el-table-column>
      <el-table-column prop="rate" label="费率" align="center"></el-table-column>
      <el-table-column prop="rateType" label="扣费方式" align="center"></el-table-column>
      <el-table-column prop="actualIntegral" label="实际积分" align="center">
        <template scope="scope">
          <span v-if="scope.row.actualIntegral<0" style="color:#FFBC57">{{scope.row.actualIntegral}}</span>
          <span v-else-if="scope.row.actualIntegral>0" style="color:#4CDB93">{{scope.row.actualIntegral}}</span>
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
          :page-sizes="[10,20,30,40]"
          :page-size="pageNum"
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
      pageNum: 10,
      currentPage: 1,
      total: 0,
      form: {
        start: "",
        end: ""
      },
      option: [
        {
          value: 1,
          label: "充值"
        },
        {
          value: 2,
          label: "提现"
        }
      ],
      value: "",
      name: ""
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
        beginTime: this.form.start,
        endTime: this.form.end,
        operationType: this.value,
        name: this.name
      };
      this.$get(
        "/platformWalletManagement/getProjectIntegralChargeAndWithdrawRecord",
        data
      ).then(res => {
        this.tableData = res.data.projectIntegralChargeAndWithdrawRecord;
        this.total = res.data.total;
      });
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
    queryData(form) {
      this.getList();
    },
    // 重置
    resetForm() {
      this.form.start = "";
      this.form.end = "";
      this.value = "";
      this.name = "";
      this.getList();
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

