<style lang='less'>
@gradient-color: @primary-color;
@bg-color: #f7f8fa;
@title-color: #3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.login-vue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: @bg-color;

  .login-container {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login-content {
      letter-spacing: 2px;
      background: #fff;
      padding: 70px 30px 20px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      box-sizing: border-box;

      > div {
        margin: 30px 0;

        &.login-input {
          position: relative;

          .placeholder {
            position: absolute;
            color: @placeholder-color;
            top: 6px;
            font-size: 16px;
            transition: all 0.2s;
            left: 0;
            pointer-events: none;
          }

          input {
            font-size: 16px;
            padding: 8px 0;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #d3d3d3;
            box-shadow: inset 0 0 0 1000px #fff;
            outline: none;
            box-sizing: border-box;
            transition: 0.3s;
            font-weight: 200;

            &:focus {
              border-bottom-color: @gradient-color;
              box-shadow: inset 0 0 0 1000px #fff;
            }
          }

          input:focus + .placeholder,
          .placeholder.fixed {
            font-size: 13px;
            top: -16px;
          }

          input:-webkit-autofill + .placeholder {
            font-size: 13px;
            top: -16px;
          }
        }

        &.login-title {
          font-size: 30px;
          color: @title-color;
          line-height: 1;
          margin: -16px 0px 40px;
          font-weight: 200;
        }
      }

      > .buttonDiv {
        margin-top: 45px;

        .h-btn {
          padding: 12px 0;
          font-size: 18px;
          opacity: 0.8;
          border-radius: 3px;
          background: @gradient-color;
          border-color: @gradient-color;

          &:hover {
            opacity: 1;
            background: @gradient-color;
            border-color: @gradient-color;
          }
        }
      }
    }

  }
}

.login_valid_code {
  width: 50%;
  float: left;
}

.login_valid_code_send {
  width: 50%;
  height: 40px;
  line-height: 40px;
  vert-align: middle;
  float: left;
  background-color: #eeeeee;
  border-radius: 5px;
}

.login_valid_code_send:hover {
  cursor: pointer;
}
</style>

<template>
  <div class='login-vue'>
    <div class='login-container'>
      <div class='login-content'>
        <div class='login-title'>找回密码</div>

        <!-- 手机号码 -->
        <div class='login-name login-input'>
          <input type='text' v-model='form.phone' />
          <span class='placeholder' :class="{ fixed: form.phone != '' && form.phone != null }">手机号码</span>
        </div>
        <!-- 新的密码 -->
        <div class='login-password login-input'>
          <input type='password' v-model='form.password' />
          <span class='placeholder' :class="{ fixed: form.password != '' && form.password != null }">新的密码</span>
        </div>
        <!-- 重复密码 -->
        <div class='login-password login-input'>
          <input type='password' v-model='form.password2' />
          <span class='placeholder' :class="{ fixed: form.password2 != '' && form.password2 != null }">重复密码</span>
        </div>
        <!-- 验证码 -->
        <div class='login-name login-input login_valid_code'>
          <input type='text' v-model='form.code' />
          <span class='placeholder' :class="{ fixed: form.code != '' && form.code != null }">验证码</span>
        </div>
        <div :class='"login_valid_code_send"' :style='"pointer-events:" + valid_code_button_state'
             @click='countdowncode'>
          {{ valid_code_button_caption }}
        </div>

        <div class='buttonDiv'>
          <Button :loading='loading' block color='primary' size='l' @click='retrieve_password'>重置密码</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isPhone } from '../../js/common/utils';

export default {
  data() {
    return {
      form: {},
      loading: false,
      valid_code_button_text: '发送验证码',
      valid_code_interval_fix: 60,
      valid_code_interval: 60,
      valid_code_button_suffix: '秒后重新发送',
      valid_code_button_caption: '',
      valid_code_button_state: 'all',
      message_title: '消息'
    };
  },
  created() {
    this.valid_code_button_caption = this.valid_code_button_text;
  },
  methods: {
    countdowncode() {
      if (this.valid_code_interval_fix == this.valid_code_interval) {
        if (!isPhone(this.form.phone)) {
          this.message_title = `手机号码：${this.form.phone}，无效`;
          this.$Message.error(this.message_title);
          return;
        }
        let phone = this.form.phone;
        let url = '/user/password/code';
        let param = {
          phone: phone
        };
        this.loading = true;
        Ajax.get(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            console.log(resp.body);
          } else {
            this.$Message.error(resp.msg);
          }
        });
      }
      let caption = `${this.valid_code_interval}${this.valid_code_button_suffix}`;
      this.valid_code_button_caption = caption;
      this.valid_code_interval--;
      window.setTimeout(() => {
        this.valid_code_button_state = 'none';
        if (this.valid_code_interval > 0) {
          this.countdowncode();
        } else {
          this.valid_code_interval = this.valid_code_interval_fix;
          this.valid_code_button_caption = this.valid_code_button_text;
          this.valid_code_button_state = 'all';
        }
      }, 1000);
    },
    retrieve_password() {
      if (!isPhone(this.form.phone)) {
        this.message_title = `手机号码：${this.form.phone}，无效`;
        this.$Message.error(this.message_title);
        return;
      }
      if (!this.form.password) {
        this.message_title = `输入新的登录密码`;
        this.$Message.error(this.message_title);
        return;
      }
      if (this.form.password2 !== this.form.password) {
        this.message_title = `输入正取的重复密码`;
        this.$Message.error(this.message_title);
        return;
      }
      if (!this.form.code) {
        this.message_title = `输入验证码`;
        this.$Message.error(this.message_title);
        return;
      }
      let param = {
        phone: this.form.phone,
        code: this.form.code,
        pass: this.form.password
      };
      this.loading = true;
      Ajax.post('/user/password/retrieve', param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.$Message.success(`${this.form.phone}-->已经成功重置密码`);
          window.setTimeout(() => {
            let url = '/login';
            this.$router.push(url);
          }, 2000);
        } else {
          this.$Message.error(resp.msg);
        }
      });
    }
  }
};
</script>
