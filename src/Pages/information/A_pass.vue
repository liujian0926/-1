<template>
  <div class="container">
    <el-button type="warning">返回</el-button>
    <div class="reject">
        <span>已拒绝</span>
        <span>审核人：00112</span>
    </div>
    <div class="box">
      <div class="content" style="marginTop:0;">
        <span class="title">姓 名:</span>
        <span class="username">Hank</span>
      </div>
      <div class="content">
        <span class="title">证件类型:</span>
        <span class="username">身份证</span>
      </div>
      <div class="content">
        <span class="title">证件号码:</span>
        <span class="username">410823199729293044</span>
      </div>
      <div class="content-img">
        <span class="title">证件信息:</span>
        <span class="img"></span>
        <span class="img"></span>
        <span class="img"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 696px;
  padding: 20px 30px 0 30px;
  background-color: #f5f6fa;
  box-sizing: border-box;
  .el-button--warning,
  .el-button--danger,
  .el-button--primary {
    width: 60px;
    height: 28px;
    padding: 0;
    margin-right: 20px;
    margin-left: 0;
  }
  .el-button--danger,
  .el-button--primary {
    width: 100px;
  }
  .reject{
      height: 48px;
      margin-top: 24px;
      background-color: #E0F7EF;
      padding-left: 30px;
      box-sizing: border-box;
      span {
          line-height: 48px;
          font-size: 16px;
          color: #29C995;
          margin-right: 32px;
      }
  }
  .box {
    padding: 20px 30px 40px 30px;
    background-color: #fFF;
    box-sizing: border-box;
    .content {
      height: 21px;
      margin-top: 30px;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
      }
      .username {
        font-size: 14px;
        color: #253444;
        margin-left: 20px;
      }
    }
    .content-img {
      height: 142px;
      width: 100%;
      margin-top: 30px;
      display: flex;
      .title {
        display: inline-block;
        height: 142px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        text-align: right;
        margin-right: 20px;
      }
      .img {
        display: inline-block;
        background-color: #e5e9f0;
        width: 222px;
        height: 142px;
        margin-right: 20px;
      }
    }
  }
}
</style>
