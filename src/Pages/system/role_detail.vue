<template>
  <div class="container">
    <el-button type="warning" @click="goback">返回</el-button>
    <el-button type="danger">取消</el-button>
    <el-button type="primary" @click="preserve" ref="menuItem">保存</el-button>
    <!-- <el-button type="primary" @click="preserve">更新</el-button> -->
    <el-form class="self-form">
      <el-form-item label="角色名称:">
        <el-input v-model="formItem.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述:">
        <el-input v-model="formItem.remark"></el-input>
      </el-form-item>
    </el-form>
    <div class="treeContainer">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="checkedkeys"
        :default-expanded-keys="checkedkeys"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //回显选中id
      checkedkeys: [],
      //回显展开id
      // expandedkeys:[],
      //输入框数据
      formItem: {
        roleName: "",
        remark: "",
        menuIds: []
      },
      //表格数组
      tableData: [],
      //树形控件
      data: [
        {
          id: 1,
          label: "",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1"
                },
                {
                  id: 5,
                  label: "三级 3-1-2"
                }
              ]
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1"
                },
                {
                  id: 7,
                  label: "三级 3-2-2"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getTree();
    console.log(this.$route.query.name,"数据返回");
  },
  mounted() {
    if (this.$route.query.name) {
      this.$refs.menuItem.$el.innerText = "更新";
    } else {
      // console.log("222");
    }
    if (this.$refs.menuItem.$el.innerText == "更新") {
      this.formItem.roleName = this.$route.query.name.roleName;
      this.formItem.remark = this.$route.query.name.remark;
      this.checkedkeys = this.$route.query.name.menuIds;
      console.log(this.checkedkeys,"返回的ID")
    //   var menu = this.$route.query.name.menuIds;
    //     var array = []
    //     function fun(value,data,menu) {
    //       for( var i  = 0;i < data.length;i++){
    //         var mod = data[i]
    //         console.log(mod)
    //         if(mod.id == value) {
    //           if(mod.children.length == 0){
    //             menu.push(mod.id)
    //             return true
    //           }
    //         return true
    //         }else {
    //           mod.children.id
    //           if(mod.children.length != 0) {
    //             // fun(value, mod.children, menu)
    //           }
    //         }
    //       }
    //       return true
    //     }
    //     for(var i = 0;i < menu.length;i++) {
    //       console.log(this.data)
    //       fun(menu[i],this.data,array)
    //     }
    //     this.checkedkeys = array
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //点击保存
    preserve() {
      if (this.$refs.menuItem.$el.innerText == "保存") {
        this.formItem.menuIds=this.$refs.tree.getCheckedKeys();
        // var arr = this.$refs.tree.getCheckedKeys();//[1,2,3,4,5]
        // var array = [];
        // for (var i = 0; i < arr.length; i++) {
        //   fun(arr[i], this.data, array);
        // }
        // function noRepeat(arr, value) {
        //   //id去重
        //   for (var i = 0; i < arr.length; i++) {
        //     if (arr[i] == value) {
        //       return false;
        //     }
        //   }
        //   return true;
        // }
        // function fun(value, data, arr) {
        //   //通过查询父节点下是否右子节点 将半选状态的父节点加入数组中
        //   for (var i = 0; i < data.length; i++) {
        //     var mod = data[i];
        //     console.log(mod,"mod")
        //     if (mod.id == value) {
        //       if (noRepeat(arr, mod.id)) {
        //         arr.push(mod.id);
        //       }
        //       return true;
        //     } else {
        //       if (mod.children) {
        //         var bool = fun(value, mod.children, arr);
        //         if (bool) {
        //           if (noRepeat(arr, mod.id)) {
        //             arr.push(mod.id);
        //           }
        //           return true;
        //         }
        //       }
        //     }
        //   }
        //   return false;
        // }
        //  this.formItem.menuIds=array
        this.$post("/sys/role/save", this.formItem).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message("保存成功");
            this.formItem.roleName = "";
            this.formItem.remark = "";
            this.$router.push({ path: "role" });
          }
        });
      } else {
        //更新接口
        this.formItem.roleId = this.$route.query.name.roleId;
        this.formItem.menuIds = this.$refs.tree.getCheckedKeys();
        //   var arr = this.$refs.tree.getCheckedKeys();//[1,2,3,4,5]
        // var array = [];
        // for (var i = 0; i < arr.length; i++) {
        //   fun(arr[i], this.data, array);
        // }
        // function noRepeat(arr, value) {
        //   //id去重
        //   for (var i = 0; i < arr.length; i++) {
        //     if (arr[i] == value) {
        //       return false;
        //     }
        //   }
        //   return true;
        // }
        // function fun(value, data, arr) {
        //   //通过查询父节点下是否右子节点 将半选状态的父节点加入数组中
        //   for (var i = 0; i < data.length; i++) {
        //     var mod = data[i];
        //     console.log(mod,"mod")
        //     if (mod.id == value) {
        //       if (noRepeat(arr, mod.id)) {
        //         arr.push(mod.id);
        //       }
        //       return true;
        //     } else {
        //       if (mod.children) {
        //         var bool = fun(value, mod.children, arr);
        //         if (bool) {
        //           if (noRepeat(arr, mod.id)) {
        //             arr.push(mod.id);
        //           }
        //           return true;
        //         }
        //       }
        //     }
        //   }
        //   return false;
        // }
        //  this.formItem.menuIds=array
        this.$post("/sys/role/update", this.formItem).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message("更新成功");
            this.formItem.roleName = "";
            this.formItem.remark = "";
            this.$router.push({ path: "role" });
          }
        });
      }
    },
    //资源树
    getTree() {
      // console.log("111");
      this.$get("/sys/menu/tree").then(res => {
        console.log(res);
        this.data = res.data.children.splice(res.data.children.length - 1, 1);
        this.data = res.data.children;
      });
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
  .el-button--warning,
  .el-button--primary,
  .el-button--danger {
    width: 60px;
    height: 28px;
    padding: 0;
    border-radius: 2px;
  }
  .el-button--primary,
  .el-button--danger {
    width: 100px;
  }
  .self-form {
    margin-bottom: 20px;
  }
}
</style>
