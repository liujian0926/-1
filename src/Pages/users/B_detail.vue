<template>
  <div class="container">
    <div class="section1">
      <router-link :to="{path:'/B_userManager'}">
        <el-button type="warning">返回</el-button>
      </router-link>

      <template>
        <el-tabs v-model="activeName"  @tab-click="handleClick()">
          <el-tab-pane label="基本信息" name="first">
            <div class="content">
              <span class="title">用户名称:</span>
              <span class="username">{{detailData.userName}}</span>
            </div>
            <div class="content">
              <span class="title">用户ID:</span>
              <span class="username">{{detailData.userId}}</span>
            </div>
            <div class="content">
              <span class="title">电话:</span>
              <span class="username">{{detailData.mobile}}</span>
            </div>
            <div class="content">
              <span class="title">邮箱:</span>
              <span class="username">{{detailData.email}}</span>
            </div>
            <div class="content">
              <span class="title">会员级别:</span>
              <span class="username">{{detailData.grant | grant}}</span>
            </div>
            <div class="content">
              <span class="title">推荐方:</span>
              <span class="username">{{detailData.recommenderName}}</span>
            </div>
            <div class="content">
              <span class="title">推荐人ID:</span>
              <span class="username">{{detailData.recommenderId}}</span>
            </div>
            <div class="content">
              <span class="title">直推人数:</span>
              <span class="username">{{detailData.directPusherCount}}</span>
            </div>
            <div class="content">
              <span class="title">三级人数:</span>
              <span class="username">{{detailData.threeCount}}</span>
            </div>
            <div class="content">
              <span class="title">保证金:</span>
              <span class="username">{{detailData.deposit}}</span>
            </div>
            <div class="content">
              <span class="title">加入时间:</span>
              <span class="username">{{detailData.addTime}}</span>
            </div>
            <div class="content">
              <span class="title">代理名称:</span>
              <span class="username">{{detailData.agencyName}}</span>
            </div>
            <div class="content">
              <span class="title">代理ID:</span>
              <span class="username">{{detailData.agencyId}}</span>
            </div>

            <div class="content">
              <span class="title">是否实名:</span>
              <span class="username">{{detailData.isAutn | isAutn}}</span>
            </div>

            <div class="content" id="status">
              <span class="title">账户状态:</span>
              <span class="username fontRed" v-if="detailData.accountStatus == 0">禁止（剩余{{detailData.time}}）</span>
              <span class="username" v-else>{{detailData.accountStatus | accountStatus}}</span>
              <el-button v-if="detailData.accountStatus == 0" type="primary" @click="remove(1,0)">解除禁止</el-button>
              <el-button v-else type="info">解除禁止</el-button>
            </div>
            <div class="content">
              <span class="title">申诉次数:</span>
              <span class="username">{{detailData.appealCount}}</span>
            </div>
            <div class="content">
              <span class="title">被起诉次数:</span>
              <span class="username">{{detailData.appealedCount}}</span>
            </div>
          </el-tab-pane>

          <el-tab-pane label="下级成员" name="second">
            <div class="box">
              <div class="recommend">
                <div class="person">直推人数</div>
                <div class="number">{{terminalData.directPusherCount}}</div>
              </div>
              <div class="recommend">
                <div class="person">三级内人数</div>
                <div class="number">{{terminalData.threeCount}}</div>
              </div>
              <div class="recommend">
                <div class="person">普通会员人数</div>
                <div class="number">{{terminalData.vip0}}</div>
              </div>
              <div class="recommend">
                <div class="person">VIP1人数</div>
                <div class="number">{{terminalData.vip1}}</div>
              </div>
              <div class="recommend">
                <div class="person">VIP2人数</div>
                <div class="number">{{terminalData.vip2}}</div>
              </div>
              <div class="recommend">
                <div class="person">VIP3人数</div>
                <div class="number">{{terminalData.vip3}}</div>
              </div>
          </div>
          <!-- 选择框 -->
          <el-select v-model="value" placeholder="直推下级" @change="selectChanges()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 表格 -->
          <el-table :data="getSubUserData" border style="width: 100%" class="my-table">
              <el-table-column prop="userId" label="用户ID"></el-table-column>
              <el-table-column prop="mobile" label="电话"></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="addTime" label="加入时间"></el-table-column>
              <el-table-column prop="operation" label="会员级别">
                <template scope="scope">{{scope.row.grant | grant}}</template>
              </el-table-column>
              <el-table-column prop="recommenderName" label="推荐人"></el-table-column>
              <el-table-column prop="recommenderId" label="推荐人ID"></el-table-column>
              <el-table-column prop="directPusherCount" label="直推人数"></el-table-column>
              <el-table-column prop="threeCount" label="三级人数"></el-table-column>
              <el-table-column prop="agencyName" label="代理名称"></el-table-column>
              <el-table-column prop="agencyId" label="代理ID"></el-table-column>
              <el-table-column prop="operation" label="是否实名">
                <template scope="scope">{{scope.row.isAutn | isAutn}}</template>
              </el-table-column>
              <el-table-column prop="deposit" label="保证金"></el-table-column>
              <el-table-column prop="operation" label="状态">
                <template scope="scope">{{scope.row.accountStatus | isType}}</template>
              </el-table-column>
          </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div class="section2">
      <div class="btn">
        <el-button type="primary" @click="remove(0,lockingTime)">禁止交易</el-button>
        <el-input class="lockingTime" v-model="lockingTime" placeholder="设置禁止时长（小时）"></el-input>
      </div>
      <div class="text">被禁之后，用户不能进行充值及提现，未完成订单依然可以继续交易</div>
      <div class="otherMsg">
        <ul>
          <li>买入总金额/产品</li>
          <li>卖出总金额/产品</li>
          <li>USDT兑换产品数量</li>
          <li>接单总收益（产品）</li>
          <li>团队奖励总收益（产品）</li>
          <li>USDT余额</li>
        </ul>
        <ul>
          <li>{{bUserBuy.bUserBuyUSDT}}</li>
          <li>{{bUserSell.bUserSellUSDT}}</li>
          <li>{{bUserUSDTExcInt.totalIntegral}}</li>
          <li>{{tradeData.bTerminalUserBuyReward}}</li>
          <li>{{tradeData.bTerminalUserTeamReward}}</li>
          <li>{{tradeData.usdt}}</li>
        </ul>
      </div>
    </div>

    <div class="section3">
      <div class="title">手动增减USDT数量</div>
      <div class="input">
        <el-input v-model="usdtNum" placeholder="输入增减USDT数量" style="width:265px" @input="handleInput"></el-input>
        <span>当前USDT余额 {{tradeData.usdt}}</span>
      </div>
      <div class="input">
        <el-input v-model="inputRemark" placeholder="输入原因" style="width:265px"></el-input>
      </div>
      <span></span>
      <div class="btn">
        <el-button type="primary" @click="addNum(1)">增加</el-button>
        <el-button type="danger" @click="addNum(2)">减少</el-button>
      </div>
      <el-table :data="operationMoneylist" border style="width: 100%">
        <el-table-column prop="operationTime" label="操作时间"></el-table-column>
        <el-table-column prop="operation" label="类型">
           <template scope="scope">{{scope.row.type | isType}}</template>
        </el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="adminId" label="操作员ID"></el-table-column>
        <el-table-column prop="remake" label="原因"></el-table-column>
      </el-table>
    </div>

   <div class="section4">
      <div class="title">手动扣除保证金</div>
      <div class="input">
        <el-input v-model="deposit" placeholder="请输入扣除数量" style="width:265px"></el-input>
        <span>当前可扣除保证金{{detailData.deposit}}</span>
      </div>
      <div class="input">
        <el-input v-model="depositRemark" placeholder="请输入扣除原因" style="width:265px"></el-input>
        <span @click="radioC()" class="radio">
          <input type="radio" :checked='radio'><span>短信及邮件通知</span>
        </span>
      </div>
      <span></span>
      <div class="btn">
        <el-button type="primary" @click="deduction('', 3)">扣除</el-button>
      </div>
      <el-table :data="depositData" border style="width: 100%">
        <el-table-column prop="operationTime" label="扣除时间"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template scope="scope">
            <span>{{scope.row.type | isType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="adminId" label="操作员"></el-table-column>
        <el-table-column prop="remake" label="原因"></el-table-column>
        <el-table-column prop="operation" label="操作" v-if="0">
          <template scope="scope">
            <span v-if="scope.row.isBack == 0" class="txtBlue" @click="deduction(scope.row.flowId, 4)">{{scope.row.isBack | isBacks}}</span>
            <span v-else>{{scope.row.isBack | isBacks}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      operationMoneylist: [],
      activeName: "first",
      inputRemark: "",
      usdtNum: null,
      userId: null,
      detailData: {},
      tradeData: {},
      bUserBuy: {},
      bUserSell: {},
      bUserUSDTExcInt: {},
      depositData: [],
      terminalData: {},
      getSubUserData: [],
      lockingTime: '',
      radio: 0,
      deposit: null,
      depositRemark: null,
      options: [{
          value: '0',
          label: '直推下级'
        }, {
          value: '1',
          label: '三级内成员'
        }],
        value: '0'
    };
  },
  created() {
    this.userId = this.$route.query.userId
    this.getDetail()
    this.getTradeDetail()
    this.getusdtNum()
    this.deductionRecord()
  },
  methods: {
    selectChanges () {
      if (this.activeName === 'second') {
        this.getSubUser()
      }
    },
    handleClick() {
      if (this.activeName === 'second') {
        this.getBTerminalData()
        this.getSubUser()
      }
    },
    radioC () {
      this.radio = this.radio === 0 ? 1 : 0
    },
    handleInput () {},
    // B端用户基本信息
    getDetail () {
       const data = {
        userId:this.userId
      };
      this.$get(
        "/bTerminalUserManage/getBTerminalUserRecordDetail", data).then(res => {
        var data = res.data
        this.detailData = res.data.bTerminalUserRecord
      })
    },
    // B端用户交易信息
    getTradeDetail () {
       const data = {
        userId:this.userId
      };
      this.$get(
        "/bTerminalUserManage/getBTerminalUserTradeDetail", data).then(res => {
        var data = res.data
        this.tradeData = res.data
        this.bUserBuy = res.data.bUserBuy
        this.bUserSell = res.data.bUserSell
        this.bUserUSDTExcInt = res.data.bUserUSDTExcInt
      })
    },
    // 解禁/禁止
    remove (status,lockingTime) {
      if (lockingTime === '' || lockingTime === null) {
        this.$message.warning('请填写禁止时长')
        return false
      }

      lockingTime = Number(lockingTime)
      var lockingSecond = lockingTime * 3600
       const data = {
        id:this.userId,
        status: status,
        unlockingTime: lockingSecond
      };
      this.$post(
        "/bTerminalUserManage/userUpdate", data).then(res => {
        var data = res.data
        this.detailData.time = data.time
        this.detailData.accountStatus = data.status
      })
    },
    // 增减usdt
    addNum (type) {
      if (this.usdtNum === '' || this.usdtNum === null) {
        this.$message.warning('请输入增减的USDT数量！')
        return false
      }
       const data = {
        userId:this.userId,
        usdtNum: this.usdtNum,
        remake: this.inputRemark,
        type: type
      }
      this.$post(
        "/bTerminalUserManage/updateUserUSDT", data).then(res => {
        this.$message.success('操作成功！')
        this.usdtNum = ''
        this.inputRemark = ''
        var data = res.data
        this.tradeData.usdt = data
        this.getusdtNum()
      })
    },
    // 增减USDT记录
    getusdtNum (type) {
       const data = {
        userId:this.userId
      }
      this.$get(
        "/bTerminalUserManage/getOperationUSDTRecord", data).then(res => {
        var data = res.data
        this.operationMoneylist = data.operationMoneyVos
      })
    },
    // 扣除保证金
    deduction (flowId, type) {
      if (this.deposit === '' || this.deposit === null) {
        this.$message.warning('请输入扣除保证金数量！')
        return false
      }
      if (this.depositRemark === '' || this.depositRemark === null) {
        this.$message.warning('请输入扣除保证原因！')
        return false
      }
      const data = {
        userId: this.userId,
        deposit: this.deposit,
        remake: this.depositRemark,
        flowId: flowId,
        isEmailOrinfo: this.radio,
        type: type
      }
      this.$post(
        "/bTerminalUserManage/deductionDeposit", data).then(res => {
        var data = res.data
        this.$message.success('操作成功！')
        this.deposit = ''
        this.depositRemark = ''
        this.radio = 0
        this.detailData.deposit = data
        this.deductionRecord()
      })
    },
    // 扣除保证金记录
    deductionRecord (depositRemark, type) {
      const data = {
        userId: this.userId
      }
      this.$get(
        "/bTerminalUserManage/getOperationDepositRecord", data).then(res => {
        var data = res.data
        this.depositData = data.operationDepositRecord
      })
    },
    // B端用户下级人员总数据
    getBTerminalData () {
      const data = {
        userId: this.userId
      }
      this.$get(
        "/bTerminalUserManage/getBTerminalData", data).then(res => {
        var data = res.data
        this.terminalData = data
      })
    },
    // B端用户记录
    getSubUser () {
      const data = {
        userId: this.userId,
        type: this.value
      }
      this.$get(
        "/bTerminalUserManage/getSubUser", data).then(res => {
        var data = res.data
        this.getSubUserData = data.subUser
      })
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  // height: 1271px;// 1871px;
  padding: 0 7px;
  background-color: #fff;
  .section1 {
    padding-bottom: 20px;
    width: 100%;
    border-bottom: 1px solid #cbcfdc;
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
        width: 120px; //78px;
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
        margin-right: 10px;
        height: 20px;
        text-align: left;
        color: #e82b2b;
      }
      .el-button--primary {
        width: 68px;
        height: 24px;
        padding: 0;
        border-radius: 2px
      }
      .el-button--info{
        width: 68px;
        height: 24px;
        padding: 0;
        border-radius: 2px;
        margin-left: 20px
      }
    }
    .my-table {
      margin-top: 13px;
    }
    .box {
      height: 180px;
      width: 100%;
      .recommend {
        float: left;
        width: 180px;
        height: 120px;
        background-color: #419eff;
        padding: 20px 0 0 36px;
        box-sizing: border-box;
        margin-right: 20px;
        margin-bottom: 20px;
        .person {
          width: 100px;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          position: relative;
          padding-left: 7px;
        }
        .person:before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 15px;
          line-height: 20px;
          background-color: #fff;
          position: absolute;
          left: 0;
          top: 3px;
        }
        .number {
          width: 120px;
          height: 37px;
          font-size: 32px;
          line-height: 37px;
          margin-top: 20px;
          color: #fff;
        }
      }
    }
  }
  .section2 {
    padding: 50px 0 10px;
    height: 348px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .my-table {
      margin-top: 24px;
    }
    .btn {
      .el-button--primary {
        width: 80px;
        height: 32px;
        padding: 0;
        font-size: 12px;
        color: #fff;
        margin-right: 20px;
      }
      /deep/ .lockingTime{
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
    .otherMsg{
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
  .section3 {
    width: 100%;
    padding-top: 21px;
    margin-bottom: 20px;
    .title {
      width: 169px;
      height: 25px;
      color: #979dac;
      font-size: 18px;
    }
    .input {
      margin: 15px 0 10px 0;
      span {
        color: #979dac;
        font-size: 12px;
        margin-left: 19px;
      }
    }
    .btn {
      margin: 20px 0 24px 0;
      .el-button--primary,
      .el-button--danger {
        width: 80px;
        height: 32px;
        padding: 0;
      }
    }
  }
  .section4 {
    width: 100%;
    padding-top: 21px;
    .title {
      width: 133px;
      height: 25px;
      color: #979dac;
      font-size: 18px;
    }
    .input {
      margin: 15px 0 10px 0;
      span {
        color: #979dac;
        font-size: 12px;
        margin-left: 19px;
      }
      .radio {
        position: relative;
        input{
          position: absolute;
          top: 0
        }
      }
      .email {
        margin-left: 4px;
      }
    }
    .btn {
      margin: 20px 0 24px 0;
      .el-button--primary {
        width: 80px;
        height: 32px;
        padding: 0;
      }
    }
    .txtBlue{
      color: #419EFF
    }
  }
}
</style>
