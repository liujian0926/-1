<template>
  <div id="echarts2"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    obj: {
      type: Object,
      default: {}
    }
  },
  watch: {
    obj: {
      handler(value) {
        let series = this.option.series;
        let xAxis = this.option.xAxis;
        // 金额买入
        series[0].data = value.buyAmountLineGraph.countValue;
        // 金额买入时间
        xAxis[0].data = value.buyAmountLineGraph.subscript;
        // 金额卖出
        series[1].data = value.sellAmountLineGraph.countValue;
        // 金额卖出时间
        xAxis[0].data = value.sellAmountLineGraph.subscript;
        this.option = {
          ...this.option,
          ...{
            series
          },
          ...{
            xAxis
          }
        };
        this.myChart.setOption(this.option);
      },
      deep: true
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("echarts2"));
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option);
  },
  data() {
    return {
      myChart:'',
      option: {
        title: {
          text: "买卖笔数线图"
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
      }
    };
  }
};
</script>


<style lang="less" scoped>
#echarts2 {
  float: left;
  width: 100%;
  height: 379px;
  margin-right: 26px;
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px 24px 24px 24px;
  box-sizing: border-box;
}
</style>
