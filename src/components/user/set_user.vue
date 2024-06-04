<style lang='less' scoped>
@gradient-color: @primary-color;
@bg-color: #ffffff;
@title-color: #3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.div-container {
  background: @bg-color;
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.div-title {
  margin-top: 5px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  color: @title-color;
}

.div-input {
  margin: 30px 0;
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

.div-button {
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

.div-avatar {
  width: 80px;
  height: 80px;
  transform: translate(50%, 50%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  img:hover {
    cursor: pointer;
  }
}

.user_valid_code {
  width: 50%;
  float: left;
}

.user_valid_code_send {
  margin-top: 30px;
  width: 50%;
  height: 40px;
  line-height: 40px;
  vert-align: middle;
  float: left;
  background-color: #eeeeee;
  border-radius: 5px;
  text-align: center;
}

.user_valid_code_send:hover {
  cursor: pointer;
}

</style>
<template>
  <div class='div-container'>
    <!-- 容器 -->
    <Row>
      <!-- 表单标题 -->
      <Cell width='24'>
        <div class='div-title'>修改【{{ user.name }}】资料</div>
      </Cell>
      <!-- 表单元素 -->
      <Cell width='24'>
        <Row :space-x='10' :space-y='5'>
          <!-- 用户头像 -->
          <Cell width='8'>
            <div class='div-avatar'>
              <img :alt='this.user.name' :title='`${this.user.name}头像`' :src='this.user.avatar'
                   @click='select_avatar' />
            </div>
          </Cell>
          <!-- 其它资料 -->
          <Cell width='16'>
            <Row>
              <!-- 用户姓名 -->
              <Cell width='24'>
                <div class='div-input'>
                  <input type='text' v-model='user.name' />
                  <span class='placeholder' :class="{ fixed: user.name != '' && user.name != null }">用户姓名</span>
                </div>
              </Cell>
              <!-- 登录手机号 -->
              <Cell width='24'>
                <div class='div-input'>
                  <input type='text' v-model='user.username' />
                  <span class='placeholder'
                        :class="{ fixed: user.username != '' && user.username != null }">登录手机号</span>
                </div>
              </Cell>
              <!-- 手机验证码 -->
              <Cell width='24'>
                <div class='div-input user_valid_code'>
                  <input type='text' v-model='user.code' />
                  <span class='placeholder'
                        :class="{ fixed: user.code != '' && user.code != null }">验证短信</span>
                </div>
                <div :class='"user_valid_code_send"' :style='"pointer-events:" + validcode.state'
                     @click='countdowncode'>
                  {{ validcode.caption2 }}
                </div>
              </Cell>
              <!-- 用户姓名 -->
              <Cell width='24'>
                <h-switch v-model='user.male'>用户性别
                  <span slot='open'>男</span>
                  <span slot='close'>女</span>
                </h-switch>
              </Cell>
            </Row>
          </Cell>
        </Row>
      </Cell>
      <!-- 修改按钮 -->
      <Cell width='24'>
        <div class='div-button'>
          <Button :loading='loading' block color='primary' size='l' @click='checkavater'>修改资料</Button>
        </div>
      </Cell>
    </Row>
  </div>
</template>

<script>
import { isPhone, getTime, guid, getRandomChar } from '../../js/common/utils';
import Axios from 'axios';

export default {
  name: 'set_user',
  data() {
    return {
      user: {},
      loading: false,
      avatar_nan: 'https://yiqi.nnyun.net/assets/shuhua/nan.png',
      avatar_nv: 'https://yiqi.nnyun.net/assets/shuhua/nv.png',
      validcode: {
        state: 'all',
        caption: '发送验证码',
        caption2: '',
        suffix: '秒后重新发送',
        interval: 60,
        interval2: 0
      },
      upload_file: null,
      old_phone: ''
    };
  },
  created() {
    if (!this.$store.state.user) {
      let url = '/login';
      this.$router.push(url);
    }
    this.user = this.$store.state.user;
    this.old_phone = this.user.username;
    if (!this.user.avatar) {
      if (this.user.male) {
        this.user.avatar = this.avatar_nan;
      } else {
        this.user.avatar = this.avatar_nv;
      }
    }
    this.validcode.caption2 = this.validcode.caption;
    this.validcode.interval2 = this.validcode.interval;
  },
  methods: {
    /**
     * 选择头像
     */
    select_avatar() {
      let imgTag = document.createElement('input');
      imgTag.setAttribute('type', 'file');
      imgTag.setAttribute('accept', 'image/*');
      imgTag.setAttribute('style', 'display: none;');
      let that = this;
      imgTag.onchange = function (e) {
        imgTag.remove();
        if (!e.target.files || !e.target.files[0]) {
          that.$Message.error(`请选择-->${that.user.name}-->头像`);
          return;
        }
        that.upload_file = e.target.files[0];
        let url = window.URL.createObjectURL(that.upload_file);
        that.user.avatar = url;
        console.log('-->', url);
      };
      imgTag.click();
    },

    /**
     * 倒计时
     */
    countdowncode() {
      if (this.validcode.interval == this.validcode.interval2) {
        // 验证电话号码是否正确
        if (!isPhone(this.user.username)) {
          this.$Message.error(`手机号码：${this.user.username}，无效`);
          return;
        }
        let url = '/user/change/code';
        let param = {
          phone: this.user.username
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
      this.validcode.caption2 = `${this.validcode.interval2}${this.validcode.suffix}`;
      this.validcode.interval2--;
      window.setTimeout(() => {
        this.validcode.state = 'none';
        if (this.validcode.interval2 > 0) {
          this.countdowncode();
        } else {
          this.validcode.caption2 = this.validcode.caption;
          this.validcode.interval2 = this.validcode.interval;
          this.validcode.state = 'all';
        }
      }, 1000);
    },

    /**
     * 检测用户头像
     */
    checkavater() {
      if (!isPhone(this.user.username)) {
        this.$Message.error(`填写正确的手机号码`);
        return;
      }
      if (!this.user.name) {
        this.$Message.error(`填写用户姓名`);
        return;
      }
      if (this.old_phone != this.user.username) {
        if (!this.user.code) {
          this.$Message.error(`填写新手机(${this.user.username})接收到的验证码`);
          return;
        }
      }
      if (!this.user.avatar) {
        this.$Message.error(`${this.user.name}头像无效`);
        return;
      }
      let avatar = this.user.avatar;
      let avatarHead = avatar.substr(0, 4);
      if (avatarHead == 'blob') {
        if (!this.upload_file) {
          this.$Message.error('没有找到用户头像文件对象');
          return;
        }
        // 准备上传头像
        console.log('upload');
        this.aliyunoss();
      } else {
        // 准备更新用户
        console.log('update');
        this.updateUser();
      }
    },

    /**
     * 获取阿里云OSS上传令牌
     */
    aliyunoss() {
      let url = '/user/oss/token';
      let param = {
        url: url
      };
      let that = this;
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          let oss = resp.body;
          if (!oss) {
            this.$Message.error('获取阿里云上传令牌错误');
            return;
          }
          // console.log(oss);
          that.uploadAvaterToAliyun(oss);
        } else {
          this.$Message.error(resp.msg);
        }
      });
    },

    /**
     * 上传文件到阿里云OSS
     * @param oss
     */
    uploadAvaterToAliyun(oss) {
      const type = this.upload_file.type;
      const exts = type.split('/');
      const ext = exts[exts.length - 1].replace('jpeg', 'jpg');
      const time = getTime().replace('-', '_').replace('-', '_').replace(' ', '_').replace(':', '_').replace(':', '_');
      const key = oss.dir + '/' + ext + '/' + time + '_' + guid() + '_' + getRandomChar(7, false) + '.' + ext;

      const form = new FormData();
      form.append('key', key);
      form.append('file', this.upload_file);
      form.append('policy', oss.policy);
      form.append('ossAccessKeyId', oss.accessid);
      form.append('signature', oss.signature);
      form.append('success_action_status', '200');

      let url = oss.host;
      let param = {
        url: url,
        method: 'post',
        processData: false,
        data: form,
        contentType: 'multipart/form-data',
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded, '-->', progressEvent.total);
        }
      };

      let that = this;
      Axios(param).then(res => {
        if (res.status == 200 && res.statusText == 'OK') {
          let fileUrl = 'https://' + oss.domain + '/' + key;
          // console.log('上传成功-->', fileUrl);
          that.user.avatar = fileUrl;
          that.updateUser();
        } else {
          that.$Message.error(`AliyunOSS服务器错误-->${res.status}：${res.statusText}`);
        }
      }, error => {
        that.$Message.error(`上传错误：${JSON.stringify(error)}`);
      }).catch(ex => {
        that.$Message.error(`上传异常：${JSON.stringify(ex)}`);
      });
    },

    /**
     * 更新用户资料
     */
    updateUser() {
      let code = '';
      if (this.user.code) {
        code = this.user.code;
      }
      let param = {
        phone: this.user.username,
        name: this.user.name,
        avatar: this.user.avatar,
        code: code,
        male: this.user.male
      };
      let url = '/user/profile/update';
      this.loading = true;
      Ajax.post(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.$Message.success(`${this.user.name}-->资料已经更新，建议重新登录`);
          console.log('user-->', resp.body);
          G.set('user', resp.body);
          this.$store.commit('setUser', resp.body);
        } else {
          this.$Message.error(resp.msg);
        }
      });
      // console.log(param);
    }
  }
};
</script>
