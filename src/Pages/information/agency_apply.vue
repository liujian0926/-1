<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tab">
      <el-tab-pane label="未缴纳保证金" name="first">
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
            <el-input v-model="agencyName" placeholder="代理名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="agencyID" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item>
             <el-select v-model="value" placeholder="代理类型">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="agencyRecord()">查询</el-button>
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
          <el-table-column label="代理类型" align="center">
             <template scope="scope">
              <span>{{scope.row.merchantType | isAgencyT}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="agencyName" label="代理名称" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="deposit" label="已缴纳代理费" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column label="代理信息" align="center">
            <template scope="scope">
              <el-button @click.native.prevent="look(scope.row.agencyId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pass,reject" label="操作" align="center">
            <template scope="scope">
              <span style="color:#53A1FA" @click="operation(2, scope.row.agencyId)">手动通过</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="缴纳保证金自动通过" name="second">
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
            <el-input v-model="agencyName" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="agencyID" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="代理类型">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="agencyRecord()">查询</el-button>
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
          <el-table-column prop="merchantType" label="代理类型" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="代理名称" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="deposit" label="已缴纳代理费" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column label="代理信息" align="center">
            <template scope="scope">
              <el-button @click.native.prevent="look(scope.row.agencyId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pass,reject" label="状态" align="center">
            <template>
              <span>已自动开通</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="未交纳保证金手动通过" name="third">
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
            <el-input v-model="agencyName" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="agencyID" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="代理类型">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="agencyRecord()">查询</el-button>
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
          <el-table-column prop="merchantType" label="代理类型" align="center"></el-table-column>
          <el-table-column prop="agencyName" label="代理名称" align="center"></el-table-column>
          <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
          <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
          <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="deposit" label="已缴纳代理费" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column label="代理信息" align="center">
            <template scope="scope">
              <el-button @click.native.prevent="look(scope.row.agencyId)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pass,reject" label="操作" align="center">
            <template scope="scope">
              <span style="color:#4D9EF9" @click="operation(scope.row.agencyId, 0)">撤回</span>
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
      agencyName: '',
      agencyID: '',
      merchantType: '',
      isverify: 0,
      options: [{
        value: '1',
        label: 'A端代理'
      }, {
        value: '2',
        label: 'B端代理'
      }],
      value: ''
    }
  },
  created() {
    this.agencyRecord()
  },
  methods: {
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.agencyRecord()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.agencyRecord()
    },
    // 头部tab切换
    handleClick () {
      this.startTime = ""
      this.endTime = ""
      this.currentPage = 1
      this.pageSize = 10
      this.agencyName = ''
      this.agencyID = ''
      this.merchantType = ''
      this.value = ''
      switch (this.activeName) {
        case 'first':
        this.isverify = 0
          break;

        case 'second':
        this.isverify = 1
          break;

        default:
        this.isverify = 2
          break;
      }
      this.agencyRecord()
    },
     // 代理申请审核记录
    agencyRecord () {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        agencyName: this.agencyName,
        agencyId: this.agencyID,
        merchantType: this.value,
        pass: this.isverify
      }
      this.$get(
        "/transactionDataQuery/selectAgencyAuthInfo", data).then(res => {
        var data = res.data
        this.tableData = data.list
        this.total = data.total
      })
    },
    //  A/B端实名审核详情
    look (value) {
      this.$router.push({
        path: '/agency_apply_detail',
        query: {
          userId: value
        }
      })
    },
    // 代理申请审核
    operation (tp, tl) {
      const data = {
        pass: tp,
        userId: tl
      }
      this.$post(
        "/transactionDataQuery/updateAgencyInfoStatus", data).then(res => {
        var data = res.data
        this.$message.success(data)
        this.agencyRecord()
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
.my-tab /deep/ .el-tabs__item{
  width: 180px !important
}
</style>
