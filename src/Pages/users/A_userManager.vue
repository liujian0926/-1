<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <!--时间日期-->
      <!-- <div class="title">日期</div> -->
      <el-form-item label="加入时间">
        <i class="el-icon-date"></i>
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期"  v-model="form.startTime" size="small" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-minus"></i>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-date"></i>
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期"  v-model="form.endTime" size="small" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <!--类型选择 -->
      <el-form-item>
       <el-input v-model="form.userName" placeholder="用户名称"></el-input>
      </el-form-item>
       <el-form-item>
       <el-input v-model="form.userID" placeholder="用户ID"></el-input>
      </el-form-item>
       <el-form-item>
       <el-input v-model="form.projectID" placeholder="项目方ID"></el-input>
      </el-form-item>
       <el-form-item>
       <el-input v-model="form.agentID" placeholder="代理ID"></el-input>
      </el-form-item>

      <!-- <el-form-item>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>


      <!-- 表格-->
      <el-table
        class="table"
        :data="tableData"
        border
        style="width: 100% ;"

      >
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
        <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
        <el-table-column prop="projectSideName" label="项目方名称" align="center"></el-table-column>
        <el-table-column prop="projectSideId" label="项目方ID" align="center"></el-table-column>
        <el-table-column prop="agencyName" label="代理名称" align="center"></el-table-column>
        <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
        <el-table-column prop="operation" label="是否实名" align="center">
          <template scope="scope">{{scope.row.isAutn | isAutn}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="账户状态" align="center">
          <template scope="scope">{{scope.row.accountStatus | accountStatus}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template scope="scope">
            <router-link :to="{path:'/A_detail', query: {userId: scope.row.userId}}"><span style="color:#419EFF" >详情</span></router-link>
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
        endTime: "",
        startTime: "",
        userName: "",
        userID: "",
        projectID: "",
        agentID: ""
      },
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
    onSubmit() {
       const data = {
        token: localStorage.getItem("token"),
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime:this.form.startTime,
        endTime:this.form.endTime,
        userName:this.form.userName,
        userId:this.form.userID,
        projectSideId:this.form.projectID,
        agentId:this.form.agentID,
      };
      this.$get(
        "/aTerminalUserManage/getATerminalUserRecords", data).then(res => {
        var data = res.data
        this.tableData = data.aTerminalUserRecords
        this.total = data.total
      })
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 696px;
  width: 100%;
  background-color: #fff;
  a {
    text-decoration: none;
  }
   .my-form-users {
    height: 75px;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-right: 18px;
      position: relative;
      .el-icon-date{
        position: absolute;
        top: 7px;
        right: 7px;
        z-index: 999;
        color: #CBCFDC
      }
      .el-icon-minus{
        position: absolute;
        top: 7px;
        left: -7px
      }
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

