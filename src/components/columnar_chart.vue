<template>
  <div id="echart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    obj: {
      type: Object,
      // default: {}
    }
  },
  watch: {
    obj: {
      handler(val) {
        let series = this.option.series
        let xAxis = this.option.xAxis;

        series[0].data = val.buyMoney
        series[1].data = val.sellMoney
        xAxis[0].data = val.sub
        
        this.option = {
          ...this.option,
          ...{
            series
          }
        }
        this.myChart.setOption(this.option);
      },
      deep: true
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("echart"));
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option);
  },
  data() {
    return {
      myChart: null,
      option: {
        color: [
          "#2ec7c9",
          "#b6a2de"
        ],
        title: {
          text: "项目方买卖金额排行",
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["买入", "卖出"],
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
            name: "买入",
            type: "bar",
            data: [],
          },
          {
            name: "卖出",
            type: "bar",
            data: [],
          }
        ]
      }
    };
  }
};
</script>


<style lang="less" scoped>
#echart {
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
