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
          <el-button type="primary">PUSH FUCK</el-button>
        </div>
        <div id="logput">
          <el-button type="danger" icon="el-icon-switch-button" circle></el-button>
        </div>
      </div>
    </div>
    <div class="blank"></div>
  </div>


</template>

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
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 273px;
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
#logput,
#user_info {
  display: flex;
  align-items: center;
}

</style>

<script setup lang="ts">
import {ref, onMounted} from 'vue';

const userInfo = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: ''
});
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const username = localStorage.getItem('username');
    const response = await fetch(`http://127.0.0.1:8000/userapp/info/?username=${username}`);
    if (!response.ok) {
      throw new Error('网络响应失败');
    }
    const data = await response.json();
    if (data.message === '获取成功') {
      userInfo.value = data.data;
    } else {
      error.value = data.message;
    }
  } catch (err) {
    error.value = '请求失败: ' + err.message;
  } finally {
    loading.value = false;
  }
});
</script>
