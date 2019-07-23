<template>
  <div class="container">
    <div class="topBtn">
      <el-button type="warning" @click="goback()">返回</el-button>
      <el-button v-if="DetailData.status == 0" type="danger" @click="operation(2, DetailData.userId)">拒绝</el-button>
      <el-button v-if="DetailData.status == 0" type="primary" @click="operation(1, DetailData.userId)">通过</el-button>
    </div>
    <div class="reject" v-if="DetailData.status != 0" :class="{'green': DetailData.status == 1}">
        <span>{{DetailData.status | is_status}}</span>
        <span>审核人：<i>{{DetailData.auditorName}}</i></span>
    </div>
    <div class="box" :class="{'boxBG': DetailData.status != 0}">
      <div class="content" style="marginTop:0;">
        <span class="title">姓 名:</span>
        <span class="username">{{DetailData.userName}}</span>
      </div>
      <div class="content">
        <span class="title">证件类型:</span>
        <span class="username">{{DetailData.credentialsType | is_idType}}</span>
      </div>
      <div class="content">
        <span class="title">证件号码:</span>
        <span class="username">{{DetailData.credentialsNo}}</span>
      </div>
      <div class="content-img">
        <span class="title">证件信息:</span>
        <span class="img"><img :src="img_front" alt=""></span>
        <span class="img"><img :src="img_back" alt=""></span>
        <span class="img"><img :src="img_held" alt=""></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      DetailData: {},
      img_front: '~imgurl/id-front.png',
      img_back: '~imgurl/id-back.png',
      img_held: '~imgurl/id-held.png'
    }
  },
  created() {
    this.userId = this.$route.query.userId
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
        userId: this.userId,
      }
      this.$get(
        "/transactionDataQuery/getUserAuthenticationDetail", data).then(res => {
        var data = res.data
        this.DetailData = data.userInfo
        this.img_front = data.userInfo.credentialsAsurface
        this.img_back = data.userInfo.credentialsBsurface
        this.img_held = data.userInfo.holdCertificates
      })
    },
    // 通过/拒绝
    operation (tp, tl) {
      const data = {
        status: tp,
        userId: tl
      }
      this.$post(
        "/transactionDataQuery/updateUserAutherticationStatus", data).then(res => {
        var data = res.data
        this.getDetailData()
      })
    }
  }
}
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px 30px 0 30px;
  background-color: #f5f6fa;
  box-sizing: border-box;
  .el-button--warning,
  .el-button--danger,
  .el-button--primary {
    width: 60px;
    height: 28px;
    padding: 0;
    margin-right: 20px;
    margin-left: 0;
  }
  .el-button--danger,
  .el-button--primary {
    width: 100px;
  }
  .reject{
      height: 48px;
      margin-top: 24px;
      background-color: #FDC5D0;
      border-bottom: 1px solid #FD4859;
      padding-left: 30px;
      box-sizing: border-box;
      span {
          line-height: 48px;
          font-size: 16px;
          color: #FD4859;
          margin-right: 32px;
          i{
            font-size: 14px
          }
      }
  }
  .green{
    background-color: #E0F7EF;
    border-bottom: 1px solid #29C995;
    span{
      color: #29C995;
    }
  }
  .box {
    padding: 20px 30px 40px 30px;
    box-sizing: border-box;
    .content {
      height: 21px;
      margin-top: 30px;
      .title {
        display: inline-block;
        height: 21px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
      }
      .username {
        font-size: 14px;
        color: #253444;
        margin-left: 20px;
      }
    }
    .content-img {
      height: 142px;
      width: 100%;
      margin-top: 30px;
      display: flex;
      .title {
        display: inline-block;
        height: 142px;
        width: 78px;
        color: #979dac;
        font-size: 14px;
        text-align: right;
        margin-right: 20px;
      }
      .img {
        display: inline-block;
        background-color: #e5e9f0;
        width: 222px;
        height: 142px;
        margin-right: 20px;
        img{
          width: 222px
        }
      }
    }
  }
  .boxBG{
    background-color: #fFF
  }
}
</style>
