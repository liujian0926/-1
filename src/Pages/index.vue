<template>
  <div class="container">
    <div class="title">
      <div class="left">
        <img src="../assets/images/title.png" alt />
      </div>
      <div class="right">
        <img src="../assets/images/man.png" alt />
        <span>{{username}}</span>
        <img @click="loginOut" src="../assets/images/out.png" alt />
      </div>
    </div>
    <div class="content">
      <router-link
        :to="{path:item.path}"
        class="text"
        v-for="(item,index) in indexList"
        :key="index"
      >
        <div class="box">
          <div class="pic" :class="{pic1:item.name == '平台钱包管理'}">
            <img :src="item.url" alt />
          </div>
          <p>{{item.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexList: [
        {
          name: "平台钱包管理",
          path: "/data",
          url: require("../assets/images/icon-1.svg")
        },
        {
          name: "运营数据分析",
          path: "/observer",
          url: require("../assets/images/icon-2.svg")
        },
        {
          name: "终端管理",
          path: "/B_manager",
          url: require("../assets/images/icon-3.svg")
        },
        {
          name: "用户管理",
          path: "/A_userManager",
          url: require("../assets/images/icon-4.svg")
        },
        {
          name: "即时交易数据",
          path: "/immediately_buy",
          url: require("../assets/images/icon-5.svg")
        },
        {
          name: "信息审核管理",
          path: "/information_cash",
          url: require("../assets/images/icon-6.svg")
        },
        {
          name: "申诉管理",
          path: "/untreated",
          url: require("../assets/images/icon-7.svg")
        },
        {
          name: "交易数据查询",
          path: "/buy_order",
          url: require("../assets/images/icon-8.svg")
        },
        {
          name: "系统管理",
          path: "/send",
          url: require("../assets/images/icon-9.svg")
        }
      ],
      username: ""
    };
  },

  created() {
    this.username = localStorage.getItem("username");
    // 获取权限
    this.$get("/getAuthority").then(res => {
      this.dataList = res.data;
      console.log(res.data);
      this.indexList.splice(this.dataList.length);
      for (let i = 0; i < this.dataList.length; i++) {
        if (i < 9) {
          this.indexList[i].name = this.dataList[i].text;
          this.indexList[i].path = this.dataList[i].attributes.url
          this.indexList[i].url = require("../assets/images/" + this.dataList[i].attributes.icon)
          this.indexList[i].children = this.dataList[i].children;
          window.name = JSON.stringify(this.indexList);
        }
      }
    });
  },
  methods: {
    loginOut() {
      const data = {
        token: localStorage.getItem("token")
      };
      this.$post("/exit", data).then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.$message.success("退出成功");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  .title {
    width: 100%;
    height: 64px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 27px 0 40px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      line-height: 64px;
      color: #333333;
      font-weight: bold;
      font-size: 14px;
      img {
        margin-right: 10px;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #666666;
      font-size: 14px;
      line-height: 64px;
      span {
        margin-right: 17px;
        margin-left: 10px;
      }
    }
  }

  .content {
    height: 100%;
    width: 100%;
    padding: 35px;
    box-sizing: border-box;
    background-color: #f5f6fa;
    overflow: auto;
    .box {
      width: 320px;
      height: 180px;
      float: left;
      background-color: #fff;
      box-sizing: border-box;
      margin-right: 30px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #253444;
      .pic {
        text-align: center;
        img {
          width: 64px;
          filter: drop-shadow(#fff 50px 0);
        }
      }
      .pic1 {
        padding: 0px 100px 0px 0;
        img {
          filter: drop-shadow(#419eff 50px 0);
        }
      }
    }
    .box:hover {
      background-color: #419eff;
      color: #fff;
      .pic {
        padding: 0px 100px 0px 0;
      }
      .pic1 {
        padding: 0;
      }
    }
  }
}
</style>