<template>
  <div class="container">
    <div class="top">
      <!-- 表单 -->
      <el-form :inline="true" class="demo-form-inline my-form-users">
        <el-form-item>
          <el-input v-model="anomalyitemForm.orderNo" placeholder="输入查询单号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="IDquery">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 完成表格-->
      <el-table
        class="table"
        border
        :data="queryList"
        style="width: 100% ;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        v-show="ishow"
      >
        <el-table-column prop="orderNo" label="订单编号" align="center" width="180px"></el-table-column>
        <el-table-column prop="projectId" label="项目方ID" align="center"></el-table-column>
        <el-table-column prop="bid" label="交易员ID" align="center"></el-table-column>
        <el-table-column prop="buySellAmount" label="买入/卖出数量" align="center"></el-table-column>
        <el-table-column prop="aactAmount" label="A端到账金额" align="center"></el-table-column>
        <el-table-column prop="recCashAmount" label=" 充值/提现金额 " align="center"></el-table-column>
        <el-table-column prop="bactAmount" label="B端到账金额 " align="center" width="180px"></el-table-column>
        <el-table-column prop="rate" label="手续费" align="center"></el-table-column>
        <el-table-column prop="matchingTime" label="订单匹配时间" align="center"></el-table-column>
        <el-table-column prop="duration" label="持续时长(M)" align="center"></el-table-column>
        <el-table-column prop="astatus" label="A端状态" align="center">
          <template scope="scope">
            <span v-if="scope.row.astatus==='1'">已提交</span>
            <span v-else-if="scope.row.astatus==='2'">待付款</span>
            <span v-else-if="scope.row.astatus==='3'">未到账</span>
            <span v-else-if="scope.row.astatus==='4'">手动取消</span>
            <span v-else-if="scope.row.astatus==='5'">已完成</span>
            <span v-else-if="scope.row.astatus==='6'">已匹配</span>
            <span v-else-if="scope.row.astatus==='7'">待确认</span>
            <span v-else-if="scope.row.astatus==='8'">自动取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="bstatus" label="B端状态" align="center">
          <template scope="scope">
            <span v-if="scope.row.bstatus==='1'">已接单</span>
            <span v-else-if="scope.row.bstatus==='2'">待付款</span>
            <span v-else-if="scope.row.bstatus==='3'">未到账</span>
            <span v-else-if="scope.row.bstatus==='4'">待确认</span>
            <span v-else-if="scope.row.bstatus==='5'">已完成</span>
            <span v-else-if="scope.row.bstatus==='6'">手动取消</span>
            <span v-else-if="scope.row.bstatus==='7'">自动取消</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作" align="center">
          <template scope="scope">
            <span style="color:red;marginRight:10px;cursor:pointer" @click="backout(scope.row)">撤销</span>
            <span style="cursor:pointer" @click="chongxin(scope.row)">重新确认</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 历史记录区域 -->
    <div class="title">历史记录</div>

    <el-table
      class="table"
      border
      :data="historyList"
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="orderNo" label="订单编号" align="center" width="180px"></el-table-column>
      <el-table-column prop="projectId" label="项目方ID" align="center"></el-table-column>
      <el-table-column prop="bid" label="交易员ID" align="center"></el-table-column>
      <el-table-column prop="buySellAmount" label="买入/卖出数量" align="center"></el-table-column>
      <el-table-column prop="aactAmount" label="A端到账金额" align="center"></el-table-column>
      <el-table-column prop="recCashAmount" label=" 充值/提现金额 " align="center"></el-table-column>
      <el-table-column prop="bactAmount" label="B端到账金额 " align="center" width="180px"></el-table-column>
      <el-table-column prop="rate" label="手续费" align="center"></el-table-column>
      <el-table-column prop="astatus" label="A端状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.astatus==='1'">已提交</span>
          <span v-else-if="scope.row.astatus==='2'">待付款</span>
          <span v-else-if="scope.row.astatus==='3'">未到账</span>
          <span v-else-if="scope.row.astatus==='4'">手动取消</span>
          <span v-else-if="scope.row.astatus==='5'">已完成</span>
          <span v-else-if="scope.row.astatus==='6'">已匹配</span>
          <span v-else-if="scope.row.astatus==='7'">待确认</span>
          <span v-else-if="scope.row.astatus==='8'">自动取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="bstatus" label="B端状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.bstatus==='1'">已接单</span>
          <span v-else-if="scope.row.bstatus==='2'">待付款</span>
          <span v-else-if="scope.row.bstatus==='3'">未到账</span>
          <span v-else-if="scope.row.bstatus==='4'">待确认</span>
          <span v-else-if="scope.row.bstatus==='5'">已完成</span>
          <span v-else-if="scope.row.bstatus==='6'">手动取消</span>
          <span v-else-if="scope.row.bstatus==='7'">自动取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作" align="center">
        <template scope="scope">
          <span v-if="scope.row.status==='0'">撤销</span>
          <span v-else-if="scope.row.status==='1'">重新确认</span>
        </template>
      </el-table-column>

      <el-table-column prop="详情" label="操作详情" align="center">
        <template scope="scope">
          <span style="color:#419EFF;cursor:pointer" @click="historyDetail(scope.row)">查看详情</span>
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
          :current-page="anomalyitemForm.currentPage"
          :page-sizes="[10,20,30]"
          :page-size="anomalyitemForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 撤销弹框 -->
    <el-dialog :visible.sync="centerDialogVisibleAAA" width="320px">
      <div class="icon">
        <span>*</span>
        <el-input v-model="cause" placeholder="请输入操作原因"></el-input>
      </div>
      <div class="upload-name" style="color:skyblue;fontSize:12px">点击上传图片</div>
      <div class="img">
        <input href="#" type="file" id="fileIMG" @change="fileIMG($event)"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baocun()">保 存</el-button>
        <el-button type="danger" @click="centerDialogVisibleAAA=false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 重新确认弹框 -->
        <el-dialog :visible.sync="centerDialogVisibleBBB" width="320px">
      <div class="icon">
        <span>*</span>
        <el-input v-model="cause" placeholder="请输入操作原因"></el-input>
      </div>
      <div class="upload-name" style="color:skyblue;fontSize:12px">点击上传图片</div>
      <div class="img">
        <input href="#" type="file" id="fileIMG" @change="fileIMGYES($event)"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baocunYES">确认</el-button>
        <el-button type="danger" @click="centerDialogVisibleBBB=false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 查看详情弹框 -->
    <el-dialog :visible.sync="centerDialogVisible" width="320px;" class="detail-dialog">
      <div class="reason" style="color:#666666;">操作原因:{{reason}}</div>
      <div>
        <span href="#" style="color:#666666;">图片凭证:</span>
        <img :src="url" alt class="detail-img" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible=false">确 定</el-button>
        <el-button type="danger" @click="centerDialogVisible=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  data() {
    return {
      cause: "",
      ishow: false,
      queryList: [],
      historyList: [],
      total: 1,
      //异常订单历史记录数据
      anomalyitemForm: {
        pageSize:10,
        currentPage:1,
        // orderNo: ""
      },
      //详情弹框
      centerDialogVisible: false,
      reason:"",
      url:"",
      //撤销重新的确认弹框
      centerDialogVisibleAAA:false,
      centerDialogVisibleBBB:false,
      formData:{},
      type:""
     
    };
  },
  created() {
    this.anomalyitem();
  },
  methods: {
     //分页
    handleSizeChange(page) {
      console.log(page)
      this.anomalyitemForm.pageSize=page;
      this.anomalyitem();
    },
    handleCurrentChange(change) {
       console.log(change)
      this.anomalyitemForm.currentPage=change;
      this.anomalyitem();
    },
    //查询所有历史记录
    anomalyitem() {
      this.$get(
        "/exceOrder/getExceOrderCompleteRecords",
        this.anomalyitemForm
      ).then(res => {
        this.historyList = res.data.exceOrderCompleteRecords;
        this.total = res.data.total;
      });
    },
    //点击单号查询
    IDquery() {
      this.$get(
        "/exceOrder/getSellRechargeRecordDetail",
        this.anomalyitemForm
      ).then(res => {
        // console.log(res)
        this.queryList = res.data.exceOrderRecords;
        this.ishow = true;
        // console.log(res)
       
      }).catch(err=>{
        console.log(err)
       this.$message.error(err.data.message)
      })
    },
    //点击查看历史区域的详情
    historyDetail(value) {
      this.reason=value.reason
      this.url=value.voucherPic
      this.centerDialogVisible = true;
    },
    //点击撤销按钮
    backout(value){
     if(value.astatus!="5" && value.bstatus!="5"){
      this.centerDialogVisibleAAA = true;
      this.type="1"
      this.formData.type = this.type
     }else{
       this.$message('已完成的订单请联系管理员操作');
     }

    },
    //点击撤销上传文件
    fileIMG(value){
     var fileURL=value.target.files[0].name;//本地图片名
     var pic=value.target.files[0]
     value.target.parentNode.previousElementSibling.innerHTML=fileURL;
     this.formData = new FormData()
     this.formData.append("file",pic)
     this.formData.append("orderNo", this.anomalyitemForm.orderNo)
     this.formData.append("reason", this.cause)
     this.formData.append("type", this.type)
   },

    //点击重新确认上传文件
    fileIMGYES(value){
     var fileURL=value.target.files[0].name;//本地图片名
     var pic=value.target.files[0]
     value.target.parentNode.previousElementSibling.innerHTML=fileURL;
     this.formData = new FormData()
     this.formData.append("file",pic)
     this.formData.append("orderNo", this.anomalyitemForm.orderNo)
     this.formData.append("reason", this.cause)
     this.formData.append("type", this.type)
   },
   //撤销保存
   baocun(){
     this.centerDialogVisibleAAA=false
     console.log(this.type, '528')
     this.formData.set('type', this.type)
     this.$post("/exceOrder/confirmationOrRevocation",this.formData).then(res=>{
      //  console.log(res)
       if(res.code==200){
        this.centerDialogVisibleAAA=false
         this.$message('保存成功')
        
       }
     }).catch(err=>{
       this.$message.error(err.data.message)
        
     })
   },
  //点击重新确认按钮
  chongxin(value){
   if(value.astatus!="5" && value.bstatus!="5"){
      this.centerDialogVisibleBBB = true;
      this.type="2"
     }else{
       this.$message('已完成的订单请联系管理员操作');
     }
  },
   //重新确认保存
   baocunYES(){
     console.log(this.type, 'ui');
     this.formData.set('type', this.type)
     this.centerDialogVisibleBBB=false
     this.$post("/exceOrder/confirmationOrRevocation",this.formData).then(res=>{
       if(res.code==200){
        this.centerDialogVisibleBBB=false
         this.$message('确认成功')
       }
     }).catch(err=>{
         this.$message.error(err.data.message)
     })
   },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    border-bottom: 2px solid #cbcfdc;
    padding-bottom: 46px;
    box-sizing: border-box;
    .my-form-users {
      height: 70px;
      padding: 20px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .el-input {
        width: 240px !important;
      }
      .el-button--primary {
        width: 100px;
        height: 28px;
        padding: 0;
        margin-left: 50px;
      }
    }
  }
  a {
    text-decoration: none;
  }
  .title {
    font-size: 14px;
    color: #253444;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .upload {
    display: inline-block;
    margin-top: 10px;
    color: #419eff;
  }
  .el-button--primary,
  .el-button--danger {
    width: 100px;
    height: 28px;
    padding: 0;
    margin-right: 20px;
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
  .upload-name {
    padding-top: 10px;
    margin: 0;
    height: 18px;
  }
  .img {
    opacity: 0;
    width: 70px;
    display: flex;
    justify-content: space-between;
    margin-top: -18px;
    margin-bottom: 10px;
    align-items: center;

    a {
      color: #419eff;
    }
  }
  .detail-img {
    margin-top: 10px;
    width: 100%;
  }
  .icon {
    position: relative;
    span {
      position: relative;
      left: 10px;
      top: 33px;
      z-index: 999;
    }
    /deep/ .el-input {
      .el-input__inner {
        padding: 0 20px !important;
      }
    }
  }
  .detail-dialog {
    width: 320px;
    height: 454px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.11);
    border-radius: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -160px;
    margin-top: -227px;
    overflow: hidden;
    /deep/.el-dialog{
      width: 100% !important;
      height: 100% !important;
      box-shadow: none;
      margin-top: 0vh !important;
      .reason{
        margin-bottom: 15px !important;
      }
    }
  }
}
.upload-name2{
  text-align: right;
 
}
 .img2 {
    opacity: 0;
    width: 30px;
    display: flex;
    justify-content: space-between;
     margin-top: -15px;
    margin-bottom: 10px;
    align-items: center;
        position: absolute;
    right: 18px;
  }
</style>

