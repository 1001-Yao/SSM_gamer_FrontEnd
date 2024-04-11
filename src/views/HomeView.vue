<template>
  <div >
<!--    增加 按钮+搜索框-->
      <div style="margin: 10px 0">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button>其它</el-button>
      </div>
    <div style="margin: 10px 0">
      <el-input v-model="search" style="width: 30%" placeholder="搜索" />
      <el-button type="primary" style="margin-left: 5px" @click="list">检索</el-button>
    </div>

<!--    数据表格-->
    <el-table :data="tableData" stripe style="width: 90%">
      <el-table-column  prop="id" label="ID" sortable/>
<!--      sortableID排序-->
      <el-table-column prop="name" label="游戏名"/>
      <el-table-column prop="maker" label="游戏厂商" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="sales" label="销量"/>
      <el-table-column prop="stock" label="库存">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">

          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>

          <el-popconfirm
              title="确定删除吗？" @confirm="handleDel(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table >
<!--    1. el-dialog ：v-model="dialogVisible" 表示对话框, 和 dialogVisible 变量双向-->
<!--    绑定,控制是否显示对话框-->
<!--    2. el-form :model="form" 表示表单 ,数据和 form 数据变量双向绑定-->
<!--    3. el-input v-model="form.name" 表示表单的 input 空间，名字为 name 需要和-->
<!--    后台 Javabean 属性一致-->

    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="游戏名" prop="name">
          <el-input v-model="form.name" style="width: 80%"></el-input>{{ serverValidErrors.name }}
        </el-form-item>
        <el-form-item label="厂商" prop="maker">
          <el-input v-model="form.maker" style="width: 80%"></el-input>{{ serverValidErrors.maker }}
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" style="width: 80%"></el-input>{{ serverValidErrors.price }}
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="form.sales" style="width: 80%"></el-input>{{ serverValidErrors.sales }}
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock" style="width: 80%"></el-input>{{ serverValidErrors.stock }}
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer">
<el-button @click="dialogVisible = false">取 消</el-button>
<el-button type="primary" @click="save">确 定</el-button>
</span>
      </template>
    </el-dialog>

    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

  </div>

</template>

<script>
//导入request
import request from "@/utils/request";
import * as url from "url";
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      serverValidErrors: {},
      currentPage:1,//当前页
      pageSize:5,//每页的显示记录数
      total:10,//共有多少页
      search:"",
      dialogVisible:false,
      form:{},//定义了一个空表单
      tableData: [],
      rules: {//校验
        name: [
          {required: true, message: '输入称游戏名', trigger: 'blur'}
        ],maker: [
          {required: true, message: '输入游戏厂商', trigger: 'blur'}
        ],price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
          {pattern: /^(([1-9]\d*)|(0))(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
        ],sales: [
          {required: true, message: '请输入销量', trigger: 'blur'},
          {pattern: /^(([1-9]\d*)|(0))$/, message: '请输入数字', trigger: 'blur'}
        ],stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
          {pattern: /^(([1-9]\d*)|(0))$/, message: '请输入数字', trigger: 'blur'}
        ]
      }
      }
    },
  created() {//vue生命周期的钩子函数
    this.list();
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.form = {};
      if (this.$refs['form']) {
        this.$refs['form'].resetFields();
      }
      this.serverValidErrors = {};
    },

    handleEdit(row) {
//说明
//1. JSON.stringify(row) 将 row 转成 json 字符串
//2. JSON.parse(xx) 将字符串转成 json 对象
//3. 为什么这样做? 其实 JSON.parse(JSON.stringify(row)) 就是对 row 进行了深拷贝
//4. 这样表格中的行数据 和 弹出框 的数据就是独立的了
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    save() {
//增加处理修改逻辑
      if (this.form.id) {
        request.put("/api/update", this.form).then(res => {
          if (res.code === 200) {//如果 code 为 200
            this.$message({ //弹出更新成功的消息框
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({//弹出更新失败信息
              type: "error", message: res.msg
            })
          }
          this.list() //刷新列表
          this.dialogVisible = false
        })
      } else {//添加
//表单数据校验是否
        this.$refs['form'].validate((valid) => {
          if (valid) {
//=======说明======
//1. 将 form 表单提交给 /api/save 的接口
//2. /api/save 等价 http://localhost:10001/save
//3. 如果成功，就进入 then 方法
//4. res 就是返回的信息
//5. 查看 Mysql 看看数据是否保存韩顺平 Java 工程师
            request.post("/api/save", this.form).then(res => {
              if (res.code === 200) {
                this.dialogVisible = false
                this.list()
              } else if (res.code === 400) {
                this.serverValidErrors.name = res.extend.errorMsg.name;
                this.serverValidErrors.sales = res.extend.errorMsg.sales;
                this.serverValidErrors.price = res.extend.errorMsg.price;
                this.serverValidErrors.maker = res.extend.errorMsg.maker;
                this.serverValidErrors.stock = res.extend.errorMsg.stock;
              }
            })
          } else {
            this.$message({//弹出更新失败信息
              type: "error", message: "验证失败，不提交"
            })
            return false
          }
        })
      }
    },
    // list(){
    //   request.get("api/furns",this.form).then(res=>{
    //     //绑定 tableData, 显示在表格
    //     this.tableData = res.extend.furnsList
    //   })
    // },
    //修改 list(), 换成分页请求数据
    list() { //请求显示家居列表-不带检索
      request.get("/api/furnsBySearchPage", {
        params: {
          search:this.search,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
//绑定 tableData, 显示在表格
        this.tableData = res.extend.pageInfo.list
        this.total = res.extend.pageInfo.total
      })
    },

//增加方法, 处理记录的变化, 这两个方法是和分页控件绑定的.
//处理每页显示多少条记录变化
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.list()
    }
    ,
//处理当前页变化, 比如点击分页连接,或者 go to 第几页
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.list()
    },
    handleDel(id){
      request.delete("/api/del/" + id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        }
        else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.list() // 刷新列表
      })
    }
  }
}
</script>
