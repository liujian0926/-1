<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tab">
      <el-tab-pane label="未审核" name="first">
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="申请时间">
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
            <el-input v-model="userName" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userID" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="authenticationRecord()">查询</el-button>
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
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column label="实名信息" align="center">
             <template scope="scope">
              <el-button @click.native.prevent="look(scope.row.userId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pass,reject" label="操作" align="center">
            <template scope="scope">
              <span style="color:#20d179" @click="operation(scope.row.userId, 1)">通过</span>
              <span style="color:red; marginLeft:20px ;" @click="operation(scope.row.userId, 2)">拒绝</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="已拒绝" name="second">
        <el-form :inline="true" class="demo-form-inline my-form-users">
         <el-form-item label="申请时间">
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
            <el-input v-model="userName" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userID" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="authenticationRecord()">查询</el-button>
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
           <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column label="实名信息" align="center">
            <template scope="scope">
              <el-button @click.native.prevent="look(scope.row.userId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="auditorName" label="审核人" align="center"></el-table-column>
          <el-table-column prop="pass,reject" label="操作" align="center">
            <template scope="scope">
              <span style="color:#20d179" @click="operation(scope.row.userId, 0)">撤回</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="已通过" name="third">
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="申请时间">
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
            <el-input v-model="userName" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userID" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="authenticationRecord()">查询</el-button>
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
           <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column label="实名信息" align="center">
            <template scope="scope">
               <el-button @click.native.prevent="look(scope.row.userId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="auditorName" label="审核人" align="center"></el-table-column>
          <el-table-column prop="pass,reject" label="操作" align="center">
            <template scope="scope">
              <span style="color:#20d179" @click="operation(scope.row.userId, 0)">撤回</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      activeName: "first",
      startTime: "",
      endTime: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      userName: '',
      userID: '',
      organizationId: '',
      isverify: 0
    }
  },
  created() {
    this.authenticationRecord()
  },
  methods: {
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.authenticationRecord()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.authenticationRecord()
    },
    // 头部tab切换
    handleClick () {
      this.startTime = ""
      this.endTime = ""
      this.currentPage = 1
      this.pageSize = 10
      this.userName = ''
      this.userID = ''
      this.organizationId = ''
      switch (this.activeName) {
        case 'first':
        this.isverify = 0
          break;

        case 'second':
        this.isverify = 2
          break;

        default:
        this.isverify = 1
          break;
      }
      this.authenticationRecord()
    },
     // 项目方提现审核记录
    authenticationRecord () {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        userId: this.userID,
        organizationName: this.userName,
        thirdUid: this.organizationId,
        status: this.isverify
      }
      this.$get(
        "/transactionDataQuery/getAagencyUserDto", data).then(res => {
        var data = res.data
        this.tableData = data.list
        this.total = data.total
      })
    },
    //  A/B端实名审核详情
    look (value) {
      this.$router.push({
        path: '/A_reject',
        query: {
          userId: value
        }
      })
    },
    // 通过/拒绝
    operation (tp, tl) {
      const data = {
        status: tl,
        userId: tp
      }
      this.$post(
        "/transactionDataQuery/updateUserAutherticationStatus", data).then(res => {
        var data = res.data
        this.$message.success(data)
        this.authenticationRecord()
      })
    }
  },
};
</script>

<style lang="less" scoped>


.container {
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
  padding: 0 30px;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  .my-form-users {
    height: 66px;
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
      margin-left: 24px;
    }
  }

  .page {
    height: 72px;
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
