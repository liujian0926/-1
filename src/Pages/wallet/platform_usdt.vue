<template>
  <div class="container">
    <el-form ref="form" label-width="80px" style="color: #666;">
      <el-form-item label="提现金额">
        <el-input v-model="cash" style="width:230px;" placeholder="请输入提现的金额"  maxlength="8" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="接受地址">
        <el-input v-model="address" style="width:230px;" placeholder="请输入接收地址"></el-input>
      </el-form-item>
      <el-form-item label="旷工费">
        <el-input v-model="Miner" style="width:230px;" disabled ></el-input>
        <div id="rmb">约等于人民币：{{getMoney}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click=" dialogVisible=true">确定</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 密码验证弹框 -->
    <el-dialog title="密码验证" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="password" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirmPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cash: "",
      address: "",
      Miner: "",
      password:'',
      dialogVisible: false,
      rate:'',
    };
  },
  created() {
    // 获取矿工费
    this.$get('/platformWalletManagement/getAbsenceFeeAndRate').then(res=>{
      this.Miner = res.data.usdtMinerFee
      this.rate = res.data.rate
    })
  },
  computed:{
    getMoney(){
      var money = (Number(this.cash) - Number(this.Miner))*Number(this.rate)
      if(money <= 0){
        money = 0
      }
      return money
    }
  },
  methods: {
    // 验证密码
    affirmPassword() {
      this.$post('/platformWalletManagement/platformCheck',{pwd:this.password}).then(res=>{
        this.dialogVisible = false
        this.password = ''
        this.getCash()
      }).catch(e=>{
        this.$message.error(e.data.message)
      })
    },
    // 平台usdt提现
    getCash(){
      const data = {
        usdtNum:this.cash,
        address:this.address,
        absenceFee:this.Miner
      };
      this.$post('/platformWalletManagement/platformUSDTCashOut',data).then(res=>{
        this.$message.success(res.data.message)
      }).catch(e=>{
        this.$message.error(e.data.message)
      })
    },

    // 重置
    reset(){
     this.cash = ""
     this.address = ""  
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog{
  width: 400px !important;
  margin-top: 35vh !important;
  height: 212px;
}
/deep/ .el-input__inner{
  width: 320px;
}
.container {
  height: 100%;
  padding: 53px 0 0 36px;
  box-sizing: border-box;
  background-color: #fff;
  .el-button--primary {
    width: 80px !important;
    height: 32px;
    padding: 0;
  }
  .el-button--default {
    width: 80px !important;
    height: 32px;
    padding: 0;
  }
  .el-form-item {
    &:nth-child(4) {
      margin-top: 89px;
    }
  }
}
</style>
