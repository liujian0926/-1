<template>
  <div id="echart4"></div>
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
          ...{series},
          ...{xAxis}
        }
        this.myChart.setOption(this.option);
      },
      deep: true
    }
  },
  data() {
    return {
      myChart: "",
      option: {
        color: ["#b6a2de"],
        title: {
          text: "平台利润"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["意向"]
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
            name: "成交",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("echart4"));
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option);
  }
};
</script>


<style lang="less" scoped>
#echart4 {
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
