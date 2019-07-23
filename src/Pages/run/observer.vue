<template>
  <div class="container">
    <div class="box">
      <span>今日B端注册数量</span>
      <div>{{dataObj.bTerminalRegisterQuantity}}</div>
    </div>
    <div class="box">
      <span>所有B端用户量</span>
      <div>{{dataObj.bTerminalAllUserQuantity}}</div>
    </div>
    <div class="box">
      <span>所有A端用户量</span>
      <div>{{dataObj.aTerminalAllUserQuantity}}</div>
    </div>
    <div class="box">
      <span>B端保证金缴纳比列</span>
      <div>{{dataObj.rate}}</div>
    </div>
    <div class="box">
      <span>今日B端充值奖励</span>
      <div>{{dataObj.rechargeReward}}</div>
    </div>
    <div class="box">
      <span>B端在线用户量</span>
      <div>{{dataObj.bTerminalOnlineQuantity}}</div>
    </div>
    <div class="box">
      <span>今日B端团队奖励</span>
      <div>{{dataObj.teamReward}}</div>
    </div>
    <div class="box">
      <span>今日卖出单数/金额</span>
      <div>{{dataObj.todaySell}}</div>
    </div>
    <div class="box">
      <span>今日买入单数/金额</span>
      <div>{{dataObj.todayBuy}}</div>
    </div>
    <div class="box">
      <span>今日B端充值产品</span>
      <div>{{dataObj.totalRecharge}}</div>
    </div>
    <div class="box">
      <span>今日B端买单奖励</span>
      <div>{{dataObj.paymentReward}}</div>
    </div>
    <div class="box">
      <span>本周平台积分收益</span>
      <div>{{dataObj.platformIntegralBenefitsThisWeek}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataObj:{}
    };
  },
  created() {
    this.$get('/operationalAnalysisData/getDataObservatory').then(res=>{
        this.dataObj = res.data
    })
  },
  methods: {
   
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .box {
    width: 276px;
    height: 148px;
    float: left;
    background-color: #fff;
    padding: 30px 0 0 40px;
    box-sizing: border-box;
    margin-right: 22px;
    margin-bottom: 20px;
    span {
      display: block;
      height: 20px;
      width: 200px;
      font-size: 14px;
      line-height: 20px;
      color: #979dac;
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
      background-color: #419eff;
    }
    div {
      height: 37px;
      font-size: 32px;
      line-height: 37px;
      color: #1e2c3c;
      margin-top: 20px;
      font-weight: bold;
    }
  }
}
</style>