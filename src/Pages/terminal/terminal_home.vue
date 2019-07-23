<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="210px">
      <div class="title">{{title}}</div>
      <el-menu class="el-menu" router default-active="A_userManager">
        <el-menu-item
          :index="item.ptah"
          @click="addTag(item,index)"
          v-for="(item,index) in itemList"
          :key="index"
          :class="{active:isactive == index}"
        >
          <img src="~imgurl/icon-3.svg" alt="" class="imgicon activeicon">
          <span slot="title" class="tabnav">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header style="height:64px;" class="e-header">
        <my-header></my-header>
      </el-header>
      <!-- 面包屑导航 -->
      <div class="nav">
        <template>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
         <!-- <myBread :list="BreadList"></myBread> -->
      </div>

      <!-- 主体部分 -->

      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myBread from "../../components/myBread"
export default {
 
   components:{
    myBread
  },
  created() {
    this.isactive = this.$route.meta
     let array = JSON.parse(window.name);
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === this.title) {
        let arr = array[i].children;
        for (let j = 0; j < arr.length; j++) {
          this.itemList.splice(arr.length);
          this.itemList[j].name = arr[j].text;
          this.itemList[j].path = arr[j].attributes.url;
          this.itemList[j].a = "11";
        }
      }
    }
    console.log(this.itemList);
 
  },
  data() {
    return {
       BreadList:[
       {name:"首页",path:"/index"},
       {name:"运营数据分析",path:""},
       {name:"数据观察台",path:""}
      ],
      title:'终端管理',
      isactive:0,
      itemList: [
        {
          name: "B端管理",
          path: "B_manager",
        },
        {
          name: "项目方管理",
          path: "projectManager",
        },
        {
          name: "代理方管理",
          path: "agent_manager",
        }
      ],
    };
  },
  methods: {
    addTag(item, index) {
      this.$router.push(item.path);
      this.isactive = index
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0;
  .nav {
    height: 40px;
    width: 100%;
    padding: 0 35px;
    display: flex;
    align-items: center;
    background-color: #fbfbfc;
    box-sizing: border-box;
  }
  .el-aside {
    background-color: #304156;
    height: 1600px;
    .title {
      color: #fff;
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      height: 64px;
      line-height: 64px;
      font-size: 24px;
      font-weight: bold;
    }

    .el-menu {
      border: none;
      .active{
        color: #419EFF !important;
        .activeicon{
          left: 20px !important
        }
      }
      .el-menu-item {
        position: relative;
        height: 60px;
        font-size: 14px;
        letter-spacing: 1px;
        color: #bfcbd8;
        background-color: #304156;
        &:hover {
          background-color: #253444
        }
        .tabnav{
          padding-left: 30px
        }
        .imgicon{
          width: 24px;
          filter: drop-shadow(#bfcbd8 190px 0);
          position: absolute;
          left: -170px;
          top: 18px
        }
      }
    }
  }

  #main {
    height: 100%;
    width: 100%;
    padding: 0 23px;
    box-sizing: border-box;
  }
}
</style>
