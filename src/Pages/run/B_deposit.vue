<template>
  <div class="container">
    <div class="title">
      <div class="box">
        <div>本周新增缴纳金额</div>
        <div>{{dataList.newlyAddedPayUserMoney}}</div>
      </div>

      <div class="box">
        <div>缴纳比例</div>
        <div>{{dataList.rate}}</div>
      </div>
      <div class="box">
        <div>缴纳保证金人数</div>
        <div>{{dataList.bTerminalPayBondUserNumber}}</div>
      </div>
      <div class="box">
        <div>缴纳保证金金额</div>
        <div>{{dataList.payBondAmount}}</div>
      </div>
      <div class="box">
        <div>本周退缴金额</div>
        <div>{{dataList.refundBondAmount}}</div>
      </div>
        <div class="box">
        <div>本周新增缴纳人数</div>
        <div>{{dataList.newlyAddedPayUserCount}}</div>
      </div>
    </div>

    <div class="content2" style="marginTop:0">
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
          ></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData1">查询</el-button>
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
          ></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData2">查询</el-button>
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
          ></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData3">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart3"></div>
    </div>

    <div class="content2">
      <div class="title-box">
        <div class="tips" @click="weekTime4" :class="{active:index3==1}">本周</div>
        <div class="tips" @click="lastWeek4" :class="{active:index3==2}">上周</div>
        <div class="tips" @click="monthTime4" :class="{active:index3==3}">本月</div>
        <div class="date_box">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="data7"
            style="width: 100%;"
            size="mini"
          ></el-date-picker>
        </div>
        <div class="lines">-</div>
        <div class="date_box">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="data8"
            style="width: 100%;"
            size="mini"
          ></el-date-picker>
        </div>
        <div style="marginLeft:16px;">
          <el-button type="primary" size="mini" @click="getData4">查询</el-button>
        </div>
      </div>
      <div class="echart" ref="echart4"></div>
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
      index:1,
      index1:1,
      index2:1,
      index3:1,
      myChart1:'',
      myChart2:'',
      myChart3:'',
      myChart4:'',
      data1: getWeekStartDate(),
      data2: getWeekEndDate(),
      data3: getWeekStartDate(),
      data4: getWeekEndDate(),
      data5: getWeekStartDate(),
      data6: getWeekEndDate(),
      data7: getWeekStartDate(),
      data8: getWeekEndDate(),
      dataList: {},
      option1: {
        color: ["#b6a2de"],
        title: {
          text: "缴纳保证金人数"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
            data: [30, 182, 434, 791, 390, 30, 10]
          }
        ]
      },
      option2: {
        color: ["#5ab1ef"],
        title: {
          text: "缴纳保证金金额"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
            data: [30, 182, 434, 791, 390, 30, 10]
          }
        ]
      },
      option3: {
        color: ["#2ec7c9"],
        title: {
          text: "退缴保证金人数"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
            data: [30, 182, 434, 791, 390, 30, 10]
          }
        ]
      },
      option4: {
        color: ["#5ab1ef"],
        title: {
          text: "退缴保证金金额"
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
            data: [30, 182, 434, 791, 390, 30, 10]
          }
        ]
      }
    };
  },
  created(){
    // 获取总数居
    this.$get('/bTerminalBondAnalysis/getTerminalBondData').then(res=>{
      this.dataList = res.data
    })
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
  },
  methods:{
    weekTime1() {
      this.data1 = getWeekStartDate();
      this.data2 = getWeekEndDate();
      this.index = 1;
      this.getData1();
    },
    weekTime2() {
      this.data3 = getWeekStartDate();
      this.data4 = getWeekEndDate();
      this.index1 = 1;
      this.getData2();
    },
    weekTime3() {
      this.data5 = getWeekStartDate();
      this.data6 = getWeekEndDate();
      this.index2 = 1;
      this.getData3();
    },
    weekTime4() {
      this.data7 = getWeekStartDate();
      this.data8 = getWeekEndDate();
      this.index3 = 1;
      this.getData4();
    },
    lastWeek1() {
      this.data1 = getLastWeekStartDate();
      this.data2 = getLastWeekEndDate();
      this.index = 2;
      this.getData1();
    },
    lastWeek2() {
      this.data3 = getLastWeekStartDate();
      this.data4 = getLastWeekEndDate();
      this.index1 = 2;
      this.getData2();
    },
    lastWeek3() {
      this.data5 = getLastWeekStartDate();
      this.data6 = getLastWeekEndDate();
      this.index2 = 2;
      this.getData3();
    },
     lastWeek4() {
      this.data7 = getLastWeekStartDate();
      this.data8 = getLastWeekStartDate();
      this.index3 = 2;
      this.getData4();
    },
    monthTime1() {
      this.data1 = getMonthStartDate();
      this.data2 = getMonthEndDate();
      this.index = 3;
      this.getData1();
    },
    monthTime2() {
      this.data3 = getMonthStartDate();
      this.data4 = getMonthEndDate();
      this.index1 = 3;
      this.getData2();
    },
    monthTime3() {
      this.data5 = getMonthStartDate();
      this.data6 = getMonthEndDate();
      this.index2 = 3;
      this.getData3();
    },
      monthTime4() {
      this.data7 = getMonthStartDate();
      this.data8 = getMonthEndDate();
      this.index3 = 3;
      this.getData4();
    },
    // 缴纳保证金人数
    getData1(){
      const data = {
        beginTime: this.data1,
        endTime: this.data2
      };
      this.$get(
        "/bTerminalBondAnalysis/getPaBondUserCount",
        data
      ).then(res => {
        let series = this.option1.series;
        let xAxis = this.option1.xAxis;
        // 金额买入
        series[0].data = res.data.valueArrray;
        // 金额买入时间
        xAxis[0].data = res.data.dayList;

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
    // 缴纳保证金金额
    getData2(){
       const data = {
        beginTime: this.data3,
        endTime: this.data4
      };
      this.$get(
        "/bTerminalBondAnalysis/getPayBondUserMoney",
        data
      ).then(res => {
        let series = this.option2.series;
        let xAxis = this.option2.xAxis;
        // 金额买入
        series[0].data = res.data.valueArrray;
        // 金额买入时间
        xAxis[0].data = res.data.dayList;

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
  // 退缴保证金人数
     getData3(){
       const data = {
        beginTime: this.data5,
        endTime: this.data6
      };
      this.$get(
        "/bTerminalBondAnalysis/getRefundBondUserCount",
        data
      ).then(res => {
        let series = this.option3.series;
        let xAxis = this.option3.xAxis;
        // 金额买入
        series[0].data = res.data.valueArrray;
        // 金额买入时间
        xAxis[0].data = res.data.dayList;

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
    },
    // 退缴保证金金额
     getData4(){
       const data = {
        beginTime: this.data7,
        endTime: this.data8
      };
      this.$get(
        "/bTerminalBondAnalysis/getRefundBondUserMoney",
        data
      ).then(res => {
        let series = this.option4.series;
        let xAxis = this.option4.xAxis;
        // 金额买入
        series[0].data = res.data.valueArrray;
        // 金额买入时间
        xAxis[0].data = res.data.dayList;

        this.option4 = {
          ...this.option4,
          ...{
            series
          },
          ...{
            xAxis
          }
        };
        this.myChart4.setOption(this.option4);
      });
    },
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var echart2 = this.$refs.echart2;
    this.myChart2 = echarts.init(echart2);

    var echart3 = this.$refs.echart3;
    this.myChart3 = echarts.init(echart3);
    var echart4 = this.$refs.echart4;
    this.myChart4 = echarts.init(echart4);
    // 使用刚指定的配置项和数据显示图表。
    this.myChart1.setOption(this.option1);
    this.myChart2.setOption(this.option2);
    this.myChart3.setOption(this.option3);
    this.myChart4.setOption(this.option4);
  }
};
</script>
<style lang="less" scoped>
.active {
  background-color: #419eff;
}
.container {
  height: 2000px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .title {
    overflow: hidden;
    width: 100%;
    // height: 148px;
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
    position: relative;
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
