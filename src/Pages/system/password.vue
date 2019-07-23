<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <el-form class="self-form">
      <el-form-item label="账号:">
        <el-input v-model="formItem.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="formItem.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
        
       <el-button type="primary" @click="visitpswd">访问资金密码</el-button>
      
      
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     formItem:{
       username:"",
       password:"",
     }
    }
  },
  methods:{
  visitpswd(){
    this.$post("/api/wallet/checkNameAndPwd",this.formItem).then(res=>{
      console.log(res)
      if(res.code==200){
        this.$router.push({path:"visit"})
      }
    })
  },
  goback(){
    this.$router.go(-1)
  }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
  padding: 20px 30px 0 30px;
  box-sizing: border-box;
  .el-button--warning {
    width: 60px;
    height: 28px;
    padding: 0;
    border-radius: 2px;
  }
  .self-form {
    .el-button--primary {
      margin-top: 20px;
      margin-left: 80px;
      width: 126px;
      height: 32px;
      padding: 0;
      border-radius: 2px;
    }
  }
}
</style>
