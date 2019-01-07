<template>
  <div id="update">
    <el-form ref="form" :model="postDate" label-width="100px">
      <el-form-item label="出发地">
        <el-input v-model="postDate.start_site"/>
      </el-form-item>

      <el-form-item label="目的地">
        <el-input v-model="postDate.end_site"/>
      </el-form-item>

      <el-form-item label="出发日期">
        <el-input v-model="postDate.start_time"/>
      </el-form-item>

      <el-form-item label="出发时间">
        <el-input v-model="postDate.train_time"/>
      </el-form-item>

      <el-form-item label="最晚出发时间">
        <el-input v-model="postDate.end_train_time"/>
      </el-form-item>

      <el-form-item label="车次类型">
        <el-input v-model="postDate.train_type"/>
      </el-form-item>

      <el-form-item label="席别要求">
        <el-input v-model="postDate.seat"/>
      </el-form-item>

      <el-form-item label="12306账号">
        <el-input v-model="postDate.name_12306"/>
      </el-form-item>

      <el-form-item label="12306密码">
        <el-input v-model="postDate.pwd_12306"/>
      </el-form-item>

      <el-form-item v-for="(item, index) in postDate.user_list" :key="index" label="购票人">
        <el-input :value="item.userName + '--' + item.userId + '--' + item.userType"/>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="postDate.user_phone"/>
      </el-form-item>

      <el-form-item label="备用手机号">
        <el-input v-model="postDate.refill_phone"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="postDate.user_message"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/api'
export default {
  components: {
    getUserInfo
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postDate: {
        start_site: '', // 出发地
        end_site: '', // 目的地
        start_time: '', // 出发日期
        user_phone: '',
        refill_phone: '',
        user_weixin: '',
        user_message: '',
        train_time: '', // 出发时间
        end_train_time: '', // 最晚出发时间
        train_type: '', // 车次类型
        seat: '', // 坐席
        pwd_12306: '',
        name_12306: '',
        user_list: []
      },
      form: {
        name: '123'
      }
    }
  },
  created: function() {
    this.getUserInfo(this.$route.params.id)
  },
  methods: {
    back() {
      this.$router.push({ path: '/permission/page/' + this.$route.params.page })
    },
    getUserInfo(id) {
      getUserInfo({}, id).then(response => {
        const data = response.data.data[0]
        this.postDate = data
        var train_type = ''
        var seat = ''
        var start_time = ''
        for (var item of data.train_type) {
          train_type += item + ','
        }
        for (var item2 of data.seat) {
          seat += item2 + ','
        }
        for (var item3 of data.start_time) {
          start_time += item3 + ','
        }
        this.postDate.train_type = train_type
        this.postDate.seat = seat
        this.postDate.start_time = start_time
      })
    }
  }
}
</script>
<style scoped>
  #update {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
