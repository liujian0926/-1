<template>
  <div class="container">
    <el-form  class="demo-form-inline my-form-users">
      <el-form-item label="角色">
        <el-select v-model="formItem.value" placeholder="请选择" @change="character(formItem.value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <router-link :to="{path:'/role_detail'}">
          <el-button type="primary">添加角色</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!-- 表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="" label="序号" align="center" type="index" width=50></el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="roleId" label="角色ID" align="center"></el-table-column>
      <el-table-column prop="remark" label="角色描述" align="center"></el-table-column>
     
      <el-table-column prop="" label="操作" align="center">
        <template scope="scope">
          <span style="color:red;cursor:pointer" @click="shanchu(scope.row)">删除</span>
         
          <span style="color:#419EFF;marginLeft:20px;cursor:pointer" @click="guanli(scope.row)">管理</span>
         
        </template>
      </el-table-column>
    </el-table>
   <!--分页 -->
     <div class="page">
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formItem.currPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="formItem.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="formItem.total"
        ></el-pagination>
      </div>
    </div>
  </div>
   
    
</template>

<script>
export default {
  data() {
    return {
      formItem:{
      currPage:1,
      limit:10,
      total:1,
      value:"",
      }, 

      tableData: [],
      options: []
    };
  },
  created(){
   this.getAllItem()
   this.getselect()
  },
  methods: {
    //分页
    handleSizeChange(page){
      console.log(page)
      this.formItem.limit=page
       this.getAllItem()
    },
    handleCurrentChange(change){
      console.log(change)
      this.formItem.currPage=change
       this.getAllItem()
    },
   //获取角色
    getAllItem(){
     this.$get("/sys/role/list",this.formItem).then(res=>{
       console.log(res)
       this.tableData=res.result.rows
       this.formItem.total=res.result.total
     })
    },
    //角色下拉列表
    getselect(){
      this.$get("/sys/role/roleListSelect").then(res=>{
        // console.log(res)
        this.options=res.data
      })
    },
    //获取下拉框角色
    character(value){
      this.formItem.roleId=this.formItem.value
      // console.log(value)
      this.getAllItem()
    },
    //点击删除
    shanchu(value){
      console.log(value)
      this.$post("/sys/role/remove",{id:value.roleId}).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message("删除成功")
          this.getAllItem()
        }
      }).catch(err=>{
        console.log(err)
        this.$message(err.data.msg)
      })
    },
    //点击管理
    guanli(value){
      console.log(value)
      this.$get("/sys/menu/getTreeByRoleId",{roleId:value.roleId}).then(res=>{
        console.log(res)
        if(res.code==200){
          console.log(res.data.roleDO)
          this.$router.push({path:"role_detail",query:{name:res.data.roleDO}})
        }
      })
   
    }

  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #f5f6fa;
  color: #333;
  padding: 0 30px;
  box-sizing: border-box;
  .my-form-users {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form-item {
      margin-right: 18px;
    }
    .title {
      font-size: 13px;
      color: #253444;
      margin-right: 8px;
    }
    .el-button--primary {
      width: 100px !important;
      height: 28px;
      padding: 0;
    }
  }
  a {
    text-decoration: none;
  }
  .page {
    height: 104px;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 4px;
    .pagination {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
/deep/.my-form-users .el-form-item .el-form-item__content {
    line-height: 28px;
    height: 28px;
    width: 170px !important;
}
</style>

