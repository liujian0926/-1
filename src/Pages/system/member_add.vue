<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <el-form class="self-form">
       <el-form-item label="帐号:">
        <el-input v-model="formItem.username" placeholder="请输入新增的帐号" ></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="formItem.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="formItem.mobile" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="是否在职:">
        <el-select v-model="formItem.onJob" placeholder="请选择" @change="JOB(formItem.onJob)">
          <el-option
            v-for="item in optionsonJob"
            :key="item.value"
            :label="item.value"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间:">
        <!-- <el-input v-model="formItem.joinTime" placeholder="请输入内容"></el-input> -->
       <el-date-picker
         style="cursor:pointer"
         v-model="formItem.joinTime"
         type="date"
         placeholder="选择日期"
         value-format="yyyy-MM-dd">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="账号状态:">
        <el-select v-model="formItem.status" placeholder="请选择" @change="status(formItem.status)">
          <el-option
            v-for="item in optionsstatus"
            :key="item.value"
            :label="item.value"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色权限:">
        <el-select v-model="formItem.roleId" placeholder="请选择" @change="rolelds(formItem.roleId)">
          <el-option
            v-for="item in optionsrolelds"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录密码:">
        <el-input v-model="formItem.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="资金密码:">
        <el-input v-model="formItem.walletPwd" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addItem(formItem)">新增</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     formItem:{
       onJob:"",
       status:"",
       roleId:"",
       username:"",
       name:"",
       mobile:"",
       joinTime:"",
       password:"",
       walletPwd:""
     },
     optionsonJob:[{name:1,value:"在职"},{name:2,value:"离职"}],
     optionsstatus:[{name:0,value:"禁用"},{name:1,value:"正常"}],
     optionsrolelds:[],
    }
  },
  created(){
   this.getrolelds()
  },
  methods:{
  //是否在职
  JOB(val){
    console.log(val)
  },
  //帐号状态
  status(val){
   console.log(val)
  },
  //角色权限
  rolelds(val){
   console.log(val)
  },
  //获取角色权限
  getrolelds(){
   this.$get("/sys/role/roleListSelectNoAll").then(res=>{
     console.log(res)
     this.optionsrolelds=res.data
   })
  },
  //点击新增
  addItem(formItem){
    this.$post("/sys/user/save",this.formItem).then(res=>{
      console.log(res)
      if(res.code==200){
        this.$message("新增成功")
      }
    }).catch(err=>{
       this.$message(err.data.msg)
    })
  },
  //点击返回
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
    .title {
      margin-bottom: 16px;
      span:nth-of-type(1) {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin-right: 20px;
        width: 60px;
        font-size: 14px;
        color: #979dac;
        text-align: right;
      }
    }
  }
}
</style>
