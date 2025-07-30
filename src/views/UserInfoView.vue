<template>
  <div class="root1">
    <div class="user">
      <div id="show_user_info">
        <div v-if="loading">加载中...</div>
        <div v-else-if="error">{{ error }}</div>

        <div v-else>
          <p>用户名: {{ userInfo.username }}</p>
          <p>昵称: {{ userInfo.first_name }}{{ userInfo.last_name }}</p>
          <p>邮箱: {{ userInfo.email }}</p>
        </div>
      </div>

      <div id="user">
        <div id="edit_user_info">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <div id="user_info">
          <el-button type="primary" @click="openDialog">PUSH FUCK</el-button>
        </div>
        <div id="logout">
          <el-button type="danger" icon="el-icon-switch-button" circle></el-button>
        </div>
      </div>
    </div>
    <div class="blank">
      <el-card class="box-card" v-for="account in accounts" :key="account.pk">
        <div slot="header" class="clearfix">
          <span><b style="color: #387ce4">{{ account.fields.ex_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ account.fields.balance }}</b></span>
          <el-button style="float: right; padding: 3px 0" type="text"><b style="color: #0a3b87">fuck it</b></el-button>
        </div>
        <div>
          <p>aaa:{{ account.fields.api_key }}</p>
          <p>bbb:{{ account.fields.api_secret }}</p>
        </div>
      </el-card>
    </div>

    <el-dialog title="ADD FUCK INFO" :visible.sync="dialogVisible">
      <el-form :model="formLabelAlign" label-width="80px">
        <!-- 在这里添加表单项 -->
        <el-form-item label="信息">
          <el-input v-model="formLabelAlign.info"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const userInfo = ref({
      username: '',
      email: '',
      first_name: '',
      last_name: ''
    });
    const accounts = ref([]);
    const loading = ref(true);
    const error = ref('');
    const dialogVisible = ref(false);
    const formLabelAlign = ref({
      info: ''
    });

    const openDialog = () => {
      dialogVisible.value = true;
    };

    onMounted(async () => {
      try {
        const username = localStorage.getItem('username');
        const userResponse = await fetch(`http://127.0.0.1:8000/userapp/info/?username=${username}`);
        if (!userResponse.ok) {
          throw new Error('网络响应失败');
        }
        const userData = await userResponse.json();
        if (userData.message === '获取成功') {
          userInfo.value = userData.data;
        } else {
          error.value = userData.message;
        }

        // 获取账户信息
        const accountsResponse = await fetch(`http://127.0.0.1:8000/userapp/get_ex_info/?username=${username}`);
        if (!accountsResponse.ok) {
          throw new Error('获取账户信息失败');
        }
        const accountsData = await accountsResponse.json();
        if (accountsData.message === '查询成功') {
          accounts.value = JSON.parse(accountsData.account_infos);
        } else {
          error.value = accountsData.message;
        }
      } catch (err) {
        error.value = '请求失败: ' + err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      userInfo,
      accounts,
      loading,
      error,
      dialogVisible,
      openDialog,
      formLabelAlign
    };
  }
};
</script>

<style scoped>
.user {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 250px;
}

#user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #c4e4d6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 92%;
}

.blank {
  position: absolute;
  top: 310px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 273px;
}

.box-card {
  width: 100%;
}

#show_user_info {
  width: 92%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #c4e4d6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#edit_user_info,
#logout,
#user_info {
  display: flex;
  align-items: center;
}
</style>
