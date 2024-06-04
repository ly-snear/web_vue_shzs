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

    .copyright {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;

      a {
        color: @text-color;
      }
    }

    .login_tab_list {
      margin-top: 10px;
      height: 35px;
      margin-left: 5px;
      width: calc(100% - 10px);
      overflow: hidden;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .login_tab_item {
      margin-left: 20px;
      height: 35px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #2e8b57;
    }

    .login_tab_item_selected {
      color: #dc143c;
      border-bottom: 1px solid #dc143c;
    }

    .login_tab_item:hover {
      cursor: pointer;
    }

    .login_tab_item_icon {
      font-size: 24px;
    }

    .login_tab_item_text {
      margin-left: 5px;
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

    .noclick {
      pointer-events: none;
    }

  }
}
</style>

<template>
  <div class='login-vue'>
    <div class='login-container'>
      <div class='login-content'>
        <div class='login-title'>书画助手</div>

        <!-- 验证方式 -->
        <div>
          <!-- 选项卡 -->
          <div class='login_tab_list'>
            <div v-for='(item, index) in login_tab'>
              <div :class="'login_tab_item ' + (login_tab_selected == index?'login_tab_item_selected':'') "
                   @click='selecttab($event, index)' :data-idx='index'>
                <div :class="'login_tab_item_icon icon iconfont ' + item.icon"></div>
                <div class='login_tab_item_text'>{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 账号登录.开始 -->
        <div class='login-name login-input' v-if='0==login_tab_selected'>
          <input type='text' v-model='form.username' />
          <span class='placeholder' :class="{ fixed: form.username != '' && form.username != null }">用户名</span>
        </div>
        <div class='login-password login-input' v-if='0==login_tab_selected'>
          <input type='password' v-model='form.password' @keyup.enter='submit' />
          <span class='placeholder' :class="{ fixed: form.password != '' && form.password != null }">密码</span>
        </div>
        <!-- 账号登录.结束 -->

        <!-- 验证码登录.开始 -->
        <div class='login-name login-input' v-if='1==login_tab_selected'>
          <input type='text' v-model='form.phone' />
          <span class='placeholder' :class="{ fixed: form.phone != '' && form.phone != null }">手机号码</span>
        </div>
        <div class='login-name login-input login_valid_code' v-if='1==login_tab_selected'>
          <input type='text' v-model='form.code' @keyup.enter='submit' />
          <span class='placeholder' :class="{ fixed: form.code != '' && form.code != null }">验证码</span>
        </div>
        <div :class='"login_valid_code_send"' :style='"pointer-events:" + valid_code_button_state'
             v-if='1==login_tab_selected'
             @click='countdowncode'>
          {{ valid_code_button_caption }}
        </div>
        <!-- 验证码登录.结束 -->

        <div class='buttonDiv'>
          <Button :loading='loading' block color='primary' size='l' @click='submit'>登录</Button>
        </div>

        <div class='buttonDiv'>
          <Button block color='primary' size='l' @click='retrieve'>找回密码</Button>
        </div>
      </div>
      <!-- <p class="copyright"> Copyright © 2021 讷纳渔</p> -->
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
      login_tab: [
        {
          id: 1,
          title: '账号',
          icon: 'icon-morentouxiang1'
        }, {
          id: 2,
          title: '验证码',
          icon: 'icon-yanzhengma'
        }
      ],
      login_tab_selected: 0,
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
    submit() {
      if (this.login_tab_selected == 0) {
        this.loading = true;
        Ajax.post('/user/login', this.form).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.go(resp.body);
          }
        });
      }
      if (this.login_tab_selected == 1) {
        if (!this.loginvalid()) {
          this.$Message({
            type: 'error',
            text: this.message_title
          });
        }
        let param = {
          phone: this.form.phone,
          code: this.form.code
        };
        this.loading = true;
        Ajax.post('/user/code/login', param).then((resp) => {
          this.loading = false;
          // console.log('-->', resp);
          if (resp.ok) {
            // console.log(resp.body);
            this.go(resp.body);
          } else {
            this.$Message({
              type: 'error',
              text: resp.msg
            });
          }
        });
      }
    },
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
      if (this.$route.query.token) {
        this.$router.replace({ name: 'Shared' });
      } else {
        this.$router.replace({ name: 'Private' });
      }
    },
    selecttab(evt, idx) {
      // console.log('选择-->', idx);
      this.login_tab_selected = idx;
    },
    countdowncode() {
      if (this.valid_code_interval_fix == this.valid_code_interval) {
        if (!isPhone(this.form.phone)) {
          this.message_title = `手机号码：${this.form.phone}，无效`;
          this.$Message({
            type: 'error',
            text: this.message_title
          });
          return;
        }
        let phone = this.form.phone;
        let url = '/user/login/code';
        let param = {
          phone: phone
        };
        this.loading = true;
        Ajax.get(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            console.log(resp.body);
          } else {
            this.$Message({
              type: 'error',
              text: resp.msg
            });
          }
        });
      }
      let caption = `${this.valid_code_interval}${this.valid_code_button_suffix}`;
      this.valid_code_button_caption = caption;
      this.valid_code_interval--;

      window.setTimeout(() => {
        // console.log('第', this.valid_code_interval, '秒');
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
    loginvalid() {
      if (!isPhone(this.form.phone)) {
        this.message_title = `手机号码：${this.form.phone}，无效`;
        return false;
      }
      if (!this.form.code) {
        this.message_title = `需要输入登录验证码`;
        return false;
      }
      return true;
    },
    retrieve() {
      let url = '/retrieve';
      this.$router.push(url);
    }
  }
};
</script>
