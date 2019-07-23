<template>
  <div class="container">
    <el-tabs v-model="activeName" class="my-tab">
      <el-tab-pane label="发送公告" name="first">
        <el-form class="send-form">
          <el-form-item label="公告标题:">
            <el-input v-model="sendForm.noticeTitle" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="标题摘要:">
            <el-input
              type="textarea"
              v-model="sendForm.noticeAbstract"
              placeholder="请输入内容"
              :autosize="{ minRows: 4, maxRows: 10}"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="notice">公告类型:</span>
        <el-radio v-model="sendForm.radio" label="0">通知消息</el-radio>
        <el-radio v-model="sendForm.radio" label="1">版本更新</el-radio>
        <el-radio v-model="sendForm.radio" label="2">营销活动</el-radio>
        <!-- 富文本 -->
        <div class="editor">
          <quill-editor
            v-model="sendForm.noticeContent"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </div>
        <el-button type="primary" @click="submit">发送公告</el-button>
      </el-tab-pane>
      <el-tab-pane label="推送历史" name="second" @click="historyItem">
        <el-form :inline="true" class="demo-form-inline my-form-users">
          <!--时间日期-->
          <!-- <div class="title">日期</div> -->
          <el-form-item label="发布时间">
            <el-date-picker
              type="date"
              placeholder="起始时间"
              v-model="pageItem.beginTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="终止时间"
              v-model="pageItem.endTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="pageItem.noticeTitle" placeholder="公告标题"></el-input>
          </el-form-item>
          <!--类型选择 -->
          <el-form-item label="操作员">
            <el-select v-model="value" placeholder="请选择" @change="userName(value)">
              <el-option
                 v-for="(item,index) in options"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="marginTop:0;" @click="quertItem">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100% ;"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="pubTime" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="noticeTitle" label="公告标题" align="center"></el-table-column>
          <el-table-column prop="noticeType" label="公告类型" align="center">
            <template scope="scope">
              <span v-if="scope.row.noticeType==0">通知消息</span>
              <span v-else-if="scope.row.noticeType==1">版本更新</span>
              <span v-else-if="scope.row.noticeType==2">营销活动</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作员" align="center"></el-table-column>
          <el-table-column prop="readerCount" label="阅读人数" align="center"></el-table-column>
          <el-table-column prop="unreadCount" label="未读人数" align="center"></el-table-column>
          <el-table-column prop="num" label="操作" align="center">
            <template scope="scope">
              <span style="color:#409eff;cursor:pointer" @click="look(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="fenye">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageItem.currPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageItem.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageItem.total"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"]
          ]
        }
      },
      form: {
        name: ""
      },
      activeName: "first",
      value: "",
      options: [],
      tableData: [],
      //发布公告数据
      sendForm: {
        noticeTitle: "",
        noticeAbstract: "",
        noticeContent: "",
        radio: "0"
      },
      //分页数据
      pageItem: {
        currPage: 1,
        limit: 10,
        total: 1,
        //创建人ID
        createUserId: "",
        beginTime: "",
        endTime: "",
        noticeTitle:"",

      }
    };
  },
  created() {
    this.historyItem();
    this.selectOPtion();
  },
  methods: {
    //点击发布逻辑
    submit() {
      this.sendForm.noticeType = this.sendForm.radio;
      this.$post("/api/info/save", this.sendForm).then(res => {
        console.log(res);
        if (res.code == 200) {
         this.$message('发布成功');
         this.historyItem()
        }
      }).catch(err=>{
         this.$message('请输入完整数据');
      })
      
    },
    //推送历史数据
    historyItem() {
      this.$get("/api/info/list", this.pageItem).then(res => {
        console.log(res);
        this.tableData = res.result.rows;
        this.pageItem.total = res.result.total;
      });
    },
    //分页
    handleSizeChange(page) {
     this.pageItem.limit=page
     this.historyItem()
    },
    handleCurrentChange(Change) {
     this.pageItem.currPage=Change
     this.historyItem()
    },
    //下拉菜单逻辑
    selectOPtion() {
      this.$get("/sys/user/userListSelect").then(res => {
        //  console.log(res)
        this.options = res.data;
      });
    },
    //下拉取值
    userName(val){
     //  console.log(val)
     this.pageItem.createUserId=val
    },
    //点击查询
    quertItem(){
     this.historyItem()
    },
    //点击查看
    look(value){
      console.log(value)
      this.$router.push({path:"/notice_content",query:{id:value.noticeId}})
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f6fa;
  .my-form-users {
    margin-bottom: 24px;
  }
  .el-button--primary {
    width: 100px;
    height: 28px;
    padding: 0;
    margin-left: 78px;
    margin-top: 50px;
  }
}

.notice {
  font-size: 14px;
  color: #979dac;
  margin-right: 20px;
}
.editor {
  padding: 20px 0 20px 78px;
  box-sizing: border-box;
  width: 100%;
  height: 324px;
  .quill-editor {
    height: 100%;
  }
}
.fenye {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
}
.select-user{
    width: 100px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #c0c4cc;
    margin-top: 2px;
    padding-left: 10px;
    border-radius: 3px;
}
</style>
