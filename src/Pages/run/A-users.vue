<template>
  <div class="container">
    <div class="title">
      <div class="box">
        <div>A端用户总数量</div>
        <div>{{dataList.aTerminalAllUserQuantity}}</div>
      </div>
      <div class="box">
        <div>A端本周交易人数</div>
        <div>{{dataList.tradeUserQuantity}}</div>
      </div>
      <div class="box">
        <div>A端本周新增人数</div>
        <div>{{dataList.bTerminalRegisterQuantity}}</div>
      </div>
    </div>

    <div class="content2" style="marginTop:0">
      <div class="title-box">
        <div class="tips" @click="weekTime1"  :class="{active:index==1}">本周</div>
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
          <el-button type="primary" size="mini" @click="getDeal">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart1"></div>
    </div>

    <div class="content2">
      <div class="title-box">
        <div class="tips" @click="weekTime2"  :class="{active:index1==1}">本周</div>
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
          <el-button type="primary" size="mini" @click="getAdd">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart2"></div>
    </div>

    <div class="content2">
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
      index:1,
      index1:1,
      myChart1: "",
      myChart2: "",
      myChart3: "",
      data1: getWeekStartDate(),
      data2: getWeekEndDate(),
      data3: getWeekStartDate(),
      data4: getWeekEndDate(),
      dataList: {},
      option1: {
        color: ["#b6a2de"],
        title: {
          text: "注册用户量"
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
        color: ["#5ab1ef"],
        title: {
          text: "在线用户量"
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
      option3: {
        color: ["#2ec7c9"],
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
            name: "蒸发量",
            type: "bar",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      }
    };
  },
  created() {

    // 获取总数居
    this.$get("/userAnalysisData/getATerminalUserAnalysis").then(res => {
      this.dataList = res.data;
    });
    this.getDeal();
    this.getAdd();
    this.getRanking();
  },
  methods: {
     weekTime1() {
      this.data1 = getWeekStartDate();
      this.data2 = getWeekEndDate();
      this.index = 1;
      this.getDeal();
    },
    weekTime2() {
      this.data3 = getWeekStartDate();
      this.data4 = getWeekEndDate();
      this.index1 = 1;
      this.getAdd();
    },

    lastWeek1() {
      this.data1 = getLastWeekStartDate();
      this.data2 = getLastWeekEndDate();
      this.index = 2;
      this.getDeal();
    },
    lastWeek2() {
      this.data3 = getLastWeekStartDate();
      this.data4 = getLastWeekEndDate();
      this.index1 = 2;
      this.getAdd();
    },

    monthTime1() {
      this.data1 = getMonthStartDate();
      this.data2 = getMonthEndDate();
      this.index = 3;
      this.getDeal();
    },
    monthTime2() {
      this.data3 = getMonthStartDate();
      this.data4 = getMonthEndDate();
      this.index1 = 3;
      this.getAdd();
    },

    // 交易人数
    getDeal() {
      const data = {
        beginTime: this.data1,
        endTime: this.data2
      };
      this.$get("/userAnalysisData/getATerminalTradeUserGraph", data).then(
        res => {
          let series = this.option1.series;
          let xAxis = this.option1.xAxis;
          series[0].data = res.data.valueArrray;
          xAxis[0].data = res.data.dayList;
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
    // 新增人数量
    getAdd() {
      const data = {
        beginTime: this.data3,
        endTime: this.data4
      };
      this.$get("/userAnalysisData/getATerminalRegisterUserGraph", data).then(
        res => {
          let series = this.option2.series;
          let xAxis = this.option2.xAxis;
          series[0].data = res.data.valueArrray;
          xAxis[0].data = res.data.dayList;
          this.option2 = {
            ...this.option2,
            ...{
              series
            },
            ...{ xAxis }
          };
          this.myChart2.setOption(this.option2);
        }
      );
    },
    // 前十名项目方用户量排行
    getRanking() {
      this.$get("/userAnalysisData/getProjectSideUserGraph").then(res =>  {
        let series = this.option3.series;
        let xAxis = this.option3.xAxis;
        series[0].data = res.data.countValue
        xAxis[0].data = res.data.sub
        this.option3 = {
          ...this.option3,
          ...{
            series
          },
          ...{ xAxis }
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
    width: 100%;
    // height: 148px;
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
