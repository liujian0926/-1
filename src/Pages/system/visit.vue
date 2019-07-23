<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <el-form  class="self-form">
      <el-form-item label="原密码:">
        <el-input v-model="newForm.pwdOld" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input v-model="newForm.pwdNew" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="setNewpswd">保存修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     newForm:{
       pwdOld:"",
       pwdNew:""
     }
    };
  },

  methods:{
    setNewpswd(){
      this.$post("/api/wallet/updateWalletPwd",this.newForm).then(res=>{
        console.log(res)
        if(res.code==200){
           this.$message('修改成功');
        }
      }).catch(err=>{
           this.$message(err.data.msg)
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
      width: 80px;
      height: 32px;
      padding: 0;
      border-radius: 2px;
    }
  }
}
</style>
