<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--时间日期-->
      <el-form-item label="加入时间">
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
        <el-input v-model="projectName" placeholder="项目方名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="projectId" placeholder="项目方ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="agentId" placeholder="所属代理ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
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
      <el-table-column prop="projectName" label="项目方名称" align="center"></el-table-column>
      <el-table-column prop="projectId" label="项目方ID" align="center" width="180px"></el-table-column>
      <el-table-column prop="liaisonMan" label="项目方联系人" align="center"></el-table-column>
      <el-table-column prop="tel" label="联系人电话" align="center"></el-table-column>
      <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
      <el-table-column prop="belonesAgence" label="所属代理" align="center"></el-table-column>
      <el-table-column prop="agenceId" label="代理ID" align="center"></el-table-column>
      <el-table-column prop="userCount" label="用户数量" align="center"></el-table-column>
      <el-table-column prop="integralBalance" label="积分余额" align="center"></el-table-column>
      <el-table-column prop="usdtBalance" label="USDT余额" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template scope="scope">
          <span style="color:#419EFF" @click="toDetail(scope.row.projectId)">详情</span>
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
          :page-size="currentPage"
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
      startTime: "",
      endTime: "",
      projectName: "",
      projectId: "",
      agentId: "",
      pageSize: 10, //一页显示多少条
      currentPage: 1, // 当前页
      total: 0 //总条数
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getList();
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getList();
    },
    //项目方列表信息
    getList() {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        projectName: this.projectName,
        projectId: this.projectId,
        agencyId: this.agentId
      };
      this.$get("/projectSideManage/getProjectSideRecords", data).then(res => {
        this.tableData = res.data.projectSideManageVos;
        this.total = res.data.total;
      });
    },
    //查询
    query() {
      this.getList();
    },
    //跳转详情页
    toDetail(idx) {
      this.$router.push({
        path: "/project_detail",
        query: {
          id: idx
        }
      });
    }
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
    }
    .el-button--default {
      margin-left: 46px;
      width: 50px !important;
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

