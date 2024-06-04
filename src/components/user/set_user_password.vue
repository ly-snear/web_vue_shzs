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

</style>

<template>
  <div class='login-vue'>
    <div class='login-container'>
      <div class='login-content'>
        <div class='login-title'>修改密码</div>

        <div class='login-password login-input'>
          <input type='password' v-model='form.oldpass' />
          <span class='placeholder' :class="{ fixed: form.oldpass != '' && form.oldpass != null }">旧的密码</span>
        </div>

        <div class='login-password login-input'>
          <input type='password' v-model='form.newpass' />
          <span class='placeholder' :class="{ fixed: form.newpass != '' && form.newpass != null }">新的密码</span>
        </div>

        <div class='login-password login-input'>
          <input type='password' v-model='form.newpass2' />
          <span class='placeholder' :class="{ fixed: form.newpass2 != '' && form.newpass2 != null }">重复密码</span>
        </div>

        <div class='buttonDiv'>
          <Button :loading='loading' block color='primary' size='l' @click='updatePassword'>修改</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'set_user_password',
  data() {
    return {
      loading: false,
      form: {},
      user: {}
    };
  },
  created() {
    if (!this.$store.state.user) {
      let url = '/login';
      this.$router.push(url);
    }
    this.user = this.$store.state.user;
  },
  methods: {
    updatePassword() {
      if (!this.form.oldpass) {
        this.$Message.error('需要旧的密码');
        return;
      }
      if (!this.form.newpass) {
        this.$Message.error('录入新的密码');
        return;
      }
      if (this.form.newpass !== this.form.newpass2) {
        this.$Message.error('重复密码与新的密码不一样');
        return;
      }
      let param = {
        old: this.form.oldpass,
        pass: this.form.newpass
      };
      // console.log(param);
      let url = '/user/password/modify';
      this.loading = true;
      Ajax.post(url, param)
        .then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.$Message.success(`${this.user.name}-->已经成功修改密码`);
          } else {
            this.$Message.error(resp.msg);
          }
        })
        .catch((ex) => {
          this.loading = false;
          this.$Message.error(JSON.stringify(ex));
        });
    }
  }
};
</script>

<style scoped>

</style>
