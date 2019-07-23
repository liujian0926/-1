<template>
  <div class="container">
    <div class="section1">
      <router-link to="/A_userManager"><el-button type="warning">返回</el-button></router-link>
      <div class="content">
        <span class="title">用户名称:</span>
        <span class="username">{{aTerminalUserRecord.userName}}</span>
      </div>
      <div class="content">
        <span class="title">用户ID:</span>
        <span class="username">{{aTerminalUserRecord.userId}}</span>
      </div>
      <div class="content">
        <span class="title">用户电话:</span>
        <span class="username">{{aTerminalUserRecord.mobile}}</span>
      </div>
      <div class="content">
        <span class="title">加入时间:</span>
        <span class="username">{{aTerminalUserRecord.addTime}}</span>
      </div>
      <div class="content">
        <span class="title">项目方名称:</span>
        <span class="username">{{aTerminalUserRecord.projectSideName}}</span>
      </div>
      <div class="content">
        <span class="title">项目方ID:</span>
        <span class="username">{{aTerminalUserRecord.projectSideId}}</span>
      </div>
      <div class="content">
        <span class="title">代理名称:</span>
        <span class="username">{{aTerminalUserRecord.agencyName}}</span>
      </div>
      <div class="content">
        <span class="title">代理ID:</span>
        <span class="username">{{aTerminalUserRecord.agencyId}}</span>
      </div>
      <div class="content">
        <span class="title">是否实名:</span>
        <span class="username">{{aTerminalUserRecord.isAutn | isAutn}}</span>
      </div>
      <div class="content" id="status">
        <span class="title">账户状态:</span>
        <span class="username fontRed" v-if="aTerminalUserRecord.time != 0">禁止（剩余{{aTerminalUserRecord.time}}）</span>
        <span class="username" v-else>{{aTerminalUserRecord.accountStatus | accountStatus}}</span>
        <el-button v-if="aTerminalUserRecord.time != 0" type="primary" @click="remove(1,0)">解除禁止</el-button>
        <el-button v-else type="info">解除禁止</el-button>
      </div>
      <div class="content">
        <span class="title">申诉次数:</span>
        <span class="username">{{aTerminalUserRecord.appealCount}}</span>
      </div>
      <div class="content">
        <span class="title">被起诉次数:</span>
        <span class="username"> {{aTerminalUserRecord.appealedCount}}</span>
      </div>
    </div>
    <div class="section2">
      <div class="btn">
        <el-button type="primary" @click="remove(0,lockingTime)">禁止交易</el-button>
        <el-input class="lockingTime" v-model="lockingTime" placeholder="设置禁止时长（小时）"></el-input>
      </div>
      <div class="text">被禁之后，用户不能进行充值及提现，未完成订单依然可以继续交易</div>
    </div>
    <div class="section3">
      <ul>
        <li>充值总金额/积分</li>
        <li>提现总金额/积分</li>
      </ul>
      <ul>
        <li>{{detailData.aUserRechargeAmount}}</li>
        <li>{{detailData.aUserCashAmount}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: '',
      detailData: {},
      aTerminalUserRecord: {},
      lockingTime: null
    };
  },
  created() {
    this.userId = this.$route.query.userId
    this.getDetail()
  },
  methods: {
    getDetail() {
       const data = {
        token: localStorage.getItem("token"),
        userId: this.userId
      }
      this.$get(
        "/aTerminalUserManage/getATerminalUserRecordDetail", data).then(res => {
        var data = res.data
        this.detailData = res.data
        this.aTerminalUserRecord = res.data.aTerminalUserRecord
      })
    },
    // 解禁/禁止
    remove(status,lockingTime) {
       if (lockingTime === '' || lockingTime === null) {
        this.$message.warning('请填写禁止时长')
        return false
      }
      lockingTime = Number(lockingTime)
      var lockingSecond = lockingTime * 3600
       const data = {
        id: this.userId,
        status: status,
        unlockingTime: lockingSecond
      };
      this.$post(
        "/aTerminalUserManage/userUpdate", data).then(res => {
        var data = res.data
        this.aTerminalUserRecord.time = data.time
        this.aTerminalUserRecord.accountStatus = data.status
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 696px;
  padding: 0 7px;
  background-color: #fff;
  .section1 {
    height: 458px;
    width: 100%;
    border-bottom: 1px solid #CBCFDC;
    box-sizing: border-box;
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
      }
      .username {
        font-size: 14px;
        color: #253444;
        margin-left: 20px;
      }
    }
    #status {
      .fontRed {
        display: inline-block;
        margin-right: 20px;
        height: 20px;
        text-align: left;
        color: #e82b2b;
      }
      .el-button--primary {
        width: 68px;
        height: 24px;
        padding: 0;
        border-radius: 2px;
      }
      .el-button--info{
        width: 68px;
        height: 24px;
        padding: 0;
        border-radius: 2px;
        margin-left: 20px
      }
    }
  }
  .section2 {
    height: 99px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn {
      position: relative;
      .el-button--primary {
        width: 80px;
        height: 32px;
        padding: 0;
        font-size: 12px;
        color: #fff;
        margin-right: 20px;
      }
      /deep/ .lockingTime{
        position: absolute;
        width: 13%;
        .el-input__inner{
          font-size: 14px;
          height: 33px;
          line-height: 33px;
          &::placeholder{
            color: #979DAC
          }
        }
      }
    }
    .text {
      color: #979dac;
      font-size: 12px;
      letter-spacing: 1px;
      line-height: 17px;
      margin-top: 10px;
    }
  }
  .section3 {
    width: 100%;
    display: flex;
    ul{
      display: flex;
      flex: 1;
      flex-direction: column;
      border: 1px solid #E7ECF0;
      padding: 0;
      &:last-of-type{
        flex: 3;
        border-left: none
      }
      li{
        padding: 12px 10px;
        text-align: center;
        border-bottom: 1px solid #E7ECF0;
        flex: 1;
        list-style: none;
        &:last-of-type{
          border-bottom: none
        }
      }
    }
  }
}
</style>
