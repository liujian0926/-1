<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>

    <div class="content">
      <span class="title">公告标题:</span>
      <span class="username">{{detail.noticeTitle}}</span>
    </div>
    <div class="content">
      <span class="title">标题摘要:</span>
      <span class="username">{{detail.noticeAbstract}}</span>
    </div>
    <div class="content">
      <span class="title">公告类型:</span>
      <span class="username">
        <template>
         <span v-if="detail.noticeType==0">通知消息</span>
         <span v-else-if="detail.noticeType==1">版本更新</span>
         <span v-else-if="detail.noticeType==2">营销活动</span>
        </template>
      </span>
    </div>
    <div class="content-img">
      <span class="title"></span>
      <div class="img">
        <div class="title">
          <div class="content">
            <span>公告标题</span>
            <span ref="content">{{content}}</span>
          </div>
        </div>
        <div
          class="notice"></div>
        <span class="time">{{detail.updateTime}}时间</span>
        <span class="read">{{detail.readerCount}}已读</span>
        <span class="unread">{{detail.unreadCount}}未读</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //获取传递过来的参数id
      noticeId:{noticeId:this.$route.query.id},
      //本页变数据
      detail:{},
      content:""
    }
  },
  created(){
   this.getDetail()
   console.log(this.$refs)
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    getDetail(){
      this.$get("/api/info/getNotice",this.noticeId).then(res=>{
        console.log(res)
        this.detail=res.result
        this.content=res.result.noticeContent.replace(/<[^>]+>/g,"")
       
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 696px;
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
    margin-bottom: 10px;
  }
  .el-button--danger,
  .el-button--primary {
    width: 100px;
  }

  .content {
    height: 21px;
    margin-top: 10px;
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
      background-color: #fff;
      width: 300px;
      height: 450px;
      margin-right: 20px;
      padding: 20px;
      box-sizing: border-box;
      .title {
        width: 100%;
        height: 44px;
        display: flex;
        .content {
          height: 44px;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          span {
            height: 22px;
            line-height: 22px;
            text-align: left;
            margin-left: 10px;
          }
          span:nth-of-type(1) {
            font-size: 16px;
            color: #419eff;
          }
          span:nth-of-type(2) {
            font-size: 14px;
            color: #253444;
          }
        }
      }
      .title::before {
        display: block;
        content: "";
        height: 44px;
        width: 8px;
        background-color: #419eff;
      }
      .notice {
        margin-top: 39px;
        width: 260px;
        height: 304px;
        color: #979dac;
        word-wrap: break-word;
        overflow: auto;
      }
      .time {
        display: inline-block;
        font-size: 12px;
        color: #cbcfdc;
        width: 76px;
        height: 17px;
        line-height: 17px;
      }
      .read {
        display: inline-block;
        font-size: 12px;
        color: #cbcfdc;
        width: 56px;
        height: 17px;
        line-height: 17px;
        margin-right: 10px;
        margin-left: 62px;
      }
      .unread {
        display: inline-block;
        font-size: 12px;
        color: #cbcfdc;
        width: 56px;
        height: 17px;
        line-height: 17px;
        text-align: right;
      }
    }
  }
}
</style>
