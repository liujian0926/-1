<template>
  <div class="container">
    <el-tabs v-model="activeName" class="my-tab">
      <!-- 已完成区域 -->
      <el-tab-pane label="已完成" name="first">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="下单时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="finishForm.beginTime" style="width:100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="finishForm.endTime" style="width:100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="finishForm.orderNo" placeholder="充值单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="finishForm.userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="finishForm.agentId" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="finishQuery">查询</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary">导出表格数据</el-button>
          </el-form-item> -->
        </el-form>

        <!-- 表格-->
        <el-table

          class="table"
          :data="finish.tableData"
          border
          style="width: 100% ;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center" ></el-table-column>
          <el-table-column prop="orderNo" label="充值单号" align="center" width="180px"></el-table-column>
          <el-table-column prop="relationOrderNo" label="关联单号" align="center"></el-table-column>
          <el-table-column prop="orderAmount" label="充值积分" align="center"></el-table-column>
          <el-table-column prop="paymentAmount" label="付款金额" align="center"></el-table-column>
          <el-table-column prop="rate" label="费率" width="100" align="center"></el-table-column>
          <el-table-column prop="paymentType" label="扣手续费方式" width="100" align="center">
            <template scope="scope">
             <span v-if="scope.row.paymentType==='1'">项目方</span>
             <span v-else-if="scope.row.paymentType==='2'">用户</span>
            </template>
          </el-table-column>
          <el-table-column prop="buyIntegral" label="到账积分" align="center"></el-table-column>
          <el-table-column prop="paymentType" label="付款方式" align="center">
             <template scope="scope">
             <span v-if="scope.row.paymentType==='0'">未支付</span>
             <span v-else-if="scope.row.paymentType==='1'">支付宝</span>
             <span v-else-if="scope.row.paymentType==='2'">微信</span>
             <span v-else-if="scope.row.paymentType==='3'">银行卡</span>
            </template>
          </el-table-column>
          <el-table-column prop="agencyAward" label="代理奖励" align="center"></el-table-column>
          <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
          <el-table-column prop="completeTime" label="完成时间" align="center"></el-table-column>
          <el-table-column prop="详情" label="操作" align="center" width="100">
            <template scope="scope">
                <span style="color:#419EFF;cursor:pointer" @click="finishDetail(scope.row)">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <!--分页 -->
        <div class="page">
          <div class="pagination">
            <el-pagination
              background
              @size-change="finishhandleSizeChange"
              @current-change="finishhandleCurrentChange"
              :current-page="finishForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="finishForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="finishForm.total"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!-- 已取消区域 -->
      <el-tab-pane label="已取消" name="second">

       <el-form :inline="true" class="demo-form-inline my-form-users">
          <el-form-item label="下单时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="cancelForm.beginTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="cancelForm.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item>
            <el-input v-model="cancelForm.orderNo" placeholder="充值单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="cancelForm.userId" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="cancelForm.agentId" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cancelQuery">查询</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格-->
        <el-table

          class="table"
          :data="cancel.tableData"
          border
          style="width: 100% ;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="充值单号" align="center" width="180px"></el-table-column>
          <el-table-column prop="cashIntegral" label="充值积分" align="center"></el-table-column>
          <el-table-column prop="cashAmount" label="付款金额" width="100" align="center"></el-table-column>
          <el-table-column prop="placeOrderTime" label="下单时间" align="center"></el-table-column>
          <el-table-column prop="cancelTime" label="取消时间" align="center"></el-table-column>
          <el-table-column prop="cancelType" width="100" label="取消方式" align="center">
            <template scope="scope">
             <span v-if="scope.row.cancelType==='4'">手动取消</span>
             <span v-else-if="scope.row.cancelType==='8'">超时取消</span>
            </template>
          </el-table-column>
         <el-table-column prop="详情" label="操作" align="center" width="100">
            <template scope="scope">
                <span style="color:#419EFF;cursor:pointer" @click="cancelDetail(scope.row)">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <!--分页 -->
        <div class="page">
          <div class="pagination">
            <el-pagination
              background
              @size-change="cancelhandleSizeChange"
              @current-change="cancelhandleCurrentChange"
              :current-page="cancelForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="cancelForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cancelForm.total"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"first",
      //已完成区域表格
      finish:{
        tableData:[]
      },
      //已完成区域表单及分页信息
      finishForm:{
        beginTime:"",
        endTime:"",
        orderNo:"",
        userId:"",
        agentId:"",
        orderType:1,
        currentPage:1,
        pageSize:10,
        total:1
      },
      //已取消区域表格
      cancel:{
        tableData:[]
      },
      //已取消区域表单及分页信息
      cancelForm:{
        beginTime:"",
        endTime:"",
        orderNo:"",
        userId:"",
        agentId:"",
        orderType:1,
        currentPage:1,
        pageSize:10,
        total:1
      },
    }
  },
  created(){
    this.getAllitem()
    this.cancelAllitem()
  },
  methods:{
     //分页
    finishhandleSizeChange(page){
     this.finishForm.pageSize=page
    this.getAllitem()
    },
    finishhandleCurrentChange(change){
      this.finishForm.currentPage=change
     this.getAllitem()
    },
    cancelhandleSizeChange(page){
       this.cancelForm.pageSize=page
      this.cancelAllitem()
    },
    cancelhandleCurrentChange(change){
       this.cancelForm.currentPage=change
       this.cancelAllitem()
    },
    //已完成数据
    getAllitem(){
     this.$get("/transactionDataQuery/getRechargeOrCashOrderCompleteRecord",this.finishForm).then(res=>{
       console.log(res)
       this.finish.tableData=res.data.recOrCashOrderCompleteRecords
       this.finishForm.total=res.data.total
     })
    },
    //已取消数据
    cancelAllitem(){
     this.$get("/transactionDataQuery/getRechargeOrCashOrderCancelRecord",this.cancelForm).then(res=>{
     this.cancel.tableData=res.data.rechargeOrCashOrderCancelRecord
     this.cancelForm.total=res.data.total
     })
    },
    //已完成区域查询按钮
    finishQuery(){
     this.getAllitem()
    },
    //已取消区域查询按钮
    cancelQuery(){
     this.cancelAllitem()
    },
    //已完成区域详情
    finishDetail(value){
     this.$router.push({path:"/recharge_detail",query:{num:value.orderNo}})
    },
    //已取消语气详情
    cancelDetail(val){
      this.$router.push({path:"/recharge_cancel",query:{num:val.orderNo}})
    }
  }
}
</script>

<style lang="less" scoped>
.el-input{
  width: 100% !important
}
.container {
  height: 696px;
  background-color: #fff;
  color: #333;
  a {
    text-decoration: none;
  }
  .el-button--warning {
    width: 60px;
    height: 28px;
    padding: 0;
    border-radius: 2px;
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
      margin-left: 42px;
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
  .el-table_1_column_3 {
    .cell{
      width: 105% !important
    }
  }
}
</style>

