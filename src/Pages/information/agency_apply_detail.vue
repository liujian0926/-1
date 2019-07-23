<template>
  <div class="container">
    <div class="section1">
      <div class="topBtn">
        <el-button type="warning" @click="goback()">返回</el-button>
        <el-button v-if="detailData.pass = 0" type="danger" @click="operation(2, detailData.userId)">手动通过</el-button>
        <el-button v-if="detailData.pass = 2" type="primary" @click="operation(0, detailData.userId)">撤回</el-button>
      </div>
      <div class="content">
        <span class="title">已缴代理费:</span>
        <span class="username">{{detailData.deposit}}</span>
      </div>
      <div class="content">
        <span class="title">名称:</span>
        <span class="username">{{detailData.agencyName}}</span>
      </div>
      <div class="content">
        <span class="title">账号:</span>
        <span class="username">{{detailData.userId}}</span>
      </div>
      <div class="content">
        <span class="title">类型:</span>
        <span class="username">{{detailData.agencyType | isAgencyType}}</span>
      </div>
      <div class="content">
        <span class="title">邮箱:</span>
        <input type="text" v-model="email" :placeholder="email1">
      </div>
      <div class="content">
        <span class="title">代理名称:</span>
        <input type="text" v-model="agencyName" :placeholder="agencyName1">
      </div>

      <div class="content">
        <span class="title">官方链接:</span>
        <input type="text" v-model="gfLink" :placeholder="gfLink1">
      </div>
      <div class="content">
        <span class="title">联系人:</span>
        <input type="text" v-model="contact" :placeholder="contact1">
      </div>
      <div class="content">
        <span class="title">联系电话:</span>
        <input type="text" v-model="phone" :placeholder="phone1">
      </div>
      <div class="content">
        <span class="title">微信账号:</span>
        <input type="text" v-model="wxNum" :placeholder="wxNum1">
      </div>
      <div class="content_brief">
        <span class="title">代理简介:</span>
        <textarea name id cols="30" rows="10" class="brief" v-model="ref" :placeholder="ref1"></textarea>
      </div>
      <div class="content_btn">
        <el-button type="primary" @click="save()">保存修改</el-button>
      </div>
    </div>

    <div class="section2">
      <div class="content1">
        <span>每笔交易可获得收益百分比</span>
      </div>

      <div class="content2">
        <span>代理收益百分比</span>
        <input type="text" v-model="percentage" :placeholder="percentage1">
        <span>%</span>
      </div>
      <el-button type="primary" @click="save()">保存修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      agencyid: '',
      detailData: {},
      email: '',
      agencyName: '',
      gfLink: '',
      contact: '',
      phone: '',
      wxNum: '',
      ref: '',
      percentage: '',
      email1: '',
      agencyName1: '',
      gfLink1: '',
      contact1: '',
      phone1: '',
      wxNum1: '',
      ref1: '',
      percentage1: ''
    }
  },
  created() {
    this.agencyid = this.$route.query.userId
    this.getDetailData()
  },
  methods: {
    // 返回
    goback () {
      this.$router.go(-1)
    },
    // 获取详细信息
    getDetailData () {
      const data = {
        userId: this.agencyid,
      }
      this.$get(
        "/transactionDataQuery/selectAgencyInfoByUserId", data).then(res => {
        var data = res.data
        this.detailData = data
        this.email1 = data.email
        this.agencyName1 = data.agencyName
        this.gfLink1 = data.websit
        this.contact1 = data.contacts
        this.phone1 = data.mobile
        this.wxNum1 = data.wechatNo
        this.ref1 = data.agencyInfo
        this.percentage1 = data.profitsRate
      })
    },
    // 代理申请详情修改
    save () {
       const data = {
        userId: this.agencyid,
        email: this.email,
        agencyName: this.agencyName,
        website: this.gfLink,
        contacts: this.contact,
        mobile: this.phone,
        wechatNo: this.wxNum,
        agencyInfo: this.ref,
        profitsRate: this.percentage
      }
      this.$post(
        "/transactionDataQuery/updateAgencyAuthInfo", data).then(res => {
        var data = res.data
        this.getDetailData()
        this.$message.success('修改成功')
      })
    },
    // 代理申请审核
    operation (tp, tl) {
      const data = {
        pass: tp,
        userId: tl
      }
      this.$post(
        "/transactionDataQuery/updateAgencyInfoStatus", data).then(res => {
        var data = res.data
        this.$message.success(data)
        this.getDetailData()
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 796px;
  background-color: #fff;
  .section1 {
    width: 100%;
    padding: 26px 0 30px 30px;
    border-bottom: 1px solid #cbcfdc;
    box-sizing: border-box;
    .el-button--warning, .el-button--danger, .el-button--primary{
      padding: 10px 20px;
      font-size: 12px;
      margin-bottom: 10px;
      border-radius: 2px;
    }
    .el-button--warning{
      background-color: #fdb44d;
      margin-right: 10px
    }
    .content {
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
    .content_btn{
      padding: 0 108px 0;
      margin-top: 30px;
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
