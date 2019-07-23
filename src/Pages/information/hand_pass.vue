<template>
  <div class="container">
    <div class="section1">
      <el-button type="warning">返回</el-button>
      <el-button type="primary" class="btn">手动通过</el-button>
      <div class="content">
        <span class="title">已缴代理费:</span>
        <span class="username">HANK</span>
      </div>
      <div class="content">
        <span class="title">名称/ID:</span>
        <span class="username">2345456</span>
      </div>
      <div class="content">
        <span class="title">账号:</span>
        <span class="username">2345456</span>
      </div>
      <div class="content">
        <span class="title">类型:</span>
        <span class="username">2345456</span>
      </div>
      <div class="content">
        <span class="title">邮箱:</span>
        <input type="text">
      </div>
      <div class="content">
        <span class="title">代理名称:</span>
        <input type="text">
      </div>

      <div class="content">
        <span class="title">官方链接:</span>
        <input type="text">
      </div>
      <div class="content">
        <span class="title">联系人:</span>
        <input type="text">
      </div>
      <div class="content">
        <span class="title">联系电话:</span>
        <input type="text">
      </div>
      <div class="content">
        <span class="title">微信账号:</span>
        <input type="text">
      </div>
      <div class="content_brief">
        <span class="title">代理简介:</span>
        <textarea name id cols="30" rows="10" class="brief" placeholder="请输入简介内容"></textarea>
      </div>
      <el-button type="primary">保存修改</el-button>
    </div>

    <div class="section2">
      <div class="content1">
        <span>每笔交易可获得收益百分比</span>
      </div>

      <div class="content2">
        <span>代理收益百分比</span>
        <input type="text">
        <span>%</span>
      </div>
      <el-button type="primary">保存修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        title: {
          text: "某楼盘销售情况",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["意向", "预购", "成交"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
            name: "成交",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [10, 12, 21, 54, 260, 830, 710]
          },
          {
            name: "预购",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [30, 182, 434, 791, 390, 30, 10]
          },
          {
            name: "意向",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [1320, 1132, 601, 234, 120, 90, 20]
          }
        ]
      },

      form: {
        data1: "",
        data2: ""
      },
      activeName: "first",
      radio: "1",
      dataList: [
        {
          date: "2019-20",
          name: "ccc"
        }
      ],
      dataList1: [{}, {}, {}, {}, {}, {}, {}]
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById("chart1"));
    // var myChart2 = echarts.init(document.getElementById("chart2"));
    // var myChart3 = echarts.init(document.getElementById("chart3"));
    myChart1.setOption(this.option);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 796px;
  background-color: #fff;
  .section1 {
    height: 603px;
    width: 100%;
    padding: 26px 0 0 30px;
    border-bottom: 1px solid #cbcfdc;
    box-sizing: border-box;
    .el-button--warning {
      width: 60px;
      height: 28px;
      font-size: 12px;
      padding: 0;
      margin-bottom: 10px;
      border-radius: 2px;
      background-color: #fdb44d;
    }
    .el-button--primary {
      width: 80px;
      height: 32px;
      font-size: 12px;
      padding: 0;
      margin-top: 20px;
      border-radius: 2px;
      margin-left: 110px;
    }
    .btn {
      width: 80px;
      height: 28px;
      font-size: 12px;
      padding: 0;
      margin-top: 0px;
      border-radius: 2px;
      margin-left: 20px;
    }
    .content {
      height: 21px;
      margin-top: 13px;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
        margin-right: 30px;
      }
      span {
        color: #253444;
        font-size: 14px;
      }
      input {
        height: 20px;
        width: 280px;
      }
    }

    .content_brief {
      height: 105px;
      margin-top: 20px;
      display: flex;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        text-align: right;
        margin-right: 30px;
      }
      .brief {
        outline: none;
        height: 105px;
        width: 280px;
      }
    }
  }
  .section2 {
    height: 192px;
    width: 100%;
    padding: 40px 0 0 36px;
    box-sizing: border-box;
    .content1 {
      height: 22px;
      width: 100%;
      display: flex;
      align-items: center;
      span {
        margin-right: 32px;
        font-size: 14px;
        color: #979dac;
      }
    }

    .content2 {
      margin-top: 16px;
      span {
        color: #979dac;
        font-size: 14px;
        height: 28px;
        line-height: 28px;
        margin-right: 24px;
      }
      input {
        width: 54px;
        margin-right: 8px;
      }
    }
    .el-button--primary {
      width: 80px;
      height: 32px;
      font-size: 12px;
      padding: 0;
      margin-top: 24px;
      border-radius: 2px;
    }
  }
}
</style>
