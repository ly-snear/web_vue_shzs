<style lang="less" scoped>
</style>
<template>
<div>
</div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {
    console.log(this.$route.query.token);
    if (this.$route.query.token) {
      this.loading = true;
      Ajax.get('/user/token', {
        token: this.$route.query.token
      }, {
        auth: false
      }).then(resp => {
        this.loading = false;
        console.log(resp);
        if (resp.ok) {
          this.go(resp.body);
        } else if (this.$route.query.go) {
          this.authLogin();
        } else {
          this.$router.replace({ name: 'Login' });
        }
      });
    } else {
      let user = this.$store.getters['user'];
      if (!user) {
        this.$router.replace({ name: 'Login' });
      } else {
        this.$router.replace({ name: 'Private' });
      }
    }
  },
  methods: {
    authLogin() {
      Ajax.post('/user/login', {
        username: '19012340000',
        password: '19012340000'
      }).then(resp => {
        this.loading = false;
        console.log(resp);
        if (resp.ok) {
          this.go(resp.body);
        } else {
          this.$router.replace({ name: 'Login' });
        }
      });
    },
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
      if (this.$route.query.go) {
        let key = 'Page' + this.$route.query.go;
        this.$router.replace({ name: key });
      }
    }
  }
};
</script>
