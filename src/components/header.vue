<template>
  <el-header style="height:64px;" class="header">
    <div class="left">
      <img src="../assets/images/top-control.svg" alt>
      <span>控制台</span>
    </div>
    <div class="right">
      <img class="man" src="../assets/images/man.png" alt>
      <span>{{userName}}</span>
      <img class="out" src="../assets/images/out.png" alt @click="loginOut">
    </div>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  created() {
    this.userName = localStorage.getItem("username");
  },
  methods: {
    loginOut () {
       const data = {
        token: localStorage.getItem("token"),
      }
      this.$post("/exit", data).then(res => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        this.$message.success('退出成功')
        this.$router.push('/')
      })
    }
  }
};
</script>

<style lang="less" scoped>
// .header {
.my-header {
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  .left {
    height: 100%;
    line-height: 64px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-right: 3px;
    }
    span {
      color: #979dac;
      height: 100%;
      line-height: 64px;
    }
  }

  .right {
    height: 64px;
    line-height: 64px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    .man {
      margin-right: 8px;
    }

    .out {
      margin-left: 23px;
    }
  }
}
.el-header {
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  .left {
    height: 100%;
    line-height: 64px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-right: 3px;
    }
    span {
      color: #979dac;
      height: 100%;
      line-height: 64px;
    }
  }

  .right {
    height: 64px;
    line-height: 64px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    .man {
      margin-right: 8px;
    }

    .out {
      margin-left: 23px;
      cursor: pointer;
    }
  }
}
</style>
