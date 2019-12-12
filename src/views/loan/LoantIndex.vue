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
      <el-table-column fixed prop="realname" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="190">
      </el-table-column>
      <el-table-column prop="money" label="借款金额" width="200">
      </el-table-column>
      <el-table-column prop="timelimit" label="借款时长" width="190">
      </el-table-column>
      <el-table-column prop="addtime" label="申请时间" width="190">
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="200">
        <template slot-scope="scope">
          <span v-if='scope.row.status==0' style="color: #99A9BF;">未审核</span>
          <span v-else-if='scope.row.status==1' style="color: #42B983;">审核成功</span>
          <span v-else-if='scope.row.status==2' style="color: red;">审核失败</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" style="text-align: center;" label="操作" min-width="120" width="180">
        <template slot-scope="scope" v-if="scope.row.status == 0">
          <el-tooltip content="审核" placement="top">
            <el-button type="success" size="small" icon="el-icon-edit" @click="doupdate(scope.row)">审核</el-button>
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
        <el-form-item label="用户名" prop="realname">
          <el-input v-model="mergeForm.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="mergeForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="借款金额" prop="money">
          <el-input v-model="mergeForm.money" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="align-content: center;">
        <el-button type="info" @click="colse()">取 消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="doMerge(rows)">通过审核</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="doMerge2">拒绝审核</el-button>
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
        success: 1,
        danger: 2,
        dialogTitle: '审核还款信息',
        dialogFormVisible: false,
        dtypes: '期限', //类别
        dtitle: '', //英文格式
        dcontent: '', //具体内容
        mergeForm: {
          jid: 0,
          realname: '',
          phone: '',
          addtime: '',
          status: 0,
          money:0,
          verifytime:''
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
        var url = this.axios.urls.SYSTEM_LOAN_BYPAGEALL;
        var url2 = this.axios.urls.SYSTEM_DICT_BY_DTYPE;
        var form = {
          page: this.page,
          rows: this.rows,
        }
        var form2 = {
          dtype: this.dtypes,
          dintro: this.result.timelimit
        }

        this.axios.post(url, form).then(resp => {
          this.result = resp.data.result;
          this.total = resp.data.total;
          var count = 0;
          var ss = resp.data.result;
          //查询根据类型所的到的集合
          this.axios.post(url2, form2).then(resp => {
            var rell = resp.data;
            for (var k = 0; k < rell.length; k++) {
              for (var i = 0; i < ss.length; i++) {
                if (rell[k].dintro === ss[i].timelimit) {
                  count++;
                  console.log(rell[k].dcontent);
                  ss[i].timelimit = rell[k].dcontent + "（月）";
                  ss[i].addtime = this.timestampToTime(ss[i].addtime);

                }
              }
              this.result = ss;
            }
            console.log(resp);
          }).catch(resp => {
            console.log(resp);
          });

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
      doMerge: function() {
        this.mergeForm.status = this.success;
        this.mergeForm.verifytime = new Date().getTime();
        this.$refs['mergeForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let url = this.axios.urls.SYSTEM_LOAN_BYUPDATE;
            this.axios.post(url, this.mergeForm).then(resp => {
              if (1 == resp.data) {
                this.$message({
                  message: '审核通过',
                  type: 'success'
                });
                this.resetForm();
                this.dialogFormVisible = false;
                this.search();
              } else {
                this.$message.error("糟糕了！失败了！");
              }
              console.log(resp);
            }).catch(resp => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      doMerge2: function(row) {
        this.mergeForm.status = this.danger;
        this.mergeForm.verifytime = new Date().getTime();
        this.$refs['mergeForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let url = this.axios.urls.SYSTEM_LOAN_BYUPDATE;
            this.axios.post(url, this.mergeForm).then(resp => {
              if (1 == resp.data) {
                this.$message({
                  message: '拒绝审核',
                  type: 'success'
                });
                this.resetForm();
                this.dialogFormVisible = false;
                this.search();
              } else {
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
      resetForm: function() { //清空模态框的内容
        this.$refs['mergeForm'].resetFields();
      },
      colse: function() {
        this.resetForm();
        this.dialogFormVisible = false;

      },
      doupdate: function(row) {
        this.mergeForm.jid = row.jid;
        this.mergeForm.realname = row.realname;
        this.mergeForm.phone = row.phone;
        this.mergeForm.status = row.status;
        this.mergeForm.addtime = new Date(row.addtime).getTime();
        this.mergeForm.money = row.money;
        this.dialogFormVisible = true;
      },
      timestampToTime: function(cjsj) {
        var date = new Date(parseInt(cjsj)) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
        console.log(timestampToTime(1533293827000))
      }



    },
    created: function() {
      this.search();

    }
  }
</script>

<style>

</style>
