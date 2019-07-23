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
            <el-input v-model="organizationName" placeholder="项目方名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="withdrawalRecord()">查询</el-button>
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
          <el-table-column prop="withdrawId" label="单号" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="项目方联系人" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系人电话" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="num" label="提现金额" align="center"></el-table-column>
          <el-table-column prop="absenceFee" label="矿工费" align="center"></el-table-column>
          <el-table-column prop="address" label="钱包地址" align="center"></el-table-column>
          <el-table-column prop="opration" label="操作" align="center">
            <template scope="scope">
              <span style="color:#20d179" @click="operation(scope.row.withdrawId, 1)">通过</span>
              <span style="color:red; marginLeft:20px ;" @click="operation(scope.row.withdrawId, 2)">拒绝</span>
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
            <el-input v-model="organizationName" placeholder="项目方名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="withdrawalRecord()">查询</el-button>
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
          <el-table-column prop="withdrawId" label="单号" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="项目方联系人" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系人电话" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop=" num" label="提现金额" align="center"></el-table-column>
          <el-table-column prop="absenceFee" label="矿工费" align="center"></el-table-column>
          <el-table-column prop="address" label="钱包地址" align="center"></el-table-column>
          <el-table-column prop="reject" label="操作" align="center">
            <template>
              <span style="color: #D45656">已拒绝</span>
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
            <el-input v-model="organizationName" placeholder="项目方名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organizationId" placeholder="项目方ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="withdrawalRecord()">查询</el-button>
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
          <el-table-column prop="withdrawId" label="单号" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="项目方名称" align="center"></el-table-column>
          <el-table-column prop="organizationId" label="项目方ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="项目方联系人" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系人电话" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="所属代理" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop=" num" label="提现金额" align="center"></el-table-column>
          <el-table-column prop="absenceFee" label="矿工费" align="center"></el-table-column>
          <el-table-column prop="address" label="钱包地址" align="center"></el-table-column>
          <el-table-column prop="pass" label="操作" align="center">
            <template>
              <span style="color:#2FD582">已通过</span>
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
      organizationName: '',
      organizationId: '',
      isverify: 0
    }
  },
  created() {
    this.withdrawalRecord()
  },
  methods: {
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.withdrawalRecord()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.withdrawalRecord()
    },
    // 头部tab切换
    handleClick () {
      this.startTime = ""
      this.endTime = ""
      this.currentPage = 1
      this.pageSize = 10
      this.organizationName = ''
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
      this.withdrawalRecord()
    },
     // 项目方提现审核记录
    withdrawalRecord () {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        organizationName: this.organizationName,
        organizationId: this.organizationId,
        isverify: this.isverify
      }
      this.$get(
        "/transactionDataQuery/getOrganizationWithdraw", data).then(res => {
        var data = res.data
        this.tableData = data.list
        this.total = data.total
      })
    },
    //  通过/拒绝
    operation (id, status) {
      const data = {
        withdrawId: id,
        isverify: status
      }
      this.$post(
        "/transactionDataQuery/updateWithdrawStatus", data).then(res => {
        var data = res.data
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
