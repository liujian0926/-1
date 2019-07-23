<template>
  <div class="container">
    <div class="section1">
      <el-button type="warning" @click="goback()">返回</el-button>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tab">
          <el-tab-pane label="基本信息" name="first">
            <div style="borderBottom:1px solid #ccc;">
              <div class="content">
                <span class="title">ID</span>
                <span class="username">{{BaseData.agencyId}}</span>
              </div>
              <div class="content">
                <span class="title">账 号:</span>
                <span class="username">{{BaseData.account}}</span>
              </div>
              <div class="content">
                <span class="title">类型:</span>
                <span class="username">{{BaseData.agencyType | isAgencyT}}</span>
              </div>
              <div class="content" v-if="BaseData.agencyType == 1">
                <span class="title">代理费:</span>
                <span class="username">{{BaseData.deposit}}</span>
              </div>
              <div class="content">
                <span class="title">邮 箱:</span>
                <input type="text" v-model="email" :placeholder="BaseData.email">
              </div>
              <div class="content">
                <span class="title">代理名称:</span>
                <input type="text" v-model="agencyName" :placeholder="BaseData.agencyName">
              </div>
              <div class="content_brief">
                <span class="title">代理简介:</span>
                <textarea v-model="ref" cols="30" rows="10" class="brief" :placeholder="BaseData.agencyInfo"></textarea>
              </div>
              <div class="content">
                <span class="title">官方链接:</span>
                <input type="text" v-model="website" :placeholder="BaseData.website">
              </div>
              <div class="content">
                <span class="title">联系人:</span>
                <input type="text" v-model="contacts" :placeholder="BaseData.contacts">
              </div>
              <div class="content">
                <span class="title">联系电话:</span>
                <input type="text" v-model="phone" :placeholder="BaseData.tel">
              </div>
              <div class="content">
                <span class="title">微信账号:</span>
                <input type="text" v-model="wxNum" :placeholder="BaseData.wechat">
              </div>
              <div class="content saveBtn">
                <el-button type="primary" @click="save()" class="save">保存修改</el-button>
              </div>
            </div>
            <div class="section2">
              <div class="content1">
                <span>每笔交易可获得收益百分比</span>
              </div>
              <div class="content2">
                <span>代理收益百分比</span>
                <input type="text" v-model="percentage" :placeholder="BaseData.profitsRate">
                <span>%</span>
              </div>
              <div class="content2 saveBtn">
                <el-button type="primary" class="save" @click="savePro()">保存修改</el-button>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="数据分析" name="second">
            <template v-if="BaseData.agencyType == 1">
              <div class="box">
                <span>项目方数量</span>
                <div>{{BaseAnalysisData.projectOrBCountByAgency}}</div>
              </div>
              <div class="box">
                <span>累计用户</span>
                <div>{{BaseAnalysisData.projectUserCount}}</div>
              </div>
              <div class="box">
                <span>累计收益</span>
                <div>{{BaseAnalysisData.accumulatedIncome}}</div>
              </div>
              <div class="box">
                <span>平均每月收益</span>
                <div>{{BaseAnalysisData.aveIncome}}</div>
              </div>
            </template>
            <template v-else>
              <div class="box">
                <span>累计用户</span>
                <div>{{BaseAnalysisData.bCountByAgency}}</div>
              </div>
              <div class="box">
                <span>累计收益</span>
                <div>{{BaseAnalysisData.bAccumulatedIncome}}</div>
              </div>
              <div class="box">
                <span>平均每月收益</span>
                <div>{{BaseAnalysisData.aveIncome}}</div>
              </div>
              <div class="box">
                <span>保证金人数</span>
                <div>{{BaseAnalysisData.bDepositByAgencyId}}</div>
              </div>
            </template>
            <!-- 表格-->
            <el-form v-if="BaseData.agencyType == 2" :inline="true" class="demo-form-inline my-form-users">
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
                <el-input v-model="userName" placeholder="用户名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="userID" placeholder="用户ID"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="recommenderID" placeholder="推荐人ID"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="value" placeholder="会员等级">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getTableBData()">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
            v-if="BaseData.agencyType == 1"
            :data="BaseTableData"
            border
            style="width: 100% ;"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column prop="projectName" label="项目方名称" align="center"></el-table-column>
              <el-table-column prop="projectId" label="项目方ID" align="center"></el-table-column>
              <el-table-column prop="contacts" label="项目方联系人" align="center"></el-table-column>
              <el-table-column prop="tel" label="联系人电话" align="center"></el-table-column>
              <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
              <el-table-column prop="userCount" label="用户数量" align="center"></el-table-column>
              <el-table-column prop="accuRecharge" label="累计充值" align="center"></el-table-column>
              <el-table-column prop="accuCash" label="累计提现" align="center"></el-table-column>
              <el-table-column prop="aveRecharge" label="平均每日充值" align="center"></el-table-column>
              <el-table-column prop="aveCash" label="平均每日提现" align="center"></el-table-column>
            </el-table>
            <el-table
            v-else
            :data="BaseTableData"
            border
            style="width: 100% ;"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
              <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
              <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
              <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
              <el-table-column prop="addTime" label="加入时间" align="center"></el-table-column>
              <el-table-column prop="cumBuy" label="累计买入" align="center"></el-table-column>
              <el-table-column prop="accuCash" label="累计提现" align="center"></el-table-column>
              <el-table-column prop="cumProfit" label="累计收益" align="center"></el-table-column>
              <el-table-column prop="subCount" label="下级人数" align="center"></el-table-column>
              <el-table-column prop="recommenderId" label="推荐人ID" align="center"></el-table-column>
              <el-table-column prop="grant" label="会员等级" align="center">
                <template scope="scope">
                  <span>{{scope.row.grant | grant}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="deposit" label="保证金" align="center"></el-table-column>
              <el-table-column prop="teamProfit" label="团队收益" align="center"></el-table-column>
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
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      agencyId: '',
      BaseData: {},
      email: '',
      agencyName: '',
      ref: '',
      website: '',
      contacts: '',
      phone: '',
      wxNum: '',
      percentage: '',
      BaseAnalysisData: {},
      BaseTableData: [],
      startTime: "",
      endTime: "",
      userName: '',
      userID: '',
      recommenderID: '',
      options: [{
        value: '0',
        label: '普通会员'
      }, {
        value: '1',
        label: 'C'
      },{
        value: '2',
        label: 'B'
      }, {
        value: '3',
        label: 'A'
      }],
      value: ''
    };
  },
  created() {
    this.agencyId = this.$route.query.agencyId
    this.getBaseInformation()
  },
  methods: {
     // 返回
    goback () {
      this.$router.go(-1)
    },
     // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.BaseData.agencyType === 1 ) {
        this.getTableAData()
      } else {
        this.getTableBData()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.BaseData.agencyType === 1 ) {
        this.getTableAData()
      } else {
        this.getTableBData()
      }
    },
    // 切换
    handleClick () {
      if (this.activeName === 'second') {
        if (this.BaseData.agencyType === 1 ) {
          this.getAData()
          this.getTableAData()
        } else {
          this.getBData()
          this.getTableBData()
        }
      }
    },
    // 查询代理方基本信息
    getBaseInformation () {
      const data = {
        agencyId: this.agencyId
      }
      this.$get(
        "/agencyManage/getAgencyBaseinfo", data).then(res => {
        var data = res.data
        this.BaseData = data.agencyBaseinfo
        console.log(data)
      })
    },
    // 代理申请详情修改
    save () {
       const data = {
        agencyType: this.BaseData.agencyType,
        agencyId: this.agencyId,
        account: this.BaseData.account,
        deposit: this.deposit,
        email: this.email,
        agencyName: this.agencyName,
        agencyInfo: this.ref,
        website: this.website,
        contacts: this.contacts,
        tel: this.phone,
        wechat: this.wxNum
      }
      this.$post(
        "/agencyManage/updateAgencyBaseinfo", data).then(res => {
        var data = res.data
        this.getBaseInformation()
        this.$message.success('修改'+ res.message)
      })
    },
    // 修改收益百分比
    savePro () {
      const data = {
        agencyId: this.agencyId,
        account: this.BaseData.account,
        profitsRate: this.percentage,
      }
      this.$post(
        "/agencyManage/updateAgencyProfitsRate", data).then(res => {
        var data = res.data
        this.getBaseInformation()
        this.$message.success('修改'+ res.message)
      })
    },
     // 查询A端代理方基本数据
    getAData () {
      const data = {
        userId: this.BaseData.account
      }
      this.$get(
        "/agencyManage/getAAgencyData", data).then(res => {
        var data = res.data
        this.BaseAnalysisData = data
      })
    },
    // 查询B端代理方基本数据
    getBData () {
      const data = {
        userId: this.BaseData.account
      }
      this.$get(
        "/agencyManage/getBAgencyData", data).then(res => {
        var data = res.data
        this.BaseAnalysisData = data
      })
    },
    // 查询A端代理的信息
    getTableAData () {
      const data = {
        userId: this.BaseData.account,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      this.$get(
        "/agencyManage/getProjectRecordByAgencyId", data).then(res => {
        var data = res.data
        this.BaseTableData = data.projectRecordByAgencyId
        this.total = data.total
      })
    },
    // 查询B端代理的信息
    getTableBData () {
      const data = {
        agencyId: this.BaseData.account,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        beginTime: this.startTime,
        endTime: this.endTime,
        name: this.userName,
        userId: this.userID,
        recUserId: this.recommenderID,
        level: this.value,
      }
      this.$get(
        "/agencyManage/getBRecordByAgencyId", data).then(res => {
        var data = res.data
        this.BaseTableData = data.agencyManageVos
        this.total = data.total
      })
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 1616px;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f6fa;
  .section1 {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .saveBtn{
      padding: 15px 0 50px;
    }
    .el-button--warning {
      width: 60px;
      height: 28px;
      font-size: 12px;
      padding: 0;
      margin-top: 20px;
      margin-bottom: 10px;
      border-radius: 2px;
      background-color: #fdb44d;
    }
    .el-button--primary {
      width: 80px;
      height: 32px;
      font-size: 12px;
      padding: 0;
      border-radius: 2px;
    }
    .content {
      height: 21px;
      margin-top: 10px;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
        margin-right: 19px;
      }
      input {
        width: 280px;
      }
    }

    .content_brief {
      height: 56px;
      margin-top: 8px;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        text-align: right;
        margin-right: 19px;
        transform: translateY(-50px);
      }
      .brief {
        outline: none;
        height: 56px;
        width: 280px;
      }
    }
    .section2 {
      .content1,
      .content3 {
        height: 22px;
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 30px;
        span {
          margin-right: 32px;
          font-size: 14px;
          color: #979dac;
        }
      }
      .content2,
      .content4 {
        span {
          color: #979dac;
          font-size: 14px;
          height: 28px;
          line-height: 28px;
          margin-right: 14px;
        }
        input {
          width: 73px;
          margin-right: 8px;
        }
      }
      .content2,
      .content4 {
        margin-top: 14px;
      }
      .content3 {
        margin-top: 18px;
      }
    }

    .box {
      width: 276px;
      height: 120px;
      float: left;
      background-color: #419eff;
      padding: 30px 0 0 40px;
      box-sizing: border-box;
      margin-right: 22px;
      margin-bottom: 20px;
      span {
        display: block;
        height: 20px;
        width: 100px;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
        margin-left: 5px;
        position: relative;
      }
      span::before {
        position: absolute;
        top: 3px;
        left: -9px;
        content: "";
        display: block;
        width: 4px;
        height: 15px;
        background-color: #ffffff;
      }
      div {
        height: 37px;
        font-size: 32px;
        line-height: 37px;
        color: #ffffff;
        margin-top: 20px;
        font-weight: bold;
      }
    }
    .page {
      height: 81px;
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
  /deep/ .my-form-users .el-form-item{
    padding: 20px 0 12px;
    &:last-of-type{
      margin-left: 20px
    }
  }
}
</style>
