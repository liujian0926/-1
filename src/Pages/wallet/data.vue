<template>
  <div class="container">
    <div class="box">
      <span>平台持有USDT总和</span>
      <div>{{dataObj.platformHoldUSDT}}</div>
    </div>
    <div class="box">
      <span>代理方持有USDT总和</span>
      <div>{{dataObj.agentHoldUSDT}}</div>
    </div>
    <div class="box">
      <span>代理方持有积分</span>
      <div>{{dataObj.agentHoldIntegral}}</div>
    </div>
    <div class="box">
      <span>B端持有USDT</span>
      <div>{{dataObj.bTerminalHoldUSDT}}</div>
    </div>
    <div class="box">
      <span>项目方持有USDT</span>
      <div>{{dataObj.projectSideHoldUSDT}}</div>
    </div>
    <div class="box">
      <span>所有B端持有积分</span>
      <div>{{dataObj.allBTerminalHoldIntegral}}</div>
    </div>
    <div class="box">
      <span>平台积分收益</span>
      <div>{{dataObj.platformIntegralBenefit}}</div>
    </div>
    <div class="box">
      <span>所有项目方持有积分</span>
      <div>{{dataObj.allProjectHoldIntegral}}</div>
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
      this.$get('/platformWalletManagement/getPlatformWalletData')
        .then(res=>{
            this.dataObj = res.data
        })
        .catch(err=>{
            console.log(err);
        })
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 20px 0 0 30px;
  box-sizing: border-box;
  background-color: #f5f6fa;

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
      width: 150px;
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