<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
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
        <el-input v-model="agencyName" placeholder="代理方名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="agencyID" placeholder="代理方ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value" placeholder="代理方类型">
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
      <el-table-column prop="agencyName" label="代理名称" align="center"></el-table-column>
      <el-table-column prop="agencyId" label="代理ID" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
      <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
      <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
      <el-table-column label="代理类型" align="center">
        <template scope="scope">
          <span>{{scope.row.agencyType |is_agencyType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditName" label="审核人" align="center"></el-table-column>
      <el-table-column prop="profitBalance" label="收益余额" align="center"></el-table-column>
      <el-table-column prop="profitAmount" label="累计收益" align="center"></el-table-column>
      <el-table-column prop="deposit" label="代理费用" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button @click.native.prevent="look(scope.row.agencyId)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      startTime: "",
      endTime: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      agencyName: '',
      agencyID: '',
      merchantType: '',
      options: [{
        value: '1',
        label: 'A端代理'
      },{
        value: '2',
        label: 'A端总代'
      },  {
        value: '3',
        label: 'B端代理'
      }, {
        value: '4',
        label: 'B端总代'
      }, ],
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
     // 查询代理方列表
    agencyRecord () {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        agencyName: this.agencyName,
        agencyId: this.agencyID,
        agencyType: this.value
      }
      this.$get(
        "/agencyManage/getAgencyRecords", data).then(res => {
        var data = res.data
        this.tableData = data.agencyManageVos
        this.total = data.total
      })
    },
    //  A/B端实名审核详情
    look (value) {
      this.$router.push({
        path: '/agent_detail',
        query: {
          agencyId: value
        }
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
