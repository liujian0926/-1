<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline my-form-users">
      <el-form-item label="角色">
        <el-select v-model="formItem.value" placeholder="请选择" @change="selectUsers(formItem.value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <router-link :to="{path:'/member_add'}">
          <el-button type="primary">添加成员</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!-- 表格-->
   
    <el-table
      :data="tableData"
      border
      style="width: 100% ;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
     
      ref="multipleTable"
    >
      <el-table-column prop label="序号" align="center" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="onJob" label="是否在职" align="center">
        <template scope="scope">
          <span v-if="scope.row.onJob==1">在职</span>
          <span v-else-if="scope.row.onJob==2">离职</span>
        </template>
      </el-table-column>
      <el-table-column prop="jobTime" label="入职时间" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.status==0">禁用</span>
          <span v-else-if="scope.row.status==1">正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
      <el-table-column prop="username" label="帐号" align="center"></el-table-column>
      <el-table-column prop="num,usdt" label="操作" align="center">
        <template scope="scope">
          <span style="color:red;cursor:pointer" >
          <span v-if="scope.row.status==0">已禁用</span>
          <span v-else-if="scope.row.status==1"  @click="stop(scope.row)">禁用</span>
          </span>
          <!-- <span style="color:#ccc;cursor:pointer">已禁用</span> -->
          <span style="color:#419EFF;marginLeft:20px;cursor:pointer" @click="look(scope.row)">查看</span>
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
      formItem: {
        currPage: 1,
        limit: 10,
        total: 1,
        value: ""
      },
      //表格
      tableData: [],
      //下拉菜单
      options: [],
      //需要传送的账号名
      username: "",
      //禁用名
      test:""
    };
  },
  created() {
    this.getAllItem();
    this.getAllusers();
  },
  methods: {
    //分页
    handleSizeChange(page) {
      this.formItem.limit = page;
      this.getAllItem();
    },
    handleCurrentChange(Change) {
      this.formItem.currPage = Change;
      this.getAllItem();
    },
    //数据初始化
    getAllItem() {
      this.formItem.roleId = this.formItem.value;
      this.$get("/sys/user/list", this.formItem).then(res => {
        console.log(res);
        this.tableData = res.result.rows;
        this.formItem.total = res.result.total;
        //账号名
        this.username = res.result.rows;
       
      });
    },
    //角色下拉列表
    getAllusers() {
      this.$get("/sys/role/roleListSelect").then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    //获取下拉选择的值
    selectUsers(val) {
      console.log(val);
      this.getAllItem();
    },
    //点击查看
    look(value) {
      console.log(value);
      this.$router.push({
        path: "/member_detail",
        query: { id: value.userId }
      });
    },
    //点击禁用
    stop(value) {
      console.log(value)   
      this.$get("/sys/user/freeze", { id: value.userId }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message("禁用成功");   
        }
      });
    },
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
</style>

