<template>
  <div class="root1">
    <div class="left-box">
      <div class="left-top">
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
          <div
              class="form animate__animated animate__bounceInDown"
              v-if="dialogVisible"
          >
            <el-form :model="formLabelAlign" label-width="80px">
              <el-form-item label="EX">
                <el-input
                    v-model="formLabelAlign.ex_name"
                    size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="KEY">
                <el-input
                    v-model="formLabelAlign.api_key"
                    size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="SECRET">
                <el-input
                    v-model="formLabelAlign.api_secret"
                    size="small"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm" size="small"
                >提交
                </el-button
                >
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                    size="small"
                >取消
                </el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div id="user">
            <div id="edit_user_info">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </div>
            <div id="user_info">
              <el-button type="primary" @click="openPushFuckDialog"
              >PUSH FUCK
              </el-button
              >
            </div>
            <div id="logout">
              <el-button
                  type="danger"
                  icon="el-icon-switch-button"
                  circle
                  @click="logout"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="left-bottom">
        <div class="blank">
          <el-card
              class="box-card animate__animated animate__backInDown"
              v-for="account in activeAccounts"
              :key="account.pk"
          >
            <div slot="header" class="clearfix">
              <span
              ><b style="color: #387ce4"
              >{{
                  account.fields.ex_name
                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                  account.fields.balance
                }}</b
              ></span
              >
              <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="toggleFuck(account)"
              >
                <b style="color: #0a3b87">fuck it</b>
              </el-button>
            </div>
            <div>
              <p>aaa:{{ account.fields.api_key }}</p>
              <p>bbb:{{ account.fields.api_secret }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="right-top"></div>
      <div class="right-bottom">
        <div class="fuck-list">
          <el-card
              class="box-card animate__animated animate__backInLeft"
              v-for="account in fuckedAccounts"
              :key="account.pk"
          >
            <div slot="header" class="clearfix">
              <span
              ><b style="color: #387ce4"
              >{{
                  account.fields.ex_name
                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                  account.fields.balance
                }}</b
              ></span
              >
              <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="toggleFuck(account)"
              >
                <b style="color: #0a3b87">kcuf ti</b>
              </el-button>
            </div>
            <div>
              <p>aaa:{{ account.fields.api_key }}</p>
              <p>bbb:{{ account.fields.api_secret }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog title="ADD FUCK INFO">
      <el-form :model="formLabelAlign" label-width="80px">
        <el-form-item label="EX">
          <el-input v-model="formLabelAlign.ex_name"></el-input>
        </el-form-item>
        <el-form-item label="KEY">
          <el-input v-model="formLabelAlign.api_key"></el-input>
        </el-form-item>
        <el-form-item label="SECRET">
          <el-input v-model="formLabelAlign.api_secret"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
      },
      accounts: [],
      loading: true,
      error: "",
      dialogVisible: false,
      formLabelAlign: {
        ex_name: "",
        api_key: "",
        api_secret: "",
      },
    };
  },
  computed: {
    activeAccounts() {
      return this.accounts.filter((account) => !account.fucked);
    },
    fuckedAccounts() {
      return this.accounts.filter((account) => account.fucked);
    },
  },
  methods: {
    openPushFuckDialog() {
      this.dialogVisible = true;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    async submitForm() {
      try {
        const username = localStorage.getItem("username");
        const formData = new FormData();
        formData.append("username", username);
        formData.append("ex_name", this.formLabelAlign.ex_name);
        formData.append("api_key", this.formLabelAlign.api_key);
        formData.append("api_secret", this.formLabelAlign.api_secret);

        const addResponse = await fetch(
            "http://127.0.0.1:8000/userapp/create_account_info/",
            {
              method: "POST",
              body: formData,
            }
        );

        if (addResponse.ok) {
          this.$notify({
            title: "创建结果",
            message: "创建成功",
            type: "success",
          });
          this.dialogVisible = false;
          await this.getExInfo();
        } else {
          const data = await addResponse.json();
          this.$notify({
            title: "创建结果",
            message: "创建失败：" + data.message,
            type: "error",
          });
        }
      } catch (err) {
        console.error("请求失败:", err.message);
        this.$notify({
          title: "错误",
          message: "请求失败: " + err.message,
          type: "error",
        });
      }
    },
    async getExInfo() {
      try {
        const username = localStorage.getItem("username");
        const userResponse = await fetch(
            `http://127.0.0.1:8000/userapp/info/?username=${username}`
        );
        if (!userResponse.ok) {
          throw new Error("网络响应失败");
        }
        const userData = await userResponse.json();
        if (userData.message === "获取成功") {
          this.userInfo = userData.data;
        } else {
          this.error = userData.message;
        }

        const accountsResponse = await fetch(
            `http://127.0.0.1:8000/userapp/get_ex_info/?username=${username}`
        );
        if (!accountsResponse.ok) {
          throw new Error("获取账户信息失败");
        }
        const accountsData = await accountsResponse.json();
        if (accountsData.message === "查询成功") {
          this.accounts = JSON.parse(accountsData.account_infos).map(
              (account) => ({
                ...account,
                fucked: account.fucked || false, // 确保每个账户都有fucked属性
              })
          );
        } else {
          this.error = accountsData.message;
        }
      } catch (err) {
        this.error = "请求失败: " + err.message;
      } finally {
        this.loading = false;
      }
    },
    toggleFuck(account) {
      account.fucked = !account.fucked;
    },
  },
  mounted() {
    this.getExInfo();
  },
};
</script>

<style scope>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background-color: #ababab;
}

.root1 {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 50px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.left-box {
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.left-top {
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-bottom {
  flex: 1;
  width: 100%;
  overflow: auto;
}

.right-box {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
}

.right-top {
  height: 300px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.right-bottom {
  flex: 1;
  width: 100%;
  background-color: #fff;
  overflow: auto;
  border-radius: 10px;
}

.user {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
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

.fuck-list {
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}

.blank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 确保卡片从顶部开始 */
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  overflow: auto;
}

.box-card {
  flex: none;
  width: 100%;
  height: 173px;
  box-sizing: border-box;
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
