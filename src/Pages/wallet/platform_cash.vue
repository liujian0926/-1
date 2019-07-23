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
      <!--类型选择 -->
      <el-form-item>
        <el-select v-model="value" placeholder="选择操作员" @change="getCode(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="createTime" label="提现时间" align="center"></el-table-column>
      <el-table-column prop="tradingTime" label="确认时间" align="center"></el-table-column>
      <el-table-column prop="address" label="提币地址" align="center" width="350px"></el-table-column>
      <el-table-column prop="status" label="提现状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status === 1" style="color:#FF9D6C">处理中</span>
          <span v-else-if="scope.row.status === 2" style="color:#36D786">成功</span>
          <span v-else-if="scope.row.status === 3" style="color:red">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="confirm" label="哈希确认数" align="center"></el-table-column>
      <el-table-column prop="toNum" label="提现/到账金额" align="center">
        <template scope="scope">
          <span>{{scope.row.num}}/</span>
          <span>{{scope.row.toNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adminName" label="操作员" align="center"></el-table-column>
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
      options: [],
      value: "",
      total: 0,
      startTime: "",
      endTime: "",
      pageSize: 10,
      currentPage: 1,
      admin:''
    };
  },
  created() {
    this.getList();
    this.$get("/sys/user/userListSelect").then(res => {
      this.options = res.data
    });
  },
  methods: {
    getCode(value){
      console.log(value);
     this.admin = value;
     this.getList()
    },
    // 分页
    handleCurrentChange(value) {
      this.currentPage = value
      this.getList()
    },
    handleSizeChange(value){
      this.pageSize = value
      this.getList()
    },
    // 获取列表信息
    getList() {
      const data = {

        beginTime: this.startTime,
        endTime: this.endTime,
        adminId: this.admin,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        token: localStorage.getItem("token")
      };
      this.$get(
        "/platformWalletManagement/getPlatformUSDTCashRecord",
        data
      ).then(res => {
        this.tableData = res.data.platformUSDTCashRecord;
        this.total = res.data.total;
      });
    },
    // 重置
    reset(){
      this.startTime = ''
      this.endTime = ''
      this.admin = ''
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

