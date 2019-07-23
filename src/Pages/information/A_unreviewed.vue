<template>
  <div class="container">
    <el-button type="warning">返回</el-button>
    <el-button type="danger">拒绝</el-button>
    <el-button type="primary">通过</el-button>
    <div class="content">
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
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 696px;
  padding: 20px 30px 0 30px;
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
        background-color: #E5E9F0;
        width: 222px;
        height: 142px;
        margin-right: 20px;
    }
  }
}
</style>
