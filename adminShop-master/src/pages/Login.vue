<template>
  <div class="login_bg">
    <div class="login_container">
      <h2>管理员登录</h2>
      <!-- model:表单绑定的数据 -->
      <el-form :model="formData" :rules="rules" ref="form">
        <!-- prop指定 rules名为username的验证规则 -->
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_btn" @click="loginFn"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from "@/utils/http";

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true, // 必填
            message: "请输入管理员账号", // 验证提示信息
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true, // 必填
            message: "请输入管理员密码", // 验证提示信息
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "密码长度为6-12个字符", // 验证提示信息
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    loginFn() {
      // 使用rules定义的验证规则进行验证的方法
      // 回调参数就是验证结果，在验证结束后触发回调，valid为true验证成功，为false验证失败
      this.$refs.form.validate(async valid => {
        // 验证通过发送请求
        if (valid) {
          let res = await axios.axios.post("/api/userlogin", this.formData);
          if (res.code == 200) {
            // 1.页面刷新vuex会重置，将数据保存在localStorage中，保证数据持久化
            localStorage.setItem("info", JSON.stringify(res.list));
            // 2.提交mutation，数据保存在vuex中
            this.$store.commit("SET_INFO", res.list);
            // 3.页面跳转到首页
            this.$router.replace("/");
          } else {
            // 弹窗显示错误提示
            this.$message.error(res.msg);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
// scoped属性，style标签中样式只对当前组件生效
.login_bg {
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);
  .login_container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 300px;
    h2 {
      text-align: center;
      color: #fff;
      margin: 20px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>