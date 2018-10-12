<template>
  <div class="app-container">

    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状222态">
          <el-select v-model="formInline.region" placeholder="选择状态" style="width: 110px">
            <el-option label="未处理" value="0"/>
            <el-option label="已处理" value="1"/>
            <el-option label="全部" value="2"/>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formInline.user" style="width: 120px" placeholder="在此输入"/>
        </el-form-item>

        <el-form-item label="出发地">
          <el-input v-model="formInline.user" style="width: 100px" placeholder="在此输入"/>
        </el-form-item>

        <el-form-item label="目的地">
          <el-input v-model="formInline.user" style="width: 100px" placeholder="在此输入"/>
        </el-form-item>

        <!--<el-form-item label="席别">
          <el-select v-model="formInline.region" placeholder="选择状态" style="width: 110px">
            <el-option label="商务座" value="0"/>
            <el-option label="特等座" value="1"/>
            <el-option label="一等座" value="2"/>
            <el-option label="二等座" value="3"/>
            <el-option label="高级软无" value="4"/>
            <el-option label="软卧" value="5"/>
            <el-option label="硬卧" value="6"/>
            <el-option label="动卧" value="7"/>
            <el-option label="高级动卧" value="8"/>
            <el-option label="软座" value="9"/>
            <el-option label="硬座" value="10"/>
            <el-option label="无座" value="11"/>
          </el-select>
        </el-form-item>-->

      </el-form>
    </div>

    <el-tag style="float: right" type="success">总共{{ sum }}条数据</el-tag>

    <el-button type="primary" icon="el-icon-download">导出</el-button>

    <div style="height: 20px"/>

    <el-table
      ref="multipleTable"
      :data="infoList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"/>

      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row.id, scope.row.status)"/>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="乘车人信息">
        <template slot-scope="scope">
          <span v-for="(val, index) in scope.row.user_list" :key="index">
            {{ val.userName }}--{{ val.userId }}--{{ val.userType }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="账号">
        <template slot-scope="scope">{{ scope.row.name_12306 }} -- {{ scope.row.pwd_12306 }}</template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="出发地-目的地">
        <template slot-scope="scope">{{ scope.row.start_site }} -- {{ scope.row.end_site }}</template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="乘车日期">
        <template slot-scope="scope">
          <span v-for="(val, index) in scope.row.start_time" :key="index">{{ val }};</span>
        </template>
      </el-table-column>

      <el-table-column
        label="乘车时间">
        <template slot-scope="scope">{{ scope.row.train_time }} -- {{ scope.row.end_train_time }}</template>
      </el-table-column>

      <el-table-column
        label="手机号">
        <template slot-scope="scope">{{ scope.row.user_phone }}</template>
      </el-table-column>

      <!--<el-table-column
        label="车次">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>-->

      <el-table-column
        :show-overflow-tooltip="true"
        label="席别">
        <template slot-scope="scope">
          <span v-for="(val, index) in scope.row.seat" :key="index">{{ val }};</span>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        label="备注">
        <template slot-scope="scope">{{ scope.row.user_message }}</template>
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span style="color: #409EFF;cursor: pointer" @click="update(scope.row.id)">查看&nbsp;&nbsp;</span>
          <span style="color: #409EFF;cursor: pointer" @click="remUser(scope.row.id)">恢复</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="sum"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { getList, updataUserInfo } from '@/api/api'
export default {
  data() {
    return {
      sum: 0,
      infoList: [],
      formInline: {
        user: '',
        region: ''
      },
      options: [{
        value: '未处理',
        label: '未处理'
      },
      {
        value: '已处理',
        label: '已处理'
      },
      {
        value: '全部',
        label: '全部'
      }
      ],
      value: '',
      pageNum: 1,
      value2: false,
      multipleSelection: []
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    statusChange(id, val) {
      updataUserInfo({ status: val, id: id }).then(res => {
        this.getList(this.pageNum)
      })
    },
    update(id) {
      this.$router.push({ path: '/permission/upDate/' + id })
    },
    remUser(id) {
      updataUserInfo({ isDel: 0, id: id }).then(res => {
        this.getList(this.pageNum)
      })
    },
    getList(page) {
      getList({}, page, 1).then(response => {
        const data = response.data
        this.sum = data.num
        this.infoList = data.data
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    }
  }
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
