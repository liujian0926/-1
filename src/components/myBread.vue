<template>
  <div class="mybread">
    <el-breadcrumb separator="" ref="bread">
      <el-breadcrumb-item :to="item.path" class="nav" v-for="(item,index) in list" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  props:["list"],
  created(){
    console.log(this.$refs.bread)
  }
};
</script>

<style lang="less" scoped>
.nav {
 border:1px solid rgba(222,227,234,1);
 line-height: 25px !important;
 margin-right: 10px;
 border-radius: 3px;
 padding-left: 10px
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  color: #606266 !important;
  font-weight:100 !important;
}
 


.nav:last-of-type{
  padding-right: 18px;
  background-color: #B9BFD5;
}

.detail{
  padding-right: 18px
}
</style>
