
<template>
  <div class="container">
    <div class="title">
      <img src="../assets/images/logo.png" alt />
    </div>

    <el-form
      class="login-form"
      label-width="80px"
      label-position="right"
      :model="loginForm"
      ref="loginForm"
    >
      <el-form-item label="账号">
        <el-input v-model="loginForm.username" placeholder="请输入您的账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.enter="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      ischecked: 0,
      isAreey: []
    };
  },
  created() {
    this.ischecked++;
    this.isAreey.push(this.ischecked);
  },
  // 方法
  methods: {
    submit() {
      const data = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };
      this.$post("/login", data)
        .then(res => {
          if (res.code === 200) {
            this.$message.success("登录成功");
            this.$router.push("/index");
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", this.loginForm.username);
          }
        })
        .catch(req => {
          this.$message.error(req.data.msg);
        });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../assets/images/loginbgc.jpg") no-repeat center/cover;
  .title {
    height: 58px;
    margin-bottom: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 400px;
      height: 58px;
    }
  }
}
</style>

