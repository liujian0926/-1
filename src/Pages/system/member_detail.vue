<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <el-form class="self-form">
       <el-form-item label="帐号:">
        {{formItem.username}}
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
       <el-date-picker
         style="cursor:pointer"
         v-model="formItem.joinTime"
         type="date"
         placeholder="选择日期"
         >
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
        <el-select v-model="formItem.roleName" placeholder="请选择" @change="rolelds(formItem.roleName)">
          <el-option
            v-for="item in optionsroleld"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改密码:">
        <el-input v-model="formItem.paw" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="updata">修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     formItem:{},
     optionsonJob:[{name:1,value:"在职"},{name:2,value:"离职"}],
     optionsstatus:[{name:0,value:"禁用"},{name:1,value:"正常"}],
     optionsroleld:[],
     //接收传递过来的参数
     id:{id:this.$route.query.id},
     //提交的参数
     updataItem:{}
    }
  },
  created(){
   this.getALLinfo() 
  },
  methods:{
    //获取信息
    getALLinfo(){
     this.$get("/sys/user/edit",this.id).then(res=>{
       console.log(res)
       this.formItem=res.userDO
       this.optionsroleld=res.roles
       this.Time()
     })
    },
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
   this.formItem.roleId=val
   console.log(this.formItem.roleId)
  },
  //修改时间
  Time(){
    var dateTime=this.formItem.joinTime;
    console.log(dateTime)
     if(dateTime){
      
        var oDate = new Date(dateTime),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds();
            if(oMonth<10){
              oMonth="0"+oMonth
            }
            if(oDay<10){
              oDay="0"+oDay
            }
           var oTime = oYear +'-'+ oMonth +'-'+ oDay;//拼接时间
         console.log("1111")
         console.log(oTime);
         this.formItem.joinTime=oTime
    }else{
       console.log("222");
    }

},
  //点击修改
 updata(){
   console.log(this.formItem)
   this.formItem.password=this.formItem.paw
   this.formItem.walletPwd=null
  //  this.formItem.roleId=this.formItem.roleName
  this.$post("/sys/user/update",this.formItem).then(res=>{
    console.log(res)
    if(res.code==200){
       this.$message('修改成功');
    }
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
