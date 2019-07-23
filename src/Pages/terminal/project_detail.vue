<template>
  <div class="container">
    <div class="section1">
      <el-button type="warning" @click="back">返回</el-button>

      <el-tabs v-model="activeName" class="my-tab">
        <el-tab-pane label="基本信息" name="first">
          <div style="height:439px;borderBottom:1px solid #ccc;">
            <div class="content">
              <span class="title">项目方ID:</span>
              <span class="username">{{projectId}}</span>
            </div>
            <div class="content">
              <span class="title">账 号:</span>
              <span class="username">{{account}}</span>
            </div>
            <div class="content">
              <span class="title">邮 箱:</span>
              <input type="text" v-model="email" />
            </div>
            <div class="content">
              <span class="title">机构名称:</span>
              <input type="text" v-model="name" />
            </div>
            <div class="content_brief">
              <span class="title">机构简介:</span>
              <textarea name id cols="30" rows="10" class="brief" v-model="textarea"></textarea>
            </div>
            <div class="content">
              <span class="title">官方链接:</span>
              <input type="text" v-model="link" />
            </div>
            <div class="content">
              <span class="title">联系人:</span>
              <input type="text" v-model="person" />
            </div>
            <div class="content">
              <span class="title">联系电话:</span>
              <input type="text" v-model="moblie" />
            </div>
            <div class="content">
              <span class="title">微信账号:</span>
              <input type="text" v-model="wchat" />
            </div>
            <el-button type="primary" @click="resetBase">保存修改</el-button>
          </div>
          <div class="section2">
            <div class="content1">
              <span>用户提现手续费扣除方式</span>
              <el-radio v-model="radio" label="1">项目方付</el-radio>
              <el-radio v-model="radio" label="2">用户支付</el-radio>
            </div>
            <div class="content2">
              <span>用户提现手续费费率</span>
              <input type="text" v-model="cash" />
              <span>%</span>
              <span style="marginRight:0">
                +代理奖励数
                <i>{{withdrawRateFloat}}</i>%
              </span>
              <span style="marginRight:0">
                = 最终手续费
                <i>{{Operation1}}</i>%
              </span>
            </div>
            <div class="content3">
              <span>用户充值手续费扣除方式</span>
              <el-radio v-model="radio1" label="1">项目方付</el-radio>
              <el-radio v-model="radio1" label="2">用户支付</el-radio>
            </div>
            <div class="content4">
              <span>用户充值手续费费率</span>
              <input type="text" v-model="userCash" />
              <span>%</span>
              <span style="marginRight:0">
                +代理奖励数
                <i>{{rechargeRateFloat}}</i>%
              </span>
              <span style="marginRight:0">
                = 最终手续费
                <i>{{Operation2}}</i>%
              </span>
            </div>
            <el-button type="primary" @click="resetCash">保存修改</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="数据分析" name="second" class="my-second">
          <div class="my-title">
            <div class="box">
              <div>用户数量</div>
              <div>{{dataObj.userCount}}</div>
            </div>
            <div class="box">
              <div>累计充值金额</div>
              <div>{{dataObj.rechargeAmount}}</div>
            </div>
            <div class="box">
              <div>累计充值笔数</div>
              <div>{{dataObj.rechargeCount}}</div>
            </div>
            <div class="box">
              <div>累计提现金额</div>
              <div>{{dataObj.withdrawAmount}}</div>
            </div>
            <div class="box">
              <div>累计提现笔数</div>
              <div>{{dataObj.withdrawCount}}</div>
            </div>
            <div class="box">
              <div>USDT余额</div>
              <div>{{dataObj.usdtBalance}}</div>
            </div>
            <div class="box">
              <div>积分余额</div>
              <div>{{dataObj.integralBalance}}</div>
            </div>
          </div>
          <div class="my-content2" style="marginTop:0">
            <div class="title-box">
              <div class="tips" @click="weekTime1" :class="{active:index==1}">本周</div>
              <div class="tips" @click="lastWeek1" :class="{active:index==2}">上周</div>
              <div class="tips" @click="monthTime1" :class="{active:index==3}">本月</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data1"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                >></el-date-picker>
              </div>
              <div class="lines">-</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data2"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                >></el-date-picker>
              </div>
              <div style="marginLeft:16px;">
                <el-button type="primary" size="mini" @click="getUser">查询</el-button>
              </div>
            </div>
            <div
              class="my-echart"
              ref="echart1"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            ></div>
          </div>
          <div class="my-content2">
            <div class="title-box">
              <div class="tips" @click="weekTime2" :class="{active:index1==1}">本周</div>
              <div class="tips" @click="lastWeek2" :class="{active:index1==2}">上周</div>
              <div class="tips" @click="monthTime2" :class="{active:index1==3}">本月</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data3"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <div class="lines">-</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data4"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <div style="marginLeft:16px;">
                <el-button type="primary" size="mini" @click="getRecharge">查询</el-button>
              </div>
            </div>
            <div
              class="my-echart"
              ref="echart2"
              v-loading="loading1"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            ></div>
          </div>
          <div class="my-content2">
            <div class="title-box">
              <div class="tips" @click="weekTime3" :class="{active:index2==1}">本周</div>
              <div class="tips" @click="lastWeek3" :class="{active:index2==2}">上周</div>
              <div class="tips" @click="monthTime3" :class="{active:index2==3}">本月</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data5"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <div class="lines">-</div>
              <div class="date_box">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="data6"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <div style="marginLeft:16px;">
                <el-button type="primary" size="mini" @click="getDeposit">查询</el-button>
              </div>
            </div>
            <div
              class="my-echart"
              ref="echart3"
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            ></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import {
  getWeekStartDate,
  getWeekEndDate,
  getLastWeekStartDate,
  getLastWeekEndDate,
  getMonthStartDate,
  getMonthEndDate
} from "../../assets/js/format.js";
export default {
  data() {
    return {
      loading: true,
      loading1: true,
      loading2: true,
      email: "",
      name: "",
      textarea: "",
      link: "",
      person: "",
      moblie: "",
      wchat: "",
      radio: localStorage.getItem('num'),
      cash: "",
      radio1: localStorage.getItem('num1'),
      userCash: "",
      // 代理提现
      withdrawRateFloat: "",
      // 代理充值
      rechargeRateFloat: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      index: 1,
      index1: 1,
      index2: 1,
      data1: getWeekStartDate(),
      data2: getWeekEndDate(),
      data3: getWeekStartDate(),
      data4: getWeekEndDate(),
      data5: getWeekStartDate(),
      data6: getWeekEndDate(),
      option1: {
        color: ["#b6a2de"],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "预购",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: []
          }
        ]
      },
      option2: {
        color: ["#2ec7c9"],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [""]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "预购",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: []
          }
        ]
      },
      option3: {
        color: ["#5ab1ef"],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [""]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "预购",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: []
          }
        ]
      },
      activeName: "first",
      projectId: "",
      account: "",
      dataObj: {}
    };
  },
  created() {
    //获取项目方id
    this.projectId = this.$route.query.id;
    //获取基本信息
    this.$get("/projectSideManage/getProjectSideBaseinfo", {
      projectId: this.projectId
    }).then(res => {
      this.projectId = res.data.projectSideBaseinfo.projectId;
      this.account = res.data.projectSideBaseinfo.account;
      this.email = res.data.projectSideBaseinfo.email;
      this.name = res.data.projectSideBaseinfo.organizationName;
      this.textarea = res.data.projectSideBaseinfo.organizationInfo;
      this.link = res.data.projectSideBaseinfo.website;
      this.person = res.data.projectSideBaseinfo.contacts;
      this.moblie = res.data.projectSideBaseinfo.tel;
      this.wchat = res.data.projectSideBaseinfo.wechat;
      this.cash = res.data.projectSideBaseinfo.withdrawRate;
      this.userCash = res.data.projectSideBaseinfo.rechargeRate;
      this.withdrawRateFloat =
        res.data.projectSideBaseinfo.withdrawRateFloat * 100;
      this.rechargeRateFloat =
        res.data.projectSideBaseinfo.rechargeRateFloat * 100;
    });
    this.getUser()
    this.getRecharge()
    this.getDeposit()
  },
  computed: {
    // 提现最终手术费
    Operation1() {
      var num1 = Number(this.cash) + Number(this.withdrawRateFloat);
      return num1;
    },

    // 提现最终手术费
    Operation2() {
      var num2 = Number(this.userCash) + Number(this.rechargeRateFloat);
      return num2;
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },

    weekTime1() {
      this.data1 = getWeekStartDate();
      this.data2 = getWeekEndDate();
      this.index = 1;
      this.getUser();
    },
    weekTime2() {
      this.data3 = getWeekStartDate();
      this.data4 = getWeekEndDate();
      this.index1 = 1;
      this.getRecharge()
    },
    weekTime3() {
      this.data5 = getWeekStartDate();
      this.data6 = getWeekEndDate();
      this.index2 = 1;
      this.getDeposit()
    },
    lastWeek1() {
      this.data1 = getLastWeekStartDate();
      this.data2 = getLastWeekEndDate();
      this.index = 2;
      this.getUser();
    },
    lastWeek2() {
      this.data3 = getLastWeekStartDate();
      this.data4 = getLastWeekEndDate();
      this.index1 = 2;
      this.getRecharge()
    },
    lastWeek3() {
      this.data5 = getLastWeekStartDate();
      this.data6 = getLastWeekEndDate();
      this.index2 = 2;
      this.getDeposit()
    },
    monthTime1() {
      this.data1 = getMonthStartDate();
      this.data2 = getMonthEndDate();
      this.index = 3;
      this.getUser();
    },
    monthTime2() {
      this.data3 = getMonthStartDate();
      this.data4 = getMonthEndDate();
      this.index1 = 3;
      this.getRecharge()
    },
    monthTime3() {
      this.data5 = getMonthStartDate();
      this.data6 = getMonthEndDate();
      this.index2 = 3;
      this.getDeposit()
    },
    // 修改项目方基本信息
    resetBase() {
      const data = {
        projectId: this.projectId,
        account: this.account,
        email: this.email,
        organizationName: this.name,
        organizationInfo: this.textarea,
        website: this.link,
        contacts: this.person,
        tel: this.moblie,
        wechat: this.wchat
      };
      this.$post("/projectSideManage/updateProjectSideBaseinfo", data).then(
        res => {
          this.$message.success("修改成功");
        }
      );
    },
    // 修改充值提现
    resetCash() {
      const data = {
        userId: this.account,
        withdrawRateType: this.radio,
        withdrawRate: this.cash,
        rechargeRateType: this.radio1,
        rechargeRate: this.userCash
      };
      localStorage.setItem('num',this.radio)
      localStorage.setItem('num1',this.radio1)
      this.$post("/projectSideManage/updateProjectSideBaseinfoRate", data).then(
        res => {
          this.$message.success("修改成功");
          this.radio = localStorage.getItem('num')
          this.radio1 = localStorage.getItem('num1')   
        }
      );
    },
    // 累计总用户数量
    getUser(){
      const data = {
        projectId:this.projectId,
        startTime:this.data1,
        endTime:this.data2
      }
      this.$get('/projectSideManage/getProjectSideUserCount',data).then(res=>{
        let xAxis = this.option1.xAxis
        let series = this.option1.series
        let title = this.option1.title
        xAxis[0].data = res.data.sub
        series[0].data = res.data.userCount
        title.text ="累计总用户数量：" + res.data.totalUserCount
        this.option1 = {
          ...this.option1,
          ...{series},
          ...{xAxis},
          ...{title}
        }
      })
    },
    // 累计充值金额
    getRecharge(){
      const data = {
        projectId:this.projectId,
        startTime:this.data3,
        endTime:this.data4,
        orderType:1
      }
      this.$get('/projectSideManage/getProjectSideOrderAmount',data).then(res=>{
        let xAxis = this.option2.xAxis
        let series = this.option2.series
        let title = this.option2.title 
        xAxis[0].data = res.data.sub
        series[0].data = res.data.orderAmount
        title.text ="累计充值金额：" + res.data.totalOrderAmount
        this.option2 = {
          ...this.option2,
          ...{series},
          ...{xAxis},
          ...{title}
        }
        })
    },
    // 累计提现总金额
    getDeposit(){
     const data = {
        projectId:this.projectId,
        startTime:this.data5,
        endTime:this.data6,
        orderType:2
      }
      this.$get('/projectSideManage/getProjectSideOrderAmount',data).then(res=>{
        let xAxis = this.option3.xAxis
        let series = this.option3.series
        let title = this.option3.title 
        xAxis[0].data = res.data.sub
        series[0].data = res.data.orderAmount
        title.text ="累计提现总金额：" + res.data.totalOrderAmount
        this.option3 = {
          ...this.option3,
          ...{series},
          ...{xAxis}
        }
        })   
    }
  },
  mounted() {
    // 项目方数据分析
    this.$get("/projectSideManage/getProjectSideDataAnalysis", {
      projectId: this.projectId
    }).then(res => {
      this.dataObj = res.data.projectSideDataAnalysisVo;
    });
    // 基于准备好的dom，初始化echarts实例
    setTimeout(() => {
      var echart1 = this.$refs.echart1;
      this.myChart1 = echarts.init(echart1);
      var echart2 = this.$refs.echart2;
      this.myChart2 = echarts.init(echart2);
      var echart3 = this.$refs.echart3;
      this.myChart3 = echarts.init(echart3);
      this.myChart1.setOption(this.option1);
      this.myChart2.setOption(this.option2);
      this.myChart3.setOption(this.option3);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
i {
  font-style: normal;
}
.active {
  background-color: #419eff;
}
.container {
  width: 100%;
  height: 1916px;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f6fa;
  .section1 {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .bbb {
      position: relative;
      width: 100%;
      height: 379px;
      .chart-box {
        background-color: black;
        width: 100%;
        height: 379px;
        .my-echart {
          background-color: skyblue;
          width: 100%;
          height: 379px;
        }
      }
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
      margin-top: 28px;
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
      width: 218px;
      height: 128px;
      float: left;
      background-color: #fff;
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
  /deep/ .my-second {
    width: 100%;
    .my-title {
      width: 100%;
      overflow: hidden;
      .box {
        width: 276px;
        height: 148px;
        float: left;
        background-color: #fff;
        padding: 27px 0 0 40px;
        box-sizing: border-box;
        margin-right: 26px;
        margin-bottom: 26px;
        div {
          &:nth-child(1) {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #666666;
            font-weight: bold;
          }
          &:nth-child(2) {
            margin-top: 1px;
            height: 40px;
            font-size: 32px;
            color: #333333;
            margin-top: 4px;
          }
        }
      }
    }
    .my-content2 {
      position: relative;
      width: 100%;
      height: 379px;
      margin-top: 20px;
      min-width: 1340px;
      background-color: red;
      .title-box {
        position: absolute;
        top: 12px;
        right: 18px;
        z-index: 999;
        display: flex;
        .date_box {
          width: 125px;
        }
        .lines {
          width: 18px;
          text-align: center;
        }
        .tips {
          width: 60px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          color: #000000;
          font-size: 14px;
        }
        .el-button--primary {
          margin-top: 0;
          width: 60px;
          height: 28px;
          padding: 0;
        }
      }
      .my-echart {
        width: 100%;
        height: 100%;
        margin-right: 26px;
        margin-bottom: 24px;
        background-color: #fff;
        padding: 16px 24px 24px 24px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
