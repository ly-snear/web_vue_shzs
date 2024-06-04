<style lang="less" scoped>
</style>
<template>
  <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row :space="20">
          <Cell :width='6'>
            <input type="text" v-model="username" placeholder="请输入用户名"/>
          </Cell>
          <Cell :width='6'>
            <input type="text" v-model="password" placeholder="请输入新密码"/>
          </Cell>
          <Cell :width='4'>
            <Button color="primary" circle size="l" @click="save">修改密码</Button>
          </Cell>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    save() {
      if (!this.username || this.username.length < 5) {
        HeyUI.$Message.error('用户名至少6位');
        return;
      }

      if (!this.password || this.password.length < 6) {
        HeyUI.$Message.error('密码至少6位');
        return;
      }

      Utils.confirm(this, '确定修改该信息 ？', modal => {
        modal.close();

        Ajax.post('/user/admin/password', {
          username: this.username,
          password: this.password,
        }).then(resp => {
          if (resp.ok) {
            HeyUI.$Message.success('修改成功');
            this.username = '';
            this.password = '';
          }
        });
      });
    },
  }
};
</script>
