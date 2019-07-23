<template>
  <div class="container">
    <div class="content2">
      <div class="title-box">
        <div class="tips" @click="getCurrentDate1" :class="{active:index==1}">本月</div>
        <div class="tips" @click="getlast1" :class="{active:index==2}">上月</div>
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data1"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
          >></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData1">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart1"></div>
    </div>

    <div class="content2">
      <div class="title-box">
        <div class="tips" @click="getCurrentDate2" :class="{active:index1==1}">本月</div>
        <div class="tips" @click="getlast2" :class="{active:index1==2}">上月</div>
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data2"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
          >></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData2">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart2"></div>
    </div>

    <div class="content">
      <div class="first">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data3"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData3"
          >></el-date-picker>
        </div>
        <div class="echart" ref="echart3"></div>
      </div>

      <div class="second">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data4"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData4"
          >></el-date-picker>
        </div>
        <div class="echart" ref="echart4"></div>
      </div>
    </div>
    <div class="content">
      <div class="first">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data5"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData5"
          >></el-date-picker>
        </div>
        <div class="echart" ref="echart5"></div>
      </div>
      <div class="second">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data6"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData6"
          >></el-date-picker>
        </div>
        <div class="echart" ref="echart6"></div>
      </div>
    </div>
    <div class="title">
      <div class="box">
        <div>微信次数</div>
        <div>{{dataList.wxCount}}</div>
      </div>
      <div class="box">
        <div>银行卡次数</div>
        <div>{{dataList.yhkCount}}</div>
      </div>
      <div class="box">
        <div>支付宝次数</div>
        <div>{{dataList.zfbCount}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { getMonthStartDate, getMonthEndDate } from "../../assets/js/format.js";
export default {
  data() {
    return {
      index: 1,
      index1: 1,
      myChart1: "",
      myChart2: "",
      myChart3: "",
      myChart4: "",
      myChart5: "",
      myChart6: "",
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
      data6: "",
      dataList: {},
      option1: {
        color: ["#2ec7c9"],
        title: {
          text: "A端平均发起订单时间段"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      },
      option2: {
        color: ["#b6a2de"],
        title: {
          text: "前十名项目方用户量排行"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      },
      option3: {
        // color: ["#D87A80"],
        color: ["#59B0EF"],
        title: {
          text: "提现平均完成时间"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: []
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            itemStyle: {
              // normal: { label: { show: true, position: "insideRight" } }
            },
            data: []
          }
        ]
      },
      option4: {
        // color: ["#2EC6C8"],
        color: ["#FFB981"],
        title: {
          text: "充值金额范围"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: []
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            itemStyle: {
              // normal: { label: { show: true, position: "insideRight" } }
            },
            data: []
          }
        ]
      },
      option5: {
        // color: ["#59B0EF"],
        color: ["#D87A80"],
        title: {
          text: "提现平均完成时间"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: []
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            itemStyle: {
              // normal: { label: { show: true, position: "insideRight" } }
            },
            data: []
          }
        ]
      },
      option6: {
        color: ["#2EC6C8"],
        title: {
          text: "充值完成平均时间"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: []
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            itemStyle: {
              // normal: { label: { show: true, position: "insideRight" } }
            },
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.getCurrentDate();
    // 获取总数据
    this.$get("/tradingHabitsAnalysis/getPaymentsCount").then(res => {
      this.dataList = res.data;
    });
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
    this.getData6();
  },
  methods: {
    // 获取当前年月
    getCurrentDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.data1 = mydate;
      this.data2 = mydate;
      this.data3 = mydate;
      this.data4 = mydate;
      this.data5 = mydate;
      this.data6 = mydate;
    },
    getCurrentDate1() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.data1 = mydate;
      this.index = 1;
      this.getData1();
    },
    getCurrentDate2() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.data2 = mydate;
      this.index1 = 1;
      this.getData2();
    },
    // 获取上一个月
    getlast1() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.data1 = mydate;
      this.index = 2;
      this.getData1();
    },
    getlast2() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.data2 = mydate;
      this.index1 = 2;
      this.getData2();
    },
    // A端平均发起订单时间段
    getData1() {
      const data = {
        time: this.data1
      };
      this.$get("/tradingHabitsAnalysis/getATerminalSubOrderCount", data).then(
        res => {
          let series = this.option1.series;
          let xAxis = this.option1.xAxis;
          series[0].data = res.data.valueArray;
          xAxis[0].data = res.data.timeList;
          this.option1 = {
            ...this.option1,
            ...{
              series
            },
            ...{ xAxis }
          };
          this.myChart1.setOption(this.option1);
        }
      );
    },
    // B端平均发起订单时间段
    getData2() {
      const data = {
        time: this.data2
      };
      this.$get(
        "/tradingHabitsAnalysis/getBTerminalReceiptOrderCount",
        data
      ).then(res => {
        let series = this.option2.series;
        let xAxis = this.option2.xAxis;
        series[0].data = res.data.valueArray;
        xAxis[0].data = res.data.timeList;
        this.option2 = {
          ...this.option2,
          ...{
            series
          },
          ...{ xAxis }
        };
        this.myChart2.setOption(this.option2);
      });
    },
    // 提现金额范围
    getData3() {
      const data = {
        time: this.data3
      };
      this.$get(
        "/tradingHabitsAnalysis/getATerminalCashOutMoneyRange",
        data
      ).then(res => {
        let series = this.option3.series;
        let yAxis = this.option3.yAxis;
        series[0].data = res.data.timesArray;
        yAxis[0].data = res.data.moneyList;
        this.option3 = {
          ...this.option3,
          ...{
            series
          },
          ...{ yAxis }
        };
        this.myChart3.setOption(this.option3);
      });
    },
    // 充值金额范围
    getData4() {
      const data = {
        time: this.data4
      };
      this.$get(
        "/tradingHabitsAnalysis/getATerminalRechargeMoneyRange",
        data
      ).then(res => {
        let series = this.option4.series;
        let yAxis = this.option4.yAxis;
        series[0].data = res.data.timesArray;
        yAxis[0].data = res.data.moneyList;
        this.option4 = {
          ...this.option4,
          ...{
            series
          },
          ...{ yAxis }
        };
        this.myChart4.setOption(this.option4);
      });
    },
    // 提现平均完成时间
    getData5() {
      const data = {
        time: this.data5
      };
      this.$get(
        "/tradingHabitsAnalysis/getATerminalCashOutTime",
        data
      ).then(res => {      
        let series = this.option5.series;
        let yAxis = this.option5.yAxis;
        series[0].data = res.data.valueArray;
        yAxis[0].data = res.data.timeList;
        this.option5 = {
          ...this.option5,
          ...{
            series
          },
          ...{ yAxis }
        };
        this.myChart5.setOption(this.option5);
      });
    },
    // 充值完成平均时间
    getData6() {
      const data = {
        time: this.data6
      };
      this.$get(
        "/tradingHabitsAnalysis/getATerminalRechargeTime",
        data
      ).then(res => {
        let series = this.option6.series;
        let yAxis = this.option6.yAxis;
        series[0].data = res.data.valueArray;
        yAxis[0].data = res.data.timeList;
        this.option6 = {
          ...this.option6,
          ...{
            series
          },
          ...{ yAxis }
        };
        this.myChart6.setOption(this.option6);
      });
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var echart1 = this.$refs.echart1;
    this.myChart1 = echarts.init(echart1);
    var echart2 = this.$refs.echart2;
    this.myChart2 = echarts.init(echart2);
    var echart3 = this.$refs.echart3;
    this.myChart3 = echarts.init(echart3);
    var echart4 = this.$refs.echart4;
    this.myChart4 = echarts.init(echart4);
    var echart5 = this.$refs.echart5;
    this.myChart5 = echarts.init(echart5);
    var echart6 = this.$refs.echart6;
    this.myChart6 = echarts.init(echart6);
    // 使用刚指定的配置项和数据显示图表。
    this.myChart1.setOption(this.option1);
    this.myChart2.setOption(this.option2);
    this.myChart3.setOption(this.option3);
    this.myChart4.setOption(this.option4);
    this.myChart5.setOption(this.option5);
    this.myChart6.setOption(this.option6);
  }
};
</script>
<style lang="less" scoped>
.active {
  background-color: #419eff;
}

.container {
  height: 1900px;
  padding:0 30px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .title {
    width: 100%;
    height: 148px;
    margin-top: 20px;
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
  .content {
    height: 379px;
    width: 100%;
    margin-top: 20px;
    display: flex;
    min-width: 1340px;
    .first {
      width: 49.5%;
      height: 100%;
      margin-right: 18px;
      position: relative;
      .date-box {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 999;
        width: 115px;
      }
    }
    .second {
      width: 49.5%;
      height: 100%;
      position: relative;
      .date-box {
        position: absolute;
        top: 12px;
        right: 18px;
        z-index: 999;
        width: 115px;
      }
    }
  }
  .content2 {
    height: 379px;
    width: 100%;
    margin-top: 20px;
    min-width: 1340px;
    position: relative;
    .title-box {
      position: absolute;
      top: 12px;
      right: 18px;
      z-index: 999;
      display: flex;
      .date_box {
        width: 85px;
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
    }
  }
  .echart {
    width: 100%;
    height: 379px;
    margin-right: 26px;
    margin-bottom: 24px;
    background-color: #fff;
    padding: 16px 24px 24px 24px;
    box-sizing: border-box;
  }
}
</style>
