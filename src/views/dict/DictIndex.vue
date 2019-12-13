<template>
  <div class="divs">
    <!-- 导航标签 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/market/MarketIndex' }"><b style="color: black;">数据字典管理</b></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索文本框 -->
    <el-form label-width="80px" style="padding-top: 15px;">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="类型:">
              <el-input v-model="dtype" style="width: 190px;text-align: left;"></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="英文格式:">
              <el-input v-model="dtitle" style="width: 180px;text-align: center;"></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="详情:">
              <el-input v-model="dcontent" style="width: 190px;padding-right: 120px;"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <!-- 三个操作按钮 -->
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-form-item label-width="120px">
              <el-button type="primary" icon="el-icon-chat-line-round" @click="open2" size="small">帮助</el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="add()">新建</el-button>
              <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table :data="result" class="el-tables" style="width: 100%;" height="560" max-height="560">
      <el-table-column fixed prop="did" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="dtype" label="类型" width="190">
      </el-table-column>
      <el-table-column prop="dtitle" label="英文格式" width="200">
      </el-table-column>
      <el-table-column prop="dcontent" label="详情" width="190">
      </el-table-column>
      <el-table-column prop="dintro" label="序号" width="190">
      </el-table-column>
      <el-table-column prop="dstate" label="是否可编辑" width="200">
        <template slot-scope="scope">
          <span v-if='scope.row.dstate==0'>否</span>
          <span v-else-if='scope.row.dstate==1'>是</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" style="text-align: center;" label="操作" min-width="120" width="180">
        <template slot-scope="scope" v-if="scope.row.dstate == 1">
          <el-tooltip content="编辑" placement="top">
            <el-button type="success" size="small" icon="el-icon-edit" @click="doupdate(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" size="small" icon="el-icon-delete-solid" @click="del(scope.row)"></el-button>
          </el-tooltip>


        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination style="padding-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center="true" @close="colse()">
      <el-form :model="mergeForm" :rules="rules" ref="mergeForm" label-width="80px">
        <el-form-item label="类型" prop="dtype">
          <el-input v-model="mergeForm.dtype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文格式" prop="dtitle">
          <el-input v-model="mergeForm.dtitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="dcontent">
          <el-input type="textarea" rows="6" v-model="mergeForm.dcontent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="align-content: center;">
        <el-button @click="colse()">取 消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="doMerge">确 定</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'DictIndex',
    data() {
      return {
        result: [],
        page: 1,
        rows: 10,
        total: 0,
        dialogTitle: '新增字典信息',
        dialogFormVisible: false,
        dtype: '', //类别
        dtitle: '', //英文格式
        dcontent: '', //具体内容
        mergeForm: {
          did:'',
          dtype: '',
          dtitle: '',
          dcontent: '',
          dintro: 0
        },
        rules: {
          dtype: [{
              required: true,
              message: '内容不能为空',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ],
          dtitle: [{
              required: true,
              message: '内容不能为空',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ],
          dcontent: [{
            required: true,
            message: '请填写内容',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      search: function() {
        var url = this.axios.urls.SYSTEM_DICT_BYPAGEBEAN;
        var form = {
          page: this.page,
          rows: this.rows,
          dtype: this.dtype,
          dtitle: this.dtitle,
          dcontent: this.dcontent
        }
        this.axios.post(url, form).then(resp => {
          this.result = resp.data.result;
          this.total = resp.data.total;

          console.log(resp);
        }).catch(resp => {
          console.log(resp);
        });
      },
      handleSizeChange: function(rows) {
        this.rows = rows;
        this.search();
      },
      handleCurrentChange: function(page) {
        this.page = page;
        this.search();
      },
      open2() {
        this.$message({
          message: '欢迎使用！',
          type: 'success',
          center: true
        });
      },
      add: function() {
        this.dialogFormVisible = true;
      },
      del: function(row) { //删除字典信息
        var url = this.axios.urls.SYSTEM_DICT_DEL;
        var delFrom = {
          did: row.did
        }
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post(url, delFrom).then(resp => {
            this.search();
            console.log(resp);
          }).catch(resp => {
            console.log(resp);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doMerge:function(){
        this.$refs['mergeForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let url = this.axios.urls.SYSTEM_DICT_MERGE;
            this.axios.post(url, this.mergeForm).then(resp => {
              if (1 == resp.data) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                  this.resetForm();
                  this.dialogFormVisible = false;
                  this.search();
              }else if(2 == resp.data){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                    this.resetForm();
                    this.dialogFormVisible = false;
                    this.search();
              }else {
                this.$message.error("糟糕了！失败了！");
              }
            }).catch(resp => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm: function() {//清空模态框的内容
        this.$refs['mergeForm'].resetFields();
      },
      colse:function(){
          this.resetForm();
          this.dialogFormVisible = false;

      },
      doupdate:function(row){
          this.mergeForm.did = row.did;
          this.mergeForm.dtype = row.dtype;
          this.mergeForm.dtitle = row.dtitle;
          this.mergeForm.dcontent = row.dcontent;
          this.mergeForm.dintro = row.dintro;
          this.dialogFormVisible = true;
      }

    },
    created: function() {
      this.search();

    }
  }
</script>

<style>

</style>
