<template>
  <div class="container">
    <div class="title">
      <div class="box">
        <div>本周卖出金额</div>
        <div>{{dataObj.weekSellMoney}}</div>
      </div>
      <div class="box">
        <div>本周缴纳保证金</div>
        <div>{{dataObj.payBondAmount}}</div>
      </div>
      <div class="box">
        <div>本周代理提成</div>
        <div>{{dataObj.agencyCommissionWeek}}</div>
      </div>
      <div class="box">
        <div>本周买入金额</div>
        <div>{{dataObj.weekBuyMoney}}</div>
      </div>
      <div class="box">
        <div>本周买入单数</div>
        <div>{{dataObj.weekBuyCount}}</div>
      </div>
      <div class="box">
        <div>本周卖出单数</div>
        <div>{{dataObj.weekSellCount}}</div>
      </div>
      <div class="box">
        <div>本周团队奖励金额</div>
        <div>{{dataObj.weekTeamReward}}</div>
      </div>
      <div class="box">
        <div>本周总利润</div>
        <div>{{dataObj.platformIntegralBenefitsThisWeek}}</div>
      </div>
    </div>

    <!-- 图表区域 -->

    <div class="content" style="marginTop:0">
      <!-- 项目方买卖金额排行 -->
      <div class="first">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data1"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData1"
          >></el-date-picker>
        </div>
        <eccolumnar :obj="chartObj1"></eccolumnar>
      </div>

      <!-- 买卖金额线图 -->
      <div class="second">
        <div class="date-box">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="data2"
            style="width: 100%;"
            size="mini"
            value-format="yyyy-MM"
            @change="getData2"
          >></el-date-picker>
        </div>
        <line-one :obj="chartObj2"></line-one>
      </div>
    </div>

    <div class="content1">
      <!-- 买卖笔数线图 -->
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
        <Line-two :obj="chartObj3"></Line-two>
      </div>

      <!-- 缴纳保证金 -->
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
        <Line-three :obj="chartObj4"></Line-three>
      </div>
    </div>

    <div class="content2">
      <!-- 平台利润 -->
      <div class="title-box">
         <div class="tips" @click="weekTime1" :class="{active:index==1}">本周</div>
        <div class="tips" @click="lastWeek1" :class="{active:index==2}">上周</div>
        <div class="tips" @click="monthTime1" :class="{active:index==3}">本月</div>
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
          <el-button type="primary" size="mini" @click="getData5">查询</el-button>
        </div>
      </div>
      <acreage-chart :obj="chartObj5"></acreage-chart>
    </div>
  </div>
</template>
<script>
import {
  getWeekStartDate,
  getWeekEndDate,
  getLastWeekStartDate,
  getLastWeekEndDate,
  getMonthStartDate,
  getMonthEndDate
} from "../../assets/js/format.js";
import eccolumnar from "../../components/columnar_chart";
import LineOne from "../../components/line_one";
import LineTwo from "../../components/line_two";
import LineThree from "../../components/line_three";
import acreageChart from "../../components/acreage_chart";
import { constants } from "crypto";
export default {
  components: { eccolumnar, LineOne, LineTwo, LineThree, acreageChart },
  data() {
    return {
      index:1,
      chartObj1: {},
      chartObj2: {},
      chartObj3: {},
      chartObj4: {},
      chartObj5: {},
      dataObj: {},
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: getWeekStartDate(),
      data6: getWeekEndDate()
    };
  },
  created() {
    this.getCurrentDate();
    // 获取观察台数据
    this.$get("/operationalAnalysisData/getBenefitAnalysisOfPlatform").then(
      res => {
        this.dataObj = res.data;
      }
    );
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
  },
  mounted() {},
  methods: {
     weekTime1() {
      this.data5 = getWeekStartDate();
      this.data6 = getWeekEndDate();
      this.index = 1;
      this.getData5();
    },

    lastWeek1() {
      this.data5 = getLastWeekStartDate();
      this.data6 = getLastWeekEndDate();
      this.index = 2;
      this.getData5();
    },

    monthTime1() {
      this.data5 = getMonthStartDate();
      this.data6 = getMonthEndDate();
      this.index = 3;
      this.getData5();
    },

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
    },
    // 项目方金额买卖排行数据
    getData1() {
      const data = { time: this.data1 };
      this.$get(
        "/operationalAnalysisData/getProjectSideAmountRanking",
        data
      ).then(res => {
        this.chartObj1 = res.data;
      });
    },

    // 买卖金额
    getData2() {
      const data = { time: this.data2 };
      this.$get("/operationalAnalysisData/getAmountLineGraph", data).then(
        res => {
          this.chartObj2 = res.data;
        }
      );
    },
    // 笔数线图
    getData3() {
      const data = { time: this.data3 };
      this.$get("/operationalAnalysisData/getAmountLineGraph", data).then(
        res => {
          this.chartObj3 = res.data;
        }
      );
    },
    getData4() {
      const data = { time: this.data4 };
      this.$get("/operationalAnalysisData/getPayDepositLineGraph", data).then(
        res => {
          this.chartObj4 = res.data;
        }
      );
    },
    // 平台利润
    getData5() {
      const data = {
        beginTime:this.data5,
        endTime:this.data6
       };
      this.$get("/operationalAnalysisData/getPlatformProfitLineGraph", data).then(
        res => {
          this.chartObj5 = res.data;
        }
      );
    }
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
      padding: 30px 0 0 40px;
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

  .content1 {
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
        top: 12px;
        right: 18px;
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
        width: 105px;
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
}
</style>
