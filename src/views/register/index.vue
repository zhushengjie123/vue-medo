<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html">登陆</a> </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{
            required: true,
            tphone: phone,
          }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{
            required: true,
            regex: /^\d{6}$/,
          }"
          :class="{ invalid: errors.has('code') }"
        />
        <button @click="sendcode">发送验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <!-- 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符 -->
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{
            required: true,
            tpassword:password,
          }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="againPassword"
          name="againPassword"
          v-validate="{
            required: true,
            is: password,
          }"
          :class="{ invalid: errors.has('againPassword') }"
        />
        <span class="error-msg">{{ errors.first("againPassword") }}</span>
      </div>
      <div class="controls">
        <input
          name="agree"
          type="checkbox"
          v-model="agree"
          v-validate="{
            required: true,
            agree: agree,
          }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《一零七用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="goRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机一零七</li>
        <li>销售联盟</li>
        <li>一零七社区</li>
      </ul>
      <div class="address">地址：xxxxxxxxxxxxx</div>
      <div class="beian">京ICP备xxxxxxx号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      //收集表单数据，手机号
      phone: "",
      // 验证码
      code: "",
      // 输入密码
      password: "",
      // 确定密码
      againPassword: "",
      //是否同意用户协议
      agree: true,
    };
  },
  methods: {
    sendcode() {
      this.$store
        .dispatch("loginAndregister/sendcode", this.phone)
        .then((data) => {
          this.code = data;
        })
        .catch(() => alert(new Error("发送失败")));
    },
    async goRegister() {
      let success = await this.$validator.validateAll(); //全部格式验证成功
      let { phone, code, password } = this; //对象的赋值解构
      // 与逻辑运算
      (success &&
        phone &&
        code &&
        password == this.againPassword &&
        this.$store
          .dispatch("loginAndregister/register", {
            phone,
            code,
            password,
          })
          .then(
            () => {
              this.$router.push("/login");
            },
            (error) => {
              alert(error.message);
            }
          )) ||
        alert("请正确填写");
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>