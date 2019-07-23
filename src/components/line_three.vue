<template>
  <div id="echarts3"></div>
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
        series[0].data = value.amountValue
        xAxis[0].data = value.subscript
        this.option = {
          ...this.option,
          ...{
            series
          },
          ...{
            xAxis
          }
        }
        this.myChart.setOption(this.option);
      }
    },
    deep: true
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("echarts3"));
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option);
  },
  data() {
    return {
      myChart: "",
      option: {
        title: {
          text: "缴纳保证金"
        },
        color: ["#5ab1ef"],
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
            name: "买入",
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
#echarts3 {
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
