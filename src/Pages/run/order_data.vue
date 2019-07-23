<template>
  <div class="container">
    <div class="title">
      <div class="box">
        <div>本周卖出单数/金额</div>
        <div>{{dataList.weekSell}}</div>
      </div>
      <div class="box">
        <div>本周卖出取消单数</div>
        <div>{{dataList.sellCancelCount}}</div>
      </div>
      <div class="box">
        <div>本周买入单数/金额</div>
        <div>{{dataList.weekBuy}}</div>
      </div>
      <div class="box">
        <div>本周买入取消单数</div>
        <div>{{dataList.buyCancelCount}}</div>
      </div>
    </div>

    <div class="content2">
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
          ></el-date-picker>
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
          ></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getCash">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart1"></div>
    </div>

    <div class="content2">
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
          <el-button type="primary" size="mini" @click="getConut">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart2"></div>
    </div>

    <div class="content2">
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
          <el-button type="primary" size="mini" @click="getCancel">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart3"></div>
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
      dataList: {},
      option1: {
        title: {
          text: "每日买卖金额统计"
        },
        color: ["#2ec7c9", "#b6a2de"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["买入", "卖出"]
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
            name: "买入",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "卖出",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      },
       option2: {
        title: {
          text: "每日买卖笔数统计"
        },
        color: ["#2ec7c9", "#b6a2de"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["买入", "卖出"]
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
            name: "买入",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "卖出",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      },
       option3: {
        title: {
          text: "每日买卖取消统计"
        },
        color: ["#2ec7c9", "#b6a2de"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["买入", "卖出"]
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
            name: "买入",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "卖出",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      },
    };
  },
  created() {
    // 获取总数居
    this.$get("/orderDataAnalysis/getOrderData").then(res => {
      this.dataList = res.data;
    });
    this.getCash();
    this.getConut();
    this.getCancel();
  },
  methods: {
    weekTime1() {
      this.data1 = getWeekStartDate();
      this.data2 = getWeekEndDate();
      this.index = 1;
      this.getCash();
    },
    weekTime2() {
      this.data3 = getWeekStartDate();
      this.data4 = getWeekEndDate();
      this.index1 = 1;
      this.getConut();
    },
    weekTime3() {
      this.data5 = getWeekStartDate();
      this.data6 = getWeekEndDate();
      this.index2 = 1;
      this.getCancel();
    },
    lastWeek1() {
      this.data1 = getLastWeekStartDate();
      this.data2 = getLastWeekEndDate();
      this.index = 2;
      this.getCash();
    },
    lastWeek2() {
      this.data3 = getLastWeekStartDate();
      this.data4 = getLastWeekEndDate();
      this.index1 = 2;
      this.getConut();
    },
    lastWeek3() {
      this.data5 = getLastWeekStartDate();
      this.data6 = getLastWeekEndDate();
      this.index2 = 2;
      this.getCancel();
    },
    monthTime1() {
      this.data1 = getMonthStartDate();
      this.data2 = getMonthEndDate();
      this.index = 3;
      this.getCash();
    },
    monthTime2() {
      this.data3 = getMonthStartDate();
      this.data4 = getMonthEndDate();
      this.index1 = 3;
      this.getConut();
    },
    monthTime3() {
      this.data5 = getMonthStartDate();
      this.data6 = getMonthEndDate();
      this.index2 = 3;
      this.getCancel();
    },
    // 每日买卖金额统计
    getCash() {
      const data = {
        beginTime: this.data1,
        endTime: this.data2
      };
      this.$get(
        "/orderDataAnalysis/getDailySalesMoneyOrCountStatistics",
        data
      ).then(res => {
        let series = this.option1.series;
        let xAxis = this.option1.xAxis;
        // 金额买入
        series[0].data = res.data.buyMoneyStatistics.amountValue;
        // 金额买入时间
        xAxis[0].data = res.data.buyMoneyStatistics.subscript;
        // 金额卖出
        series[1].data = res.data.sellMoneyStatistics.amountValue;
        // 金额卖出时间
        xAxis[0].data = res.data.sellMoneyStatistics.subscript;
        this.option1 = {
          ...this.option1,
          ...{
            series
          },
          ...{
            xAxis
          }
        };
        this.myChart1.setOption(this.option1);
      });
    },
    // 每日买卖笔数统计
    getConut() {
      const data = {
        beginTime: this.data3,
        endTime: this.data4
      };
      this.$get(
        "/orderDataAnalysis/getDailySalesMoneyOrCountStatistics",
        data
      ).then(res => {
        let series = this.option2.series;
        let xAxis = this.option2.xAxis;
        // 金额买入
        series[0].data = res.data.buyMoneyStatistics.countValue;
        // 金额买入时间
        xAxis[0].data = res.data.buyMoneyStatistics.subscript;
        // 金额卖出
        series[1].data = res.data.sellMoneyStatistics.countValue;
        // 金额卖出时间
        xAxis[0].data = res.data.sellMoneyStatistics.subscript;
        this.option2 = {
          ...this.option2,
          ...{
            series
          },
          ...{
            xAxis
          }
        };
        this.myChart2.setOption(this.option2);
      });
    },
    // 每日买卖取消统计
    getCancel(){
      const data = {
        beginTime: this.data5,
        endTime: this.data6
      };
      this.$get(
        "/orderDataAnalysis/getDailySalesCancelStatistics",
        data
      ).then(res => {
        let series = this.option3.series;
        let xAxis = this.option3.xAxis;
        // 金额买入
        series[0].data = res.data.dailyBuyCancelStatistics.countValue;
        // 金额买入时间
        xAxis[0].data = res.data.dailyBuyCancelStatistics.subscript;
        // 金额卖出
        series[1].data = res.data.dailySellCancelStatistics.countValue;
        // 金额卖出时间
        xAxis[0].data = res.data.dailySellCancelStatistics.subscript;
        this.option3 = {
          ...this.option3,
          ...{
            series
          },
          ...{
            xAxis
          }
        };
        this.myChart3.setOption(this.option3);
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

    // 使用刚指定的配置项和数据显示图表。
    this.myChart1.setOption(this.option1);
    this.myChart2.setOption(this.option2);
    this.myChart3.setOption(this.option3);
  }
};
</script>
<style lang="less" scoped>
.active {
  background-color: #419eff;
}
.container {
  height: 1593px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .title {
    // width: 100%;
    overflow: hidden;
    height: 148px;
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
